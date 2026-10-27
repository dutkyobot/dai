/* D-AI 공통 모듈 — 설정(API 키·모델) · Gemini 호출 · 테마 · 공용 UI
   chat.html 과 character.html 이 같이 씁니다. 같은 폴더에 두세요. */
(function () {
  'use strict';
  const D = (window.DAI = {});
  const $ = (s, r) => (r || document).querySelector(s);

  /* ---------------- 아이콘 (인라인 SVG, 외부 폰트 없음) ---------------- */
  const IC = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
    pen: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    refresh: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    pause: '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>',
    play: '<path d="M7 4l13 8-13 8z"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M17.9 17.9A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.1-5.9M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2M1 1l22 22"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    okc: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    clip: '<path d="M21.4 11.1l-9.2 9.2a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 0 1-2.6-2.6l8.5-8.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    arrow: '<path d="M9 6l6 6-6 6"/>'
  };
  D.icon = (n, px) => '<svg viewBox="0 0 24 24"' + (px ? ' style="font-size:' + px + 'px"' : '') + '>' + (IC[n] || '') + '</svg>';

  /* ---------------- 유틸 ---------------- */
  D.esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  D.uid = () => (window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2));
  D.sleep = ms => new Promise(r => setTimeout(r, ms));
  D.initial = n => ((n || '?').trim().charAt(0) || '?').toUpperCase();
  D.hues = [275, 215, 38, 150, 340, 190, 95, 15];
  D.hueColor = h => 'hsl(' + h + ' 70% 55%)';
  D.fmtTime = t => {
    const d = new Date(t); let h = d.getHours(); const ap = h >= 12 ? '오후' : '오전'; h = h % 12 || 12;
    return ap + ' ' + h + ':' + String(d.getMinutes()).padStart(2, '0');
  };
  D.groupLabel = ts => {
    const d = new Date(ts), n = new Date(), day = 86400000;
    const a = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const b = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
    const diff = Math.round((b - a) / day);
    return diff <= 0 ? '오늘' : diff === 1 ? '어제' : diff <= 7 ? '지난 7일' : '이전';
  };
  D.el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  D.avatar = (name, hue, size) => {
    const e = D.el('div', 'av'); e.style.background = D.hueColor(hue == null ? 275 : hue);
    if (size) { e.style.width = e.style.height = size + 'px'; e.style.fontSize = Math.round(size * .42) + 'px'; e.style.borderRadius = Math.round(size * .34) + 'px'; }
    e.textContent = D.initial(name); return e;
  };

  /* ---------------- 저장소 (모든 접근을 try/catch 로) ---------------- */
  let lastQuotaToast = 0;
  D.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    raw(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    rawSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    set(k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); return true; }
      catch (e) {
        if (Date.now() - lastQuotaToast > 10000) { lastQuotaToast = Date.now(); D.toast('브라우저 저장 공간이 가득 찼어요. 오래된 대화를 지우거나 내보내기 후 삭제해 주세요.', 'error'); }
        return false;
      }
    },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------------- 설정 (API 키·모델: 모든 페이지 공유) ---------------- */
  const SKEY = 'dai_settings_v1';
  D.DEFAULT_MODEL = 'gemini-3.1-flash-lite';
  D.MODELS = [
    { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', desc: '가장 저렴 · 가벼운 대화에 적합' },
    { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', desc: '저렴 · 조금 더 똑똑한 응답' },
    { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', desc: '균형 잡힌 품질' },
    { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', desc: '더 정교한 답변' },
    { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro (Preview)', desc: '최고 품질 · 무료 티어 없음' }
  ];
  D.modelLabel = id => { const m = D.MODELS.find(x => x.id === id); return m ? m.name : (id || D.DEFAULT_MODEL); };
  let S = (function () {
    let s = D.store.get(SKEY, null);
    if (!s || typeof s !== 'object') {
      const z = D.store.get('zeta_persona_v1', null), g = D.store.get('aigroupchat.v2', null);   // 예전 페이지에 저장된 키 가져오기
      s = { key: (z && z.apiKey) || (g && g.key) || '', model: D.DEFAULT_MODEL };
      D.store.set(SKEY, s);
    }
    if (!s.model) s.model = D.DEFAULT_MODEL;
    return s;
  })();
  D.settings = {
    get: () => Object.assign({}, S),
    set(patch) { S = Object.assign({}, S, patch); D.store.set(SKEY, S); document.dispatchEvent(new CustomEvent('dai:settings')); }
  };

  /* ---------------- 테마 (모든 페이지 같은 키) ---------------- */
  D.theme = {
    get() { const v = D.store.raw('dai_theme_v1') || D.store.raw('zeta_theme_v1'); return v === 'light' ? 'light' : 'dark'; },
    apply(t) {
      document.documentElement.classList.toggle('dark', t !== 'light');
      document.querySelectorAll('.theme-option').forEach(b => b.classList.toggle('is-active', b.dataset.theme === (t === 'light' ? 'light' : 'dark')));
    },
    set(t) { D.store.rawSet('dai_theme_v1', t === 'light' ? 'light' : 'dark'); this.apply(t); }
  };
  D.theme.apply(D.theme.get());

  /* ---------------- Gemini 호출 ---------------- */
  class DaiError extends Error { constructor(code, msg, status) { super(msg || code); this.code = code; this.status = status; } }
  D.DaiError = DaiError;
  function normalize(contents) {
    const out = [];
    for (const c of contents || []) {
      const t = (c.parts || []).map(p => p.text || '').join('');
      if (!t.trim()) continue;
      const last = out[out.length - 1];
      if (last && last.role === c.role) last.parts[0].text += '\n' + t; else out.push({ role: c.role, parts: [{ text: t }] });
    }
    if (!out.length || out[0].role === 'model') out.unshift({ role: 'user', parts: [{ text: '(대화 시작)' }] });
    return out;
  }
  D.generate = async function (opt) {
    const s = S;
    if (!(s.key || '').trim()) throw new DaiError('nokey');
    const model = (s.model || D.DEFAULT_MODEL).trim();
    const body = { contents: normalize(opt.contents), generationConfig: { temperature: opt.temperature == null ? 1 : opt.temperature, maxOutputTokens: opt.maxTokens || 8192 } };
    if (opt.system) body.systemInstruction = { parts: [{ text: opt.system }] };
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent';
    let last = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      let res;
      try {
        res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': s.key.trim() }, body: JSON.stringify(body) });
      } catch (e) { last = new DaiError('network'); await D.sleep(700); continue; }
      if (res.ok) {
        const data = await res.json();
        const cand = data.candidates && data.candidates[0];
        const text = ((cand && cand.content && cand.content.parts) || []).map(p => p.text || '').join('').trim();
        if (!text) throw new DaiError('empty', (cand && cand.finishReason) || (data.promptFeedback && data.promptFeedback.blockReason) || '알 수 없음');
        return text;
      }
      let detail = ''; try { detail = (await res.json()).error.message || ''; } catch (e) {}
      const st = res.status;
      if (st === 429) throw new DaiError('ratelimit', detail, st);
      if (st === 404) throw new DaiError('notfound', model, st);
      if (st === 401 || st === 403 || (st === 400 && /API key/i.test(detail))) throw new DaiError('auth', detail, st);
      if (st >= 500) { last = new DaiError('server', detail, st); await D.sleep(1200); continue; }
      throw new DaiError('http', st + ' ' + detail, st);
    }
    throw last || new DaiError('network');
  };
  D.errText = e => {
    const c = e && e.code;
    if (c === 'nokey') return 'API 키가 없어서 답할 수 없어요. 설정에서 Gemini API 키를 넣어주세요.';
    if (c === 'auth') return 'API 키가 올바르지 않거나 권한이 없어요.' + (e.message ? ' (' + e.message.slice(0, 90) + ')' : '');
    if (c === 'ratelimit') return '요청 한도에 걸렸어요. 잠깐 쉬었다가 다시 시도해 주세요. 계속되면 설정에서 모델을 바꿔보세요.';
    if (c === 'notfound') return '모델을 찾을 수 없어요 (' + e.message + '). 설정에서 다른 모델을 골라주세요.';
    if (c === 'empty') return '빈 응답이 왔어요 (사유: ' + e.message + '). 다시 시도하거나 모델을 바꿔보세요.';
    if (c === 'nosearchkey') return '웹 검색 API 키가 없어요. 설정에서 검색 API 키를 넣어주세요.';
    if (c === 'searchauth') return '웹 검색 API 키가 올바르지 않아요.';
    if (c === 'searchnet') return '웹 검색 서비스에 연결하지 못했어요. 네트워크를 확인하거나 설정에서 자체 구글 검색을 켜 보세요.';
    if (c === 'searchfail') return '웹 검색 중 오류가 났어요 (' + e.message + ').';
    if (c === 'network') return '네트워크 오류예요. 연결을 확인하고 다시 시도해 주세요.';
    if (c === 'server') return 'Google 서버가 잠시 응답하지 않아요. 잠시 후 다시 시도해 주세요.';
    return '오류가 났어요: ' + ((e && e.message) || e);
  };

  /* ---------------- 텍스트 서식 ---------------- */
  D.rp = function (text) {   // 롤플레이 지문: *행동*  /  [*행동*]
    let s = D.esc(text);
    s = s.replace(/\[\*([^*\]]+)\*\]/g, (_, b) => '<span class="tag-act">✦ ' + b + '</span>');
    return s.replace(/\*([^*\n]+)\*/g, (_, b) => '<span class="tag-inline">(' + b + ')</span>');
  };
  /* 마크다운 렌더러: 표 · 인용 · 목록 · 제목 · 링크 · 굵게/기울임 (먼저 전부 이스케이프) */
  function inl(t) {
    const cs = [];
    t = t.replace(/`([^`]+)`/g, (m, c) => { cs.push(c); return '\u0001' + (cs.length - 1) + '\u0001'; });
    t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/__(.+?)__/g, '<strong>$1</strong>').replace(/~~(.+?)~~/g, '<del>$1</del>');
    t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    return t.replace(/\u0001(\d+)\u0001/g, (m, i) => '<code>' + cs[+i] + '</code>');
  }
  const row = l => { l = l.trim(); if (l[0] === '|') l = l.slice(1); if (l.endsWith('|')) l = l.slice(0, -1); return l.split('|').map(c => c.trim()); };
  const isSep = l => { if (!l || l.indexOf('-') < 0) return false; return row(l).every(c => /^:?-{2,}:?$/.test(c)); };
  D.mdHtml = function (text) {
    const L = String(text == null ? '' : text).split('\n'); let h = '', para = [], lt = null;
    const e = x => inl(D.esc(x));
    const fp = () => { if (para.length) { h += '<p>' + e(para.join('\n')).replace(/\n/g, '<br>') + '</p>'; para = []; } };
    const cl = () => { if (lt) { h += '</' + lt + '>'; lt = null; } };
    for (let i = 0; i < L.length; i++) {
      const ln = L[i];
      if (ln.indexOf('|') >= 0 && i + 1 < L.length && isSep(L[i + 1])) {
        fp(); cl(); const head = row(ln).map(e); i += 2; const rows = [];
        while (i < L.length && L[i].trim() && L[i].indexOf('|') >= 0) { rows.push(row(L[i]).map(e)); i++; }
        i--; h += '<div class="table-wrap"><table><thead><tr>' + head.map(c => '<th>' + c + '</th>').join('') + '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
        continue;
      }
      const bq = ln.match(/^>\s?(.*)/);
      if (bq) { fp(); cl(); const q = [bq[1]]; while (i + 1 < L.length && /^>\s?/.test(L[i + 1])) { i++; q.push(L[i].replace(/^>\s?/, '')); } h += '<blockquote>' + q.map(e).join('<br>') + '</blockquote>'; continue; }
      if (/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(ln)) { fp(); cl(); h += '<hr>'; continue; }
      const hd = ln.match(/^(#{1,6})\s+(.*)/), ul = ln.match(/^\s*[-*+]\s+(.*)/), ol = ln.match(/^\s*\d+[.)]\s+(.*)/);
      if (hd) { fp(); cl(); h += '<h' + hd[1].length + '>' + e(hd[2]) + '</h' + hd[1].length + '>'; }
      else if (ul) { fp(); if (lt !== 'ul') { cl(); h += '<ul>'; lt = 'ul'; } h += '<li>' + e(ul[1]) + '</li>'; }
      else if (ol) { fp(); if (lt !== 'ol') { cl(); h += '<ol>'; lt = 'ol'; } h += '<li>' + e(ol[1]) + '</li>'; }
      else if (!ln.trim()) { fp(); cl(); } else para.push(ln);
    }
    fp(); cl(); return h;
  };
  D.md = D.mdHtml;
  /* 코드블록(```)은 onCode 로 넘겨 카드 등으로 그리고, 나머지는 마크다운으로 el 에 렌더 (스트리밍 중 닫히지 않은 블록도 처리) */
  D.rich = function (el, text, onCode) {
    el.innerHTML = ''; text = String(text || ''); const re = /```([\w+-]*)[^\n]*\n([\s\S]*?)(```|$)/g; let last = 0, m;
    const add = t => { if (!t.trim()) return; const d = document.createElement('div'); d.innerHTML = D.mdHtml(t); el.appendChild(d); };
    while ((m = re.exec(text))) {
      add(text.slice(last, m.index)); el.appendChild(onCode({ lang: (m[1] || 'text').toLowerCase(), code: m[2].replace(/\n$/, ''), closed: m[3] === '```' }));
      last = re.lastIndex; if (m[0] === '') re.lastIndex++;
    }
    add(text.slice(last));
  };

  /* ---------------- Gemini 스트리밍 (중단은 reader.cancel, AbortSignal 미사용) ---------------- */
  D.stream = function (opt) {
    let reader = null, stopped = false;
    const promise = (async () => {
      if (!(S.key || '').trim()) throw new DaiError('nokey');
      const model = (S.model || D.DEFAULT_MODEL).trim();
      const body = { contents: normalize(opt.contents), generationConfig: { temperature: opt.temperature == null ? 1 : opt.temperature, maxOutputTokens: opt.maxTokens || 8192 } };
      if (opt.system) body.systemInstruction = { parts: [{ text: opt.system }] };
      if (opt.tools) body.tools = opt.tools;
      let res;
      try { res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':streamGenerateContent?alt=sse', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': S.key.trim() }, body: JSON.stringify(body) }); }
      catch (e) { throw new DaiError('network'); }
      if (!res.ok) {
        let d = ''; try { d = (await res.json()).error.message || ''; } catch (e) {}
        const st = res.status;
        if (st === 429) throw new DaiError('ratelimit', d, st);
        if (st === 404) throw new DaiError('notfound', model, st);
        if (st === 401 || st === 403 || (st === 400 && /API key/i.test(d))) throw new DaiError('auth', d, st);
        throw new DaiError(st >= 500 ? 'server' : 'http', st + ' ' + d, st);
      }
      if (stopped) return { text: '', sources: [], stopped: true };
      reader = res.body.getReader(); const dec = new TextDecoder(); let buf = '', text = '', fin = ''; const sources = [];
      try {
        while (true) {
          const r = await reader.read(); if (r.done) break;
          buf += dec.decode(r.value, { stream: true }); const lines = buf.split('\n'); buf = lines.pop();
          for (const ln of lines) {
            const t = ln.trim(); if (t.indexOf('data:') !== 0) continue;
            let j; try { j = JSON.parse(t.slice(5).trim()); } catch (e) { continue; }
            const c = j.candidates && j.candidates[0]; if (!c) continue;
            ((c.content && c.content.parts) || []).forEach(p => { if (p.text && !p.thought) text += p.text; });
            if (c.finishReason) fin = c.finishReason;
            const gc = c.groundingMetadata && c.groundingMetadata.groundingChunks;
            if (gc) gc.forEach(g => { if (g.web && g.web.uri && !sources.some(x => x.uri === g.web.uri)) sources.push({ uri: g.web.uri, title: g.web.title || g.web.uri }); });
          }
          if (opt.onDelta) opt.onDelta(text);
        }
      } catch (e) { if (!stopped) throw new DaiError('network'); }
      if (!text.trim() && !stopped) throw new DaiError('empty', fin || '알 수 없음');
      return { text, sources: sources.slice(0, 6), stopped };
    })();
    return { promise, cancel() { stopped = true; try { reader && reader.cancel(); } catch (e) {} } };
  };

  /* ---------------- 웹 검색 (Tavily) ---------------- */
  D.webSearch = async function (query) {
    const k = (S.searchKey || '').trim(); if (!k) throw new DaiError('nosearchkey');
    let res;
    try { res = await fetch('https://api.tavily.com/search', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + k }, body: JSON.stringify({ query: String(query).slice(0, 380), max_results: 5, search_depth: 'basic' }) }); }
    catch (e) { throw new DaiError('searchnet'); }
    if (!res.ok) { let d = ''; try { d = (await res.json()).detail.error || ''; } catch (e) {} throw new DaiError(res.status === 401 || res.status === 403 ? 'searchauth' : 'searchfail', d || res.status, res.status); }
    const j = await res.json();
    return (j.results || []).slice(0, 5).map(r => ({ title: r.title || r.url, uri: r.url, content: String(r.content || '').slice(0, 700) }));
  };

  /* ---------------- 토스트 · 대화상자 · 모달 ---------------- */
  let toastTimer = null;
  D.toast = (text, tone) => {
    let t = $('#dai-toast');
    if (!t) { t = D.el('div', 'toast', '<span class="ti"></span><span class="tx"></span>'); t.id = 'dai-toast'; document.body.appendChild(t); }
    t.className = 'toast ' + (tone === 'error' ? 'error' : 'ok');
    $('.ti', t).innerHTML = D.icon(tone === 'error' ? 'alert' : 'okc');
    $('.tx', t).textContent = text;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), tone === 'error' ? 4200 : 2200);
  };
  const modalStack = [];
  D.modal = function (o) {
    const back = D.el('div', 'modal-back show' + (o.top ? ' top' : ''));
    const box = D.el('div', 'modal-box card' + (o.wide ? ' wide' : ''));
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    back.appendChild(box); document.body.appendChild(back);
    requestAnimationFrame(() => back.classList.add('in'));
    const api = { el: box, back, close() {
      const i = modalStack.indexOf(api); if (i >= 0) modalStack.splice(i, 1);
      back.classList.remove('in'); setTimeout(() => back.remove(), 180); if (o.onClose) o.onClose();
    } };
    back.addEventListener('mousedown', e => { if (e.target === back) api.close(); });
    modalStack.push(api); return api;
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modalStack.length) modalStack[modalStack.length - 1].close(); });
  function dialog(o) {
    return new Promise(res => {
      let done = false;
      const m = D.modal({ top: true, onClose() { if (!done) { done = true; res(null); } } });
      m.el.innerHTML = '<div class="modal-head"><h2></h2></div>' + (o.message ? '<p class="modal-msg"></p>' : '') + (o.input ? '<input class="field" type="text" maxlength="60">' : '') +
        '<div class="modal-foot"><button class="btn btn-ghost" data-no>취소</button><button class="btn ' + (o.danger ? 'btn-danger' : 'btn-brand') + '" data-ok></button></div>';
      $('h2', m.el).textContent = o.title; if (o.message) $('.modal-msg', m.el).textContent = o.message;
      $('[data-ok]', m.el).textContent = o.okText || '확인';
      const inp = $('input', m.el); if (inp) { inp.value = o.value || ''; setTimeout(() => { inp.focus(); inp.select(); }, 30); }
      const finish = v => { if (done) return; done = true; res(v); m.close(); };
      $('[data-no]', m.el).onclick = () => finish(null);
      $('[data-ok]', m.el).onclick = () => finish(inp ? inp.value : true);
      if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) finish(inp.value); });
    });
  }
  D.confirm = (title, message, o) => dialog(Object.assign({ title, message }, o || {})).then(v => v !== null);
  D.ask = (title, value, o) => dialog(Object.assign({ title, value, input: true, okText: '저장' }, o || {}));

  /* ---------------- 입력창 · 사이드바 · 헤더 ---------------- */
  D.autoResize = ta => {
    ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 130) + 'px';
    const shell = ta.closest('.composer-shell'); if (shell) shell.classList.toggle('is-multiline', ta.scrollHeight > 46);
  };
  D.bindComposer = function (form, ta, onSubmit) {   // Enter 전송 · Shift+Enter 줄바꿈 · 한글 조합 중 Enter 처리
    let pendingEnter = false;
    ta.addEventListener('input', () => D.autoResize(ta));
    ta.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.shiftKey) return;
      if (e.isComposing || e.keyCode === 229) { pendingEnter = true; return; }
      e.preventDefault(); form.requestSubmit();
    });
    ta.addEventListener('compositionend', () => {
      if (!pendingEnter) return; pendingEnter = false;
      setTimeout(() => { if (ta.value.trim()) form.requestSubmit(); }, 0);
    });
    ta.addEventListener('keyup', () => setTimeout(() => { pendingEnter = false; }, 50));
    form.addEventListener('submit', e => {
      e.preventDefault(); const text = ta.value.trim(); if (!text) return;
      ta.value = ''; D.autoResize(ta); onSubmit(text);
    });
  };
  D.bindSidebar = function () {
    const sb = $('#sidebar'), ov = $('#sb-overlay');
    const set = o => { sb.classList.toggle('open', o); ov.classList.toggle('show', o); };
    const op = $('#btn-open-sidebar'), cl = $('#btn-close-sidebar');
    if (op) op.onclick = () => set(!sb.classList.contains('open'));
    if (cl) cl.onclick = () => set(false);
    ov.onclick = () => set(false);
    return { open: () => set(true), close: () => set(false) };
  };
  D.bindHeaderScroll = (stream, header) => stream.addEventListener('scroll', () => header.classList.toggle('is-scrolled', stream.scrollTop > 8), { passive: true });
  D.copyText = text => (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => D.toast('복사했어요.'), () => D.toast('복사에 실패했어요.', 'error'));
  D.download = (name, obj) => {
    const a = document.createElement('a'); const url = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }));
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 500);
  };
  D.pickJSON = cb => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = 'application/json,.json';
    i.onchange = () => { const f = i.files && i.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { cb(JSON.parse(r.result)); } catch (e) { D.toast('파일을 읽을 수 없어요. 올바른 내보내기 파일인지 확인해 주세요.', 'error'); } }; r.readAsText(f); };
    i.click();
  };

  /* ---------------- 헤더 모델 선택기 ---------------- */
  D.mountModelPicker = function (host) {
    host.classList.add('model-picker');
    host.innerHTML = '<button type="button" class="model-pill float-pill" aria-haspopup="listbox" aria-expanded="false"><span class="mp-val"></span>' + D.icon('chevron') + '</button><div class="model-menu card" role="listbox"></div>';
    const btn = $('.model-pill', host), menu = $('.model-menu', host);
    const refresh = () => {
      const cur = S.model;
      $('.mp-val', host).textContent = D.modelLabel(cur);
      const list = D.MODELS.slice(); if (!list.some(m => m.id === cur)) list.push({ id: cur, name: cur, desc: '직접 입력한 모델' });
      menu.innerHTML = '';
      list.forEach(m => {
        const b = D.el('button', 'mp-opt' + (m.id === cur ? ' is-selected' : ''), '<span class="mp-name"></span><span class="mp-desc"></span>' + D.icon('check').replace('<svg', '<svg class="mp-check"'));
        $('.mp-name', b).textContent = m.name; $('.mp-desc', b).textContent = m.desc; b.type = 'button';
        b.onclick = () => { D.settings.set({ model: m.id }); host.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
        menu.appendChild(b);
      });
    };
    btn.onclick = e => { e.stopPropagation(); const o = host.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); };
    document.addEventListener('click', e => { if (!host.contains(e.target)) { host.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('dai:settings', refresh); refresh();
  };

  /* ---------------- 설정 모달 (API 키 · 모델 · 테마 + 페이지별 섹션) ---------------- */
  D.mountSettings = function (opt) {
    opt = opt || {};
    const back = D.el('div', 'modal-back'); back.id = 'settings-modal';
    back.innerHTML =
      '<div class="modal-box card" role="dialog" aria-modal="true" aria-label="설정">' +
        '<div class="modal-head"><h2>설정</h2><button class="icon-btn" data-x aria-label="닫기">' + D.icon('x') + '</button></div>' +
        '<div class="settings-section first"><div class="settings-section-title">AI API</div>' +
          '<div><label class="label" for="st-prov">제공사</label><select id="st-prov" class="field"><option>Google AI Studio (Gemini)</option></select><p class="hint">다른 회사의 AI API는 앞으로 추가될 예정이에요.</p></div>' +
          '<div><label class="label" for="st-key">API 키</label><div class="pw-wrap"><input id="st-key" class="field" type="password" placeholder="AIzaSy..." autocomplete="off">' +
          '<button type="button" class="icon-btn" id="st-eye" aria-label="키 표시/숨김">' + D.icon('eye') + '</button></div>' +
          '<p class="hint hidden" id="st-keywarn" style="color:rgb(var(--c-amber))">보통 "AIzaSy"로 시작하는 키예요. 다시 확인해 보세요.</p>' +
          '<p class="hint">일반 AI와 캐릭터 챗이 같은 키·모델을 써요. 키는 이 브라우저에만 저장되고 Google 외에는 전송되지 않아요. ' +
          '<a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">키 발급받기</a></p></div></div>' +
        '<div class="settings-section"><div class="settings-section-title">모델</div><div class="model-list" id="st-models"></div>' +
          '<div><label class="label" for="st-custom">직접 입력</label><input id="st-custom" class="field" type="text" placeholder="예: gemini-3.1-flash-lite"></div></div>' +
        (opt.search ? '<div class="settings-section"><div class="settings-section-title">웹 검색 API</div>' +
          '<div><label class="label" for="st-sprov">검색 제공사</label><select id="st-sprov" class="field"><option>Tavily</option></select></div>' +
          '<div><label class="label" for="st-skey">검색 API 키</label><div class="pw-wrap"><input id="st-skey" class="field" type="password" placeholder="tvly-..." autocomplete="off"><button type="button" class="icon-btn" id="st-seye" aria-label="키 표시/숨김">' + D.icon('eye') + '</button></div>' +
          '<p class="hint">웹 검색을 켜면 이 API를 기본으로 써요. 어떤 AI 제공사를 쓰더라도 동작해요. <a href="https://app.tavily.com" target="_blank" rel="noopener">키 발급받기</a></p></div>' +
          '<div class="settings-row"><div><div class="settings-row-label">Google AI Studio 자체 검색 사용</div><div class="settings-row-desc">Google AI Studio API를 쓸 때 위 검색 API 대신 Gemini의 자체 Google 검색을 이용해요.</div></div><button type="button" class="toggle-switch" id="st-native" aria-label="자체 구글 검색"><span class="toggle-knob"></span></button></div></div>' : '') +
        '<div class="settings-section"><div class="settings-row"><div><div class="settings-row-label">화면 테마</div><div class="settings-row-desc">눈이 편한 다크 모드로 바꿀 수 있어요.</div></div>' +
          '<div class="theme-switch"><button type="button" data-theme="light" class="theme-option" aria-label="라이트 모드">' + D.icon('sun') + '</button>' +
          '<button type="button" data-theme="dark" class="theme-option" aria-label="다크 모드">' + D.icon('moon') + '</button></div></div></div>' +
        '<div id="st-extra"></div>' +
        '<button type="button" class="btn btn-brand" id="st-save" style="width:100%;padding:13px 0">저장</button>' +
      '</div>';
    document.body.appendChild(back);
    const box = $('.modal-box', back), keyEl = $('#st-key', back), customEl = $('#st-custom', back), listEl = $('#st-models', back);
    let draftModel = S.model;
    const close = () => { back.classList.remove('in'); setTimeout(() => back.classList.remove('show'), 160); };
    const renderModels = () => {
      listEl.innerHTML = '';
      D.MODELS.forEach(m => {
        const b = D.el('button', 'model-opt' + (m.id === draftModel ? ' is-selected' : ''), '<span style="flex:1;min-width:0"><span class="mp-name"></span><span class="mp-desc"></span></span>' + D.icon('check').replace('<svg', '<svg class="mp-check"'));
        $('.mp-name', b).textContent = m.name; $('.mp-desc', b).textContent = m.desc; b.type = 'button';
        b.onclick = () => { draftModel = m.id; customEl.value = ''; renderModels(); };
        listEl.appendChild(b);
      });
      if (!D.MODELS.some(m => m.id === draftModel)) customEl.value = draftModel;
    };
    const warn = () => { const v = keyEl.value.trim(); $('#st-keywarn', back).classList.toggle('hidden', !v || v.startsWith('AIzaSy')); };
    keyEl.addEventListener('input', warn);
    customEl.addEventListener('input', () => { const v = customEl.value.trim(); if (v) { draftModel = v; renderModels(); customEl.value = v; } });
    $('#st-eye', back).onclick = () => { const t = keyEl.type === 'password'; keyEl.type = t ? 'text' : 'password'; $('#st-eye', back).innerHTML = D.icon(t ? 'eyeoff' : 'eye'); };
    back.querySelectorAll('.theme-option').forEach(b => b.onclick = () => D.theme.set(b.dataset.theme));
    $('[data-x]', back).onclick = close;
    back.addEventListener('mousedown', e => { if (e.target === back) close(); });
    let nativeDraft = false;
    const skeyEl = $('#st-skey', back), natEl = $('#st-native', back);
    if (opt.search) {
      $('#st-seye', back).onclick = () => { const t = skeyEl.type === 'password'; skeyEl.type = t ? 'text' : 'password'; $('#st-seye', back).innerHTML = D.icon(t ? 'eyeoff' : 'eye'); };
      natEl.onclick = () => { nativeDraft = !nativeDraft; natEl.classList.toggle('is-on', nativeDraft); };
    }
    $('#st-save', back).onclick = () => {
      const patch = { key: keyEl.value.trim(), model: (draftModel || D.DEFAULT_MODEL).trim() };
      if (opt.search) { patch.searchKey = skeyEl.value.trim(); patch.nativeSearch = nativeDraft; patch.searchProvider = 'tavily'; }
      D.settings.set(patch);
      if (opt.onSave) opt.onSave(); close(); D.toast('설정을 저장했어요.');
    };
    if (opt.extra) opt.extra($('#st-extra', back));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && back.classList.contains('show') && !modalStack.length) close(); });
    return {
      open() {
        draftModel = S.model; keyEl.value = S.key || ''; keyEl.type = 'password'; $('#st-eye', back).innerHTML = D.icon('eye'); customEl.value = '';
        if (opt.search) { skeyEl.value = S.searchKey || ''; skeyEl.type = 'password'; nativeDraft = !!S.nativeSearch; natEl.classList.toggle('is-on', nativeDraft); }
        warn(); renderModels(); D.theme.apply(D.theme.get()); if (opt.onOpen) opt.onOpen(box);
        back.classList.add('show'); requestAnimationFrame(() => back.classList.add('in'));
      },
      close
    };
  };
})();
