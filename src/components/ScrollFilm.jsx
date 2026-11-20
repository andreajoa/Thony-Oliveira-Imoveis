import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import '../scrollfilm.css';

/*
  ScrollFilm — a rolagem é a linha do tempo.
  Dois modos de imagem:
   • sequence: quadros extraídos de um vídeo (avança quadro a quadro sob a roda do mouse)
   • stills:   quadros-chave fotográficos com transição "push" (atravessar) ou "grow" (a obra sobe)
  O progresso suavizado vira a variável CSS --p na seção (barras, planta e contadores usam sem re-render).
*/

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
const easeIn = (t) => t * t * t;

function pickSize(sizes) {
  const conn = navigator.connection;
  if (window.innerWidth <= 650 || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType || '') || (navigator.hardwareConcurrency || 8) <= 4) return Math.min(...sizes);
  const need = Math.min(window.devicePixelRatio || 1, 2) * Math.max(window.innerWidth, window.innerHeight * (16 / 9));
  const sorted = [...sizes].sort((a, b) => a - b);
  return sorted.find((s) => s >= need * 0.82) || sorted[sorted.length - 1];
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img); // a decodificação acontece sob demanda (createImageBitmap) na janela atual
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// ordem de carga: primeiro um quadro a cada 16, depois 8, 4, 2, 1 — o filme fica "navegável" cedo
function progressiveOrder(count) {
  const order = [], seen = new Set();
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
  }
  if (!seen.has(count - 1)) order.splice(1, 0, count - 1);
  return order;
}

function coverRect(iw, ih, cw, ch, fx, fy, zoom) {
  const s = Math.max(cw / iw, ch / ih) * zoom;
  const dw = iw * s, dh = ih * s;
  const dx = clamp(cw / 2 - fx * dw, cw - dw, 0);
  const dy = clamp(ch / 2 - fy * dh, ch - dh, 0);
  return [dx, dy, dw, dh];
}

export default function ScrollFilm({
  id, label, variant = 'tour', heightVh = 520, mobileHeightVh = 420,
  sequence, stills, transition = 'push', chapters, topline, demoNote, intro, aside, cardExtra, children,
}) {
  const root = useRef(null), canvasRef = useRef(null), stageRef = useRef(null), loadRef = useRef(null);
  const state = useRef({ target: 0, shown: 0, dirty: true, imgs: [], loadedFlags: [], px: 0, py: 0, tx: 0, ty: 0, bmps: new Map(), pend: new Set(), center: 0 });
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 650px)').matches);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 650px)');
    const fn = () => setIsMobile(mq.matches);
    mq.addEventListener?.('change', fn);
    return () => mq.removeEventListener?.('change', fn);
  }, []);

  // só começa a baixar quando a seção está a ~1,5 tela de distância
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const el = root.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { setArmed(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setArmed(true); io.disconnect(); } }, { rootMargin: '150% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---------- carregamento das imagens ----------
  useEffect(() => {
    if (!armed) return;
    let cancelled = false;
    const st = state.current;
    st.bmps.forEach((b) => b.close?.()); st.bmps.clear(); st.pend.clear();
    st.imgs = []; st.loadedFlags = []; st.dirty = true;
    const report = (n, total) => {
      if (loadRef.current) loadRef.current.style.setProperty('--load', String(n / total));
      if (loadRef.current) loadRef.current.dataset.done = n >= total ? '1' : '0';
    };
    (async () => {
      if (sequence) {
        const size = pickSize(sequence.sizes);
        const files = sequence.per > 1 ? sequence.atlases : sequence.count; // mosaicos de `per` quadros
        const order = progressiveOrder(files);
        st.imgs = new Array(files).fill(null);
        let done = 0, i = 0;
        const worker = async () => {
          while (!cancelled && i < order.length) {
            const idx = order[i++];
            // Blob comprimido: createImageBitmap(blob) decodifica fora da thread principal (de <img> trava a página)
            const blob = await fetch(sequence.src(idx, size)).then((r) => (r.ok ? r.blob() : null)).catch(() => null);
            if (cancelled) return;
            st.imgs[idx] = blob; done++; st.dirty = true;
            if (done === 1) setReady(true);
            if (done % 6 === 0 || done === order.length) report(done, order.length);
          }
        };
        await Promise.all(Array.from({ length: 6 }, worker));
      } else if (stills) {
        const size = pickSize(stills.sizes);
        st.imgs = new Array(stills.items.length).fill(null);
        let done = 0;
        await Promise.all(stills.items.map(async (it, idx) => {
          const img = await loadImage(stills.src(it.file, size));
          if (cancelled) return;
          st.imgs[idx] = img; done++; st.dirty = true;
          if (idx === 0 || done === 1) setReady(true);
          report(done, stills.items.length);
        }));
      }
    })();
    return () => { cancelled = true; };
  }, [sequence, stills, isMobile, armed]);

  // ---------- janela de quadros decodificados ----------
  // Decodificar todos os quadros passaria de 500 MB e o navegador descomprimiria de novo a cada desenho (4 fps).
  // Mantém só ~2×W quadros prontos (ImageBitmap, decodificados fora da thread principal) em volta da posição atual.
  const decodeWindow = (centerFrame) => {
    const st = state.current;
    const per = sequence?.per > 1 ? sequence.per : 1;
    const center = Math.floor(centerFrame / per); // índice do arquivo (mosaico)
    st.center = center;
    const n = st.imgs.length;
    const W = Math.max(2, Math.ceil((window.innerWidth <= 650 ? 10 : 14) / per)), KEEP = W + Math.ceil(8 / per);
    for (const [i, b] of st.bmps) if (Math.abs(i - center) > KEEP) { b.close?.(); st.bmps.delete(i); }
    if (typeof createImageBitmap !== 'function') return;
    for (let d = 0; d <= W; d++) {
      for (const i of d === 0 ? [center] : [center + d, center - d]) {
        if (i < 0 || i >= n || st.bmps.has(i) || st.pend.has(i) || !st.imgs[i]) continue;
        if (st.pend.size >= ((navigator.hardwareConcurrency || 4) <= 4 ? 2 : 3)) return;
        st.pend.add(i);
        createImageBitmap(st.imgs[i]).then((b) => {
          st.pend.delete(i);
          if (Math.abs(i - st.center) > KEEP) { b.close?.(); return; }
          st.bmps.set(i, b); st.dirty = true;
        }).catch(() => { st.pend.delete(i); });
      }
    }
  };

  // ---------- desenho ----------
  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const st = state.current;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width, ch = canvas.height;
    const p = st.shown;
    if (sequence) {
      if (!st.imgs.length) return;
      const n = sequence.count, per = sequence.per > 1 ? sequence.per : 1, cols = sequence.cols || 1, rows = Math.ceil(per / cols);
      const f = p * (n - 1), i0 = Math.floor(f), frac = f - i0;
      decodeWindow(i0);
      const bm = st.bmps;
      // quadro i → [bitmap do mosaico, sx, sy, sw, sh]; null se o mosaico ainda não foi decodificado
      const frame = (i) => {
        if (i < 0 || i >= n) return null;
        const b = bm.get(Math.floor(i / per)); if (!b) return null;
        const s = i % per, fw = b.width / cols, fh = b.height / rows;
        return [b, (s % cols) * fw, Math.floor(s / cols) * fh, fw, fh];
      };
      let cur = frame(i0); const exact = !!cur;
      for (let d = 1; d < 24 && !cur; d++) cur = frame(i0 - d) || frame(i0 + d);
      if (!cur) return; // nada decodificado por perto: mantém o último quadro na tela; o bitmap chega em seguida
      const fp = sequence.focus || [0.5, 0.5];
      const r = coverRect(cur[3], cur[4], cw, ch, fp[0], fp[1], 1);
      ctx.globalAlpha = 1;
      ctx.drawImage(cur[0], cur[1], cur[2], cur[3], cur[4], ...r);
      const next = exact && frac > 0.02 ? frame(i0 + 1) : null;
      if (next) { // mistura com o quadro seguinte: movimento contínuo
        ctx.globalAlpha = frac;
        ctx.drawImage(next[0], next[1], next[2], next[3], next[4], ...r);
        ctx.globalAlpha = 1;
      }
      return;
    }
    if (!stills) return;
    const items = stills.items, imgs = st.imgs, N = items.length;
    const u = p * (N - 1);
    const i = Math.min(N - 2, Math.floor(u));
    const t = u - i;
    const A = imgs[i] || imgs.find(Boolean), B = imgs[i + 1];
    if (!A) return;
    const a = items[i], b = items[i + 1];
    ctx.globalAlpha = 1;
    if (transition === 'push') {
      // permanência: avança devagar; transição: acelera para dentro do ponto de fuga e o próximo cômodo aparece
      const dwell = 0.5;
      const k = t < dwell ? 0 : (t - dwell) / (1 - dwell);
      const zA = 1 + 0.1 * Math.min(1, t / dwell) + 0.75 * easeIn(k);
      let r = coverRect(A.naturalWidth, A.naturalHeight, cw, ch, a.focus[0], a.focus[1], zA);
      ctx.drawImage(A, ...r);
      if (B && k > 0) {
        ctx.globalAlpha = smooth(0.15, 0.85, k);
        r = coverRect(B.naturalWidth, B.naturalHeight, cw, ch, b.focus[0], b.focus[1], 1);
        ctx.drawImage(B, ...r);
        ctx.globalAlpha = 1;
      }
    } else {
      // mesma câmera em todas as etapas: deriva lenta contínua + a etapa seguinte "sobe" de baixo para cima
      const drift = 1 + 0.07 * p;
      const f = stills.focus || [0.5, 0.55];
      let r = coverRect(A.naturalWidth, A.naturalHeight, cw, ch, f[0], f[1], drift);
      ctx.drawImage(A, ...r);
      const k = smooth(0.25, 0.95, t);
      if (B && k > 0) {
        const off = st.off || (st.off = document.createElement('canvas'));
        if (off.width !== cw || off.height !== ch) { off.width = cw; off.height = ch; }
        const o = off.getContext('2d');
        o.globalCompositeOperation = 'source-over';
        o.clearRect(0, 0, cw, ch);
        r = coverRect(B.naturalWidth, B.naturalHeight, cw, ch, f[0], f[1], drift);
        o.drawImage(B, ...r);
        const feather = ch * 0.28;
        const edge = ch * (1.15 - 1.45 * k);
        const g = o.createLinearGradient(0, edge - feather, 0, edge + feather);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(0,0,0,1)');
        o.globalCompositeOperation = 'destination-in';
        o.fillStyle = g;
        o.fillRect(0, 0, cw, ch);
        ctx.globalAlpha = smooth(0, 0.35, k);
        ctx.drawImage(off, 0, 0);
        ctx.globalAlpha = 1;
      }
    }
  }, [sequence, stills, transition]);

  // ---------- laço: progresso da rolagem, suavização, parallax do ponteiro ----------
  useEffect(() => {
    const el = root.current, canvas = canvasRef.current; if (!el || !canvas) return;
    const st = state.current;
    let raf = 0, visible = false, lastChapter = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 1.75);
      const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; st.dirty = true; }
    };
    const measure = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      st.target = total > 0 ? clamp(-r.top / total) : 0;
    };
    let last = performance.now();
    const tick = (now = performance.now()) => {
      raf = 0;
      const dt = Math.min(0.25, Math.max(0.001, (now - last) / 1000)); last = now;
      measure();
      const prev = st.shown;
      st.shown = reduced ? st.target : prev + (st.target - prev) * (1 - Math.exp(-dt / 0.11)); // suavização por tempo (igual em aparelho rápido ou lento)
      if (Math.abs(st.target - st.shown) < 0.0004) st.shown = st.target;
      const kp = 1 - Math.exp(-dt / 0.28); st.px += (st.tx - st.px) * kp; st.py += (st.ty - st.py) * kp;
      if (stageRef.current && !reduced) stageRef.current.style.transform = `translate3d(${(-st.px * 14).toFixed(2)}px, ${(-st.py * 10).toFixed(2)}px, 0) scale(1.035)`;
      if (st.shown !== prev || st.dirty) { draw(); st.dirty = false; }
      el.style.setProperty('--p', st.shown.toFixed(4));
      const pct = String(Math.round(st.shown * 100));
      if (pct !== st.pct) { st.pct = pct; el.querySelectorAll('[data-sf-pct]').forEach((n) => { n.textContent = pct; }); }
      let c = 0;
      chapters.forEach((ch, idx) => { if (st.shown >= ch.at) c = idx; });
      if (c !== lastChapter) { lastChapter = c; setChapter(c); }
      if (visible) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { resize(); kick(); } }, { rootMargin: '200px 0px' });
    io.observe(el);
    const onResize = () => { resize(); st.dirty = true; kick(); };
    const onPointer = (e) => { st.tx = (e.clientX / window.innerWidth - 0.5) * 2; st.ty = (e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    resize(); measure(); st.shown = st.target; st.dirty = true; kick();
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); window.removeEventListener('pointermove', onPointer); };
  }, [draw, chapters, isMobile, reduced]);

  const jump = (idx) => {
    const el = root.current; if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + Math.min(1, chapters[idx].rest ?? chapters[idx].at + 0.01) * total;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  const ch = chapters[chapter];
  return (
    <section
      ref={root} id={id} aria-label={label}
      className={`sf sf-${variant} ${ready ? 'is-ready' : ''} ${ch.statement ? 'statement-on' : ''}`}
      style={{ '--h': `${isMobile ? mobileHeightVh : heightVh}vh` }}
    >
      <div className="sf-sticky">
        <div className="sf-stage" ref={stageRef}><canvas ref={canvasRef} className="sf-canvas" aria-hidden="true" /></div>
        <div className="sf-shade" aria-hidden="true" />
        <div className="sf-grain" aria-hidden="true" />

        {topline && <div className="sf-topline"><span>{topline[0]}</span><span>{topline[1]}</span></div>}

        <div className={`sf-copy ${ch.statement ? 'is-statement' : ''}`}>
          <span className="sf-eyebrow"><span className="tiny-circle" /> {ch.eyebrow}</span>
          <h2 key={chapter} className="sf-title">
            {ch.title.map((line, li) => (
              <span className="sf-line" key={li}><span style={{ animationDelay: `${li * 95}ms` }}>{li === ch.title.length - 1 ? <em>{line}</em> : line}</span></span>
            ))}
          </h2>
          <p key={'p' + chapter} className="sf-text">{ch.text}</p>
          {ch.cta && <a key={'c' + chapter} className="sf-cta" href={ch.cta.href}>{ch.cta.label} <ArrowUpRight size={17} /></a>}
        </div>

        <div className="sf-card" aria-live="polite">
          {typeof cardExtra === 'function' ? cardExtra(chapter) : cardExtra}
          <span className="sf-card-index">{String(chapter + 1).padStart(2, '0')} <i /> {String(chapters.length).padStart(2, '0')}</span>
          <strong key={'r' + chapter}>{ch.room}</strong>
          <span className="sf-card-detail">{ch.detail}</span>
          <div className="sf-dots" role="group" aria-label="Capítulos">
            {chapters.map((c, i) => (
              <button key={c.room} className={i === chapter ? 'on' : i < chapter ? 'past' : ''} onClick={() => jump(i)} aria-label={`Ir para ${c.room}`} />
            ))}
          </div>
          <div className="sf-bar"><i /></div>
        </div>

        {typeof aside === 'function' ? aside(chapter) : aside}
        {children}

        <div className="sf-hint" aria-hidden="true"><MoveDown size={17} /><span>{intro || 'ROLE PARA EXPLORAR'}</span></div>
        <div className="sf-loading" ref={loadRef} aria-hidden="true"><span>CARREGANDO EXPERIÊNCIA</span><i /></div>
        {demoNote && <span className="sf-demo">{demoNote}</span>}
      </div>
    </section>
  );
}
