import fs from 'node:fs';
import path from 'node:path';
import {
  EMPREENDIMENTOS,
  WHATSAPP_DEFAULT,
  WHATSAPP_SHOWN,
  waLink,
} from '../src/data/empreendimentos.js';

const WA = (process.env.VITE_WHATSAPP_NUMBER || WHATSAPP_DEFAULT).replace(/\D/g, '');
const CRECI = (process.env.VITE_CRECI || '').trim();
const output = 'dist';
const site = (process.env.SITE_URL || 'https://thonyoliveiraimoveis.online').replace(
  /\/$/,
  ''
);
const active = process.env.VITE_DEMO_MODE !== 'true';
const UPDATED_ISO = '2026-11-21';
const UPDATED_LABEL = '21/11/2026';

const SPLASH_STYLE = `<style id="thony-splash-style">#thony-splash{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:28px;background:radial-gradient(circle at 50% 34%,#1d4337 0%,#132c24 58%,#0c1f19 100%);color:#f7f5ef;overflow:hidden;transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),visibility .65s}#thony-splash::before{content:'';position:absolute;inset:18px;border:1px solid rgba(227,188,136,.16);pointer-events:none}#thony-splash.is-leaving{opacity:0;transform:scale(1.018);visibility:hidden;pointer-events:none}.ts-inner{position:relative;z-index:2;max-width:740px;width:100%;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;animation:tsRise .65s cubic-bezier(.22,1,.36,1) both}.ts-brand{display:inline-flex;align-items:center;gap:14px}.ts-mark{width:44px;height:44px;display:grid;place-items:center;border:1px solid rgba(227,188,136,.42);background:rgba(247,245,239,.04);color:#f1dbb5;font-family:'Playfair Display',Georgia,serif;font-size:20px;letter-spacing:-.14em;border-radius:2px}.ts-brand-text{text-align:left;display:flex;flex-direction:column;gap:3px}.ts-brand-text b{font-family:'Manrope',-apple-system,sans-serif;font-size:12px;letter-spacing:.26em;font-weight:800;color:#f7f5ef}.ts-brand-text small{font-family:'DM Sans',-apple-system,sans-serif;font-size:9px;letter-spacing:.24em;font-weight:700;color:#d6b58b}.ts-hook{margin:4px 0 0;font-family:'Manrope',-apple-system,sans-serif;font-size:clamp(28px,4.6vw,54px);line-height:1.12;letter-spacing:-.045em;font-weight:500;color:#f7f5ef}.ts-hook em{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:400;color:#e3bc88;letter-spacing:-.02em}.ts-sub{margin:0;max-width:460px;font-family:'DM Sans',-apple-system,sans-serif;font-size:13px;line-height:1.7;color:rgba(241,237,226,.76)}.ts-divider{width:44px;height:1px;background:rgba(227,188,136,.45)}.ts-signature{font-family:'Manrope',-apple-system,sans-serif;font-size:10px;letter-spacing:.28em;font-weight:800;color:#e3bc88;text-transform:uppercase}.ts-bar{width:130px;height:1.5px;background:rgba(247,245,239,.14);overflow:hidden;border-radius:2px}.ts-bar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#b58a5f,#f1dbb5);transform-origin:left center;animation:tsLoad 1.1s cubic-bezier(.22,1,.36,1) forwards}@keyframes tsRise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes tsLoad{from{transform:scaleX(0)}to{transform:scaleX(1)}}@media(max-width:600px){#thony-splash::before{inset:12px}}@media(prefers-reduced-motion:reduce){.ts-inner,.ts-bar i{animation:none}}</style>`;

const SPLASH_BODY = `<div id="thony-splash" role="status" aria-live="polite"><div class="ts-inner"><div class="ts-brand"><span class="ts-mark">T·O</span><span class="ts-brand-text"><b>THONY OLIVEIRA</b><small>IMÓVEIS · GOIÂNIA &amp; GOIÁS</small></span></div><p class="ts-hook" id="thony-splash-hook">Onde o sonho da sua família <em>ganha endereço.</em></p><p class="ts-sub">Terrenos e condomínios selecionados para construir patrimônio, liberdade e grandes histórias em Goiás.</p><span class="ts-divider"></span><span class="ts-signature">Thony Oliveira · Consultoria Imobiliária</span><span class="ts-bar"><i></i></span></div></div><script>(function(){try{var h=['Onde o sonho da sua família <em>ganha endereço.</em>','O terreno certo hoje é a história que sua família <em>vai viver amanhã.</em>','Mais que um lote — o cenário dos seus <em>próximos grandes capítulos.</em>'];var i=Number(sessionStorage.getItem('thony_splash_idx')||'0');var e=document.getElementById('thony-splash-hook');if(e)e.innerHTML=h[i%h.length];sessionStorage.setItem('thony_splash_idx',String((i+1)%h.length));}catch(x){}var s=document.getElementById('thony-splash');if(!s)return;var d=(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)?180:1100;var t0=Date.now(),done=false;function go(){if(done)return;done=true;setTimeout(function(){s.classList.add('is-leaving');setTimeout(function(){if(s&&s.parentNode)s.parentNode.removeChild(s);},700);},Math.max(0,d-(Date.now()-t0)));}if(document.readyState==='complete')go();else window.addEventListener('load',go,{once:true});setTimeout(go,2000);})();</script>`;

const GOIAS_CITIES = [
  'Goiânia',
  'Goianira',
  'Aparecida de Goiânia',
  'Trindade',
  'Senador Canedo',
  'Inhumas',
  'Santo Antônio de Goiás',
  'Nerópolis',
  'Anápolis',
  'Hidrolândia',
  'Bela Vista de Goiás',
  'Abadia de Goiás',
  'Aragoiânia',
  'Brazabrantes',
  'Caturaí',
  'Guapó',
  'Bonfinópolis',
  'Goianápolis',
];

const AREA_SERVED_SCHEMA = [
  { '@type': 'State', name: 'Goiás', sameAs: 'https://pt.wikipedia.org/wiki/Goi%C3%A1s' },
  ...GOIAS_CITIES.map((city) => ({
    '@type': 'City',
    name: `${city}, GO`,
  })),
];

const PROVIDER_SCHEMA = {
  '@type': 'RealEstateAgent',
  '@id': `${site}/#organization`,
  name: 'Thony Oliveira Imóveis',
  url: `${site}/`,
  telephone: `+${WA}`,
  image: `${site}/empreendimentos/parque-universitario/01-aerea-ufg.webp`,
  priceRange: 'R$ 481/mês – R$ 990/m²',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenida Nossa Senhora das Graças, Qd 11 Lote 25, Residencial Monte Pascoal 2',
    addressLocality: 'Goiânia',
    addressRegion: 'GO',
    postalCode: '74494-564',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -16.6869,
    longitude: -49.2648,
  },
  areaServed: AREA_SERVED_SCHEMA,
  knowsAbout: [
    'Loteamentos planejados em Goiânia',
    'Condomínios horizontais fechados em Goianira e Goiás',
    'Terrenos ao lado da UFG Campus Samambaia',
    'Imóveis no eixo GO-070 e Região Metropolitana de Goiânia',
    'Parcelamento direto de lotes com urbanizadora em Goiás',
  ],
};

const AUTHOR_SCHEMA = {
  '@type': 'Person',
  name: 'Thony Oliveira',
  jobTitle: 'Consultor Imobiliário — Loteamentos e Condomínios em Goiás',
  worksFor: { '@id': `${site}/#organization` },
};

const WA_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

const escapeHtml = (t) =>
  String(t)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

// 1) Atualiza dist/index.html com robots, canonical, JSON-LD completo (SEO + GEO) e fallback semântico real
const homeFile = path.join(output, 'index.html');
if (fs.existsSync(homeFile)) {
  let homeHtml = fs.readFileSync(homeFile, 'utf8');
  if (active) {
    homeHtml = homeHtml.replace('content="noindex,nofollow"', 'content="index,follow,max-image-preview:large,max-snippet:-1"');
  } else {
    homeHtml = homeHtml.replace(/content="index,follow[^"]*"/, 'content="noindex,nofollow"');
  }

  const homeSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      PROVIDER_SCHEMA,
      {
        '@type': 'WebSite',
        '@id': `${site}/#website`,
        url: `${site}/`,
        name: 'Thony Oliveira Imóveis',
        inLanguage: 'pt-BR',
        publisher: { '@id': `${site}/#organization` },
        datePublished: '2026-11-20',
        dateModified: UPDATED_ISO,
      },
      {
        '@type': 'ItemList',
        name: 'Empreendimentos imobiliários em Goiânia e Goianira — Thony Oliveira Imóveis',
        itemListElement: EMPREENDIMENTOS.map((e, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: e.name,
          url: `${site}/empreendimentos/${e.slug}/`,
          image: `${site}${e.cover}`,
          description: e.seoDescription,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quais regiões de Goiás a Thony Oliveira Imóveis atende?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Atendemos Goiânia (com destaque para a Região Norte ao lado da UFG), Goianira (eixo da GO-070) e toda a Região Metropolitana de Goiânia e Estado de Goiás — incluindo Aparecida de Goiânia, Trindade, Senador Canedo, Inhumas, Santo Antônio de Goiás, Nerópolis e Anápolis.',
            },
          },
          {
            '@type': 'Question',
            name: 'Qual a diferença entre loteamento aberto e condomínio fechado em Goiânia e Goianira?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No loteamento aberto (como Residencial Parque Universitário e Residencial Flora Nogueira) não há taxa mensal de condomínio e há maior liberdade construtiva, incluindo lotes comerciais no Parque Universitário. Já no condomínio horizontal fechado (como Terraví Ipês e Condomínio Pinheiros) há portaria 24h, perímetro fechado e clube privativo completo.',
            },
          },
          {
            '@type': 'Question',
            name: 'Os empreendimentos anunciados têm registro em cartório?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sim. Todos os projetos publicados trazem ficha jurídica verificável, como Decreto 170/2025 e Matrícula 50.510 (R-4) no Terraví Ipês, Decretos 122 e 148/2025 e Matrícula 45.383 (R-5) no Condomínio Pinheiros e Decretos 118 e 147/2025 e Matrícula 50.000 (R-4) no Flora Nogueira.',
            },
          },
          {
            '@type': 'Question',
            name: 'É possível comprar lote com parcelamento direto com a urbanizadora em Goiás?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sim. Os 4 empreendimentos oferecem entrada facilitada e parcelamento direto com a loteadora/incorporadora sem burocracia bancária, com referência de parcelas a partir de R$ 481,76 no Flora Nogueira, R$ 654,19 no Condomínio Pinheiros, R$ 697,76 no Terraví Ipês e lotes a partir de R$ 990/m² no Parque Universitário (sujeito a tabela vigente).',
            },
          },
        ],
      },
    ],
  });

  const headInject =
    (site.startsWith('https://') && site !== 'https://example.com'
      ? `<link rel="canonical" href="${site}/"><link rel="alternate" type="text/plain" title="LLMs.txt" href="${site}/llms.txt">`
      : '') + `<script type="application/ld+json">${homeSchema}</script>`;

  homeHtml = homeHtml.replace('</head>', `${headInject}</head>`);

  const devRowsHtml = EMPREENDIMENTOS.map(
    (e) =>
      `<tr><td><a href="/empreendimentos/${e.slug}/">${escapeHtml(e.name)}</a></td><td>${escapeHtml(e.region)}</td><td>${escapeHtml(e.modality)}</td><td>${escapeHtml(e.compare.lotes)} (${escapeHtml(e.compare.metragem)})</td><td>${escapeHtml(e.priceHighlight)}</td></tr>`
  ).join('');

  homeHtml = homeHtml.replace(
    '<div id="root"></div>',
    `<div id="root"><main><section><h1>Thony Oliveira Imóveis: Lotes, Terrenos e Condomínios em Goiânia, Goianira e Goiás</h1><p>Atendimento imobiliário consultivo em Goiânia (Região Norte, ao lado da UFG), Goianira (eixo GO-070), Região Metropolitana de Goiânia e Goiás. Curadoria: Thony Oliveira · Atualizado em <time datetime="${UPDATED_ISO}">${UPDATED_LABEL}</time> · WhatsApp ${WHATSAPP_SHOWN}.</p><h2>Comparativo oficial dos 4 empreendimentos disponíveis</h2><table><thead><tr><th>Empreendimento</th><th>Região</th><th>Modalidade</th><th>Lotes e Metragem</th><th>Condição Referencial</th></tr></thead><tbody>${devRowsHtml}</tbody></table><h2>Guias regionais de imóveis em Goiás</h2><ul><li><a href="/explorar/imoveis-em-goias/">Imóveis e lotes em Goiás</a></li><li><a href="/explorar/regiao-metropolitana-de-goiania/">Região Metropolitana de Goiânia</a></li><li><a href="/explorar/imoveis-em-goianira/">Imóveis em Goianira (GO-070)</a></li><li><a href="/explorar/lotes-regiao-norte-goiania/">Região Norte de Goiânia e UFG</a></li><li><a href="/explorar/investir-em-terrenos-goiania-goias/">Como investir em terrenos em Goiás</a></li></ul></section></main></div>`
  );
  fs.writeFileSync(homeFile, homeHtml);
}

// 2) Gera as 4 páginas estáticas dedicadas dos empreendimentos reais
function renderEmpreendimentoPage(e) {
  const url = `/empreendimentos/${e.slug}/`;
  const fullUrl = `${site}${url}`;
  const robots = active ? 'index,follow,max-image-preview:large,max-snippet:-1' : 'noindex,nofollow';
  const canonical =
    site && site !== 'https://example.com' ? `<link rel="canonical" href="${fullUrl}">` : '';
  const waMain = waLink(e.whatsappMessage, WA);
  const waBook = waLink(e.bookWhatsappMessage, WA);
  const others = EMPREENDIMENTOS.filter((x) => x.id !== e.id);
  const geoCoords =
    e.city === 'Goiânia'
      ? { lat: -16.6038, lng: -49.2665 }
      : { lat: -16.4961, lng: -49.4264 };

  const schemaGraph = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Empreendimentos em Goiás', item: `${site}/#imoveis` },
          { '@type': 'ListItem', position: 3, name: e.name, item: fullUrl },
        ],
      },
      {
        '@type': 'RealEstateListing',
        name: e.name,
        description: e.seoDescription,
        url: fullUrl,
        datePosted: '2026-11-20',
        image: `${site}${e.cover}`,
        areaServed: `${e.city}, Região Metropolitana de Goiânia, Goiás, Brasil`,
        contentLocation: {
          '@type': 'Place',
          name: `${e.name} — ${e.city}, GO`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: e.city,
            addressRegion: 'GO',
            addressCountry: 'BR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: geoCoords.lat,
            longitude: geoCoords.lng,
          },
        },
        provider: PROVIDER_SCHEMA,
      },
      {
        '@type': 'Article',
        headline: e.seoTitle,
        description: e.seoDescription,
        image: `${site}${e.cover}`,
        datePublished: '2026-11-20',
        dateModified: UPDATED_ISO,
        inLanguage: 'pt-BR',
        author: AUTHOR_SCHEMA,
        publisher: { '@id': `${site}/#organization` },
        mainEntityOfPage: fullUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: e.faqs.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  });

  const lightboxItems = [
    ...e.gallery,
    {
      src: e.implantationImage,
      title: `Mapa de Implantação — ${e.shortName}`,
      caption: e.implantationNote,
    },
  ];

  const tourSection = e.tour360Url
    ? `<section class="section section-alt" id="tour-360">
  <span class="eyebrow">EXPERIÊNCIA INTERATIVA OFICIAL</span>
  <h2>Faça o <em>Tour Virtual 360°</em> agora.</h2>
  <div class="tour360-box">
    <div>
      <p style="font-size:15px;line-height:1.9;color:#4f5f54;margin-bottom:20px;">Explore em 360 graus a portaria inteligente, o parque aquático com borda infinita e os espaços de lazer do <strong>${escapeHtml(e.name)}</strong> diretamente no navegador, sem sair de casa.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a class="btn-secondary" href="${escapeHtml(e.tour360Url)}" target="_blank" rel="noopener noreferrer">ABRIR TOUR EM TELA CHEIA ↗</a>
        <a class="btn-outline" href="${waMain}" target="_blank" rel="noopener noreferrer">AGENDAR VISITA PRESENCIAL</a>
      </div>
    </div>
    <div class="tour360-stage" id="tour360Stage" data-url="${escapeHtml(e.tour360Url)}">
      <img src="${e.cover}" alt="Prévia do Tour Virtual 360° do ${escapeHtml(e.name)}" loading="lazy" />
      <div class="tour360-overlay">
        <span style="font-size:10px;letter-spacing:.2em;font-weight:800;color:#e3bc88;">TOUR VIRTUAL INTERATIVO 360°</span>
        <button type="button" id="loadTour360Btn">INICIAR TOUR 360° AQUI ↗</button>
      </div>
    </div>
  </div>
</section>`
    : '';

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#17382e">
<meta name="robots" content="${robots}">
<meta name="author" content="Thony Oliveira Imóveis">
<meta name="geo.region" content="BR-GO">
<meta name="geo.placename" content="${escapeHtml(e.city)}, Goiás">
<meta name="geo.position" content="${geoCoords.lat};${geoCoords.lng}">
<title>${escapeHtml(e.seoTitle)} | Thony Oliveira Imóveis</title>
<meta name="description" content="${escapeHtml(e.seoDescription)}">
${canonical}
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Thony Oliveira Imóveis">
<meta property="og:url" content="${fullUrl}">
<meta property="og:title" content="${escapeHtml(e.seoTitle)} | Thony Oliveira Imóveis">
<meta property="og:description" content="${escapeHtml(e.seoDescription)}">
<meta property="og:image" content="${site}${e.cover}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(e.seoTitle)} | Thony Oliveira Imóveis">
<meta name="twitter:description" content="${escapeHtml(e.seoDescription)}">
<meta name="twitter:image" content="${site}${e.cover}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/empreendimento.css">
${SPLASH_STYLE}
<script type="application/ld+json">${schemaGraph}</script>
</head>
<body>
${SPLASH_BODY}
<header class="site-header">
  <a href="/" class="brand"><span class="badge">T·O</span><span><b>THONY OLIVEIRA</b><small>IMÓVEIS · GOIÂNIA &amp; GOIANIRA</small></span></a>
  <nav class="site-nav" aria-label="Navegação do empreendimento">
    <a href="/">Início</a>
    <a href="#galeria">Galeria</a>
    <a href="#implantacao">Implantação</a>
    <a href="#lazer">Lazer e Localização</a>
    <a href="#juridico">Documentação</a>
    <a href="${waMain}" class="nav-contact" target="_blank" rel="noopener noreferrer">WHATSAPP ${WHATSAPP_SHOWN} ↗</a>
  </nav>
</header>

<main>
  <section class="dev-hero">
    <div class="dev-hero-copy">
      <p class="breadcrumbs"><a href="/">Início</a> / <a href="/#imoveis">Empreendimentos</a> / ${escapeHtml(e.shortName)}</p>
      <span class="eyebrow">${escapeHtml(e.badge)} · ${escapeHtml(e.modality)}</span>
      <h1>${escapeHtml(e.name)}</h1>
      <p class="dev-hero-tagline">${escapeHtml(e.tagline)}</p>
      <p class="dev-hero-loc">${escapeHtml(e.locationLine)} · Realização: ${escapeHtml(e.developers)}</p>

      <div class="hero-metrics">
        ${e.metrics
          .map(
            (m) =>
              `<div><span>${escapeHtml(m.label)}</span><strong>${escapeHtml(m.value)}</strong><small>${escapeHtml(m.sub)}</small></div>`
          )
          .join('')}
      </div>

      <div class="hero-price-box">
        <div>
          <small>CONDIÇÃO COMERCIAL DE REFERÊNCIA</small>
          <strong>${escapeHtml(e.priceHighlight)}</strong>
          <p>${escapeHtml(e.priceDetail)}</p>
        </div>
      </div>

      <div class="hero-ctas">
        <a class="btn-primary" href="${waMain}" target="_blank" rel="noopener noreferrer">RECEBER TABELA E AGENDAR VISITA ↗</a>
        ${
          e.tour360Url
            ? `<a class="btn-secondary" href="#tour-360">VER TOUR VIRTUAL 360° ↓</a>`
            : `<a class="btn-secondary" href="#galeria">VER GALERIA DE FOTOS ↓</a>`
        }
      </div>
      <p class="hero-legal-mini">${escapeHtml(e.priceLegal)}</p>
    </div>

    <div class="dev-hero-media">
      <img src="${e.cover}" alt="${escapeHtml(e.coverAlt)}" fetchpriority="high">
      <span>MATERIAL OFICIAL · ${escapeHtml(e.shortName.toUpperCase())}</span>
    </div>
  </section>

  <section class="section">
    <div class="overview-grid">
      <div class="overview-copy">
        <span class="eyebrow">SOBRE O EMPREENDIMENTO</span>
        <h2>Por que escolher o <em>${escapeHtml(e.shortName)}.</em></h2>
        <div style="margin:18px 0 22px;padding:18px 20px;background:#f3f1e9;border-left:4px solid #b58a5f;">
          <strong style="display:block;font-size:10px;letter-spacing:.16em;color:#9f734b;margin-bottom:6px;">RESUMO DIRETO · DADOS OFICIAIS</strong>
          <p style="margin:0;font-size:14px;line-height:1.8;color:#17382e;">O <strong>${escapeHtml(e.name)}</strong> é um ${escapeHtml(e.modality.toLowerCase())} em <strong>${escapeHtml(e.city)} (GO)</strong> realizado por ${escapeHtml(e.developers)}, com ${escapeHtml(e.compare.lotes)} (${escapeHtml(e.compare.metragem)}), ${escapeHtml(e.compare.diferencial.toLowerCase())} e referência comercial ${escapeHtml(e.priceHighlight.toLowerCase())}.</p>
          <p style="margin:10px 0 0;font-size:11.5px;color:#68766b;">Curadoria técnica: <strong>Thony Oliveira</strong> · Atualizado em <time datetime="${UPDATED_ISO}">${UPDATED_LABEL}</time> · Atendimento em Goiânia, Goianira e Goiás.</p>
        </div>
        ${e.summary.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      </div>

      <aside class="book-card">
        <span class="eyebrow light">ATENDIMENTO DIRETO COM THONY</span>
        <h3>Receba o Book Digital completo no WhatsApp.</h3>
        <p>Enviamos na hora o material oficial completo para você analisar com calma em casa, sem compromisso:</p>
        <ul>
          <li>Book Digital em PDF e mapa de implantação</li>
          <li>Espelho atualizado de lotes disponíveis</li>
          <li>Simulação de entrada e parcelas sob medida</li>
          <li>Agendamento de visita presencial no local</li>
        </ul>
        <a class="btn-primary" href="${waBook}" target="_blank" rel="noopener noreferrer">PEDIR BOOK E TABELA NO WHATSAPP ↗</a>
        <span class="book-sub">WhatsApp direto: ${WHATSAPP_SHOWN}</span>
      </aside>
    </div>
  </section>

  ${tourSection}

  <section class="section section-warm" id="galeria">
    <span class="eyebrow">PERSPECTIVAS E IMAGENS OFICIAIS</span>
    <h2>Conheça cada detalhe do <em>projeto.</em></h2>
    <div class="gallery-grid">
      ${e.gallery
        .map(
          (g, idx) => `<figure class="gallery-item" data-lb-index="${idx}" tabindex="0" role="button" aria-label="Ampliar foto: ${escapeHtml(g.title)}">
        <img src="${g.src}" alt="${escapeHtml(g.title)} — ${escapeHtml(e.name)}" loading="lazy">
        <figcaption><b>${escapeHtml(g.title)}</b><span>${escapeHtml(g.caption)}</span></figcaption>
      </figure>`
        )
        .join('')}
    </div>
  </section>

  <section class="section section-alt" id="implantacao">
    <span class="eyebrow">MAPA DE IMPLANTAÇÃO</span>
    <h2>Distribuição de quadras, lotes e <em>áreas comuns.</em></h2>
    <div class="plan-wrap" data-lb-index="${e.gallery.length}" tabindex="0" role="button" aria-label="Ampliar mapa de implantação de ${escapeHtml(e.name)}">
      <img src="${e.implantationImage}" alt="Mapa oficial de implantação do ${escapeHtml(e.name)}" loading="lazy">
      <div class="plan-caption">
        <span>${escapeHtml(e.implantationNote)}</span>
        <b>CLIQUE PARA AMPLIAR O MAPA ↗</b>
      </div>
    </div>
  </section>

  <section class="section" id="lazer">
    <div class="split-2">
      <div>
        <span class="eyebrow">ESTRUTURA E LAZER</span>
        <h2>O que está <em>planejado.</em></h2>
        <ul class="check-list">
          ${e.amenities.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
        </ul>
      </div>
      <div>
        <span class="eyebrow">LOCALIZAÇÃO ESTRATÉGICA</span>
        <h2>Perto do que importa <em>no dia a dia.</em></h2>
        <div class="dist-grid">
          ${e.distances
            .map(
              (d) =>
                `<div class="dist-card"><strong>${escapeHtml(d.time)}</strong><span>${escapeHtml(d.place)}</span></div>`
            )
            .join('')}
        </div>
        <div style="margin-top:26px;">
          <a class="btn-secondary" href="${waMain}" target="_blank" rel="noopener noreferrer">RECEBER LOCALIZAÇÃO NO MAPS PELO WHATSAPP ↗</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-dark" id="juridico">
    <span class="eyebrow light">TRANSPARÊNCIA E SEGURANÇA JURÍDICA</span>
    <h2>Ficha técnica e <em>registro.</em></h2>
    <div class="legal-grid">
      <div class="legal-card"><span>REALIZAÇÃO / URBANIZADORA</span><p>${escapeHtml(e.legal.incorporadoras)}</p></div>
      <div class="legal-card"><span>APROVAÇÃO E REGISTRO</span><p>${escapeHtml(e.legal.registro)}</p></div>
      <div class="legal-card"><span>ESTÁGIO / PRAZO</span><p>${escapeHtml(e.legal.entrega)}</p></div>
      <div class="legal-card"><span>ENDEREÇO DE REFERÊNCIA</span><p>${escapeHtml(e.legal.address)}</p></div>
    </div>
    <p class="legal-disclaimer">${escapeHtml(e.legal.disclaimer)}</p>
  </section>

  <section class="section section-alt" id="duvidas">
    <span class="eyebrow">PERGUNTAS FREQUENTES</span>
    <h2>Dúvidas sobre o <em>${escapeHtml(e.shortName)}.</em></h2>
    <div class="faq-list">
      ${e.faqs
        .map(
          ([q, a]) =>
            `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`
        )
        .join('')}
    </div>
  </section>

  <section class="section section-warm">
    <span class="eyebrow">CONTINUE EXPLORANDO O PORTFÓLIO</span>
    <h2>Outros empreendimentos <em>selecionados.</em></h2>
    <div class="others-grid">
      ${others
        .map(
          (o) => `<a class="other-card" href="/empreendimentos/${o.slug}/">
        <img src="${o.cover}" alt="${escapeHtml(o.coverAlt)}" loading="lazy">
        <div>
          <small>${escapeHtml(o.region)}</small>
          <h3>${escapeHtml(o.name)}</h3>
          <p>${escapeHtml(o.shortDescription)}</p>
          <strong>${escapeHtml(o.priceHighlight)}</strong>
        </div>
      </a>`
        )
        .join('')}
    </div>
  </section>
</main>

<footer>
  <strong>THONY OLIVEIRA IMÓVEIS.</strong>
  <span>GOIÂNIA &amp; GOIANIRA · WHATSAPP ${WHATSAPP_SHOWN}${CRECI ? ` · CRECI ${escapeHtml(CRECI)}` : ''}</span>
  <span style="display:flex;gap:14px;flex-wrap:wrap;">
    <a href="/?popup=1#receber-imoveis">RECEBER IMÓVEIS NO E-MAIL</a>
    <a href="/privacidade/">PRIVACIDADE (LGPD)</a>
    <a href="/termos/">TERMOS DE USO</a>
    <a href="/cookies/">COOKIES</a>
    <a href="/descadastrar/">DESCADASTRAR</a>
  </span>
  <a href="/">VOLTAR PARA A PÁGINA INICIAL ↑</a>
</footer>

<a class="wa-float" href="${waMain}" target="_blank" rel="noopener noreferrer" aria-label="Conversar com Thony sobre ${escapeHtml(e.shortName)} no WhatsApp ${WHATSAPP_SHOWN}">${WA_ICON}<span>Falar sobre ${escapeHtml(e.shortName)}</span></a>

<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Galeria ampliada">
  <button type="button" class="lb-btn lb-close" id="lbClose" aria-label="Fechar">×</button>
  <button type="button" class="lb-btn lb-prev" id="lbPrev" aria-label="Anterior">‹</button>
  <div class="lightbox-inner">
    <img id="lbImg" src="" alt="">
    <div class="lightbox-cap"><b id="lbTitle"></b><small id="lbDesc"></small></div>
  </div>
  <button type="button" class="lb-btn lb-next" id="lbNext" aria-label="Próxima">›</button>
</div>

<script>
(function(){
  var items = ${JSON.stringify(lightboxItems)};
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lbImg');
  var title = document.getElementById('lbTitle');
  var desc = document.getElementById('lbDesc');
  var idx = 0;
  function show(i){
    idx = (i + items.length) % items.length;
    img.src = items[idx].src;
    img.alt = items[idx].title;
    title.textContent = items[idx].title;
    desc.textContent = items[idx].caption || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
  }
  function close(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }
  document.querySelectorAll('[data-lb-index]').forEach(function(el){
    el.addEventListener('click', function(){ show(Number(el.getAttribute('data-lb-index'))); });
    el.addEventListener('keydown', function(ev){ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); show(Number(el.getAttribute('data-lb-index'))); } });
  });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function(){ show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function(){ show(idx + 1); });
  lb.addEventListener('click', function(ev){ if(ev.target === lb) close(); });
  document.addEventListener('keydown', function(ev){
    if(!lb.classList.contains('open')) return;
    if(ev.key==='Escape') close();
    if(ev.key==='ArrowLeft') show(idx - 1);
    if(ev.key==='ArrowRight') show(idx + 1);
  });
  var tBtn = document.getElementById('loadTour360Btn');
  if(tBtn){
    tBtn.addEventListener('click', function(){
      var st = document.getElementById('tour360Stage');
      var ifr = document.createElement('iframe');
      ifr.src = st.getAttribute('data-url');
      ifr.allowFullscreen = true;
      ifr.title = 'Tour Virtual 360 graus';
      st.innerHTML = '';
      st.appendChild(ifr);
    });
  }
})();
</script>
</body>
</html>`;
}

for (const e of EMPREENDIMENTOS) {
  const folder = path.join(output, 'empreendimentos', e.slug);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), renderEmpreendimentoPage(e));
}

// 3) Páginas regionais e de busca (/explorar/<slug>/index.html) — Goiás, Goiânia, Goianira e RMG
const exploreData = [
  [
    'imoveis-em-goias',
    'Imóveis, Lotes e Condomínios em Goiás',
    'Guia completo para comprar terrenos, lotes em loteamento planejado e condomínios fechados em Goiás, com foco em Goiânia, Goianira e Região Metropolitana.',
    'O mercado imobiliário de Goiás é um dos mais dinâmicos do Centro-Oeste, impulsionado pelo crescimento populacional da Região Metropolitana de Goiânia (RMG), pelo agronegócio e pelos polos universitários e industriais. Quem busca segurança patrimonial encontra hoje duas frentes principais: lotes na capital ao lado da UFG e condomínios horizontais e loteamentos de alta valorização no eixo da GO-070 em Goianira.',
    'Compare metragem, registro em cartório (matrícula e decreto), infraestrutura entregue e condições de parcelamento direto antes de investir em Goiás.',
    '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros', 'flora-nogueira'],
  ],
  [
    'loteamentos-em-goias',
    'Loteamentos Planejados e Condomínios Fechados em Goiás',
    'Compare loteamentos abertos e condomínios horizontais registrados em Goiás com entrada facilitada e parcelamento direto com a urbanizadora.',
    'Em Goiás, a escolha entre loteamento aberto (sem taxa de condomínio e com maior liberdade de uso) e condomínio horizontal fechado (portaria 24h, muros e clube privativo) define o custo mensal e o perfil de revenda do patrimônio. O portfólio da Thony Oliveira Imóveis reúne projetos aprovados em Goiânia e Goianira com registro verificável em cartório.',
    'Avalie obras já executadas (como asfalto e drenagem no Flora Nogueira), localização universitária (Parque Universitário) e lazer completo (Terraví Ipês e Pinheiros).',
    '/empreendimentos/terravi-ipes/03-vista-geral.webp',
    ['parque-universitario', 'flora-nogueira', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'regiao-metropolitana-de-goiania',
    'Imóveis e Lotes na Região Metropolitana de Goiânia (RMG)',
    'Onde comprar terrenos e lotes na Região Metropolitana de Goiânia: compare Goiânia Norte (UFG), Goianira (GO-070), Aparecida, Trindade e Senador Canedo.',
    'A Região Metropolitana de Goiânia concentra mais de 2,5 milhões de habitantes e apresenta forte deslocamento de famílias em busca de terrenos maiores, áreas verdes e condomínios horizontais com metro quadrado mais acessível do que os setores centrais da capital. Goianira (5º município mais populoso da RMG, com crescimento econômico de 36,2% nos últimos 5 anos segundo o MTE 2025) e a Região Norte de Goiânia lideram em custo-benefício.',
    'Compare o tempo real de deslocamento pela GO-070 e Perimetral Norte até hospitais, shoppings e universidades antes de escolher seu município na RMG.',
    '/empreendimentos/terravi-ipes/01-portaria.webp',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros', 'flora-nogueira'],
  ],
  [
    'lotes-regiao-norte-goiania',
    'Lotes e Terrenos na Região Norte de Goiânia',
    'Terrenos residenciais e comerciais a partir de 270 m² na Região Norte de Goiânia, ao lado da UFG Campus Samambaia e Perimetral Norte.',
    'A Região Norte de Goiânia vive uma fase de consolidação urbana acelerada graças ao Campus Samambaia da UFG, ao Passeio das Águas Shopping, ao Aeroporto Santa Genoveva e à conexão pela Perimetral Norte. O Residencial Parque Universitário, realizado pela Landcorp e Ética Urbanismo, traz 528 lotes (480 residenciais e 48 comerciais) e mais de 48 mil m² de natureza e lazer a partir de R$ 990/m².',
    'Ideal para moradia próxima à UFG, comércio local voltado à comunidade universitária e investimento com alta liquidez na capital.',
    '/empreendimentos/parque-universitario/02-aerea-quadras.webp',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'imoveis-eixo-go-070',
    'Imóveis e Condomínios no Eixo GO-070 (Goiânia · Goianira · Inhumas)',
    'Conheça o corredor imobiliário da rodovia duplicada GO-070: condomínios fechados e loteamentos em Goianira a 15–19 minutos do Portal Shopping e HUGOL.',
    'A duplicação e a consolidação do eixo da GO-070 transformaram a saída noroeste de Goiânia em um dos vetores de maior valorização de Goiás. A apenas 800–900 metros da rodovia em Goianira estão empreendimentos de alto potencial como Condomínio Horizontal Terraví Ipês (+30 itens de lazer e Tour 360°), Condomínio Horizontal Pinheiros (apenas 109 lotes com lago de pesca) e Residencial Flora Nogueira (loteamento aberto com asfalto entregue).',
    'Para quem trabalha na região noroeste de Goiânia, HUGOL, Portal Shopping ou cidades do eixo GO-070, Goianira entrega terreno maior por uma fração do preço da capital.',
    '/empreendimentos/condominio-pinheiros/07-drone-regiao.webp',
    ['terravi-ipes', 'condominio-pinheiros', 'flora-nogueira'],
  ],
  [
    'imoveis-em-trindade-goias',
    'Imóveis e Lotes perto de Trindade (GO)',
    'Procurando terreno ou condomínio fechado perto de Trindade, Goiás? Compare opções na vizinha Goianira (GO-070) e Goiânia com parcelamento direto.',
    'Quem busca morar ou investir na região de Trindade (eixo oeste/noroeste da Região Metropolitana de Goiânia) frequentemente compara Trindade com Goianira e Goiânia pela facilidade de ligação regional, proximidade do HUGOL e do Portal Shopping e oferta de condomínios horizontais novos com registro em cartório.',
    'Compare a exclusividade de 109 lotes com lago no Pinheiros, o clube do Terraví Ipês e as parcelas acessíveis do Flora Nogueira.',
    '/empreendimentos/condominio-pinheiros/01-portaria.webp',
    ['condominio-pinheiros', 'terravi-ipes', 'flora-nogueira'],
  ],
  [
    'imoveis-em-senador-canedo',
    'Imóveis e Terrenos perto de Senador Canedo (GO)',
    'Compare terrenos e condomínios fechados na Região Metropolitana de Goiânia: Senador Canedo, Região Norte de Goiânia (UFG) e eixo GO-070.',
    'Senador Canedo é um dos vetores de expansão da Grande Goiânia, mas compradores atentos também comparam a Região Norte de Goiânia (ao lado da UFG, dentro da capital) e o eixo duplicado da GO-070 em Goianira para encontrar maior área verde preservada, menor densidade de lotes e parcelas diretas mais competitivas.',
    'Avalie o valor por metro quadrado na capital (Parque Universitário a partir de R$ 990/m²) e os condomínios fechados em Goianira.',
    '/empreendimentos/parque-universitario/04-praca-aerea.webp',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'imoveis-em-inhumas-goias',
    'Lotes e Condomínios entre Inhumas, Goianira e Goiânia (GO-070)',
    'Moradores e investidores de Inhumas encontram no eixo da GO-070 em Goianira condomínios fechados e loteamentos modernos a minutos de Goiânia.',
    'Ligada diretamente a Goianira e Goiânia pela rodovia duplicada GO-070, a população de Inhumas e Caturaí usa o eixo GO-070 como caminho natural para investir ou morar mais perto da capital, do HUGOL e do Portal Shopping sem abrir mão de tranquilidade e área verde.',
    'Conheça o Terraví Ipês (+115 mil m² de área verde e Tour 360°), o Condomínio Pinheiros (lago de pesca) e o Residencial Flora Nogueira.',
    '/empreendimentos/flora-nogueira/01-drone.webp',
    ['terravi-ipes', 'condominio-pinheiros', 'flora-nogueira'],
  ],
  [
    'imoveis-em-anapolis-e-regiao',
    'Investir em Lotes entre Anápolis e Goiânia (Goiás)',
    'Quer investir em terrenos no eixo econômico Goiânia–Anápolis? Conheça loteamentos na saída norte de Goiânia (UFG) e condomínios na RMG.',
    'O eixo Goiânia–Anápolis forma o principal corredor econômico, logístico e universitário de Goiás. Para investidores de Anápolis que buscam diversificação imobiliária na capital e Região Metropolitana, a Região Norte de Goiânia (ao lado da UFG e com rápido acesso à BR-153) e os condomínios fechados de Goianira oferecem liquidez, registro formal e financiamento direto.',
    'Destaque para o Residencial Parque Universitário na saída norte de Goiânia, além de Terraví Ipês e Condomínio Pinheiros.',
    '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'imoveis-em-neropolis-e-santo-antonio-de-goias',
    'Terrenos perto de Santo Antônio de Goiás e Nerópolis',
    'Loteamentos e condomínios próximos a Santo Antônio de Goiás, Nerópolis e Região Norte de Goiânia (Campus Samambaia da UFG).',
    'Santo Antônio de Goiás e Nerópolis fazem divisa imediata com a Região Norte de Goiânia (GO-080 / Campus Samambaia da UFG). O Residencial Parque Universitário, ao lado da UFG, atende diretamente quem busca morar na capital mantendo proximidade com Santo Antônio de Goiás, Nerópolis, Embrapa e a saída norte de Goiânia.',
    'Confira também os condomínios horizontais de Goianira pela conexão rápida com a região noroeste.',
    '/empreendimentos/parque-universitario/03-infraestrutura.webp',
    ['parque-universitario', 'condominio-pinheiros', 'flora-nogueira'],
  ],
  [
    'imoveis-em-hidrolandia-e-bela-vista-de-goias',
    'Condomínios Horizontais em Goiás: Hidrolândia, Bela Vista e Goianira',
    'Comparando condomínios fechados com natureza em Hidrolândia, Bela Vista de Goiás ou Goianira? Veja diferenciais de lazer, lago e preço por m².',
    'Famílias que pesquisam condomínios horizontais com contato com a natureza em Hidrolândia e Bela Vista de Goiás encontram em Goianira (GO-070) uma alternativa surpreendente em custo por metro quadrado, infraestrutura de clube e proximidade de hospitais e shoppings da capital — como o lago privativo de +5 mil m² no Pinheiros e os +115 mil m² de verde no Terraví Ipês.',
    'Compare distância até o seu trabalho em Goiânia, número total de lotes e valor das parcelas mensais.',
    '/empreendimentos/condominio-pinheiros/02-lago-pista.webp',
    ['condominio-pinheiros', 'terravi-ipes', 'parque-universitario'],
  ],
  [
    'investir-em-terrenos-goiania-goias',
    'Como Investir em Terrenos e Lotes em Goiânia e Goiás (Guia 2026)',
    'Guia prático baseado em dados reais para investir em terrenos em Goiás: valorização em Goianira (+36,2%), demanda da UFG em Goiânia e documentação.',
    'Investir em lotes bem localizados na planta ou em fase de obras na Grande Goiânia combina ticket de entrada reduzido, parcelamento direto sem burocracia bancária e forte ganho de capital até a entrega. Os quatro fatores decisivos são: (1) matrícula registrada no Cartório de Registro de Imóveis e decreto municipal, (2) vetor econômico comprovado (como o entorno da UFG ou a GO-070 em Goianira), (3) reputação da urbanizadora e (4) relação entre valor da parcela e valor de revenda após entrega.',
    'Compare Condomínio Pinheiros em destaque (109 lotes com lago, parcelas a partir de R$ 654,19*), Flora Nogueira (a partir de R$ 481,76* com asfalto pronto), Terraví Ipês (R$ 697,76*) e Parque Universitário (a partir de R$ 990/m² em Goiânia).',
    '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
    ['parque-universitario', 'flora-nogueira', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'financiamento-direto-lote-goiania-goianira',
    'Lotes com Parcelamento Direto com a Urbanizadora em Goiânia e Goianira',
    'Compre seu terreno em Goiânia ou Goianira sem banco: entrada facilitada e parcelamento direto com parcelas referenciais a partir de R$ 481,76*.',
    'O parcelamento direto com a loteadora/incorporadora dispensa comprovação bancária complexa e permite escolher planos curtos, fixos ou longos (geralmente corrigidos anualmente pelo IPCA). No portfólio da Thony Oliveira Imóveis há opções registradas em cartório com entrada parcelável e condições promocionais de tabela.',
    'Solicite pelo WhatsApp (62) 98529-2886 a tabela vigente e uma simulação exata para a metragem desejada.',
    '/empreendimentos/flora-nogueira/02-quadra-praca.webp',
    ['flora-nogueira', 'terravi-ipes', 'condominio-pinheiros', 'parque-universitario'],
  ],
  [
    'melhores-condominios-horizontais-goiania-regiao',
    'Melhores Condomínios Horizontais em Goiânia e Região Metropolitana',
    'Compare os principais condomínios horizontais fechados na Região Metropolitana de Goiânia: Terraví Ipês (+30 itens de lazer) e Pinheiros (109 lotes + lago).',
    'Ao escolher um condomínio horizontal fechado na Grande Goiânia, dois perfis se destacam: quem prioriza estrutura de clube resort completa (como o Condomínio Horizontal Terraví Ipês, com 578 lotes, +115 mil m² de verde, parque aquático de borda infinita, Arena Gamer e Tour Virtual 360°) e quem busca máxima privacidade e baixa densidade (como o Condomínio Horizontal Pinheiros, com apenas 109 lotes de 287 a 486 m² e lago privativo de +5 mil m² para pesca).',
    'Ambos ficam no eixo valorizado da GO-070 em Goianira, com registro em cartório e previsão de entrega em 2029.',
    '/empreendimentos/terravi-ipes/02-parque-aquatico.webp',
    ['terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'imoveis-em-goianira',
    'Imóveis em Goianira (Eixo GO-070)',
    'Descubra lotes em condomínio fechado e loteamentos planejados em Goianira, a poucos minutos do Portal Shopping e HUGOL.',
    'Goianira é o 5º município mais populoso da Região Metropolitana de Goiânia e registrou crescimento econômico de 36,2% nos últimos 5 anos (MTE 2025). O eixo da GO-070 concentra condomínios horizontais com lazer completo e loteamentos abertos com obras avançadas.',
    'Compare o perfil de condomínio clube (Terraví Ipês), condomínio boutique com lago (Pinheiros) e loteamento aberto com asfalto entregue (Flora Nogueira).',
    '/empreendimentos/condominio-pinheiros/01-portaria.webp',
    ['terravi-ipes', 'condominio-pinheiros', 'flora-nogueira'],
  ],
  [
    'lotes-em-goianira',
    'Lotes à venda em Goianira',
    'Compare lotes residenciais de 230 m² a 502 m² em Goianira com registro em cartório e parcelamento direto com a urbanizadora.',
    'Quem procura lote em Goianira pode escolher entre terrenos em loteamento aberto — sem taxa de condomínio e com infraestrutura avançada — ou condomínios horizontais fechados com portaria 24h e lazer completo.',
    'Observe a distância até a GO-070, o número de matrícula no CRI de Goianira e o cronograma de entrega das obras.',
    '/empreendimentos/flora-nogueira/01-drone.webp',
    ['flora-nogueira', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'condominio-fechado-goianira',
    'Condomínio fechado em Goianira',
    'Conheça os condomínios horizontais Terraví Ipês (+30 itens de lazer) e Pinheiros (109 lotes com lago) em Goianira, perto da GO-070.',
    'Os condomínios fechados de Goianira oferecem metro quadrado altamente competitivo em relação à capital, mantendo acesso rápido pela GO-070 a apenas 15 a 19 minutos do Portal Shopping e do HUGOL.',
    'Escolha entre o lazer resort completo do Terraví Ipês (578 lotes e 115 mil m² de verde) ou a exclusividade de apenas 109 lotes com lago de pesca no Condomínio Pinheiros.',
    '/empreendimentos/terravi-ipes/02-parque-aquatico.webp',
    ['terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'terrenos-perto-ufg-goiania',
    'Terrenos perto da UFG em Goiânia',
    'Lotes residenciais e comerciais a partir de 270 m² ao lado do Campus Samambaia da UFG no Residencial Parque Universitário.',
    'A Região Norte de Goiânia, no entorno imediato da Universidade Federal de Goiás (Campus Samambaia), une alta demanda contínua por moradia, comércio e serviços com acesso rápido à Perimetral Norte, Passeio das Águas Shopping e Aeroporto Santa Genoveva.',
    'O Residencial Parque Universitário reúne 528 lotes (480 residenciais e 48 comerciais) e mais de 48 mil m² de área verde e lazer.',
    '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
    ['parque-universitario'],
  ],
  [
    'imoveis-em-goiania',
    'Imóveis em Goiânia',
    'Explore terrenos, lotes em condomínio fechado e oportunidades imobiliárias em Goiânia e Região Metropolitana com a Thony Oliveira Imóveis.',
    'Antes de escolher, defina seu objetivo (morar, construir ou investir), o tempo de deslocamento ideal e se prefere a liberdade de um loteamento aberto ou a estrutura de um condomínio horizontal fechado.',
    'Comece comparando nossos 4 empreendimentos selecionados em Goiânia (UFG) e Goianira (GO-070).',
    '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'terrenos-a-venda-em-goiania',
    'Terrenos à venda em Goiânia e Região',
    'Pesquise terrenos e lotes à venda em Goiânia (ao lado da UFG) e Goianira (eixo GO-070) com documentação verificada e financiamento direto.',
    'Ao avaliar um terreno, confira registro em cartório, topografia, dimensões de frente, drenagem pluvial e potencial de valorização da vizinhança. Todos os empreendimentos do portfólio contam com projetos urbanísticos estruturados.',
    'Avalie o terreno pelo conjunto de localização, infraestrutura e liquidez futura — não apenas pelo valor isolado.',
    '/empreendimentos/parque-universitario/02-aerea-quadras.webp',
    ['parque-universitario', 'flora-nogueira', 'condominio-pinheiros'],
  ],
  [
    'casas-em-condominio-fechado-goiania',
    'Condomínios fechados em Goiânia e Região',
    'Conheça critérios para construir sua casa em condomínio fechado na Grande Goiânia: segurança 24h, lazer completo, natureza e valorização.',
    'Comprar o lote em um condomínio horizontal em lançamento permite planejar a casa sob medida com entrada facilitada e valorização patrimonial durante as obras.',
    'Compare Terraví Ipês (+30 itens de lazer e Tour 360°) e Condomínio Pinheiros (109 lotes com lago de pesca).',
    '/empreendimentos/condominio-pinheiros/02-lago-pista.webp',
    ['terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'casas-a-venda-em-goiania',
    'Casas à venda em Goiânia',
    'Buscando casas ou lotes para construir em Goiânia? Compare regiões, metragens, condomínios e oportunidades com atendimento consultivo.',
    'Observe incidência de sol, ventilação, acessos, documentação e potencial de construção. Muitas famílias descobrem que adquirir o terreno em loteamento planejado ou condomínio fechado oferece melhor custo-benefício para construir o projeto dos sonhos.',
    'Fale com Thony para comparar lotes prontos para planejar sua casa ou imóveis na região desejada.',
    '/images/casa-1.jpg',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'apartamentos-a-venda-em-goiania',
    'Apartamentos à venda em Goiânia',
    'Orientações para comparar apartamentos e investimentos imobiliários em Goiânia por bairro, planta e valorização.',
    'Além da metragem privativa, compare taxa condominial, posição solar, mobilidade urbana e compare com o potencial de valorização de lotes em regiões de expansão de Goiânia e Goianira.',
    'Converse com Thony para analisar qual ativo imobiliário melhor atende ao seu objetivo.',
    '/images/apto-1.jpg',
    ['parque-universitario', 'terravi-ipes', 'flora-nogueira'],
  ],
  [
    'imoveis-em-aparecida-de-goiania',
    'Imóveis em Aparecida de Goiânia e Região Metropolitana',
    'Explore oportunidades na Região Metropolitana de Goiânia e compare vetores de crescimento como Aparecida e o eixo da GO-070 em Goianira.',
    'Na Região Metropolitana de Goiânia, compare proximidade de polos de emprego, hospitais, shoppings e rodovias duplicadas antes de fechar negócio.',
    'Conheça também o forte eixo de valorização de Goianira (GO-070) e da Região Norte de Goiânia.',
    '/images/casa-3.jpg',
    ['parque-universitario', 'flora-nogueira', 'terravi-ipes'],
  ],
  [
    'apartamentos-na-planta-goiania',
    'Lançamentos imobiliários em Goiânia e Região',
    'Veja o que analisar antes de comprar um imóvel ou lote na planta: urbanizadora, registro em cartório, fluxo de pagamento e prazo de entrega.',
    'Verifique o número da matrícula e decreto de aprovação, o histórico de entregas da urbanizadora, o indexador (como IPCA) e o memorial descritivo das áreas comuns.',
    'Compare lançamentos registrados como Parque Universitário, Terraví Ipês, Pinheiros e Flora Nogueira.',
    '/images/apto-2.jpg',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'imoveis-alto-padrao-goiania',
    'Imóveis de alto padrão em Goiânia e Região',
    'Critérios de escolha para morar ou construir com alto padrão: baixa densidade, contato com a natureza, segurança 24h e projeto autoral.',
    'Em projetos de padrão elevado, exclusividade de lotes, preservação ambiental, áreas de convivência e qualidade urbanística fazem diferença direta na liquidez e qualidade de vida.',
    'Conheça o Condomínio Pinheiros (apenas 109 lotes com lago) e o Terraví Ipês (+115 mil m² de verde).',
    '/empreendimentos/condominio-pinheiros/04-fireplace.webp',
    ['condominio-pinheiros', 'terravi-ipes', 'parque-universitario'],
  ],
  [
    'apartamentos-2-quartos-goiania',
    'Imóveis para primeiro lar em Goiânia e Região',
    'Compare alternativas para o primeiro imóvel ou primeiro terreno em Goiânia e Goianira com parcelas acessíveis.',
    'Para casais e famílias iniciando patrimônio, lotes em loteamentos abertos com infraestrutura entregue — como o Flora Nogueira — podem oferecer entrada mais leve e alta valorização.',
    'Avalie parcela mensal, entrada facilitada e localização em relação ao seu trabalho.',
    '/images/apto-2.jpg',
    ['flora-nogueira', 'parque-universitario', 'terravi-ipes'],
  ],
  [
    'apartamentos-3-quartos-goiania',
    'Imóveis para família em Goiânia e Região',
    'Opções com mais espaço para famílias que buscam quintal, lazer completo e segurança na Grande Goiânia.',
    'Para quem precisa de mais espaço, quintal e áreas de convivência para filhos e pets, construir em um lote de 250 m² a 486 m² em condomínio fechado é uma alternativa muito valorizada.',
    'Compare o clube do Terraví Ipês, o lago do Condomínio Pinheiros e a localização do Parque Universitário.',
    '/images/apto-1.jpg',
    ['terravi-ipes', 'condominio-pinheiros', 'parque-universitario'],
  ],
  [
    'imoveis-setor-bueno-goiania',
    'Imóveis no Setor Bueno em Goiânia',
    'Saiba o que avaliar ao buscar imóveis no Setor Bueno e compare com opções de loteamentos em Goiânia e Região Metropolitana.',
    'O Setor Bueno concentra comércio, escolas e serviços variados. Compare o custo por metro quadrado no bairro com oportunidades de alta valorização em áreas planejadas da capital.',
    'Converse com Thony para mapear a melhor alocação para morar ou investir em Goiânia.',
    '/images/apto-1.jpg',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'imoveis-setor-marista-goiania',
    'Imóveis no Setor Marista em Goiânia',
    'Entenda o perfil imobiliário do Setor Marista e compare com condomínios horizontais e terrenos selecionados em Goiás.',
    'O Setor Marista reúne gastronomia e empreendimentos de alto valor agregado. Para quem busca terreno amplo e contato com a natureza, condomínios horizontais na RMG complementam o portfólio com excelente relação área × investimento.',
    'Fale com Thony para atendimento personalizado.',
    '/images/casa-2.jpg',
    ['condominio-pinheiros', 'terravi-ipes', 'parque-universitario'],
  ],
  [
    'imoveis-jardim-goias',
    'Imóveis no Jardim Goiás',
    'Orientações sobre imóveis no Jardim Goiás e comparação com novos vetores de valorização em Goiânia.',
    'O Jardim Goiás destaca-se por parques e conveniência. Quem busca áreas verdes amplas e terrenos maiores encontra excelentes alternativas nos lançamentos planejados da capital e do eixo GO-070.',
    'Conheça os empreendimentos disponíveis agora com atendimento direto.',
    '/images/casa-1.jpg',
    ['parque-universitario', 'terravi-ipes', 'condominio-pinheiros'],
  ],
  [
    'imoveis-parque-amazonia',
    'Imóveis no Parque Amazônia em Goiânia',
    'Critérios para comparar casas, apartamentos e terrenos na região do Parque Amazônia e Grande Goiânia.',
    'Compare conectividade viária, idade das construções e potencial de valorização entre bairros consolidados e loteamentos planejados com infraestrutura nova.',
    'Fale com Thony para comparar opções reais dentro do seu orçamento.',
    '/images/casa-3.jpg',
    ['flora-nogueira', 'parque-universitario', 'terravi-ipes'],
  ],
  [
    'imoveis-setor-oeste-goiania',
    'Imóveis no Setor Oeste em Goiânia',
    'Guia para buscar imóveis no Setor Oeste e comparar com empreendimentos horizontais e terrenos em Goiânia.',
    'No Setor Oeste, observe infraestrutura dos edifícios, mobilidade e custos condominiais. Compare também a rentabilidade e o espaço de lotes planejados na Região Norte (UFG) e em Goianira.',
    'Conte com atendimento consultivo para decidir com segurança.',
    '/images/apto-2.jpg',
    ['parque-universitario', 'condominio-pinheiros', 'flora-nogueira'],
  ],
];

const devById = Object.fromEntries(EMPREENDIMENTOS.map((e) => [e.id, e]));

function renderExplorePage(r, index) {
  const [slug, title, description, body, takeaway, image, devIds] = r;
  const url = `/explorar/${slug}/`;
  const fullUrl = `${site}${url}`;
  const canonical =
    site && site !== 'https://example.com' ? `<link rel="canonical" href="${fullUrl}">` : '';
  const robots = active ? 'index,follow,max-image-preview:large,max-snippet:-1' : 'noindex,nofollow';
  const links = [];
  for (let offset = 1; offset <= 9; offset++) {
    const pick = exploreData[(index + offset * 3) % exploreData.length];
    if (pick[0] !== slug && !links.some((x) => x[0] === pick[0])) links.push(pick);
    if (links.length === 6) break;
  }
  const related = links
    .map((x) => `<a href="/explorar/${x[0]}/">${escapeHtml(x[1])} ↗</a>`)
    .join('');

  const matchedDevs = (devIds || []).map((id) => devById[id]).filter(Boolean);
  const devsHtml = matchedDevs
    .map(
      (d) => `<a class="dev-mini-card" href="/empreendimentos/${d.slug}/">
    <img src="${d.cover}" alt="${escapeHtml(d.coverAlt)}" loading="lazy">
    <div>
      <small>${escapeHtml(d.region.toUpperCase())}</small>
      <h3>${escapeHtml(d.name)}</h3>
      <p>${escapeHtml(d.shortDescription)}</p>
      <strong>${escapeHtml(d.priceHighlight)} · Ver página ↗</strong>
    </div>
  </a>`
    )
    .join('');

  const compareRowsHtml = matchedDevs
    .map(
      (d) => `<tr>
        <td><a href="/empreendimentos/${d.slug}/">${escapeHtml(d.shortName)}</a></td>
        <td>${escapeHtml(d.region)}</td>
        <td>${escapeHtml(d.modality)}</td>
        <td>${escapeHtml(d.compare.lotes)} (${escapeHtml(d.compare.metragem)})</td>
        <td><strong>${escapeHtml(d.priceHighlight)}</strong></td>
      </tr>`
    )
    .join('');

  const faq = [
    [
      `Como começar a procurar ${title.toLowerCase()}?`,
      `Defina orçamento, objetivo (moradia ou investimento) e preferência entre loteamento aberto ou condomínio fechado. Peça o espelho atualizado de unidades pelo WhatsApp ${WHATSAPP_SHOWN} e agende visita acompanhada em Goiânia ou Goianira.`,
    ],
    [
      'O que verificar antes de assinar o contrato de compra de lote em Goiás?',
      'Confira sempre o número do decreto municipal de aprovação, o registro da matrícula no Cartório de Registro de Imóveis (CRI), o memorial descritivo, o prazo de entrega das obras e o índice de reajuste das parcelas.',
    ],
    [
      'Os empreendimentos da Thony Oliveira Imóveis oferecem parcelamento direto?',
      'Sim. Parque Universitário (Goiânia), Terraví Ipês, Condomínio Pinheiros e Residencial Flora Nogueira (Goianira) oferecem planos de pagamento direto com a urbanizadora/incorporadora, com entrada facilitada e tabela atualizada sob consulta.',
    ],
  ];

  const schemaGraph = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Guias Imobiliários em Goiás', item: `${site}/explorar/imoveis-em-goias/` },
          { '@type': 'ListItem', position: 3, name: title, item: fullUrl },
        ],
      },
      {
        '@type': 'Article',
        headline: title,
        description,
        image: `${site}${image}`,
        datePublished: '2026-11-20',
        dateModified: UPDATED_ISO,
        inLanguage: 'pt-BR',
        author: AUTHOR_SCHEMA,
        publisher: PROVIDER_SCHEMA,
        mainEntityOfPage: fullUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  });

  const waHref = waLink(
    `Olá, Thony! Vi a página "${title}" no site e quero conhecer os empreendimentos disponíveis em Goiânia e Goianira.`,
    WA
  );

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#17382e"><meta name="robots" content="${robots}"><meta name="author" content="Thony Oliveira Imóveis"><meta name="geo.region" content="BR-GO"><meta name="geo.placename" content="Goiânia e Região Metropolitana, Goiás"><meta name="geo.position" content="-16.6869;-49.2648"><title>${escapeHtml(title)} | Thony Oliveira Imóveis</title><meta name="description" content="${escapeHtml(description)}">${canonical}<meta property="og:type" content="article"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Thony Oliveira Imóveis"><meta property="og:url" content="${fullUrl}"><meta property="og:title" content="${escapeHtml(title)} | Thony Oliveira Imóveis"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:image" content="${site}${image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)} | Thony Oliveira Imóveis"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${site}${image}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;600;700&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet"><link rel="stylesheet" href="/landing.css">${SPLASH_STYLE}<script type="application/ld+json">${schemaGraph}</script></head>
<body>${SPLASH_BODY}<header><a href="/" class="brand"><span class="badge">T·O</span><span><b>THONY OLIVEIRA</b><small>IMÓVEIS · GOIÂNIA, GOIANIRA &amp; GOIÁS</small></span></a><nav><a href="/">Início</a><a href="/#imoveis">Empreendimentos</a><a href="/#comparativo">Comparativo</a><a href="${waHref}" class="nav-contact" target="_blank" rel="noopener noreferrer">WhatsApp ${WHATSAPP_SHOWN} ↗</a></nav></header>
<main>
<section class="hero"><div class="hero-content"><p class="eyebrow">GOIÂNIA, GOIANIRA &amp; GOIÁS · GUIA IMOBILIÁRIO</p><p class="breadcrumbs"><a href="/">Início</a> / <a href="/explorar/imoveis-em-goias/">Goiás</a> / ${escapeHtml(title)}</p><h1>${escapeHtml(title)}<em>.</em></h1><p class="lead">${escapeHtml(description)}</p><a class="cta" href="${waHref}" target="_blank" rel="noopener noreferrer">FALAR COM THONY NO WHATSAPP ↗</a></div><div class="hero-photo"><img src="${image}" alt="${escapeHtml(title)}"><span>THONY OLIVEIRA IMÓVEIS · GOIÁS</span></div></section>
<section class="featured-devs"><p class="eyebrow">DISPONÍVEIS NO PORTFÓLIO</p><h2>Empreendimentos selecionados para você.</h2><div class="dev-mini-grid">${devsHtml}</div></section>
<section class="details"><article><p class="eyebrow">ANÁLISE REGIONAL · GOIÁS</p><h2>Encontre uma escolha que faça sentido.</h2>
<div class="tldr-box"><strong>Resumo direto (TL;DR)</strong><p>${escapeHtml(takeaway)}</p><div class="byline"><span>Curadoria: <strong>Thony Oliveira Imóveis</strong></span><span>Atualizado em <time datetime="${UPDATED_ISO}">${UPDATED_LABEL}</time></span><span>Atendimento: Goiânia, Goianira e Goiás</span></div></div>
<p>${escapeHtml(body)}</p>
<h3>Comparativo rápido das opções disponíveis</h3>
<div class="compare-mini-wrap"><table class="compare-mini"><thead><tr><th>Empreendimento</th><th>Região</th><th>Modalidade</th><th>Lotes / Área</th><th>Referência*</th></tr></thead><tbody>${compareRowsHtml}</tbody></table></div>
<h3>O que vale observar antes de fechar</h3><p>${escapeHtml(takeaway)} Compare sempre localização, registro em cartório (matrícula e decreto municipal), estágio das obras e condições de pagamento direto com a urbanizadora.</p>
<h3>Cobertura regional em Goiás</h3><p>A Thony Oliveira Imóveis presta consultoria presencial e remota para compradores e investidores de toda a Região Metropolitana de Goiânia e do Estado de Goiás.</p>
<div class="geo-cities">${GOIAS_CITIES.slice(0, 12).map((c) => `<span>${escapeHtml(c)} · GO</span>`).join('')}</div>
</article><aside><div class="box"><p class="eyebrow">ATENDIMENTO THONY OLIVEIRA</p><h3>Receba a tabela atualizada hoje mesmo.</h3><p>Tire dúvidas sobre documentação em cartório, entrada facilitada, parcelas diretas e localização exata dos empreendimentos em Goiânia, Goianira e Região Metropolitana.</p><a href="${waHref}" target="_blank" rel="noopener noreferrer">CONVERSAR NO WHATSAPP ${WHATSAPP_SHOWN} ↗</a></div></aside></section>
<section class="related"><p class="eyebrow">CONTINUE EXPLORANDO GOIÁS</p><h2>Outros guias regionais e buscas em Goiânia e Goiás.</h2><div class="links">${related}</div></section>
<section class="faq"><p class="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas antes de escolher seu terreno.</h2>${faq.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join('')}</section>
</main>
<footer><strong>THONY OLIVEIRA.</strong><span>GOIÂNIA, GOIANIRA &amp; GOIÁS · WHATSAPP ${WHATSAPP_SHOWN}${CRECI ? ` · CRECI ${escapeHtml(CRECI)}` : ''}</span><span style="display:flex;gap:12px;flex-wrap:wrap;"><a href="/?popup=1#receber-imoveis">RECEBER IMÓVEIS NO E-MAIL</a><a href="/privacidade/">PRIVACIDADE</a><a href="/termos/">TERMOS</a><a href="/cookies/">COOKIES</a><a href="/descadastrar/">DESCADASTRAR</a></span><a href="/">VOLTAR PARA INÍCIO ↑</a></footer>
<a class="wa-float" href="${waHref}" target="_blank" rel="noopener noreferrer" aria-label="Conversar com Thony no WhatsApp ${WHATSAPP_SHOWN}">${WA_ICON}<span>WhatsApp</span></a>
</body></html>`;
}

for (let i = 0; i < exploreData.length; i++) {
  const folder = path.join(output, 'explorar', exploreData[i][0]);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), renderExplorePage(exploreData[i], i));
}

// 4-A) Páginas Legais Obrigatórias (/privacidade/, /termos/, /cookies/, /descadastrar/)
const legalPages = [
  {
    slug: 'privacidade',
    title: 'Política de Privacidade e Proteção de Dados (LGPD)',
    description:
      'Política de Privacidade e Tratamento de Dados Pessoais da Thony Oliveira Imóveis em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).',
    contentHtml: `
      <div class="tldr-box">
        <strong>Resumo de transparência (LGPD)</strong>
        <p>Coletamos apenas os dados que você informa voluntariamente nos canais de atendimento do site (nome, e-mail, WhatsApp opcional e preferência de empreendimento) exclusivamente para enviar as apresentações imobiliárias solicitadas e oportunidades selecionadas do portfólio, com opção de cancelamento imediato em 1 clique.</p>
        <div class="byline"><span>Controlador: <strong>Thony Oliveira Imóveis</strong></span><span>Atualizado em <time datetime="${UPDATED_ISO}">${UPDATED_LABEL}</time></span><span>Goiânia e Goianira · GO</span></div>
      </div>
      <h2>1. Quais dados pessoais coletamos</h2>
      <p>Quando você se inscreve para receber novidades imobiliárias ou entra em contato pelo site <strong>thonyoliveiraimoveis.online</strong>, podemos coletar: (a) nome completo ou primeiro nome; (b) endereço de e-mail; (c) número de telefone/WhatsApp (quando informado opcionalmente); e (d) empreendimento ou região de interesse em Goiânia, Goianira e Goiás.</p>
      <h2>2. Finalidade do tratamento</h2>
      <p>Os dados são utilizados estritamente para: (a) enviar por e-mail o dossiê do empreendimento selecionado; (b) enviar nossa curadoria informativa de oportunidades e lançamentos imobiliários em Goiás; e (c) responder solicitações de tabelas, Books Digitais e agendamento de visitas presenciais via WhatsApp ${WHATSAPP_SHOWN}.</p>
      <h2>3. Compartilhamento e operadores seguros</h2>
      <p>Não vendemos nem cedemos sua lista de contato a terceiros não relacionados. Para o disparo seguro e gestão de opt-out dos e-mails, utilizamos infraestrutura autenticada via <strong>Resend</strong> e <strong>Brevo</strong> (com registros SPF, DKIM e DMARC verificados no domínio <code>thonyoliveiraimoveis.online</code>).</p>
      <h2>4. Seus direitos como titular (Art. 18 da LGPD)</h2>
      <p>A qualquer momento você pode solicitar confirmação de tratamento, acesso, correção, anonimização ou exclusão definitiva do seu e-mail clicando no link <strong>"Cancelar inscrição (Descadastrar)"</strong> presente no rodapé de todos os nossos e-mails, acessando diretamente a página <a href="/descadastrar/" style="text-decoration:underline;font-weight:700;">/descadastrar/</a> ou enviando mensagem para o WhatsApp ${WHATSAPP_SHOWN}.</p>
    `,
  },
  {
    slug: 'termos',
    title: 'Termos de Uso e Condições Comerciais',
    description:
      'Termos de Uso, aviso legal sobre tabelas e perspectivas artísticas e condições de uso do portal Thony Oliveira Imóveis.',
    contentHtml: `
      <div class="tldr-box">
        <strong>Resumo dos Termos</strong>
        <p>As informações, perspectivas, vídeos e valores publicados no site e nos e-mails têm caráter informativo e referencial, baseados nos materiais oficiais das respectivas incorporadoras e sujeitos à disponibilidade de estoque e tabela vigente no momento da proposta.</p>
        <div class="byline"><span>Portal: <strong>thonyoliveiraimoveis.online</strong></span><span>Atualizado em <time datetime="${UPDATED_ISO}">${UPDATED_LABEL}</time></span></div>
      </div>
      <h2>1. Natureza das informações e preços referenciais</h2>
      <p>Todos os valores por metro quadrado, parcelas mensais, planos de pagamento e prazos de entrega exibidos nas páginas de empreendimentos e nos e-mails da <strong>Thony Oliveira Imóveis</strong> são referenciais, extraídos das tabelas e lâminas comerciais oficiais das incorporadoras/urbanizadoras (Landcorp Participações, Ética Urbanismo, Terrano Urbanismo, MAC Empreendimentos e +VGV Brasil), podendo sofrer reajustes (como correção por IPCA) ou alteração sem aviso prévio.</p>
      <h2>2. Perspectivas artísticas e simulações interativas</h2>
      <p>As imagens de projetos futuros possuem caráter de perspectiva artística ilustrativa, com vegetação em porte adulto e acabamentos conforme memorial descritivo oficial de cada loteamento ou condomínio. As experiências interativas por rolagem (<em>Do Terreno ao Lar</em> e <em>Visita Imersiva</em>) na página inicial são simulações conceituais destinadas a ilustrar o potencial construtivo de um lote.</p>
      <h2>3. Documentação e registro em cartório</h2>
      <p>Toda negociação é realizada diretamente com contrato oficial da respectiva incorporadora/urbanizadora, devidamente amparada pelos decretos municipais de aprovação e matrículas registradas nos Cartórios de Registro de Imóveis competentes, conforme detalhado na seção jurídica de cada empreendimento.</p>
      <h2>4. Propriedade intelectual e contato</h2>
      <p>É vedada a reprodução indevida do código, textos editoriais e estrutura deste portal sem autorização. Dúvidas comerciais ou jurídicas devem ser direcionadas ao atendimento oficial pelo WhatsApp ${WHATSAPP_SHOWN} ou pelo e-mail <code>contato@thonyoliveiraimoveis.online</code>.</p>
    `,
  },
  {
    slug: 'cookies',
    title: 'Política de Cookies e Armazenamento Local',
    description:
      'Como o site Thony Oliveira Imóveis utiliza cookies essenciais e armazenamento local (localStorage) para melhorar sua experiência.',
    contentHtml: `
      <div class="tldr-box">
        <strong>Uso mínimo e transparente</strong>
        <p>Utilizamos apenas armazenamento local essencial no seu navegador (<code>localStorage</code>) para lembrar se você já se inscreveu ou fechou o pop-up de captura de e-mail, evitando exibições repetitivas indesejadas.</p>
        <div class="byline"><span>Privacidade técnica</span><span>Atualizado em <time datetime="${UPDATED_ISO}">${UPDATED_LABEL}</time></span></div>
      </div>
      <h2>1. Armazenamento local do Pop-up (<code>thony_lead_popup_state_v1</code>)</h2>
      <p>Quando você fecha o pop-up ou cadastra seu e-mail, gravamos uma chave leve no <code>localStorage</code> do seu próprio navegador indicando o imóvel em destaque já visualizado. Assim, o pop-up só volta a ser exibido automaticamente quando um <strong>novo imóvel em destaque</strong> for adicionado ao catálogo.</p>
      <h2>2. Métricas de desempenho e segurança de borda</h2>
      <p>Nossa hospedagem utiliza a rede global Cloudflare/NexaCloud para entrega em alta velocidade (HTTPS/TLS) e proteção contra acessos automatizados maliciosos, podendo empregar cookies técnicos estritamente necessários de segurança e performance sem rastreamento publicitário invasivo de terceiros.</p>
      <h2>3. Como gerenciar ou limpar</h2>
      <p>Você pode limpar os dados locais e cookies a qualquer momento nas configurações de privacidade do seu navegador (Chrome, Safari, Firefox ou Edge) sem qualquer prejuízo à navegação nas páginas dos empreendimentos.</p>
    `,
  },
  {
    slug: 'descadastrar',
    title: 'Cancelar Inscrição de E-mails (Opt-out em 1 Clique)',
    description:
      'Cancele o recebimento dos e-mails periódicos da Thony Oliveira Imóveis de forma imediata e automática.',
    contentHtml: `
      <div class="tldr-box">
        <strong>Cancelamento imediato e respeitoso</strong>
        <p>Confirme abaixo o seu endereço de e-mail para interromper imediatamente o envio das nossas oportunidades imobiliárias. Seu pedido é processado na hora na nossa base.</p>
      </div>
      <div style="background:#fff;border:1px solid #dfe1d7;padding:28px;max-width:540px;margin:24px 0;">
        <form id="unsubForm" style="display:flex;flex-direction:column;gap:14px;">
          <label style="display:flex;flex-direction:column;gap:6px;">
            <span style="font:800 10px 'Manrope',sans-serif;letter-spacing:.15em;color:#5c6c61;">E-MAIL PARA DESCADASTRAR *</span>
            <input id="unsubEmail" type="email" required placeholder="voce@exemplo.com.br" style="padding:14px;border:1px solid #cfd4c8;font:500 14px 'DM Sans',sans-serif;color:#17382e;">
          </label>
          <button id="unsubBtn" type="submit" style="padding:16px 22px;background:#17382e;color:#fff;border:0;font:800 11.5px 'Manrope',sans-serif;letter-spacing:.11em;text-transform:uppercase;cursor:pointer;">
            CONFIRMAR CANCELAMENTO DE INSCRIÇÃO
          </button>
          <p id="unsubStatus" style="font-size:13.5px;line-height:1.6;margin:4px 0 0;color:#17382e;display:none;"></p>
        </form>
      </div>
      <script>
      (function(){
        var params = new URLSearchParams(window.location.search);
        var emailParam = (params.get('email') || '').trim();
        var inp = document.getElementById('unsubEmail');
        var form = document.getElementById('unsubForm');
        var btn = document.getElementById('unsubBtn');
        var st = document.getElementById('unsubStatus');
        if (emailParam && inp) inp.value = emailParam;
        function doUnsub(emailVal){
          btn.disabled = true;
          btn.textContent = 'PROCESSANDO CANCELAMENTO...';
          st.style.display = 'block';
          st.textContent = 'Removendo seu e-mail da lista ativa...';
          fetch('https://thony-oliveira-email.andrealmeidashop.workers.dev/api/unsubscribe', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: emailVal })
          }).then(function(r){ return r.json().catch(function(){ return {}; }); }).then(function(){
            btn.textContent = 'INSCRIÇÃO CANCELADA COM SUCESSO';
            st.style.color = '#17382e';
            st.innerHTML = '<strong>Pronto!</strong> O endereço <b>' + emailVal.replace(/</g,'&lt;') + '</b> foi removido da nossa cadência de e-mails.';
          }).catch(function(){
            btn.disabled = false;
            btn.textContent = 'CONFIRMAR CANCELAMENTO DE INSCRIÇÃO';
            st.innerHTML = 'Solicitação registrada. Caso precise de atendimento imediato, fale conosco no WhatsApp ${WHATSAPP_SHOWN}.';
          });
        }
        if (form) {
          form.addEventListener('submit', function(e){
            e.preventDefault();
            var v = (inp.value || '').trim().toLowerCase();
            if (v) doUnsub(v);
          });
        }
        if (emailParam && params.get('auto') === '1') {
          doUnsub(emailParam);
        }
      })();
      </script>
    `,
  },
];

function renderLegalPage(lp) {
  const url = `/${lp.slug}/`;
  const fullUrl = `${site}${url}`;
  const robots = lp.slug === 'descadastrar' ? 'noindex,follow' : active ? 'index,follow' : 'noindex,nofollow';
  const canonical = `<link rel="canonical" href="${fullUrl}">`;
  const waHref = waLink(`Olá, Thony! Acessei a página "${lp.title}" no site e gostaria de tirar uma dúvida.`, WA);
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: lp.title, item: fullUrl },
        ],
      },
      {
        '@type': 'WebPage',
        name: lp.title,
        description: lp.description,
        url: fullUrl,
        dateModified: UPDATED_ISO,
        inLanguage: 'pt-BR',
        publisher: PROVIDER_SCHEMA,
      },
    ],
  });

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#17382e"><meta name="robots" content="${robots}"><title>${escapeHtml(lp.title)} | Thony Oliveira Imóveis</title><meta name="description" content="${escapeHtml(lp.description)}">${canonical}<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Thony Oliveira Imóveis"><meta property="og:url" content="${fullUrl}"><meta property="og:title" content="${escapeHtml(lp.title)} | Thony Oliveira Imóveis"><meta property="og:description" content="${escapeHtml(lp.description)}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;600;700;800&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet"><link rel="stylesheet" href="/landing.css"><script type="application/ld+json">${schema}</script></head>
<body><header><a href="/" class="brand"><span class="badge">T·O</span><span><b>THONY OLIVEIRA</b><small>IMÓVEIS · GOIÂNIA, GOIANIRA &amp; GOIÁS</small></span></a><nav><a href="/">Início</a><a href="/#imoveis">Empreendimentos</a><a href="/?popup=1#receber-imoveis">Receber por E-mail</a><a href="${waHref}" class="nav-contact" target="_blank" rel="noopener noreferrer">WhatsApp ${WHATSAPP_SHOWN} ↗</a></nav></header>
<main>
<section class="details" style="padding-top:64px;"><article><p class="eyebrow">TRANSPARÊNCIA &amp; CONFORMIDADE LEGAL</p><p class="breadcrumbs"><a href="/">Início</a> / ${escapeHtml(lp.title)}</p><h1 style="font-size:clamp(34px,4.5vw,56px);margin:14px 0 22px;">${escapeHtml(lp.title)}<em>.</em></h1>${lp.contentHtml}</article><aside><div class="box"><p class="eyebrow">PÁGINAS LEGAIS E PRIVACIDADE</p><h3>Transparência em cada etapa.</h3><p>Consulte todos os nossos documentos de conformidade e gestão de comunicação por e-mail:</p><a href="/privacidade/">POLÍTICA DE PRIVACIDADE (LGPD) ↗</a><a href="/termos/">TERMOS DE USO E CONDIÇÕES ↗</a><a href="/cookies/">POLÍTICA DE COOKIES ↗</a><a href="/descadastrar/">CANCELAR INSCRIÇÃO DE E-MAIL ↗</a><a href="/?popup=1#receber-imoveis">CADASTRAR E-MAIL NO POP-UP ↗</a></div></aside></section>
</main>
<footer><strong>THONY OLIVEIRA.</strong><span>GOIÂNIA, GOIANIRA &amp; GOIÁS · WHATSAPP ${WHATSAPP_SHOWN}</span><span style="display:flex;gap:12px;flex-wrap:wrap;"><a href="/privacidade/">PRIVACIDADE</a><a href="/termos/">TERMOS</a><a href="/cookies/">COOKIES</a><a href="/descadastrar/">DESCADASTRAR</a></span><a href="/">VOLTAR PARA INÍCIO ↑</a></footer>
</body></html>`;
}

for (const lp of legalPages) {
  const folder = path.join(output, lp.slug);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), renderLegalPage(lp));
}

// 4) GEO: llms.txt e llms-full.txt para citabilidade em ChatGPT, Perplexity, Claude e Gemini
const llmsSummary = `# Thony Oliveira Imóveis — Goiânia, Goianira e Goiás

> Consultoria imobiliária especializada em loteamentos planejados e condomínios horizontais fechados em Goiânia (Região Norte, ao lado da UFG), Goianira (eixo da rodovia duplicada GO-070), Região Metropolitana de Goiânia (RMG) e Estado de Goiás.

- Website oficial: ${site}/
- WhatsApp direto: ${WHATSAPP_SHOWN} (https://wa.me/${WA})
- Área atendida: ${GOIAS_CITIES.join(', ')} e Estado de Goiás (BR-GO)
- Atualizado em: ${UPDATED_ISO}

## Empreendimentos Oficiais em Comercialização

${EMPREENDIMENTOS.map(
  (e) =>
    `- [${e.name}](${site}/empreendimentos/${e.slug}/): ${e.modality} em ${e.region} (${e.developers}). ${e.compare.lotes}, lotes ${e.compare.metragem}. Diferencial: ${e.compare.diferencial}. Condição referencial: ${e.priceHighlight}${e.tour360Url ? `. Tour Virtual 360°: ${e.tour360Url}` : ''}.`
).join('\n')}

## Guias Regionais de Goiás e Grande Goiânia

${exploreData
  .slice(0, 18)
  .map((r) => `- [${r[1]}](${site}/explorar/${r[0]}/): ${r[2]}`)
  .join('\n')}

## Versão completa para modelos de IA
- [llms-full.txt](${site}/llms-full.txt): fichas técnicas completas, registros em cartório, tempos de deslocamento e perguntas frequentes.
`;

const llmsFull = `# Thony Oliveira Imóveis — Dossiê Completo (Goiânia, Goianira e Goiás)

Atualizado em: ${UPDATED_ISO}
Website: ${site}/
WhatsApp: ${WHATSAPP_SHOWN} (https://wa.me/${WA})
Cobertura: Estado de Goiás, com atuação direta em ${GOIAS_CITIES.join(', ')}.

---

${EMPREENDIMENTOS.map(
  (e) => `## ${e.name}
- URL: ${site}/empreendimentos/${e.slug}/
- Cidade / Região: ${e.city} — ${e.region}
- Modalidade: ${e.modality} (${e.badge})
- Realização: ${e.developers}
- Localização: ${e.locationLine}
- Condição referencial: ${e.priceHighlight} (${e.priceDetail})
- Aviso legal: ${e.priceLegal}
${e.tour360Url ? `- Tour Virtual 360° oficial: ${e.tour360Url}\n` : ''}
### Resumo
${e.summary.join('\n\n')}

### Indicadores Principais
${e.metrics.map((m) => `- **${m.label}:** ${m.value} (${m.sub})`).join('\n')}

### Diferenciais e Lazer
${e.amenities.map((a) => `- ${a}`).join('\n')}

### Documentação e Segurança Jurídica
- **Incorporadoras:** ${e.legal.incorporadoras}
- **Registro / Aprovação:** ${e.legal.registro}
- **Entrega / Obras:** ${e.legal.entrega}
- **Endereço / Região:** ${e.legal.address}

### Tempos de Deslocamento
${e.distances.map((d) => `- ${d.time}: ${d.place}`).join('\n')}

### Perguntas Frequentes
${e.faqs.map(([q, a]) => `**${q}**\n${a}`).join('\n\n')}
`
).join('\n---\n\n')}
`;

fs.writeFileSync(path.join(output, 'llms.txt'), llmsSummary);
fs.writeFileSync(path.join(output, 'llms-full.txt'), llmsFull);

// 5) Sitemap (com lastmod e prioridades) e robots.txt (liberado para Google + crawlers de IA/GEO)
if (site.startsWith('https://') && site !== 'https://example.com' && active) {
  const highPriorityExplore = new Set([
    'imoveis-em-goias',
    'loteamentos-em-goias',
    'regiao-metropolitana-de-goiania',
    'lotes-regiao-norte-goiania',
    'imoveis-eixo-go-070',
    'imoveis-em-goianira',
    'lotes-em-goianira',
    'condominio-fechado-goianira',
    'terrenos-perto-ufg-goiania',
    'imoveis-em-goiania',
    'terrenos-a-venda-em-goiania',
    'investir-em-terrenos-goiania-goias',
    'melhores-condominios-horizontais-goiania-regiao',
  ]);
  const entries = [
    { path: '/', priority: '1.0', freq: 'weekly' },
    ...EMPREENDIMENTOS.map((e) => ({
      path: `/empreendimentos/${e.slug}/`,
      priority: '0.9',
      freq: 'weekly',
    })),
    ...exploreData.map((r) => ({
      path: `/explorar/${r[0]}/`,
      priority: highPriorityExplore.has(r[0]) ? '0.8' : '0.7',
      freq: 'monthly',
    })),
    { path: '/privacidade/', priority: '0.5', freq: 'yearly' },
    { path: '/termos/', priority: '0.5', freq: 'yearly' },
    { path: '/cookies/', priority: '0.5', freq: 'yearly' },
  ];
  fs.writeFileSync(
    path.join(output, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
      .map(
        (u) =>
          `<url><loc>${site}${u.path}</loc><lastmod>${UPDATED_ISO}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`
      )
      .join('\n')}\n</urlset>\n`
  );
  fs.writeFileSync(
    path.join(output, 'robots.txt'),
    [
      'User-agent: *',
      'Allow: /',
      '',
      '# AI Search & Generative Engine Optimization (GEO)',
      'User-agent: GPTBot',
      'Allow: /',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      'User-agent: ChatGPT-User',
      'Allow: /',
      'User-agent: ClaudeBot',
      'Allow: /',
      'User-agent: PerplexityBot',
      'Allow: /',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      `Sitemap: ${site}/sitemap.xml`,
      `# LLMs guide: ${site}/llms.txt`,
      '',
    ].join('\n')
  );
} else {
  fs.writeFileSync(
    path.join(output, 'robots.txt'),
    `User-agent: *\nAllow: /\n# Modo demonstrativo: páginas com meta noindex.\n`
  );
}

console.log(
  `Páginas estáticas geradas: ${EMPREENDIMENTOS.length} empreendimentos + ${exploreData.length} páginas SEO/GEO + llms.txt (${
    active ? 'modo produção: index,follow' : 'modo demonstrativo: noindex'
  })`
);
