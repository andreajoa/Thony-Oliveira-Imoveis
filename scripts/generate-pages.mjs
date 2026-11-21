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

const WA_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

const escapeHtml = (t) =>
  String(t)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

// 1) Atualiza dist/index.html com robots, canonical e fallback semântico real
const homeFile = path.join(output, 'index.html');
if (fs.existsSync(homeFile)) {
  let homeHtml = fs.readFileSync(homeFile, 'utf8');
  if (active) {
    homeHtml = homeHtml.replace('content="noindex,nofollow"', 'content="index,follow"');
    if (site.startsWith('https://') && site !== 'https://example.com') {
      homeHtml = homeHtml.replace('</head>', `<link rel="canonical" href="${site}/"></head>`);
    }
  } else {
    homeHtml = homeHtml.replace('content="index,follow"', 'content="noindex,nofollow"');
  }

  const devLinksHtml = EMPREENDIMENTOS.map(
    (e) =>
      `<li><a href="/empreendimentos/${e.slug}/">${escapeHtml(e.name)} — ${escapeHtml(e.region)} (${escapeHtml(e.priceHighlight)})</a></li>`
  ).join('');

  homeHtml = homeHtml.replace(
    '<div id="root"></div>',
    `<div id="root"><main><section><h1>Thony Oliveira Imóveis: Loteamentos e Condomínios em Goiânia e Goianira</h1><p>Conheça nossos 4 empreendimentos selecionados: Residencial Parque Universitário (ao lado da UFG), Condomínio Horizontal Terraví Ipês, Condomínio Horizontal Pinheiros e Residencial Flora Nogueira.</p><ul>${devLinksHtml}</ul></section></main></div>`
  );
  fs.writeFileSync(homeFile, homeHtml);
}

// 2) Gera as 4 páginas estáticas dedicadas dos empreendimentos reais
function renderEmpreendimentoPage(e) {
  const url = `/empreendimentos/${e.slug}/`;
  const fullUrl = `${site}${url}`;
  const robots = active ? 'index,follow' : 'noindex,nofollow';
  const canonical =
    site && site !== 'https://example.com' ? `<link rel="canonical" href="${fullUrl}">` : '';
  const waMain = waLink(e.whatsappMessage, WA);
  const waBook = waLink(e.bookWhatsappMessage, WA);
  const others = EMPREENDIMENTOS.filter((x) => x.id !== e.id);

  const schemaGraph = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Empreendimentos', item: `${site}/#imoveis` },
          { '@type': 'ListItem', position: 3, name: e.name, item: fullUrl },
        ],
      },
      {
        '@type': 'RealEstateListing',
        name: e.name,
        description: e.seoDescription,
        url: fullUrl,
        image: `${site}${e.cover}`,
        areaServed: `${e.city}, Goiás, Brasil`,
        provider: {
          '@type': 'RealEstateAgent',
          name: 'Thony Oliveira Imóveis',
          telephone: `+${WA}`,
          url: `${site}/`,
        },
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
<title>${escapeHtml(e.seoTitle)} | Thony Oliveira Imóveis</title>
<meta name="description" content="${escapeHtml(e.seoDescription)}">
${canonical}
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(e.seoTitle)} | Thony Oliveira Imóveis">
<meta property="og:description" content="${escapeHtml(e.seoDescription)}">
<meta property="og:image" content="${site}${e.cover}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/empreendimento.css">
<script type="application/ld+json">${schemaGraph}</script>
</head>
<body>
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

// 3) Páginas regionais e de busca (/explorar/<slug>/index.html) — conectadas aos empreendimentos reais
const exploreData = [
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
  const canonical =
    site && site !== 'https://example.com' ? `<link rel="canonical" href="${site}${url}">` : '';
  const robots = active ? 'index,follow' : 'noindex,nofollow';
  const links = exploreData.filter((_, j) => j !== index).slice(index % 6, (index % 6) + 6);
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

  const crumbs = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: title, item: `${site}${url}` },
    ],
  });

  const faq = [
    [
      `Como começar a procurar ${title.toLowerCase()}?`,
      'Defina orçamento, objetivo (moradia ou investimento) e preferência entre loteamento aberto ou condomínio fechado. Peça o espelho atualizado de unidades e agende visita ao local.',
    ],
    [
      'O que verificar antes de assinar o contrato de compra de lote?',
      'Confira o número do decreto municipal de aprovação, o registro da matrícula no Cartório de Registro de Imóveis, o memorial descritivo, o prazo de entrega das obras e o índice de reajuste das parcelas.',
    ],
  ];

  const waHref = waLink(
    `Olá, Thony! Vi a página "${title}" no site e quero conhecer os empreendimentos disponíveis.`,
    WA
  );

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="${robots}"><title>${escapeHtml(title)} | Thony Oliveira Imóveis</title><meta name="description" content="${escapeHtml(description)}">${canonical}<meta property="og:title" content="${escapeHtml(title)} | Thony Oliveira Imóveis"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:image" content="${site}${image}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;600;700&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet"><link rel="stylesheet" href="/landing.css"><script type="application/ld+json">${crumbs}</script></head>
<body><header><a href="/" class="brand"><span class="badge">T·O</span><span><b>THONY OLIVEIRA</b><small>IMÓVEIS · GOIÂNIA &amp; GOIANIRA</small></span></a><nav><a href="/">Início</a><a href="/#imoveis">Empreendimentos</a><a href="/#comparativo">Comparativo</a><a href="${waHref}" class="nav-contact" target="_blank" rel="noopener noreferrer">WhatsApp ${WHATSAPP_SHOWN} ↗</a></nav></header>
<main>
<section class="hero"><div class="hero-content"><p class="eyebrow">GOIÂNIA &amp; GOIANIRA · GUIA IMOBILIÁRIO</p><p class="breadcrumbs"><a href="/">Início</a> / Explorar / ${escapeHtml(title)}</p><h1>${escapeHtml(title)}<em>.</em></h1><p class="lead">${escapeHtml(description)}</p><a class="cta" href="${waHref}" target="_blank" rel="noopener noreferrer">FALAR COM THONY NO WHATSAPP ↗</a></div><div class="hero-photo"><img src="${image}" alt="${escapeHtml(title)}"><span>THONY OLIVEIRA IMÓVEIS</span></div></section>
<section class="featured-devs"><p class="eyebrow">DISPONÍVEIS NO PORTFÓLIO</p><h2>Empreendimentos selecionados para você.</h2><div class="dev-mini-grid">${devsHtml}</div></section>
<section class="details"><article><p class="eyebrow">ENTENDA SUA BUSCA</p><h2>Encontre uma escolha que faça sentido.</h2><p>${escapeHtml(body)}</p><h3>O que vale observar</h3><p>${escapeHtml(takeaway)} Compare sempre localização, registro em cartório, infraestrutura entregue e condições de pagamento direto.</p><h3>Atendimento transparente</h3><p>Entre em contato pelo WhatsApp ${WHATSAPP_SHOWN} para receber o Book Digital completo, o espelho de lotes disponíveis e agendar visita presencial acompanhada.</p></article><aside><div class="box"><p class="eyebrow">ATENDIMENTO THONY OLIVEIRA</p><h3>Receba a tabela atualizada hoje mesmo.</h3><p>Tire dúvidas sobre documentação, entrada facilitada, parcelas e localização exata dos empreendimentos em Goiânia e Goianira.</p><a href="${waHref}" target="_blank" rel="noopener noreferrer">CONVERSAR NO WHATSAPP ${WHATSAPP_SHOWN} ↗</a></div></aside></section>
<section class="related"><p class="eyebrow">CONTINUE EXPLORANDO</p><h2>Outros caminhos para o seu próximo endereço.</h2><div class="links">${related}</div></section>
<section class="faq"><p class="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas antes de escolher seu terreno.</h2>${faq.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join('')}</section>
</main>
<footer><strong>THONY OLIVEIRA.</strong><span>GOIÂNIA &amp; GOIANIRA · WHATSAPP ${WHATSAPP_SHOWN}${CRECI ? ` · CRECI ${escapeHtml(CRECI)}` : ''}</span><a href="/">VOLTAR PARA INÍCIO ↑</a></footer>
<a class="wa-float" href="${waHref}" target="_blank" rel="noopener noreferrer" aria-label="Conversar com Thony no WhatsApp ${WHATSAPP_SHOWN}">${WA_ICON}<span>WhatsApp</span></a>
</body></html>`;
}

for (let i = 0; i < exploreData.length; i++) {
  const folder = path.join(output, 'explorar', exploreData[i][0]);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), renderExplorePage(exploreData[i], i));
}

// 4) Sitemap e robots.txt
if (site.startsWith('https://') && site !== 'https://example.com' && active) {
  const urls = [
    '/',
    ...EMPREENDIMENTOS.map((e) => `/empreendimentos/${e.slug}/`),
    ...exploreData.map((r) => `/explorar/${r[0]}/`),
  ];
  fs.writeFileSync(
    path.join(output, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((p) => `<url><loc>${site}${p}</loc></url>`)
      .join('\n')}\n</urlset>\n`
  );
  fs.writeFileSync(
    path.join(output, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`
  );
} else {
  fs.writeFileSync(
    path.join(output, 'robots.txt'),
    `User-agent: *\nAllow: /\n# Modo demonstrativo: páginas com meta noindex.\n`
  );
}

console.log(
  `Páginas estáticas geradas: ${EMPREENDIMENTOS.length} empreendimentos + ${exploreData.length} páginas SEO (${
    active ? 'modo produção: index,follow' : 'modo demonstrativo: noindex'
  })`
);
