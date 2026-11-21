import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Compass,
  Eye,
  Home,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import HouseBuild from './components/HouseBuild.jsx';
import HouseTour from './components/HouseTour.jsx';
import LeadPopup from './components/LeadPopup.jsx';
import {
  EMPREENDIMENTOS,
  WHATSAPP_DEFAULT,
  WHATSAPP_SHOWN,
  waLink,
} from './data/empreendimentos.js';
import {
  Title,
  useReveal,
  useCurrentSection,
  ScrollProgress,
  SectionRail,
  WhatsAppFloat,
  Teaser,
} from './retention.jsx';

const wa = (import.meta.env.VITE_WHATSAPP_NUMBER || WHATSAPP_DEFAULT).replace(/\D/g, '');
const creci = (import.meta.env.VITE_CRECI || '').trim();

const keywordGroups = [
  {
    title: 'Empreendimentos reais',
    links: [
      ...EMPREENDIMENTOS.map((e) => [e.name, `/empreendimentos/${e.slug}/`]),
      ['Melhores condomínios horizontais em Goiânia e região', '/explorar/melhores-condominios-horizontais-goiania-regiao/'],
      ['Como investir em terrenos em Goiânia e Goiás', '/explorar/investir-em-terrenos-goiania-goias/'],
      ['Lotes com parcelamento direto com a urbanizadora', '/explorar/financiamento-direto-lote-goiania-goianira/'],
    ],
  },
  {
    title: 'Goiás e Região Metropolitana',
    links: [
      ['Imóveis e lotes em Goiás (Guia estadual)', '/explorar/imoveis-em-goias/'],
      ['Loteamentos planejados em Goiás', '/explorar/loteamentos-em-goias/'],
      ['Região Metropolitana de Goiânia (RMG)', '/explorar/regiao-metropolitana-de-goiania/'],
      ['Eixo GO-070 (Goiânia · Goianira · Inhumas)', '/explorar/imoveis-eixo-go-070/'],
      ['Imóveis em Goianira', '/explorar/imoveis-em-goianira/'],
      ['Imóveis perto de Trindade (GO)', '/explorar/imoveis-em-trindade-goias/'],
      ['Imóveis perto de Senador Canedo (GO)', '/explorar/imoveis-em-senador-canedo/'],
      ['Inhumas, Santo Antônio de Goiás e Nerópolis', '/explorar/imoveis-em-neropolis-e-santo-antonio-de-goias/'],
      ['Anápolis, Hidrolândia e Bela Vista de Goiás', '/explorar/imoveis-em-anapolis-e-regiao/'],
    ],
  },
  {
    title: 'Goiânia e buscas populares',
    links: [
      ['Região Norte de Goiânia (UFG · Perimetral)', '/explorar/lotes-regiao-norte-goiania/'],
      ['Terrenos perto da UFG em Goiânia', '/explorar/terrenos-perto-ufg-goiania/'],
      ['Condomínios fechados em Goianira', '/explorar/condominio-fechado-goianira/'],
      ['Lotes à venda em Goianira', '/explorar/lotes-em-goianira/'],
      ['Terrenos à venda em Goiânia', '/explorar/terrenos-a-venda-em-goiania/'],
      ['Imóveis em Goiânia', '/explorar/imoveis-em-goiania/'],
      ['Aparecida de Goiânia', '/explorar/imoveis-em-aparecida-de-goiania/'],
      ['Setor Bueno, Marista e Jardim Goiás', '/explorar/imoveis-setor-bueno-goiania/'],
    ],
  },
];

function ContactButton({
  className = '',
  children = 'Fale com Thony',
  message = 'Olá, Thony! Vim pelo site e quero conhecer os empreendimentos disponíveis em Goiânia e Goianira.',
}) {
  return (
    <a className={className} href={waLink(message, wa)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const nav = [
    ['Empreendimentos', '#imoveis'],
    ['Comparativo', '#comparativo'],
    ['Terreno → casa', '#terreno-ganha-vida'],
    ['Visita imersiva', '#visita-imersiva'],
    ['Sobre', '#sobre'],
  ];

  return (
    <header className={'site-header ' + (scrolled ? 'is-scrolled' : '')}>
      <a className="brand" href="/" aria-label="Thony Oliveira Imóveis — início">
        <span className="brand-mark">
          <span>
            T<span className="mark-dot">·</span>O
          </span>
        </span>
        <span className="brand-copy">
          <b>THONY OLIVEIRA</b>
          <small>IMÓVEIS · GOIÂNIA &amp; GOIANIRA</small>
        </span>
      </a>
      <nav className={'nav-links ' + (open ? 'open' : '')} aria-label="Navegação principal">
        {nav.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <ContactButton className="mobile-contact">
          Agendar visita <ArrowUpRight size={15} />
        </ContactButton>
      </nav>
      <div className="nav-actions">
        <span className="nav-city">
          <span className="online-dot" /> GOIÂNIA · GOIANIRA
        </span>
        <ContactButton className="nav-cta">
          FALE COM THONY <ArrowUpRight size={15} />
        </ContactButton>
        <button
          className="menu-button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

const heroIndex = [
  ['01', 'Busca', '#busca'],
  ['02', '4 Empreendimentos', '#imoveis'],
  ['03', 'Comparativo', '#comparativo'],
  ['04', 'Terreno → casa', '#terreno-ganha-vida'],
  ['05', 'Entre na casa', '#visita-imersiva'],
  ['06', 'Dúvidas', '#duvidas'],
];

function Hero() {
  const photo = useRef(null);
  const [heroSlide, setHeroSlide] = useState(0); // 0 = Hook Pinheiros R$ 654,19 -> fade -> 1 = Seu próximo capítulo tem endereço.

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let timer;
    const scheduleNext = (current) => {
      const delay = current === 0 ? 4500 : 6500;
      timer = setTimeout(() => {
        if (cancelled) return;
        const next = current === 0 ? 1 : 0;
        setHeroSlide(next);
        scheduleNext(next);
      }, delay);
    };
    scheduleNext(0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = photo.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e) => {
      x = (e.clientX / window.innerWidth - 0.5) * -14;
      y = (e.clientY / window.innerHeight - 0.5) * -10;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty('--hx', x.toFixed(1) + 'px');
          el.style.setProperty('--hy', y.toFixed(1) + 'px');
        });
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="inicio">
      <div className="hero-left">
        <div className="hero-grid-line" />
        <div className="hero-serial">
          <span className="tiny-circle" /> PORTFÓLIO SELECIONADO · GOIÂNIA &amp; GOIANIRA{' '}
          <span className="serial-num">04 EMPREENDIMENTOS</span>
        </div>
        <div className="hero-headline">
          <div className="hero-eyebrow-stage">
            <span className={'eyebrow hero-fade-item ' + (heroSlide === 0 ? 'is-active' : '')}>
              <Sparkles size={12} /> DESTAQUE · CONDOMÍNIO HORIZONTAL PINHEIROS
            </span>
            <span
              className={'eyebrow hero-fade-item ' + (heroSlide === 1 ? 'is-active' : '')}
              aria-hidden={heroSlide !== 1}
            >
              CONDOMÍNIOS FECHADOS E LOTEAMENTOS PLANEJADOS
            </span>
          </div>

          <h1 className="hero-title-stage">
            <span className={'hero-title-slide hero-title-pinheiros ' + (heroSlide === 0 ? 'is-active' : '')}>
              <span className="hero-pinheiros-kicker">Condomínio Pinheiros</span>
              <span className="hero-pinheiros-sub">temos parcelas a partir de</span>
              <em className="hero-pinheiros-price">R$ 654,19*</em>
            </span>
            <span
              className={'hero-title-slide ' + (heroSlide === 1 ? 'is-active' : '')}
              aria-hidden={heroSlide !== 1}
            >
              Seu próximo
              <br />
              capítulo <em>tem</em>
              <br />
              <em>endereço.</em>
            </span>
          </h1>
          <p data-reveal="" style={{ '--d': 3 }}>
            Terrenos e condomínios horizontais criteriosamente selecionados ao lado da UFG em
            Goiânia e no eixo de maior valorização da GO-070 em Goianira — com atendimento direto,
            tabela atualizada e visitas acompanhadas.
          </p>
          <div className="hero-actions" data-reveal="" style={{ '--d': 4 }}>
            <a className="button dark-button" href="/empreendimentos/condominio-pinheiros-goianira/">
              CONHECER CONDOMÍNIO PINHEIROS <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="#imoveis">
              Ver os 4 empreendimentos <ArrowRight size={17} />
            </a>
          </div>
          <nav className="hero-index" aria-label="Nesta página" data-reveal="" style={{ '--d': 5 }}>
            <small>NESTA PÁGINA</small>
            {heroIndex.map(([n, l, h]) => (
              <a key={h} href={h}>
                <span>{n}</span>
                {l}
              </a>
            ))}
          </nav>
        </div>
        <div className="hero-bottom-left">
          <span>THONY OLIVEIRA IMÓVEIS · {WHATSAPP_SHOWN}</span>
          <span>
            <ArrowDown size={13} /> ROLE PARA EXPLORAR OS LOTES
          </span>
        </div>
      </div>

      <div className="hero-right">
        <img
          ref={photo}
          className="hero-door"
          src="/empreendimentos/condominio-pinheiros/01-portaria.webp"
          alt="Portaria com segurança 24h do Condomínio Horizontal Pinheiros em Goianira"
          fetchPriority="high"
        />
        <div className="hero-photo-shade" />
        <div className="hero-topmark">
          ★ EM DESTAQUE · GOIANIRA · GO <span>800 M DA GO-070</span>
        </div>
        <a className="hero-image-caption" href="/empreendimentos/condominio-pinheiros-goianira/">
          <span className="image-caption-number">
            01 <i /> 04
          </span>
          <div>
            <span className="hero-loop">DESTAQUE · PARCELAS A PARTIR DE R$ 654,19*</span>
            <strong>Condomínio Pinheiros.</strong>
          </div>
          <span className="square-arrow">
            <ArrowUpRight size={22} />
          </span>
        </a>
        <span className="hero-image-legal">PERSPECTIVA OFICIAL · CONDOMÍNIO PINHEIROS</span>
      </div>
    </section>
  );
}

function Finder({ onApply, filters, setFilters }) {
  const change = (k, v) => setFilters((s) => ({ ...s, [k]: v }));
  const regions = [...new Set(EMPREENDIMENTOS.map((e) => e.regionFilter))];

  return (
    <section className="finder-section" id="busca">
      <div className="finder-heading">
        <div>
          <span className="eyebrow">
            <span className="tiny-circle" /> ENCONTRE O EMPREENDIMENTO IDEAL
          </span>
          <Title>
            Filtre pelo que
            <br />
            <em>faz sentido hoje.</em>
          </Title>
        </div>
        <div className="finder-intro" data-reveal="">
          <p>
            Compare rapidamente loteamentos abertos e condomínios fechados em Goiânia (UFG) e
            Goianira (GO-070) — cada um com página completa, galeria real e atendimento direto.
          </p>
          <span>01 — BUSCA ORIENTADA</span>
        </div>
      </div>

      <div className="search-panel" data-reveal="" style={{ '--d': 1 }}>
        <div className="finder-tabs" role="group" aria-label="Modalidade do empreendimento">
          {['Todos', 'Condomínio Fechado', 'Loteamento Aberto'].map((t) => (
            <button
              key={t}
              type="button"
              className={filters.modality === t ? 'active' : ''}
              onClick={() => change('modality', t)}
            >
              {t}
            </button>
          ))}
        </div>
        <form
          className="finder-form"
          onSubmit={(e) => {
            e.preventDefault();
            onApply();
          }}
        >
          <label>
            <span>REGIÃO</span>
            <div className="select-wrap">
              <MapPin size={19} />
              <select value={filters.region} onChange={(e) => change('region', e.target.value)}>
                <option value="Todas">Goiânia e Goianira</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </div>
          </label>
          <label>
            <span>PERFIL / OBJETIVO</span>
            <div className="select-wrap">
              <Home size={19} />
              <select value={filters.goal} onChange={(e) => change('goal', e.target.value)}>
                <option value="Qualquer">Qualquer perfil</option>
                <option value="Moradia">Moradia familiar</option>
                <option value="Investimento">Investimento e valorização</option>
                <option value="Obras Avançadas">Obras avançadas / entregues</option>
                <option value="Tour 360°">Com Tour Virtual 360°</option>
              </select>
              <ChevronDown size={15} />
            </div>
          </label>
          <label>
            <span>EMPREENDIMENTO</span>
            <div className="select-wrap">
              <Building2 size={19} />
              <select value={filters.selected} onChange={(e) => change('selected', e.target.value)}>
                <option value="Todos">Todos os 4 empreendimentos</option>
                {EMPREENDIMENTOS.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.shortName} ({e.city})
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </div>
          </label>
          <button className="search-submit" type="submit">
            <Search size={20} />
            <span>FILTRAR OPÇÕES</span>
            <ArrowUpRight size={18} />
          </button>
        </form>
      </div>

      <div className="popular-queries" data-reveal="" style={{ '--d': 2 }}>
        <span>ACESSO DIRETO</span>
        {EMPREENDIMENTOS.map((e) => (
          <a key={e.slug} href={`/empreendimentos/${e.slug}/`}>
            {e.shortName}
            <ArrowUpRight size={13} />
          </a>
        ))}
        <a href="/explorar/imoveis-em-goianira/">
          Guia Goianira
          <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  );
}

function Listings({ applied, onReset }) {
  const result = useMemo(
    () =>
      EMPREENDIMENTOS.filter(
        (e) =>
          (applied.modality === 'Todos' || e.modality === applied.modality) &&
          (applied.region === 'Todas' || e.regionFilter === applied.region) &&
          (applied.goal === 'Qualquer' || e.goals.includes(applied.goal)) &&
          (applied.selected === 'Todos' || e.id === applied.selected)
      ),
    [applied]
  );

  return (
    <section className="listings-section" id="imoveis">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="tiny-circle" /> PORTFÓLIO OFICIAL EM COMERCIALIZAÇÃO
          </span>
          <Title>
            Quatro endereços
            <br />
            <em>com propósito.</em>
          </Title>
        </div>
        <div className="section-heading-right" data-reveal="">
          <p>
            Clique em qualquer empreendimento para ver a galeria completa, o mapa de implantação,
            os tempos de deslocamento e o registro em cartório.
          </p>
          <span className="listings-count">
            {result.length} DE {EMPREENDIMENTOS.length} EMPREENDIMENTOS SELECIONADOS
          </span>
        </div>
      </div>

      {result.length === 0 ? (
        <div className="empty-results">
          <SlidersHorizontal size={24} />
          <h3>Nenhum empreendimento nessa combinação exata</h3>
          <p>
            Limpe os filtros para ver os 4 empreendimentos disponíveis em Goiânia e Goianira ou fale
            com Thony para buscar um perfil sob medida.
          </p>
          <button className="button dark-button" onClick={onReset}>
            MOSTRAR OS 4 EMPREENDIMENTOS <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <>
          <div className="dev-grid">
            {result.map((e, idx) => (
              <article className="dev-card" key={e.id} data-reveal="" style={{ '--d': idx % 2 }}>
                <a
                  className="dev-media"
                  href={`/empreendimentos/${e.slug}/`}
                  aria-label={`Ver detalhes de ${e.name}`}
                >
                  <img src={e.cover} alt={e.coverAlt} loading={idx < 2 ? 'eager' : 'lazy'} />
                  <span className="dev-badge">{e.badge}</span>
                  {e.tour360Url && (
                    <span className="dev-tour-pill">
                      <Eye size={13} /> TOUR 360°
                    </span>
                  )}
                  <span className="property-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </a>

                <div className="dev-content">
                  <div className="property-meta">
                    <span>
                      <MapPin size={14} /> {e.region.toUpperCase()}
                    </span>
                    <span>{e.modality.toUpperCase()}</span>
                  </div>

                  <h3>
                    <a href={`/empreendimentos/${e.slug}/`}>{e.name}</a>
                  </h3>
                  <p className="dev-desc">{e.shortDescription}</p>
                  <p className="dev-dev">Realização: {e.developers}</p>

                  <div className="dev-specs">
                    {e.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <span>{m.label}</span>
                        <strong>{m.value}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="dev-price-bar">
                    <div>
                      <small>CONDIÇÃO DE REFERÊNCIA</small>
                      <strong>{e.priceHighlight}</strong>
                    </div>
                    <span className="dev-price-sub">{e.usage}</span>
                  </div>

                  <div className="dev-actions">
                    <a className="dev-btn-primary" href={`/empreendimentos/${e.slug}/`}>
                      VER EMPREENDIMENTO <ArrowUpRight size={16} />
                    </a>
                    <ContactButton className="dev-btn-wa" message={e.whatsappMessage}>
                      TABELA NO WHATSAPP <ArrowUpRight size={15} />
                    </ContactButton>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="dev-legal-note">
            <ShieldCheck size={15} />
            <span>
              *Valores e parcelas referenciais extraídos das tabelas e lâminas comerciais oficiais
              das incorporadoras (sujeitos a alteração e disponibilidade de unidade). Confirme a
              tabela vigente diretamente no atendimento pelo WhatsApp {WHATSAPP_SHOWN}.
            </span>
          </p>
        </>
      )}
    </section>
  );
}

function CompareSection() {
  return (
    <section className="compare-section" id="comparativo">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="tiny-circle" /> DECISÃO COM CLAREZA
          </span>
          <Title>
            Qual combina com
            <br />
            <em>o seu momento?</em>
          </Title>
        </div>
        <div className="section-heading-right" data-reveal="">
          <p>
            Cada um dos 4 empreendimentos atende a uma prioridade diferente — capital ao lado da
            UFG, parcela acessível com obras entregues, clube completo ou exclusividade com lago.
          </p>
          <span className="listings-count">COMPARATIVO LADO A LADO</span>
        </div>
      </div>

      <div className="compare-wrap" data-reveal="">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Empreendimento</th>
              <th>Região</th>
              <th>Modalidade</th>
              <th>Lotes e Metragem</th>
              <th>Grande Diferencial</th>
              <th>Referência</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {EMPREENDIMENTOS.map((e) => (
              <tr key={e.id}>
                <td>
                  <a className="compare-name" href={`/empreendimentos/${e.slug}/`}>
                    <strong>{e.shortName}</strong>
                    <small>{e.developers}</small>
                  </a>
                </td>
                <td>{e.region}</td>
                <td>
                  <span className="compare-pill">{e.modality}</span>
                </td>
                <td>
                  <b>{e.compare.lotes}</b>
                  <small>{e.compare.metragem}</small>
                </td>
                <td>{e.compare.diferencial}</td>
                <td className="compare-price">{e.compare.condicao}</td>
                <td>
                  <a className="compare-link" href={`/empreendimentos/${e.slug}/`}>
                    Ver página <ArrowUpRight size={14} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="compare-cta-row" data-reveal="">
        <span>
          <Sparkles size={16} /> Em dúvida entre dois empreendimentos? Envie seu orçamento ou
          objetivo e receba uma comparação personalizada.
        </span>
        <ContactButton
          className="button dark-button"
          message="Olá, Thony! Vi o comparativo dos 4 empreendimentos no site e quero ajuda para escolher o melhor lote para o meu perfil."
        >
          COMPARAR COM THONY NO WHATSAPP <ArrowUpRight size={17} />
        </ContactButton>
      </div>
    </section>
  );
}

function Categories() {
  const regions = [
    ['01', 'Região Norte · UFG (Goiânia)', '/explorar/terrenos-perto-ufg-goiania/'],
    ['02', 'Goianira · Eixo GO-070', '/explorar/imoveis-em-goianira/'],
    ['03', 'Condomínios Fechados em Goianira', '/explorar/condominio-fechado-goianira/'],
    ['04', 'Lotes e Terrenos em Goiânia', '/explorar/terrenos-a-venda-em-goiania/'],
    ['05', 'Setor Bueno, Marista e Jardim Goiás', '/explorar/imoveis-em-goiania/'],
  ];

  return (
    <section className="categories-section" id="bairros">
      <div className="categories-intro">
        <span className="eyebrow light">
          <span className="tiny-circle" /> EXPANSÃO URBANA EM GOIÁS
        </span>
        <Title>
          Goiânia e Goianira
          <br />
          <em>em plena valorização.</em>
        </Title>
        <p>
          Do adensamento universitário no entorno da UFG ao corredor da GO-070 — que concentra os
          condomínios horizontais e loteamentos de maior crescimento da Região Metropolitana.
        </p>
        <a href="/explorar/imoveis-em-goianira/" className="inline-light">
          EXPLORAR GUIA DE GOIANIRA <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="categories-list">
        {regions.map(([id, name, href]) => (
          <a key={id} href={href} data-reveal="" style={{ '--d': Number(id) }}>
            <span>{id}</span>
            <strong>{name}</strong>
            <ArrowUpRight size={22} />
          </a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="sobre">
      <div className="about-photo">
        <img
          loading="lazy"
          src="/empreendimentos/condominio-pinheiros/02-lago-pista.webp"
          alt="Lago e pista de caminhada do Condomínio Horizontal Pinheiros em Goianira"
        />
        <div className="about-photo-caption">
          ATENDIMENTO CONSULTIVO <span>GOIÂNIA &amp; GOIANIRA · GO</span>
        </div>
      </div>
      <div className="about-copy" data-reveal="">
        <span className="eyebrow">
          <span className="tiny-circle" /> SOBRE THONY OLIVEIRA IMÓVEIS
        </span>
        <Title>
          Clareza técnica.
          <br />
          <em>Decisão segura.</em>
        </Title>
        <p>
          Escolher um terreno para construir ou investir vai muito além da metragem. Envolve
          analisar documentação registrada em cartório, estágio real das obras, vetor de
          crescimento da região e fluxo de pagamento que caiba com tranquilidade no seu plano.
        </p>
        <p>
          Com a Thony Oliveira Imóveis, você compara empreendimentos selecionados em Goiânia e
          Goianira com transparência, recebe o book digital e a tabela atualizada direto no WhatsApp
          e agenda sua visita presencial com acompanhamento completo.
        </p>
        <ul className="about-pillars">
          <li>
            <CheckCircle2 size={16} /> Empreendimentos com aprovação municipal e registro verificável
          </li>
          <li>
            <CheckCircle2 size={16} /> Envio imediato de espelho de lotes, book digital e simulação
          </li>
          <li>
            <CheckCircle2 size={16} /> Visita presencial guiada aos terrenos em Goiânia e Goianira
          </li>
        </ul>
        <ContactButton className="button dark-button">
          CONVERSAR COM THONY NO WHATSAPP <ArrowUpRight size={18} />
        </ContactButton>
        <div className="about-footer">
          <span>ATENDIMENTO EM GOIÂNIA E REGIÃO METROPOLITANA</span>
          <Compass size={22} />
        </div>
      </div>
    </section>
  );
}

function KeywordDirectory() {
  return (
    <section className="keyword-section" id="explorar">
      <div className="keyword-intro">
        <span className="eyebrow">
          <span className="tiny-circle" /> GUIAS E EMPREENDIMENTOS
        </span>
        <Title>
          Seu caminho
          <br />
          <em>começa na busca.</em>
        </Title>
        <p>
          Acesse diretamente a página de cada empreendimento ou navegue pelos guias regionais por
          tipo de imóvel, modalidade e localização.
        </p>
      </div>
      <div className="keyword-columns">
        {keywordGroups.map((g) => (
          <div className="keyword-group" key={g.title} data-reveal="">
            <h3>{g.title}</h3>
            {g.links.map(([title, href]) => (
              <a key={href} href={href}>
                {title}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    [
      'Qual a diferença entre loteamento aberto e condomínio fechado?',
      'No loteamento aberto (como Parque Universitário e Residencial Flora Nogueira) não há taxa mensal de condomínio e há maior flexibilidade de uso, inclusive lotes comerciais no Parque Universitário. Já no condomínio fechado de acesso controlado (como Terraví Ipês e Condomínio Pinheiros) você conta com portaria 24h, perímetro fechado e clube privativo completo mantido pela associação de moradores.',
    ],
    [
      'Os empreendimentos anunciados têm documentação e registro em cartório?',
      'Sim. Nas páginas dedicadas você encontra a ficha jurídica de cada empreendimento, incluindo incorporadora, decretos municipais e matrícula no Cartório de Registro de Imóveis (como R-4 50.510 no Terraví Ipês, R-5 45.383 no Pinheiros e R-4 50.000 no Flora Nogueira).',
    ],
    [
      'Como recebo a tabela de preços atualizada, o Book Digital e os lotes disponíveis?',
      'Basta clicar em qualquer botão de WhatsApp (62) 98529-2886. Como o espelho de vendas e as tabelas promocionais mudam conforme a disponibilidade de unidades, o Thony envia na hora o PDF completo, o mapa de lotes livres e simulações personalizadas.',
    ],
    [
      'É possível financiar direto com a loteadora sem financiamento bancário?',
      'Sim. Os empreendimentos trabalham com entrada facilitada e parcelamento direto com a incorporadora/urbanizadora (planos curtos, fixos ou longos com correção anual pelo IPCA, conforme tabela vigente de cada empreendimento).',
    ],
    [
      'As experiências interativas de construção e visita por rolagem são de um lote específico?',
      'Não. As seções "Do Terreno ao Lar" e "Visita Imersiva" são experiências visuais ilustrativas criadas para ajudar você a imaginar sua futura casa. Já todas as fotos e fichas dos 4 empreendimentos (Parque Universitário, Terraví Ipês, Pinheiros e Flora Nogueira) são materiais oficiais de cada projeto.',
    ],
  ];

  return (
    <section className="faq-section" id="duvidas">
      <div>
        <span className="eyebrow">
          <span className="tiny-circle" /> VOCÊ PERGUNTA, A GENTE EXPLICA
        </span>
        <Title>
          Dúvidas que
          <br />
          <em>abrem portas.</em>
        </Title>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <details key={q} data-reveal="" style={{ '--d': i }}>
            <summary>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <b>{q}</b>
              <span className="faq-plus">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="footer-top">
        <span className="eyebrow light">
          <span className="tiny-circle" /> CADA NOVA HISTÓRIA COMEÇA COM UM OLÁ
        </span>
        <Title>
          Vamos encontrar
          <br />
          <em>o seu terreno?</em>
        </Title>
        <ContactButton className="footer-cta">
          AGENDAR VISITA PELO WHATSAPP <ArrowUpRight size={24} />
        </ContactButton>
      </div>

      <div className="footer-mid">
        <a className="footer-brand" href="/">
          <strong>
            THONY
            <br />
            OLIVEIRA.
          </strong>
          <span>IMÓVEIS &amp; NOVOS COMEÇOS</span>
        </a>
        <div>
          <span>EMPREENDIMENTOS</span>
          {EMPREENDIMENTOS.map((e) => (
            <a key={e.slug} href={`/empreendimentos/${e.slug}/`}>
              {e.shortName}
            </a>
          ))}
        </div>
        <div>
          <span>GUIAS REGIONAIS · GOIÁS</span>
          <a href="/explorar/imoveis-em-goias/">Imóveis em Goiás</a>
          <a href="/explorar/regiao-metropolitana-de-goiania/">Região Metropolitana</a>
          <a href="/explorar/lotes-regiao-norte-goiania/">Região Norte · UFG</a>
          <a href="/explorar/imoveis-eixo-go-070/">Eixo GO-070 · Goianira</a>
          <a href="/explorar/investir-em-terrenos-goiania-goias/">Investir em Terrenos</a>
        </div>
        <div>
          <span>ATENDIMENTO &amp; LEGAL</span>
          <p>Av. Nossa Senhora das Graças, Qd 11 Lt 25 · Res. Monte Pascoal 2, Goiânia – GO</p>
          <ContactButton>WhatsApp {WHATSAPP_SHOWN} ↗</ContactButton>
          <a href="/?popup=1#receber-imoveis">Receber Imóveis por E-mail</a>
          <a href="/privacidade/">Política de Privacidade (LGPD)</a>
          <a href="/termos/">Termos de Uso</a>
          <a href="/cookies/">Política de Cookies</a>
          <a href="/descadastrar/">Cancelar Inscrição (E-mail)</a>
          {creci && <p>CRECI {creci}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} THONY OLIVEIRA IMÓVEIS · GOIÂNIA &amp; GOIANIRA</span>
        <span>
          <a href="/privacidade/" style={{ color: 'inherit', marginRight: 14 }}>PRIVACIDADE</a>
          <a href="/termos/" style={{ color: 'inherit', marginRight: 14 }}>TERMOS</a>
          <a href="/cookies/" style={{ color: 'inherit', marginRight: 14 }}>COOKIES</a>
          <a href="/descadastrar/" style={{ color: 'inherit' }}>DESCADASTRAR</a>
        </span>
        <a href="#inicio">VOLTAR AO INÍCIO ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const initial = { modality: 'Todos', region: 'Todas', goal: 'Qualquer', selected: 'Todos' };
  const [filters, setFilters] = useState(initial);
  const [applied, setApplied] = useState(initial);

  const apply = () => {
    setApplied({ ...filters });
    document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' });
  };

  const reset = () => {
    setFilters(initial);
    setApplied(initial);
    document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' });
  };

  useReveal();
  const current = useCurrentSection();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto' });
      });
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <Header />
      <SectionRail current={current} />
      <main>
        <Hero />
        <Finder onApply={apply} filters={filters} setFilters={setFilters} />
        <Listings applied={applied} onReset={reset} />
        <CompareSection />
        <Teaser
          tone="light"
          img="/experience/build/stills/b0-960.webp"
          kicker="EXPERIÊNCIA INTERATIVA · DO TERRENO À CASA"
          text="Role a página e veja um terreno virar uma casa de dois andares."
          href="#terreno-ganha-vida"
        />
        <HouseBuild />
        <Teaser
          tone="dark"
          img="/experience/tour/stills/t0-960.webp"
          kicker="EXPERIÊNCIA INTERATIVA · VISITA IMERSIVA"
          text="Atravesse a porta, caminhe por cada cômodo e saia pelo jardim."
          href="#visita-imersiva"
        />
        <HouseTour />
        <Categories />
        <About />
        <KeywordDirectory />
        <FAQ />
      </main>
      <Footer />
      <LeadPopup />
      <WhatsAppFloat
        current={current}
        href={waLink(
          'Olá, Thony! Vim pelo site e quero conhecer os empreendimentos disponíveis em Goiânia e Goianira.',
          wa
        )}
        number={WHATSAPP_SHOWN}
      />
    </>
  );
}
