/* D-AI shared Gemini client + API-key migration.
 * Keys are stored once per browser origin, not in URLs or per-character profiles.
 * This is a static-site convenience, not a secure vault: browser users can inspect localStorage.
 */
(() => {
  'use strict';
  const KEY = 'dai_shared_api_key_v1';
  const SHARED_MODEL = 'dai_shared_model_v1';

  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { return null; }
  }
  function cleanLegacyCopies() {
    const persona = readJson('zeta_persona_v1');
    if (persona && persona.apiKey) {
      persona.apiKey = '';
      try { localStorage.setItem('zeta_persona_v1', JSON.stringify(persona)); } catch (_) {}
    }
    const group = readJson('aigroupchat.v2');
    if (group && group.key) {
      group.key = '';
      try { localStorage.setItem('aigroupchat.v2', JSON.stringify(group)); } catch (_) {}
    }
  }
  function getApiKey() {
    try {
      const existing = localStorage.getItem(KEY);
      if (existing !== null) return existing;
      const persona = readJson('zeta_persona_v1');
      const group = readJson('aigroupchat.v2');
      const legacy = String(persona?.apiKey || group?.key || '');
      if (legacy) localStorage.setItem(KEY, legacy);
      cleanLegacyCopies();
      return legacy;
    } catch (_) { return ''; }
  }
  function setApiKey(value) {
    const key = String(value || '').trim();
    try { localStorage.setItem(KEY, key); } catch (_) {}
    cleanLegacyCopies();
    return key;
  }
  function getModel(fallback = 'gemini-3.1-flash-lite') {
    try { return localStorage.getItem(SHARED_MODEL) || fallback; } catch (_) { return fallback; }
  }
  function setModel(model) {
    const value = String(model || '').trim();
    if (!value) return;
    try { localStorage.setItem(SHARED_MODEL, value); } catch (_) {}
  }
  async function generateContent({ model, payload, signal } = {}) {
    const key = getApiKey();
    if (!key) throw new Error('Gemini API 키가 없습니다. D-AI 설정에서 API 키를 입력해 주세요.');
    if (!payload || !Array.isArray(payload.contents)) throw new Error('AI 요청 데이터가 올바르지 않습니다.');
    const modelId = String(model || getModel()).trim();
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
      encodeURIComponent(modelId) + ':generateContent';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(payload),
      signal
    });
    let data = null;
    try { data = await response.json(); } catch (_) {}
    if (!response.ok) {
      const detail = data?.error?.message || response.statusText || '알 수 없는 오류';
      throw new Error('Gemini API 오류 (' + response.status + '): ' + detail);
    }
    const text = (data?.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
    if (!text) {
      const why = data?.candidates?.[0]?.finishReason || data?.promptFeedback?.blockReason || '응답이 비어 있음';
      throw new Error('Gemini가 텍스트 응답을 반환하지 않았습니다: ' + why);
    }
    return { text, raw: data };
  }

  window.DAIShared = Object.freeze({ getApiKey, setApiKey, getModel, setModel, generateContent });
  // Migrate legacy keys as soon as any D-AI page loads.
  getApiKey();
})();