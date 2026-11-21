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
  ['inicio', 'Início'], ['busca', 'Busca'], ['imoveis', 'Empreendimentos'], ['comparativo', 'Comparativo'],
  ['terreno-ganha-vida', 'Terreno → casa'], ['visita-imersiva', 'Entre na casa'],
  ['bairros', 'Regiões'], ['sobre', 'Sobre'], ['explorar', 'Explorar'], ['duvidas', 'Dúvidas'], ['contato', 'Contato'],
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

export function WhatsAppFloat({ current, href, number }) {
  // sempre visível; nas experiências imersivas sobe no celular para não cobrir o cartão do cômodo
  return (
    <a className={`wa-float ${IMMERSIVE.has(current) ? 'raised' : ''}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Conversar com Thony no WhatsApp ${number}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
      <span className="wa-label"><small>FALE COM THONY</small><b>WhatsApp</b></span>
    </a>
  );
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
