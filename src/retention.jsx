import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './retention.css';

/* Recursos de retenção do site inteiro:
   - Title: títulos que se montam linha a linha ao entrar na tela
   - useReveal: [data-reveal] entra em sequência (--d) ao aparecer
   - ScrollProgress: barra fina de progresso da página
   - SectionRail: índice lateral que acende a seção atual (progresso disfarçado de sumário)
   - StickyCTA: barra de contato fixa no celular, fora das experiências imersivas
   - HorizontalRail: trilho que anda para o lado enquanto a página desce */

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Title({ as: Tag = 'h2', className = '', children, ...rest }) {
  const lines = [[]];
  React.Children.toArray(children).forEach((ch) => {
    if (React.isValidElement(ch) && ch.type === 'br') lines.push([]);
    else lines[lines.length - 1].push(ch);
  });
  return (
    <Tag className={`rv-title ${className}`} data-reveal-title="" {...rest}>
      {lines.map((l, i) => <span className="rv-line" key={i}><span style={{ '--i': i }}>{l}</span></span>)}
    </Tag>
  );
}

export function useReveal() {
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('rv-on');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    const scan = (node) => node.querySelectorAll?.('[data-reveal],[data-reveal-title]').forEach((el) => { if (!el.classList.contains('is-in')) io.observe(el); });
    scan(document.body);
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.matches?.('[data-reveal],[data-reveal-title]')) io.observe(n); scan(n); } })));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); root.classList.remove('rv-on'); };
  }, []);
}

// seção atual (compartilhada pelo índice lateral, pela barra do celular e pelo índice do hero)
export const SECTIONS = [
  ['inicio', 'Início'], ['busca', 'Busca'], ['imoveis', 'Seleção'], ['visita-imersiva', 'Entre na casa'],
  ['bairros', 'Bairros'], ['terreno-ganha-vida', 'Terreno → casa'], ['sobre', 'Sobre'], ['explorar', 'Explorar'], ['duvidas', 'Dúvidas'], ['contato', 'Contato'],
];
const IMMERSIVE = new Set(['visita-imersiva', 'terreno-ganha-vida']);

export function useCurrentSection() {
  const [cur, setCur] = useState('inicio');
  useEffect(() => {
    let raf = 0;
    const fn = () => {
      raf = 0;
      const line = window.innerHeight * 0.42;
      let c = 'inicio';
      for (const [id] of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) c = id;
      }
      setCur((p) => (p === c ? p : c));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(fn); };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    fn();
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  return cur;
}

export function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const fn = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(fn); };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    fn();
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><i ref={bar} /></div>;
}

export function SectionRail({ current }) {
  const idx = SECTIONS.findIndex(([id]) => id === current);
  return (
    <nav className={`section-rail ${IMMERSIVE.has(current) ? 'is-hidden' : ''}`} aria-label="Seções da página">
      {SECTIONS.map(([id, label], i) => (
        <a key={id} href={`#${id}`} className={i === idx ? 'on' : i < idx ? 'past' : ''} aria-current={i === idx ? 'true' : undefined}>
          <span className="rail-num">{String(i + 1).padStart(2, '0')}</span><span className="rail-label">{label}</span><i />
        </a>
      ))}
    </nav>
  );
}

export function StickyCTA({ current, children }) {
  const show = current !== 'inicio' && current !== 'contato' && !IMMERSIVE.has(current);
  return <div className={`sticky-cta ${show ? 'on' : ''}`} aria-hidden={!show}>{children}</div>;
}

export function HorizontalRail({ className = '', head, children, count }) {
  const sec = useRef(null), track = useRef(null), viewport = useRef(null), bar = useRef(null), num = useRef(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    let raf = 0, dist = 0;
    const layout = () => {
      const on = mq.matches && !reduced() && track.current && viewport.current;
      setPinned(!!on);
      if (!on) { if (sec.current) sec.current.style.height = ''; if (track.current) track.current.style.transform = ''; return; }
      dist = Math.max(0, track.current.scrollWidth - viewport.current.clientWidth);
      sec.current.style.height = `${window.innerHeight + dist}px`;
      tick();
    };
    const tick = () => {
      raf = 0;
      if (!sec.current || !track.current) return;
      const r = sec.current.getBoundingClientRect();
      const p = dist > 0 ? Math.min(1, Math.max(0, -r.top / dist)) : 0;
      if (mq.matches) { if (viewport.current && viewport.current.scrollLeft) viewport.current.scrollLeft = 0; track.current.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`; }
      if (bar.current) bar.current.style.transform = `scaleX(${mq.matches ? p : 1})`;
      if (num.current && count) num.current.textContent = String(Math.min(count, Math.max(1, Math.round(p * (count - 1)) + 1))).padStart(2, '0');
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    layout();
    const ro = new ResizeObserver(layout); if (track.current) ro.observe(track.current);
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', layout);
    mq.addEventListener?.('change', layout);
    return () => { ro.disconnect(); window.removeEventListener('scroll', on); window.removeEventListener('resize', layout); mq.removeEventListener?.('change', layout); cancelAnimationFrame(raf); };
  }, [count]);
  return (
    <div ref={sec} className={`h-rail ${pinned ? 'is-pinned' : ''} ${className}`}>
      <div className="h-rail-sticky">
        {head}
        <div className="h-rail-viewport" ref={viewport}><div className="h-rail-track" ref={track}>{children}</div></div>
        {count > 1 && <div className="h-rail-meta"><span><b ref={num}>01</b> / {String(count).padStart(2, '0')}</span><div className="h-rail-bar"><i ref={bar} /></div><span className="h-rail-hint">{pinned ? 'CONTINUE ROLANDO' : 'DESLIZE PARA O LADO'} →</span></div>}
      </div>
    </div>
  );
}

export function Teaser({ tone = 'dark', img, kicker, text, href }) {
  return (
    <a className={`teaser teaser-${tone}`} href={href} data-reveal="">
      {img && <span className="teaser-thumb"><img src={img} alt="" loading="lazy" /></span>}
      <span className="teaser-copy"><small>{kicker}</small><b>{text}</b></span>
      <span className="teaser-arrow"><ArrowUpRight size={18} /></span>
    </a>
  );
}
