// Catálogo real de empreendimentos — fonte única para a Home (React), Pop-up de captura,
// páginas estáticas (SEO/GEO) e cadência de 20 e-mails (envio de 5 em 5 dias via Resend + Brevo).
//
// REGRA FIXA DO POP-UP ("IMÓVEL NOVO EM DESTAQUE"):
// Sempre que um novo empreendimento for adicionado ao array EMPREENDIMENTOS:
// 1) Defina `addedAt` com a data ISO atual (ex.: '2026-11-25') e/ou `featuredInPopup: true`.
// 2) A função `getPopupFeaturedEmpreendimento()` seleciona automaticamente o imóvel mais recente
//    (ou o que estiver marcado com `featuredInPopup: true`) como destaque principal do Pop-up
//    (com vídeo curto em loop e fallback automático para a foto de capa).

export const WHATSAPP_DEFAULT = '5562985292886';
export const WHATSAPP_SHOWN = '(62) 98529-2886';
export const EMAIL_API_BASE = 'https://thony-oliveira-email.andrealmeidashop.workers.dev';

export const EMPREENDIMENTOS = [
  {
    id: 'condominio-pinheiros',
    slug: 'condominio-pinheiros-goianira',
    addedAt: '2026-11-21T23:35:00Z',
    featuredInPopup: true,
    emailLoopGif: '/email/loop-pinheiros.gif',
    popupVideo: '/email/popup-loop.mp4',
    popupHook:
      'Em destaque a 800 m da GO-070: apenas 109 lotes de 287 a 486 m², lago privativo de +5 mil m² para pesca e parcelas a partir de R$ 654,19*.',
    name: 'Condomínio Horizontal Pinheiros',
    shortName: 'Condomínio Pinheiros',
    badge: '★ EM DESTAQUE · APENAS 109 LOTES · COM LAGO',
    modality: 'Condomínio Fechado',
    usage: 'Residencial · Acesso Controlado',
    city: 'Goianira',
    region: 'Goianira · 800 m da GO-070',
    regionFilter: 'Goianira · Eixo GO-070',
    locationLine: 'Rua Adoniram Barbosa, Goianira – GO · A 800 m da GO-070',
    developers: 'MAC Empreendimentos e +VGV Brasil',
    tagline: 'Naturalmente exclusivo: apenas 109 lotes e lago de pesca com mais de 5 mil m².',
    shortDescription:
      'Condomínio fechado intimista em Goianira com apenas 109 terrenos de 287 a 486 m², lago de +5 mil m², fire place, piscina e parcelas a partir de R$ 654,19*.',
    summary: [
      'O Condomínio Horizontal Pinheiros é um empreendimento da MAC Empreendimentos (47 anos de história) com gestão comercial da +VGV Brasil, localizado a apenas 800 metros da GO-070, em Goianira, ao lado do consolidado Rosa de Leiria.',
      'Com apenas 109 terrenos de 287 m² a 486 m² em uma gleba de quase 90 mil m², oferece a exclusividade rara de um condomínio boutique, abraçado por quase 30 mil m² somados de área verde/APP e um lago natural de mais de 5 mil m² para pesca e contemplação.',
      'São 19 itens de lazer e convivência pensados para toda a família — de piscina, academia, salão de festas e quadra de areia a fire place, deck do lago, chalés de pesca, casa de bonecas e pet place — com parcelas a partir de R$ 654,19*, um dos melhores custos-benefício entre os condomínios fechados da Região Metropolitana de Goiânia.',
    ],
    priceHighlight: 'Parcelas a partir de R$ 654,19*',
    priceDetail: 'Terrenos de 287 a 486 m² · Entrada facilitada + financiamento direto',
    priceLegal:
      '*Parcelas referenciais a partir de R$ 654,19 conforme tabela comercial vigente MAC Empreendimentos / +VGV Brasil. Valores sujeitos à disponibilidade de unidade.',
    metrics: [
      { label: 'EXCLUSIVIDADE', value: '109 lotes', sub: 'condomínio de baixa densidade' },
      { label: 'METRAGEM', value: '287–486 m²', sub: 'entrega prevista mai/2029' },
      { label: 'LAGO PRIVATIVO', value: '+5 mil m²', sub: 'com deck e 2 chalés de pesca' },
      { label: 'CONDIÇÃO', value: 'R$ 654,19*', sub: 'parcelas a partir · 19 itens de lazer' },
    ],
    compare: {
      perfil: 'Exclusividade máxima, silêncio e vida à beira do lago',
      lotes: 'Apenas 109 lotes',
      metragem: '287 a 486 m²',
      diferencial: 'Lago de +5 mil m² para pesca + 19 itens de lazer',
      condicao: 'Parcelas a partir de R$ 654,19*',
    },
    tags: ['Em Destaque', 'Condomínio Fechado', 'Exclusivo', 'Lago de Pesca', 'Moradia'],
    goals: ['Moradia', 'Investimento'],
    cover: '/empreendimentos/condominio-pinheiros/01-portaria.webp',
    coverAlt:
      'Portaria contemporânea com segurança 24h do Condomínio Horizontal Pinheiros em Goianira',
    implantationImage: '/empreendimentos/condominio-pinheiros/08-implantacao.webp',
    implantationNote:
      'Implantação oficial dos 109 lotes em 6 quadras, destacando o lago de +5 mil m² ao oeste e o clube de lazer no eixo central.',
    tour360Url: null,
    gallery: [
      {
        src: '/empreendimentos/condominio-pinheiros/01-portaria.webp',
        title: 'Portaria com segurança 24h',
        caption: 'Chegada imponente em pedra natural, controle de acesso e paisagismo tropical.',
      },
      {
        src: '/empreendimentos/condominio-pinheiros/02-lago-pista.webp',
        title: 'Lago de +5 mil m² e pista de caminhada',
        caption: 'Deck sobre a água e caminhada matinal em meio aos pássaros e árvores.',
      },
      {
        src: '/empreendimentos/condominio-pinheiros/03-piscina.webp',
        title: 'Piscina com deck e lazer',
        caption: 'Deck amadeirado, espreguiçadeiras, playground e quadra de areia integrados.',
      },
      {
        src: '/empreendimentos/condominio-pinheiros/04-fireplace.webp',
        title: 'Fire Place ao pôr do sol',
        caption: 'Espaço acolhedor à beira do lago para relaxar ao final do dia.',
      },
      {
        src: '/empreendimentos/condominio-pinheiros/05-complexo-lazer.webp',
        title: 'Vista aérea do clube central',
        caption: 'Salão de festas, academia, piscina, campo society e quadra de areia.',
      },
      {
        src: '/empreendimentos/condominio-pinheiros/06-chale-pesca.webp',
        title: 'Chalé de pesca à beira do lago',
        caption: 'Dois chalés exclusivos voltados para pesca esportiva e contemplação.',
      },
      {
        src: '/empreendimentos/condominio-pinheiros/07-drone-regiao.webp',
        title: 'Foto real de drone em Goianira',
        caption: 'Entorno consolidado a 800 m da GO-070 e 1 min do Open Mall Rosa de Leiria.',
      },
    ],
    amenities: [
      'Portaria com segurança e controle de acesso 24h',
      'Lago com mais de 5 mil m² + Deck do Lago',
      '2 Chalés de Pesca à beira d’água',
      'Fire Place e Pergolado contemplativo',
      'Piscina com deck de madeira',
      'Salão de Festas e 2 Espaços Gourmet',
      'Academia equipada e Pista de Caminhada',
      'Campo de Futebol Society e Quadra de Areia',
      'Casa de Bonecas, Brinquedoteca e Playground',
      'Pet Place cercado',
      'Quase 30 mil m² de áreas verdes e APP preservada',
    ],
    distances: [
      { time: '1 min', place: 'Open Mall Rosa de Leiria' },
      { time: '3 min', place: 'Restaurante Flor da Roça' },
      { time: '4 min', place: 'Max Atacadão' },
      { time: '10 min', place: 'Centro de Goianira' },
      { time: '16 min', place: 'HUGOL e Costa Atacadão' },
      { time: '19 min', place: 'Portal Shopping' },
      { time: '30 min', place: 'Passeio das Águas Shopping' },
      { time: '800 m', place: 'Rodovia GO-070' },
    ],
    legal: {
      incorporadoras: 'MAC Empreendimentos (SPE Loteamento Residencial Pinheiros Ltda) · Gestão +VGV Brasil',
      registro: 'Decretos Municipais nº 122/2025 e 148/2025 (Goianira-GO) · Registro R-5 da matrícula nº 45.383 no CRI de Goianira.',
      entrega: 'Prazo contratual de entrega das obras: até 13/05/2029.',
      address: 'Rua Adoniram Barbosa, Goianira – GO · CEP 75.368-203',
      disclaimer:
        'Imagens e perspectivas artísticas ilustrativas. Mobiliário e vegetação adulta são referenciais. Consulte memorial descritivo e tabela comercial vigente.',
    },
    whatsappMessage:
      'Olá, Thony! Quero receber a tabela do Condomínio Horizontal Pinheiros (parcelas a partir de R$ 654,19*) e agendar uma visita.',
    bookWhatsappMessage:
      'Olá, Thony! Pode me enviar o Book Digital completo e a tabela com parcelas a partir de R$ 654,19* do Condomínio Pinheiros?',
    seoTitle: 'Condomínio Horizontal Pinheiros Goianira | Parcelas a partir de R$ 654,19*',
    seoDescription:
      'Condomínio fechado Pinheiros em Goianira (800 m da GO-070): parcelas a partir de R$ 654,19*, apenas 109 terrenos de 287 a 486 m², lago de +5 mil m², piscina, fire place e 19 itens de lazer.',
    faqs: [
      [
        'Quantos lotes existem no Condomínio Pinheiros e qual o valor das parcelas?',
        'São apenas 109 lotes residenciais de 287 m² a 486 m², com parcelas referenciais a partir de R$ 654,19* e parcelamento direto com a incorporadora.',
      ],
      [
        'O Condomínio Pinheiros é registrado em cartório?',
        'Sim. Aprovado pelos Decretos Municipais nº 122/2025 e 148/2025 da Prefeitura de Goianira e registrado sob o R-5 da matrícula 45.383 do CRI de Goianira, com previsão de entrega das obras até 13/05/2029.',
      ],
      [
        'O lago do condomínio permite pesca?',
        'Sim! O lago tem mais de 5 mil m² e conta com deck de contemplação e 2 chalés de pesca, além de fire place e pista de caminhada no entorno.',
      ],
    ],
  },

  {
    id: 'parque-universitario',
    slug: 'parque-universitario-goiania',
    addedAt: '2026-11-21T10:00:00Z',
    featuredInPopup: false,
    emailLoopGif: '/email/loop-parque.gif',
    popupVideo: '/email/popup-loop.mp4',
    popupHook:
      'Lançamento em Goiânia ao lado da UFG: lotes residenciais e comerciais a partir de 270 m² com +48 mil m² de natureza e lazer a partir de R$ 990/m².',
    name: 'Residencial Parque Universitário',
    shortName: 'Parque Universitário',
    badge: 'LANÇAMENTO · GOIÂNIA',
    modality: 'Loteamento Aberto',
    usage: 'Residencial e Comercial',
    city: 'Goiânia',
    region: 'Região Norte · Ao lado da UFG',
    regionFilter: 'Goiânia · Região Norte (UFG)',
    locationLine: 'Região Norte de Goiânia · Vizinho à UFG Campus Samambaia',
    developers: 'Landcorp Participações e Ética Urbanismo',
    tagline: 'Ao lado da UFG, em uma das regiões mais valorizadas de Goiânia.',
    shortDescription:
      'Loteamento planejado na capital com 528 lotes residenciais e comerciais a partir de 270 m² e mais de 48 mil m² de natureza e lazer.',
    summary: [
      'O Residencial Parque Universitário está localizado na região Norte de Goiânia, literalmente vizinho à Universidade Federal de Goiás (UFG — Campus Samambaia), com acesso facilitado pela Av. Esperança, Alameda Flamboyant e Perimetral Norte.',
      'Desenvolvido pela Landcorp Participações e pela Ética Urbanismo, o empreendimento reúne 528 lotes (480 residenciais e 48 comerciais) em uma área de 153,8 mil m², preservando mais de 48 mil m² de área verde e lazer ao ar livre.',
      'Por estar inserido em uma região já adensada, cosmopolita e impulsionada pela comunidade acadêmica da UFG, reúne alto potencial de valorização e liquidez tanto para moradia quanto para renda e comércio local.',
    ],
    priceHighlight: 'A partir de R$ 990/m²',
    priceDetail: 'Lotes a partir de 270 m² · Condições especiais à vista e parcelamento direto',
    priceLegal:
      'Valores e disponibilidade sujeitos à tabela vigente da incorporadora no momento da consulta.',
    metrics: [
      { label: 'TOTAL DE LOTES', value: '528', sub: '480 res. + 48 com.' },
      { label: 'METRAGEM', value: '270 m²+', sub: 'residenciais e comerciais' },
      { label: 'NATUREZA E LAZER', value: '+48 mil m²', sub: 'em 153,8 mil m² totais' },
      { label: 'CONDIÇÃO', value: 'R$ 990/m²', sub: 'a partir · consulte tabela' },
    ],
    compare: {
      perfil: 'Capital, UFG e alta liquidez (morar ou investir)',
      lotes: '528 (480 res. + 48 com.)',
      metragem: 'A partir de 270 m²',
      diferencial: 'Ao lado da UFG + 48 mil m² de verde',
      condicao: 'A partir de R$ 990/m²',
    },
    tags: ['Investimento', 'Moradia', 'Lote Comercial', 'Goiânia Capital'],
    goals: ['Investimento', 'Moradia'],
    cover: '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
    coverAlt:
      'Vista aérea panorâmica do Residencial Parque Universitário em Goiânia, ao lado do Campus Samambaia da UFG',
    implantationImage: '/empreendimentos/parque-universitario/09-implantacao.webp',
    implantationNote:
      'Implantação oficial em 17 quadras: 480 lotes residenciais, 48 lotes comerciais estratégicos e grande reserva de mata preservada.',
    tour360Url: null,
    gallery: [
      {
        src: '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
        title: 'Vista aérea junto à UFG',
        caption: 'Localização consolidada na Região Norte de Goiânia, ao lado do Campus Samambaia.',
      },
      {
        src: '/empreendimentos/parque-universitario/02-aerea-quadras.webp',
        title: 'Implantação urbana e paisagismo',
        caption: 'Ruas arborizadas com ipês, quadras planejadas e vista para o horizonte de Goiânia.',
      },
      {
        src: '/empreendimentos/parque-universitario/03-infraestrutura.webp',
        title: 'Infraestrutura completa',
        caption: 'Pavimentação asfáltica, drenagem pluvial, água tratada, rede de esgoto e iluminação.',
      },
      {
        src: '/empreendimentos/parque-universitario/04-praca-aerea.webp',
        title: 'Praça de lazer e estacionamento',
        caption: 'Convivência ao ar livre integrada à mata preservada do empreendimento.',
      },
      {
        src: '/empreendimentos/parque-universitario/05-academia-ar-livre.webp',
        title: 'Academia ao ar livre sob a copa das árvores',
        caption: 'Espaços de saúde e descanso em meio ao verde nativo.',
      },
      {
        src: '/empreendimentos/parque-universitario/06-estacao-ginastica.webp',
        title: 'Estação de ginástica e pista de caminhada',
        caption: 'Calçadas acessíveis com piso tátil, bicicletário e equipamentos funcionais.',
      },
      {
        src: '/empreendimentos/parque-universitario/07-playground.webp',
        title: 'Playground completo',
        caption: 'Área infantil equipada em madeira e piso seguro para toda a família.',
      },
      {
        src: '/empreendimentos/parque-universitario/08-pet-place.webp',
        title: 'Pet Place cercado',
        caption: 'Espaço dedicado ao lazer e convivência dos pets com circuitos e bancos.',
      },
    ],
    amenities: [
      'Mais de 48 mil m² de natureza e lazer',
      'Praça de Lazer arborizada',
      'Estação de Ginástica ao ar livre',
      'Pista de Caminhada acessível',
      'Playground infantil completo',
      'Pet Place cercado',
      'Quiosque de apoio com lavabos',
      'Estacionamento na área de lazer',
      '48 lotes comerciais planejados',
      'Infraestrutura completa (asfalto, drenagem, água, esgoto e iluminação)',
    ],
    distances: [
      { time: 'Ao lado', place: 'UFG — Campus Samambaia' },
      { time: '4 min', place: 'Villagio Toscana' },
      { time: '5 min', place: 'Clube Kaikan e GO-080' },
      { time: '6 min', place: 'Av. Perimetral Norte' },
      { time: '6 min', place: 'Atacadão Dia a Dia e CSF Itatiaia' },
      { time: '9 min', place: 'Passeio das Águas Shopping' },
      { time: '12 min', place: 'Aeroporto Santa Genoveva' },
      { time: '15 min', place: 'BR-153 e Araguaia Shopping' },
    ],
    legal: {
      incorporadoras: 'Landcorp Participações e Ética Urbanismo (Grupo Ética — 34 anos de mercado)',
      registro: 'Documentação urbanística e comercial disponível na consulta com o corretor.',
      entrega: 'Consulte o cronograma atualizado de obras e espelho de unidades disponíveis.',
      address: 'Região Norte · Av. Esperança / Alameda Flamboyant, Goiânia – GO',
      disclaimer:
        'Perspectivas artísticas ilustrativas. Condições comerciais, espelho de disponibilidade e memorial descritivo confirmados no atendimento.',
    },
    whatsappMessage:
      'Olá, Thony! Quero receber o espelho de lotes disponíveis, a tabela atualizada e agendar visita ao Residencial Parque Universitário (ao lado da UFG).',
    bookWhatsappMessage:
      'Olá, Thony! Pode me enviar a apresentação completa e o mapa de lotes disponíveis do Residencial Parque Universitário?',
    seoTitle: 'Residencial Parque Universitário Goiânia | Lotes ao lado da UFG',
    seoDescription:
      'Terrenos residenciais e comerciais a partir de 270 m² ao lado da UFG Campus Samambaia em Goiânia. 528 lotes, +48 mil m² de natureza e lazer a partir de R$ 990/m².',
    faqs: [
      [
        'Onde fica exatamente o Residencial Parque Universitário?',
        'Na Região Norte de Goiânia, vizinho ao Campus Samambaia da UFG, com acesso pela Av. Esperança e Alameda Flamboyant, a cerca de 6 minutos da Perimetral Norte e 9 minutos do Passeio das Águas Shopping.',
      ],
      [
        'O Parque Universitário tem lotes comerciais além de residenciais?',
        'Sim. São 528 lotes no total, divididos em 480 lotes residenciais e 48 lotes comerciais a partir de 270 m², ideais para atender à demanda de serviços e moradia do entorno da UFG.',
      ],
      [
        'Qual é o valor de referência e como consultar os lotes disponíveis?',
        'Os terrenos partem de R$ 990 o metro quadrado (conforme tabela e unidade). Fale direto com Thony no WhatsApp para receber o espelho atualizado de unidades e simular pagamento à vista ou parcelado.',
      ],
    ],
  },

  {
    id: 'terravi-ipes',
    slug: 'condominio-terravi-ipes-goianira',
    addedAt: '2026-11-21T09:00:00Z',
    featuredInPopup: false,
    emailLoopGif: '/email/loop-terravi.gif',
    popupVideo: '/email/popup-loop.mp4',
    popupHook:
      'Condomínio clube em Goianira com +30 itens de lazer, 115 mil m² de área verde, Tour Virtual 360° e parcelas referenciais a partir de R$ 697,76*.',
    name: 'Condomínio Horizontal Terraví Ipês',
    shortName: 'Terraví Ipês',
    badge: 'CONDOMÍNIO CLUBE · TOUR 360°',
    modality: 'Condomínio Fechado',
    usage: 'Residencial · Acesso Controlado',
    city: 'Goianira',
    region: 'Goianira · Eixo GO-070',
    regionFilter: 'Goianira · Eixo GO-070',
    locationLine: 'Goianira – GO · Acesso rápido pela GO-070 (15 min do Portal Shopping)',
    developers: 'Terrano Urbanismo',
    tagline: 'Mais de 30 itens de lazer, 115 mil m² de área verde e portaria inteligente.',
    shortDescription:
      'Condomínio fechado completo em Goianira com 578 lotes (230 a 482 m²), parque aquático com borda infinita, Arena Gamer, carregador elétrico e Tour 360°.',
    summary: [
      'O Condomínio Horizontal Terraví Ipês, realização da Terrano Urbanismo, traz para o eixo de valorização da GO-070 em Goianira o padrão de condomínio clube completo: são mais de 30 itens de lazer centralizados e mais de 115 mil m² de área verde — o equivalente a 16 campos de futebol.',
      'Projetado com portaria inteligente 24 horas, piscina com borda infinita, parque aquático infantil, academia equipada, Arena Gamer, espaço para minimercado, carregador para carro elétrico, 5 pomares e trilha ecológica, une segurança, natureza e conveniência no dia a dia.',
      'Na 1ª etapa, oferece lotes de 230 m² a 482 m² com entrega prevista para julho de 2029 e condições promocionais vigentes na Tabela Black (parcelamento linear, plano balão ou 36x fixas).',
    ],
    priceHighlight: 'Parcelas a partir de R$ 697,76*',
    priceDetail: 'Lotes 230 a 482 m² · Tabela Black Nov/26 (Gradiente, Price ou 36x fixas)',
    priceLegal:
      '*Ref. Tabela Black Terraví Gradiente (validade 01/11 a 01/12/2026), plano balão 0,59% + IPCA. Consulte unidade e vigência no WhatsApp.',
    metrics: [
      { label: 'TOTAL DE LOTES', value: '578', sub: 'em 24 quadras (2 etapas)' },
      { label: 'METRAGEM (1ª ETAPA)', value: '230–482 m²', sub: 'entrega prevista jul/2029' },
      { label: 'ÁREA VERDE', value: '+115 mil m²', sub: 'trilha ecológica + 5 pomares' },
      { label: 'CLUBE PRIVATIVO', value: '+30 itens', sub: 'com Tour Virtual 360°' },
    ],
    compare: {
      perfil: 'Condomínio clube completo para família e lazer resort',
      lotes: '578 lotes (2 etapas)',
      metragem: '230 a 482 m²',
      diferencial: '+30 itens de lazer, 115 mil m² verde e Tour 360°',
      condicao: 'Parcelas a partir de R$ 697,76*',
    },
    tags: ['Condomínio Fechado', 'Tour 360°', 'Moradia', 'Lazer Completo'],
    goals: ['Moradia', 'Investimento', 'Tour 360°'],
    cover: '/empreendimentos/terravi-ipes/01-portaria.webp',
    coverAlt:
      'Portaria inteligente do Condomínio Horizontal Terraví Ipês em Goianira rodeada por ipês floridos',
    implantationImage: '/empreendimentos/terravi-ipes/10-implantacao.webp',
    implantationNote:
      'Implantação oficial em 2 etapas com clube privativo centralizado, 21 setores numerados de lazer/serviços e cinturão de mata preservada.',
    tour360Url: 'https://tour.panoee.net/6928e2958cec5a493327c559',
    gallery: [
      {
        src: '/empreendimentos/terravi-ipes/01-portaria.webp',
        title: 'Portaria inteligente 24h',
        caption: 'Controle de acesso moderno, eclusas de segurança e paisagismo com ipês.',
      },
      {
        src: '/empreendimentos/terravi-ipes/02-parque-aquatico.webp',
        title: 'Parque aquático e piscina borda infinita',
        caption: 'Piscina adulto com borda infinita, piscina infantil, deck e pergolado.',
      },
      {
        src: '/empreendimentos/terravi-ipes/03-vista-geral.webp',
        title: 'Vista panorâmica e 115 mil m² de verde',
        caption: 'Integração completa com a natureza do cerrado e clube centralizado.',
      },
      {
        src: '/empreendimentos/terravi-ipes/04-espaco-gourmet.webp',
        title: 'Espaço Gourmet',
        caption: 'Ambiente equipado com churrasqueira e varanda voltada ao jardim.',
      },
      {
        src: '/empreendimentos/terravi-ipes/05-espaco-luau.webp',
        title: 'Espaço Luau',
        caption: 'Praça do fogo em pedra natural e deck para noites entre amigos.',
      },
      {
        src: '/empreendimentos/terravi-ipes/06-academia.webp',
        title: 'Academia equipada',
        caption: 'Sala climatizada com amplos panos de vidro voltados para o clube.',
      },
      {
        src: '/empreendimentos/terravi-ipes/07-arena-gamer.webp',
        title: 'Arena Gamer e Espaço Conviver',
        caption: 'Ambiente jovem com estações gamer, salão de jogos e brinquedoteca.',
      },
      {
        src: '/empreendimentos/terravi-ipes/08-campo-society.webp',
        title: 'Campo Society e complexo esportivo',
        caption: 'Campo iluminado, quadra poliesportiva e quadras de areia.',
      },
      {
        src: '/empreendimentos/terravi-ipes/09-carregador-ev.webp',
        title: 'Carregador de carro elétrico',
        caption: 'Infraestrutura moderna com energia solar nas áreas comuns e ponto EV.',
      },
    ],
    amenities: [
      'Portaria inteligente com segurança 24h',
      'Mais de 115 mil m² de área verde + Trilha Ecológica',
      'Piscina com borda infinita e Parque Aquático infantil',
      'Academia equipada e Estação de Ginástica',
      'Espaço Gourmet, Espaço Família e Praça de Eventos',
      'Espaço Luau, Redário, Estar dos Ipês e Jabuticabeiras',
      'Espaço Conviver: Arena Gamer, Salão de Jogos e Brinquedoteca',
      'Campo Society, Quadra Poliesportiva e Quadras de Areia',
      'Playground / Vila da Brincadeira e Pet Place',
      'Espaço para Minimercado e Wi-Fi na área do clube',
      'Carregador para veículos elétricos e calibrador de pneus',
      '5 Pomares, Cantinho da Horta e Energia Solar no clube',
    ],
    distances: [
      { time: '3 min', place: 'Restaurante Flor da Roça' },
      { time: '5 min', place: 'Max Atacadão' },
      { time: '15 min', place: 'Portal Shopping' },
      { time: '30 min', place: 'Passeio das Águas Shopping' },
      { time: 'Próximo', place: 'HUGOL e Hospital Ruy Azeredo' },
      { time: 'Próximo', place: 'Colégio da Polícia Militar e UniAlfa' },
      { time: 'Próximo', place: 'Costa Atacadão e Assaí Atacadista' },
      { time: 'Acesso direto', place: 'Rodovia GO-070' },
    ],
    legal: {
      incorporadoras: 'Terrano Urbanismo · SPE Goianira Empreendimentos Imobiliários Ltda',
      registro: 'Decreto Municipal nº 170/2025 (Goianira-GO) · Registro R-4 da matrícula nº 50.510 no CRI de Goianira.',
      entrega: 'Previsão de entrega da 1ª etapa: Julho/2029.',
      address: 'Continuação da Rua PL 26 (Loteamento Residencial Planalto), Goianira – GO · CEP 75.373-899',
      disclaimer:
        'Imagens e perspectivas ilustrativas. Áreas comuns entregues conforme Memorial Descritivo e Enxoval das Áreas de Lazer. Tabela sujeita à vigência e disponibilidade.',
    },
    whatsappMessage:
      'Olá, Thony! Vi o Condomínio Terraví Ipês (Goianira) no site e quero receber a Tabela Black atualizada e o Book Digital.',
    bookWhatsappMessage:
      'Olá, Thony! Pode me enviar o Book Digital (53 páginas) e a tabela de lotes disponíveis do Condomínio Terraví Ipês?',
    seoTitle: 'Condomínio Horizontal Terraví Ipês Goianira | Lotes com +30 Itens de Lazer',
    seoDescription:
      'Condomínio fechado Terraví Ipês em Goianira (GO-070): lotes de 230 a 482 m², +115 mil m² de área verde, +30 itens de lazer, piscina borda infinita e Tour 360°.',
    faqs: [
      [
        'O Condomínio Terraví Ipês já possui registro em cartório?',
        'Sim. Foi aprovado pelo Decreto Municipal nº 170/2025 da Prefeitura de Goianira e está registrado sob o R-4 da matrícula nº 50.510 no Cartório de Registro de Imóveis de Goianira.',
      ],
      [
        'Qual é o tamanho dos lotes e a previsão de entrega?',
        'Na 1ª etapa há lotes de 230 m² a 482 m² (578 lotes no projeto completo em 24 quadras), com entrega prevista da 1ª etapa para julho de 2029.',
      ],
      [
        'Posso conhecer o Terraví Ipês virtualmente antes de ir ao local?',
        'Sim! Esta página traz o Tour Virtual 360° oficial para você explorar portaria, piscinas e áreas comuns, além do atendimento direto com Thony para visita presencial.',
      ],
    ],
  },

  {
    id: 'flora-nogueira',
    slug: 'residencial-flora-nogueira-goianira',
    addedAt: '2026-11-21T07:00:00Z',
    featuredInPopup: false,
    emailLoopGif: '/email/loop-flora.gif',
    popupVideo: '/email/popup-loop.mp4',
    popupHook:
      'Obras avançadas já entregues em Goianira (asfalto, meio-fio e drenagem): 468 lotes de 231 a 502 m² com parcelas referenciais a partir de R$ 481,76*.',
    name: 'Residencial Flora Nogueira',
    shortName: 'Flora Nogueira',
    badge: 'OBRAS ENTREGUES · LOTEAMENTO ABERTO',
    modality: 'Loteamento Aberto',
    usage: 'Residencial · Obras Avançadas',
    city: 'Goianira',
    region: 'Goianira · 900 m da GO-070',
    regionFilter: 'Goianira · Eixo GO-070',
    locationLine: 'Goianira – GO · A 900 m da GO-070, ao lado do Residencial Triunfo',
    developers: 'MAC Empreendimentos e +VGV Brasil',
    tagline: 'Um lugar para ver a vida florescer — com asfalto, meio-fio e galeria já entregues.',
    shortDescription:
      'Loteamento aberto em Goianira com 468 lotes de 231 a 502 m² (11 m de frente), obras avançadas, 14 mil m² de área verde e parcelas a partir de R$ 481,76*.',
    summary: [
      'O Residencial Flora Nogueira é um lançamento da MAC Empreendimentos com gestão comercial da +VGV Brasil, localizado a 900 metros da GO-070 em Goianira, ao lado do Residencial Triunfo e cercado por bairros consolidados como Limoeiro, Vila Isabel e Florença, além dos condomínios Pinheiros e Rosa de Leiria.',
      'São 468 terrenos (Etapas 1 e 2) a partir de 231 m² com 11 metros de frente (até 502 m²), já com asfalto, meio-fio e galeria pluvial entregues — além de energia elétrica, iluminação pública, água potável e câmeras de segurança no parque.',
      'Com mais de 14 mil m² de área verde preservada, parque linear, quadra poliesportiva, academia ao ar livre, playground e pista de caminhada, une a parcela mais acessível da seleção à forte valorização de Goianira (crescimento econômico de 36,2% nos últimos 5 anos segundo dados MTE 2025).',
    ],
    priceHighlight: 'Parcelas a partir de R$ 481,76*',
    priceDetail: 'Lotes 231 a 502 m² (11 m de frente) · Asfalto, meio-fio e galeria entregues',
    priceLegal:
      '*Ref. Lâmina comercial MAC 15/01/2026 (Qd 02 Lt 02, 231 m²: 240 mensais + 20 anuais, juros 6,2% a.a. + IPCA). Sujeito à disponibilidade de tabela.',
    metrics: [
      { label: 'TOTAL DE LOTES', value: '468', sub: 'Etapas 1 e 2 · loteamento aberto' },
      { label: 'METRAGEM', value: '231–502 m²', sub: 'frente padrão de 11 m' },
      { label: 'OBRAS ENTREGUES', value: 'Asfalto', sub: 'meio-fio e galeria pluvial prontos' },
      { label: 'ÁREA VERDE', value: '+14 mil m²', sub: 'parque linear e praça equipada' },
    ],
    compare: {
      perfil: 'Parcela mais acessível + infraestrutura já adiantada',
      lotes: '468 lotes (Etapas 1 e 2)',
      metragem: '231 a 502 m² (11 m frente)',
      diferencial: 'Asfalto/meio-fio/galeria entregues + 14 mil m² verde',
      condicao: 'Parcelas a partir de R$ 481,76*',
    },
    tags: ['Obras Avançadas', 'Parcela Acessível', 'Investimento', 'Moradia'],
    goals: ['Obras Avançadas', 'Investimento', 'Moradia'],
    cover: '/empreendimentos/flora-nogueira/01-drone.webp',
    coverAlt:
      'Vista aérea real de drone do Residencial Flora Nogueira em Goianira cercado por bairros consolidados',
    implantationImage: '/empreendimentos/flora-nogueira/06-implantacao.webp',
    implantationNote:
      'Implantação oficial em 9 quadras com lotes padrão de 231 m² (11 m de frente) e parque linear de 14 mil m² na borda leste.',
    tour360Url: null,
    gallery: [
      {
        src: '/empreendimentos/flora-nogueira/01-drone.webp',
        title: 'Vista aérea real em Goianira',
        caption: 'Inserido junto a bairros consolidados a apenas 900 m da GO-070.',
      },
      {
        src: '/empreendimentos/flora-nogueira/02-quadra-praca.webp',
        title: 'Quadra poliesportiva e parque',
        caption: 'Esporte e convivência em frente aos 14 mil m² de área verde preservada.',
      },
      {
        src: '/empreendimentos/flora-nogueira/03-playground-academia.webp',
        title: 'Playground e academia ao ar livre',
        caption: 'Praça equipada para crianças, adultos e caminhadas ao ar livre.',
      },
      {
        src: '/empreendimentos/flora-nogueira/04-praca-aerea.webp',
        title: 'Vista superior do parque linear',
        caption: 'Integração planejada entre lazer público monitorado por câmeras e mata nativa.',
      },
      {
        src: '/empreendimentos/flora-nogueira/05-satelite.webp',
        title: 'Integração urbana no entorno',
        caption: 'Conectado ao Residencial Triunfo, Limoeiro, Florença, Pinheiros e Rosa de Leiria.',
      },
    ],
    amenities: [
      'Obras avançadas: asfalto, meio-fio e galeria pluvial já entregues',
      'Energia elétrica, iluminação pública e água potável',
      'Mais de 14 mil m² de área verde preservada',
      'Parque linear com pista de caminhada',
      'Quadra poliesportiva equipada',
      'Academia ao ar livre e Playground',
      'Câmeras de segurança no parque',
      'Lotes com 11 metros de frente (231 a 502 m²)',
    ],
    distances: [
      { time: '2 min', place: 'UBS Limoeiro' },
      { time: '9 min', place: 'Atacarejo Batista e Max Atacadão' },
      { time: '9 min', place: 'Colégio da Polícia Militar' },
      { time: '13 min', place: 'Centro de Goianira e Vapt Vupt' },
      { time: '16 min', place: 'Costa Atacadão' },
      { time: '18 min', place: 'HUGOL' },
      { time: '19 min', place: 'Portal Shopping' },
      { time: '900 m', place: 'Rodovia GO-070' },
    ],
    legal: {
      incorporadoras: 'MAC Empreendimentos · Gestão comercial +VGV Brasil',
      registro: 'Decretos Municipais nº 118/2025 e 147/2025 (Goianira-GO) · Registro R-4 da matrícula nº 50.000 no CRI de Goianira.',
      entrega: 'Obras avançadas — asfalto, meio-fio e galeria pluvial já executados.',
      address: 'Região do Limoeiro / ao lado do Residencial Triunfo, a 900 m da GO-070, Goianira – GO',
      disclaimer:
        'Imagens e perspectivas artísticas ilustrativas. Condições comerciais, financiamento e lotes disponíveis sujeitos à tabela vigente.',
    },
    whatsappMessage:
      'Olá, Thony! Quero receber mais informações e tabela atualizada do Residencial Flora Nogueira em Goianira.',
    bookWhatsappMessage:
      'Olá, Thony! Pode me enviar o Book Digital (17 páginas) e os lotes disponíveis do Residencial Flora Nogueira?',
    seoTitle: 'Residencial Flora Nogueira Goianira | Lotes a partir de 231 m² perto da GO-070',
    seoDescription:
      'Loteamento aberto Flora Nogueira em Goianira (900 m da GO-070): 468 lotes de 231 a 502 m², asfalto e drenagem já entregues, 14 mil m² de área verde e parcelas a partir de R$ 481,76*.',
    faqs: [
      [
        'O Residencial Flora Nogueira é loteamento aberto ou condomínio fechado?',
        'É um loteamento aberto sem taxa de condomínio, com infraestrutura completa e área verde preservada de mais de 14 mil m² equipada com praça, quadra poliesportiva, academia ao ar livre, playground e câmeras no parque.',
      ],
      [
        'Qual é o estágio atual das obras do Flora Nogueira?',
        'As obras estão avançadas: asfalto, meio-fio e galeria pluvial já foram entregues. Consulte Thony para visitar o local e ver a estrutura de perto.',
      ],
      [
        'O Flora Nogueira possui registro no Cartório de Imóveis?',
        'Sim. Foi aprovado pelos Decretos Municipais nº 118/2025 e 147/2025 de Goianira e está registrado sob o R-4 da matrícula nº 50.000 no CRI de Goianira.',
      ],
    ],
  },
];

export function waLink(message, number = WHATSAPP_DEFAULT) {
  const clean = String(number || WHATSAPP_DEFAULT).replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/**
 * REGRA AUTOMÁTICA DO POP-UP:
 * Retorna sempre o imóvel mais recente adicionado ao catálogo (ou marcado com `featuredInPopup: true`).
 * Quando um novo imóvel é adicionado ao final de EMPREENDIMENTOS ou com `addedAt` mais novo,
 * ele assume automaticamente o destaque do Pop-up sem precisar alterar componentes visuais.
 */
export function getPopupFeaturedEmpreendimento(list = EMPREENDIMENTOS) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const explicit = list.filter((item) => item.featuredInPopup);
  const pool = explicit.length > 0 ? explicit : list;
  const sorted = [...pool].sort((a, b) => {
    const ta = a.addedAt ? Date.parse(a.addedAt) : 0;
    const tb = b.addedAt ? Date.parse(b.addedAt) : 0;
    return tb - ta;
  });
  return sorted[0] || pool[pool.length - 1];
}
