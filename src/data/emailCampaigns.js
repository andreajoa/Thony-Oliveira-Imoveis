// Sequência completa de 20 e-mails (envio de 5 em 5 dias: Dia 0 até Dia 95)
// + Template de alerta de Novo Imóvel em Destaque.
// Paleta oficial: verde escuro #17382e, creme #f6f5f0, dourado areia #b58a5f / #e3bc88.
// 100% responsivo para mobile (Gmail, Apple Mail, Outlook) com vídeo animado em loop (GIF/MP4)
// e rodapé completo com links para todas as páginas legais e descadastro em 1 clique.

import {
  EMPREENDIMENTOS,
  WHATSAPP_DEFAULT,
  WHATSAPP_SHOWN,
  getPopupFeaturedEmpreendimento,
  waLink,
} from './empreendimentos.js';

export const SITE_ORIGIN = 'https://thonyoliveiraimoveis.online';
export const DRIP_INTERVAL_DAYS = 5;

const devMap = Object.fromEntries(EMPREENDIMENTOS.map((e) => [e.id, e]));

export const EMAIL_SEQUENCE = [
  {
    step: 1,
    dayOffset: 0,
    devId: 'parque-universitario',
    kicker: 'BOAS-VINDAS · DESTAQUE DO PORTFÓLIO',
    subject: 'Bem-vindo(a)! Conheça o imóvel em destaque + 4 oportunidades em Goiânia e Goianira',
    preheader: 'Veja em vídeo os lotes ao lado da UFG em Goiânia e os condomínios da GO-070 em Goianira.',
    hookTitle: 'Seu próximo endereço começa com informação clara e registro em cartório.',
    hookLead:
      'Separamos para você uma curadoria direta com perspectivas oficiais, fichas jurídicas e simulações reais dos melhores loteamentos e condomínios horizontais em Goiânia e Goianira.',
    bullets: [
      'Destaque atual do Pop-up: Residencial Parque Universitário (Goiânia · ao lado da UFG) — lotes residenciais e comerciais a partir de 270 m² e R$ 990/m².',
      'Condomínio Horizontal Terraví Ipês (Goianira · GO-070) — +30 itens de lazer, 115 mil m² de verde, Tour 360° e parcelas a partir de R$ 697,76*.',
      'Condomínio Horizontal Pinheiros (Goianira · 800 m da GO-070) — apenas 109 lotes (287 a 486 m²) com lago de pesca e parcelas a partir de R$ 949,15*.',
      'Residencial Flora Nogueira (Goianira · 900 m da GO-070) — asfalto e drenagem já entregues, sem condomínio e parcelas a partir de R$ 481,76*.',
    ],
    ctaLabel: 'VER O DESTAQUE E RECEBER TABELA NO WHATSAPP',
    secondaryImg: '/empreendimentos/parque-universitario/02-aerea-quadras.webp',
    secondaryCaption: 'Implantação arborizada do Residencial Parque Universitário ao lado do Campus Samambaia da UFG.',
  },
  {
    step: 2,
    dayOffset: 5,
    devId: 'parque-universitario',
    kicker: 'EMAIL 02/20 · GOIÂNIA · REGIÃO NORTE',
    subject: 'Ao lado da UFG em Goiânia: por que o Parque Universitário (R$ 990/m²) é tão disputado',
    preheader: '528 lotes (480 residenciais e 48 comerciais) com +48 mil m² de natureza na capital.',
    hookTitle: 'Comprar terreno dentro de Goiânia, colado na UFG, é uma oportunidade que não se repete.',
    hookLead:
      'Enquanto a maioria dos lançamentos se afasta da capital, o Residencial Parque Universitário coloca você literalmente ao lado do Campus Samambaia da UFG — a 6 minutos da Perimetral Norte e 9 minutos do Passeio das Águas Shopping.',
    bullets: [
      '528 lotes planejados pela Landcorp Participações e Ética Urbanismo (34 anos de mercado).',
      'Metragens a partir de 270 m² com opções residenciais (480 lotes) e comerciais (48 lotes).',
      'Mais de 48 mil m² de áreas verdes e lazer: praça arborizada, academia ao ar livre, pista de caminhada, playground e pet place.',
      'Referência comercial a partir de R$ 990/m² com financiamento direto.',
    ],
    ctaLabel: 'VER LOTES DISPONÍVEIS NO PARQUE UNIVERSITÁRIO',
    secondaryImg: '/empreendimentos/parque-universitario/04-praca-aerea.webp',
    secondaryCaption: 'Praça de lazer e convivência integrada a mais de 48 mil m² de área verde em Goiânia.',
  },
  {
    step: 3,
    dayOffset: 10,
    devId: 'terravi-ipes',
    kicker: 'EMAIL 03/20 · CONDOMÍNIO CLUBE + TOUR 360°',
    subject: 'Já caminhou pelo seu futuro condomínio hoje? Faça o Tour 360° do Terraví Ipês',
    preheader: '+30 itens de lazer, 115 mil m² de área verde e parcelas a partir de R$ 697,76* em Goianira.',
    hookTitle: '115 mil m² de natureza e um parque aquático de borda infinita esperando pela sua família.',
    hookLead:
      'O Condomínio Horizontal Terraví Ipês (Terrano Urbanismo) redefine o padrão de condomínio clube no eixo da GO-070 em Goianira: são 16 campos de futebol em área verde e mais de 30 ambientes de lazer.',
    bullets: [
      'Piscina adulto com borda infinita, parque aquático infantil, sauna e espelho d’água.',
      'Arena Gamer, academia profissional, campo society, 2 quadras de areia, tênis e poliesportiva.',
      'Portaria inteligente 24h, carregador para carro elétrico, espaço minimercado e 5 pomares.',
      'Matrícula nº 50.510 (R-4) no CRI de Goianira · Parcelas referenciais a partir de R$ 697,76*.',
    ],
    ctaLabel: 'ABRIR PÁGINA E TOUR 360° DO TERRAVÍ IPÊS',
    secondaryImg: '/empreendimentos/terravi-ipes/02-parque-aquatico.webp',
    secondaryCaption: 'Complexo aquático com piscina de borda infinita e lazer resort no Terraví Ipês.',
  },
  {
    step: 4,
    dayOffset: 15,
    devId: 'condominio-pinheiros',
    kicker: 'EMAIL 04/20 · EXCLUSIVIDADE COM LAGO',
    subject: 'Apenas 109 lotes e um lago de 5 mil m² para pesca: o segredo do Condomínio Pinheiros',
    preheader: 'A 800 m da GO-070 em Goianira: baixa densidade, silêncio e 19 itens de lazer.',
    hookTitle: 'Para quem não quer morar em um condomínio de mil lotes: aqui são apenas 109 famílias.',
    hookLead:
      'A 800 metros da rodovia duplicada GO-070, o Condomínio Horizontal Pinheiros (MAC Empreendimentos e +VGV Brasil) oferece lotes amplos de 287 m² a 486 m² abraçados por um lago natural de mais de 5 mil m².',
    bullets: [
      'Baixíssima densidade: apenas 109 unidades em uma gleba de 89.993 m².',
      'Lago privativo com deck de contemplação, 2 chalés de pesca, fire place e pista de caminhada.',
      'Piscina, academia, salão de festas com cozinha, quadra de areia, pet place e casa de bonecas.',
      'Registro R-5 da matrícula nº 45.383 no CRI de Goianira · Parcelas a partir de R$ 949,15*.',
    ],
    ctaLabel: 'CONHECER OS 109 LOTES DO CONDOMÍNIO PINHEIROS',
    secondaryImg: '/empreendimentos/condominio-pinheiros/02-lago-pista.webp',
    secondaryCaption: 'Lago natural de mais de 5 mil m² com pista de caminhada e deck no Condomínio Pinheiros.',
  },
  {
    step: 5,
    dayOffset: 20,
    devId: 'flora-nogueira',
    kicker: 'EMAIL 05/20 · OBRAS ENTREGUES · PARCELA ACESSÍVEL',
    subject: 'Asfalto pronto e parcela a partir de R$ 481,76*: veja o Residencial Flora Nogueira',
    preheader: 'Loteamento aberto a 900 m da GO-070 com asfalto, meio-fio e galeria pluvial já executados.',
    hookTitle: 'Nada de promessa no papel: aqui o asfalto, o meio-fio e a drenagem já estão prontos.',
    hookLead:
      'O Residencial Flora Nogueira (MAC Empreendimentos e +VGV Brasil) reúne o que todo comprador prudente procura: infraestrutura física já entregue, zero taxa mensal de condomínio e a parcela mais acessível do portfólio.',
    bullets: [
      '468 lotes de 231 m² a 502 m² com frente ampla padrão de 11 metros.',
      'Mais de 14 mil m² de área verde preservada com parque linear, quadra poliesportiva e playground.',
      'A 900 metros da GO-070, cercado por bairros consolidados e a 18 minutos do HUGOL.',
      'Registro R-4 da matrícula nº 50.000 no CRI de Goianira · Parcelas a partir de R$ 481,76*.',
    ],
    ctaLabel: 'VER FOTOS REAIS E TABELA DO FLORA NOGUEIRA',
    secondaryImg: '/empreendimentos/flora-nogueira/02-quadra-praca.webp',
    secondaryCaption: 'Quadra poliesportiva, praça equipada e mais de 14 mil m² de verde no Residencial Flora Nogueira.',
  },
  {
    step: 6,
    dayOffset: 25,
    devId: 'parque-universitario',
    kicker: 'EMAIL 06/20 · COMPARATIVO PRÁTICO',
    subject: 'Loteamento aberto ou condomínio fechado? O comparativo direto para você decidir',
    preheader: 'Compare custo mensal, liberdade construtiva, segurança 24h e potencial de revenda.',
    hookTitle: 'Quatro projetos reais, quatro perfis diferentes. Qual conversa com o seu plano?',
    hookLead:
      'Muitos clientes ficam em dúvida entre comprar em loteamento aberto (sem taxa condominial) ou em condomínio fechado (com portaria 24h e lazer de clube). Veja a diferença prática nas nossas 4 opções:',
    bullets: [
      'Quer morar ou investir na capital ao lado da UFG sem taxa de condomínio? → Parque Universitário (a partir de R$ 990/m²).',
      'Quer a menor parcela mensal com asfalto já pronto? → Flora Nogueira (a partir de R$ 481,76*).',
      'Quer clube resort completo com +30 itens de lazer para os filhos? → Terraví Ipês (a partir de R$ 697,76*).',
      'Quer silêncio, lotes grandes (287–486 m²) e lago de pesca para apenas 109 famílias? → Condomínio Pinheiros (a partir de R$ 949,15*).',
    ],
    ctaLabel: 'COMPARAR OS 4 EMPREENDIMENTOS NO SITE',
    secondaryImg: '/empreendimentos/terravi-ipes/03-vista-geral.webp',
    secondaryCaption: 'Compare metragem, localização e condições comerciais lado a lado.',
  },
  {
    step: 7,
    dayOffset: 30,
    devId: 'terravi-ipes',
    kicker: 'EMAIL 07/20 · DADOS DE VALORIZAÇÃO · GO-070',
    subject: '+36,2% de crescimento econômico: por que o eixo da GO-070 virou o foco da Grande Goiânia',
    preheader: 'A 15 minutos do Portal Shopping e HUGOL, com m² muito mais competitivo que na capital.',
    hookTitle: 'Os números explicam por que tantas famílias de Goiânia estão comprando lote na GO-070.',
    hookLead:
      'Segundo dados do Ministério do Trabalho e Emprego (MTE 2025), Goianira é o 5º município mais populoso da Região Metropolitana e cresceu 36,2% nos últimos 5 anos — conectada a Goiânia por pista duplicada.',
    bullets: [
      'Apenas 15 a 19 minutos do Portal Shopping e do HUGOL pela rodovia duplicada GO-070.',
      'Metro quadrado de condomínio fechado até 45% mais acessível que regiões equivalentes na capital.',
      'Três projetos registrados lado a lado: Terraví Ipês, Condomínio Pinheiros e Flora Nogueira.',
      'Valorização consistente durante o ciclo de obras até a entrega das chaves.',
    ],
    ctaLabel: 'EXPLORAR OS EMPREENDIMENTOS DO EIXO GO-070',
    secondaryImg: '/empreendimentos/condominio-pinheiros/07-drone-regiao.webp',
    secondaryCaption: 'Vista aérea real do eixo de expansão da GO-070 em Goianira.',
  },
  {
    step: 8,
    dayOffset: 35,
    devId: 'condominio-pinheiros',
    customLoopGif: '/email/loop-build.gif',
    kicker: 'EMAIL 08/20 · DO TERRENO AO LAR',
    subject: 'Do terreno vazio à casa de 2 andares: por que comprar o lote primeiro multiplica seu patrimônio',
    preheader: 'Veja em vídeo como o seu terreno se transforma na casa planejada para a sua família.',
    hookTitle: 'Você batalhou pelo terreno. O próximo passo é ver a sua casa nascer do seu jeito.',
    hookLead:
      'Comprar uma casa pronta costuma cobrar caro por escolhas que você não fez. Quando você garante um lote bem localizado na planta ou em obras, captura a valorização da terra e projeta cada metro quadrado no seu tempo.',
    bullets: [
      'Liberdade arquitetônica para construir térrea ou sobrado com quintal, piscina e área gourmet.',
      'Em lotes de 270 m² a 486 m², sobra espaço real para jardim, pets e convivência familiar.',
      'Enquanto você paga parcelas diretas acessíveis, a infraestrutura e o entorno valorizam seu ativo.',
      'No site você pode testar nossa experiência interativa "Do Terreno ao Lar" rolando a tela.',
    ],
    ctaLabel: 'ESCOLHER MEU TERRENO PARA CONSTRUIR',
    secondaryImg: '/experience/build/stills/b5-960.webp',
    secondaryCaption: 'Simulação ilustrativa da evolução do lote até a residência concluída.',
  },
  {
    step: 9,
    dayOffset: 40,
    devId: 'parque-universitario',
    kicker: 'EMAIL 09/20 · LIQUIDEZ NA CAPITAL · UFG',
    subject: 'O efeito UFG em Goiânia: por que terrenos ao lado de universidades têm demanda permanente',
    preheader: 'Milhares de estudantes, professores e servidores todos os dias ao lado do seu lote.',
    hookTitle: 'Onde há universidade federal consolidada, nunca falta demanda por moradia e serviços.',
    hookLead:
      'O Campus Samambaia da UFG movimenta diariamente dezenas de milhares de pessoas na Região Norte de Goiânia. O Residencial Parque Universitário nasceu colado a esse polo.',
    bullets: [
      '480 lotes residenciais ideais para moradia própria ou construção voltada a renda e locação.',
      '48 lotes comerciais estratégicos para clínicas, mercados, gastronomia, escritórios e serviços.',
      'Acesso imediato à Av. Esperança, Alameda Flamboyant, GO-080 e Perimetral Norte.',
      'Apenas 9 minutos do Passeio das Águas Shopping e 12 minutos do Aeroporto Santa Genoveva.',
    ],
    ctaLabel: 'SOLICITAR MAPA DE QUADRAS DO PARQUE UNIVERSITÁRIO',
    secondaryImg: '/empreendimentos/parque-universitario/03-infraestrutura.webp',
    secondaryCaption: 'Infraestrutura urbana planejada ao lado do Campus Samambaia da UFG.',
  },
  {
    step: 10,
    dayOffset: 45,
    devId: 'flora-nogueira',
    kicker: 'EMAIL 10/20 · FINANCIAMENTO DIRETO SEM BANCO',
    subject: 'Sem financiamento bancário: como funciona o parcelamento direto com a urbanizadora',
    preheader: 'Entrada facilitada e planos mensais ou com balões anuais direto com a loteadora.',
    hookTitle: 'Você não precisa de aprovação de banco para comprar seu lote registrado em Goiás.',
    hookLead:
      'Nos 4 empreendimentos selecionados pela Thony Oliveira Imóveis, o financiamento é feito diretamente com a incorporadora/urbanizadora — com análise rápida e planos que se ajustam à sua renda.',
    bullets: [
      'Entrada facilitada (com possibilidade de parcelamento da entrada conforme tabela vigente).',
      'Opções de planos em até 240 meses, planos com intermediárias anuais ou até 36x fixas (no Terraví Ipês).',
      'Referências reais: Flora Nogueira a partir de R$ 481,76*, Terraví Ipês R$ 697,76* e Pinheiros R$ 949,15*.',
      'Simulação personalizada enviada em minutos pelo WhatsApp (62) 98529-2886.',
    ],
    ctaLabel: 'PEDIR MINHA SIMULAÇÃO DE PARCELAS NO WHATSAPP',
    secondaryImg: '/empreendimentos/flora-nogueira/01-drone.webp',
    secondaryCaption: 'Vista aérea real das obras entregues no Residencial Flora Nogueira.',
  },
  {
    step: 11,
    dayOffset: 50,
    devId: 'condominio-pinheiros',
    kicker: 'EMAIL 11/20 · SEGURANÇA JURÍDICA',
    subject: 'Os 3 registros que você deve exigir antes de assinar qualquer contrato de terreno',
    preheader: 'Veja os números de matrícula no CRI e decretos municipais dos nossos empreendimentos.',
    hookTitle: 'Transparência total: nunca compre um lote sem conferir a matrícula no Cartório de Imóveis.',
    hookLead:
      'Para que você invista com 100% de tranquilidade, publicamos abertamente os dados oficiais de aprovação e registro de cada empreendimento no nosso site:',
    bullets: [
      'Condomínio Terraví Ipês: Decreto Municipal nº 170/2025 · Registro R-4 da Matrícula nº 50.510 no CRI de Goianira.',
      'Condomínio Pinheiros: Decretos nº 122/2025 e 148/2025 · Registro R-5 da Matrícula nº 45.383 no CRI de Goianira.',
      'Residencial Flora Nogueira: Decretos nº 118/2025 e 147/2025 · Registro R-4 da Matrícula nº 50.000 no CRI de Goianira.',
      'Residencial Parque Universitário: Realização Landcorp Participações e Grupo Ética Urbanismo (34 anos de histórico).',
    ],
    ctaLabel: 'CONFERIR FICHA JURÍDICA COMPLETA NO SITE',
    secondaryImg: '/empreendimentos/condominio-pinheiros/01-portaria.webp',
    secondaryCaption: 'Portaria com segurança 24h do Condomínio Horizontal Pinheiros.',
  },
  {
    step: 12,
    dayOffset: 55,
    devId: 'terravi-ipes',
    kicker: 'EMAIL 12/20 · LAZER DE RESORT EM CASA',
    subject: 'Piscina de borda infinita, Arena Gamer e estação para carro elétrico: o Terraví Ipês por dentro',
    preheader: 'Veja por que a 1ª etapa (lotes de 230 a 482 m²) reúne mais de 30 itens de lazer.',
    hookTitle: 'Finais de semana com estrutura de resort sem precisar pegar estrada.',
    hookLead:
      'Imagine sair de casa caminhando por alamedas arborizadas e encontrar um clube completo concentrado no coração do condomínio, cercado por 115 mil m² de área verde e 5 pomares.',
    bullets: [
      'Esporte completo: campo society, quadra de tênis, poliesportiva, 2 quadras de areia e academia com terraço.',
      'Para crianças e jovens: parque aquático infantil, Arena Gamer, brinquedoteca e 3 playgrounds.',
      'Convivência: salão de festas, 2 espaços gourmet, quiosques com churrasqueira e espaço luau com fogo de chão.',
      'Conveniência moderna: carregador para veículos elétricos, espaço delivery e área para minimercado.',
    ],
    ctaLabel: 'VER GALERIA COMPLETA DO TERRAVÍ IPÊS',
    secondaryImg: '/empreendimentos/terravi-ipes/05-espaco-luau.webp',
    secondaryCaption: 'Espaço Luau e convivência noturna no Condomínio Horizontal Terraví Ipês.',
  },
  {
    step: 13,
    dayOffset: 60,
    devId: 'condominio-pinheiros',
    kicker: 'EMAIL 13/20 · VIDA À BEIRA DO LAGO',
    subject: 'Um fim de tarde à beira do lago a 17 minutos do HUGOL: a rotina no Condomínio Pinheiros',
    preheader: 'Lotes amplos de 287 a 486 m², 2 chalés de pesca, fire place e piscina.',
    hookTitle: 'Acordar com o som dos pássaros à beira do lago e estar a 800 metros da GO-070.',
    hookLead:
      'O Condomínio Horizontal Pinheiros foi desenhado para quem valoriza espaço entre as casas, contato autêntico com a água e a segurança de uma portaria 24h ao lado do já consolidado Rosa de Leiria.',
    bullets: [
      'Metragens generosas: terrenos de 287 m² até 486 m² (muito acima da média do mercado).',
      'Quase 30 mil m² somados de área verde e APP + lago natural com mais de 5 mil m².',
      'Fire place ao ar livre, redário, mirante, deck do lago, 2 chalés de pesca e bosque.',
      'Entrega prevista para maio de 2029 com parcelas referenciais a partir de R$ 949,15*.',
    ],
    ctaLabel: 'RECEBER O BOOK DIGITAL DO CONDOMÍNIO PINHEIROS',
    secondaryImg: '/empreendimentos/condominio-pinheiros/04-fireplace.webp',
    secondaryCaption: 'Fire place e área de contemplação junto à natureza no Condomínio Pinheiros.',
  },
  {
    step: 14,
    dayOffset: 65,
    devId: 'flora-nogueira',
    kicker: 'EMAIL 14/20 · PATRIMÔNIO ACESSÍVEL',
    subject: 'Como começar seu patrimônio em terreno com parcelas a partir de R$ 481,76*',
    preheader: '11 metros de frente, obras entregues e localização cercada por bairros consolidados.',
    hookTitle: 'Menos que um aluguel mensal: o caminho mais inteligente para sair do zero em Goiás.',
    hookLead:
      'Se o seu objetivo é construir sua casa sem pagar taxa de condomínio ou investir com parcela mensal baixa, o Residencial Flora Nogueira entrega segurança física e jurídica desde o primeiro dia.',
    bullets: [
      'Frente ampla de 11 metros nos lotes padrão de 231 m² (com unidades que chegam a 502 m²).',
      'Vizinhança pronta: ao lado do Residencial Triunfo, Limoeiro, Vila Isabel e condomínios MAC.',
      'Câmeras de segurança instaladas no parque linear + iluminação pública e água tratada.',
      'Apenas 2 minutos da UBS Limoeiro e 9 minutos do Colégio da Polícia Militar e atacadistas.',
    ],
    ctaLabel: 'SIMULAR COMPRA NO RESIDENCIAL FLORA NOGUEIRA',
    secondaryImg: '/empreendimentos/flora-nogueira/03-playground-academia.webp',
    secondaryCaption: 'Playground e academia ao ar livre nos 14 mil m² de área verde do Flora Nogueira.',
  },
  {
    step: 15,
    dayOffset: 70,
    devId: 'parque-universitario',
    kicker: 'EMAIL 15/20 · OPORTUNIDADE COMERCIAL · GOIÂNIA',
    subject: '48 lotes comerciais ao lado da UFG: onde posicionar sua empresa ou renda em Goiânia',
    preheader: 'Atenda a população universitária e os bairros consolidados da Região Norte.',
    hookTitle: 'Construir salas comerciais, lojas ou studios ao lado da UFG é receita de ocupação alta.',
    hookLead:
      'Além dos 480 lotes residenciais, o Residencial Parque Universitário reservou 48 lotes comerciais em pontos estratégicos do fluxo viário da Região Norte de Goiânia.',
    bullets: [
      'Público cativo diário formado por estudantes, docentes, pesquisadores e moradores da região.',
      'Metragens a partir de 270 m² com excelente frente e visibilidade urbana.',
      'Proximidade imediata com Clube Kaikan (5 min), Atacadão Dia a Dia (6 min) e Perimetral Norte (6 min).',
      'Consulte as quadras comerciais ainda disponíveis no espelho atualizado.',
    ],
    ctaLabel: 'CONSULTAR LOTES COMERCIAIS E RESIDENCIAIS NA UFG',
    secondaryImg: '/empreendimentos/parque-universitario/09-implantacao.webp',
    secondaryCaption: 'Mapa oficial de implantação com as 17 quadras do Residencial Parque Universitário.',
  },
  {
    step: 16,
    dayOffset: 75,
    devId: 'terravi-ipes',
    kicker: 'EMAIL 16/20 · DUELO DE CONDOMÍNIOS FECHADOS',
    subject: 'Terraví Ipês (clube 30+ itens) vs Pinheiros (109 lotes com lago): qual escolher em Goianira?',
    preheader: 'Dois condomínios fechados registrados na GO-070 com propostas complementares.',
    hookTitle: 'Clube resort completo ou refúgio exclusivo à beira do lago? Veja qual vence para você.',
    hookLead:
      'Ambos ficam no eixo valorizado da GO-070 em Goianira, têm entrega prevista para 2029 e registro em cartório — mas atendem estilos de vida distintos:',
    bullets: [
      'Escolha o Terraví Ipês se você quer parque aquático com borda infinita, Arena Gamer, tênis, society, 115 mil m² de verde e parcela inicial mais leve (a partir de R$ 697,76*).',
      'Escolha o Condomínio Pinheiros se você prioriza exclusividade absoluta (apenas 109 lotes), terrenos maiores (287 a 486 m²) e lago privativo de +5 mil m² para pesca (a partir de R$ 949,15*).',
      'Em dúvida? Você pode visitar os dois no mesmo dia em um roteiro guiado de 40 minutos.',
    ],
    ctaLabel: 'AGENDAR VISITA COMPARATIVA AOS DOIS CONDOMÍNIOS',
    secondaryImg: '/empreendimentos/terravi-ipes/01-portaria.webp',
    secondaryCaption: 'Portaria inteligente 24h do Condomínio Horizontal Terraví Ipês.',
  },
  {
    step: 17,
    dayOffset: 80,
    devId: 'condominio-pinheiros',
    kicker: 'EMAIL 17/20 · ROTEIRO DE VISITA PRESENCIAL',
    subject: '5 detalhes que você só percebe quando pisa no terreno (agende sua visita guiada)',
    preheader: 'Posição do sol nascente, topografia, brisa do lago e tempo real de deslocamento.',
    hookTitle: 'Fotos e vídeos encantam, mas caminhar pela quadra do seu futuro lote dá certeza.',
    hookLead:
      'No atendimento presencial com Thony Oliveira, você não faz uma visita apressada: analisamos juntos o mapa de implantação no local para escolher a unidade mais valorizada.',
    bullets: [
      'Conferência da orientação solar (frente nascente e ventilação cruzada).',
      'Avaliação da topografia do lote para economizar em terraplenagem e fundação.',
      'Teste real do trajeto de carro a partir da sua casa ou trabalho até o empreendimento.',
      'Atendimento de segunda a domingo com horário agendado pelo WhatsApp (62) 98529-2886.',
    ],
    ctaLabel: 'AGENDAR MINHA VISITA PRESENCIAL COM THONY',
    secondaryImg: '/empreendimentos/condominio-pinheiros/03-piscina.webp',
    secondaryCaption: 'Piscina e complexo de lazer do Condomínio Horizontal Pinheiros.',
  },
  {
    step: 18,
    dayOffset: 85,
    devId: 'parque-universitario',
    kicker: 'EMAIL 18/20 · COMO ESCOLHER O MELHOR LOTE NO MAPA',
    subject: 'Esquina, frente para a mata ou perto do lazer? Como escolher o lote mais valorizado',
    preheader: 'Dicas práticas de curadoria sobre os mapas de implantação dos 4 empreendimentos.',
    hookTitle: 'Dentro do mesmo loteamento, a escolha certa da quadra pode render muito mais na revenda.',
    hookLead:
      'Quando abrimos o espelho de vendas atualizado, aplicamos três critérios técnicos para filtrar os melhores lotes disponíveis em cada faixa de preço:',
    bullets: [
      'Proximidade equilibrada das áreas verdes e praças sem ficar colado ao fluxo intenso de veículos.',
      'Topografia plana ou em leve aclive, valorizando a fachada da futura construção.',
      'No Parque Universitário (17 quadras) e no Terraví Ipês (24 quadras), há opções privilegiadas próximas aos parques lineares.',
      'Peça agora o mapa de implantação em alta resolução com os lotes livres marcados.',
    ],
    ctaLabel: 'RECEBER MAPA COM OS MELHORES LOTES LIVRES',
    secondaryImg: '/empreendimentos/terravi-ipes/10-implantacao.webp',
    secondaryCaption: 'Implantação masterplan das 24 quadras e 115 mil m² de área verde do Terraví Ipês.',
  },
  {
    step: 19,
    dayOffset: 90,
    devId: 'flora-nogueira',
    kicker: 'EMAIL 19/20 · DOSSIÊ COMPLETO · 4 BOOKS DIGITAIS',
    subject: 'Resumo executivo: baixe os Books Digitais e tabelas dos 4 empreendimentos em Goiás',
    preheader: 'Parque Universitário, Terraví Ipês, Condomínio Pinheiros e Residencial Flora Nogueira.',
    hookTitle: 'Tudo o que você precisa para comparar com a família em uma única mensagem.',
    hookLead:
      'Reunimos os materiais oficiais completos das incorporadoras (Books Digitais em PDF, lâminas de tabela, minutas e mapas de implantação) para envio imediato no seu WhatsApp:',
    bullets: [
      '1. Residencial Parque Universitário (Goiânia · UFG): 528 lotes a partir de 270 m² · A partir de R$ 990/m².',
      '2. Condomínio Terraví Ipês (Goianira · GO-070): 578 lotes + Tour 360° · Parcelas a partir de R$ 697,76*.',
      '3. Condomínio Pinheiros (Goianira · 800 m GO-070): 109 lotes + Lago · Parcelas a partir de R$ 949,15*.',
      '4. Residencial Flora Nogueira (Goianira · Obras entregues): 468 lotes · Parcelas a partir de R$ 481,76*.',
    ],
    ctaLabel: 'RECEBER OS 4 BOOKS DIGITAIS NO WHATSAPP',
    secondaryImg: '/empreendimentos/flora-nogueira/06-implantacao.webp',
    secondaryCaption: 'Implantação oficial das Etapas 1 e 2 do Residencial Flora Nogueira.',
  },
  {
    step: 20,
    dayOffset: 95,
    devId: 'parque-universitario',
    kicker: 'EMAIL 20/20 · CONVITE PESSOAL · THONY OLIVEIRA',
    subject: 'Convite pessoal do Thony: vamos selecionar o seu terreno ideal nesta semana?',
    preheader: 'Atendimento individual para montar sua proposta dentro da tabela vigente.',
    hookTitle: 'As melhores unidades não ficam paradas no espelho por muito tempo.',
    hookLead:
      'Ao longo das últimas semanas você conheceu em detalhes os nossos 4 empreendimentos em Goiânia e Goianira. Agora quero ouvir você: qual é a parcela mensal ou o valor de entrada que fica confortável no seu planejamento?',
    bullets: [
      'Montamos uma seleção sob medida com os 3 melhores lotes disponíveis hoje para o seu orçamento.',
      'Negociação direta de fluxo de entrada e parcelamento junto à urbanizadora.',
      'Acompanhamento completo da visita presencial à assinatura com total segurança jurídica.',
      'Basta responder este e-mail ou clicar abaixo para falar direto comigo no WhatsApp (62) 98529-2886.',
    ],
    ctaLabel: 'FALAR DIRETO COM THONY OLIVEIRA AGORA',
    secondaryImg: '/empreendimentos/parque-universitario/01-aerea-ufg.webp',
    secondaryCaption: 'Atendimento consultivo Thony Oliveira Imóveis em Goiânia, Goianira e Goiás.',
  },
];

const esc = (s) =>
  String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/**
 * Renderiza o HTML completo, clean, elegante e 100% responsivo (mobile + desktop)
 * de qualquer um dos 20 e-mails da sequência (ou de um novo imóvel adicionado).
 */
export function renderEmailHtml({
  step = 1,
  recipientName = '',
  recipientEmail = '',
  customDevelopment = null,
} = {}) {
  const item =
    EMAIL_SEQUENCE.find((x) => x.step === Number(step)) || EMAIL_SEQUENCE[0];
  const dev =
    customDevelopment ||
    devMap[item.devId] ||
    getPopupFeaturedEmpreendimento() ||
    EMPREENDIMENTOS[0];

  const firstName = String(recipientName || '')
    .trim()
    .split(/\s+/)[0];
  const greeting = firstName ? `Olá, ${esc(firstName)}!` : 'Olá!';
  const loopGifUrl = `${SITE_ORIGIN}${item.customLoopGif || dev.emailLoopGif || '/email/loop-parque.gif'}`;
  const secondaryImgUrl = `${SITE_ORIGIN}${item.secondaryImg || dev.cover}`;
  const devPageUrl = `${SITE_ORIGIN}/empreendimentos/${dev.slug}/`;
  const waUrl = waLink(
    `Olá, Thony! Recebi o e-mail #${String(item.step).padStart(2, '0')} ("${item.subject}") e quero receber a tabela atualizada do ${dev.name}.`,
    WHATSAPP_DEFAULT
  );
  const unsubUrl = `${SITE_ORIGIN}/descadastrar/${
    recipientEmail ? `?email=${encodeURIComponent(recipientEmail)}` : ''
  }`;

  const metricsHtml = (dev.metrics || [])
    .slice(0, 4)
    .map(
      (m) => `
      <td class="metric-col" width="25%" valign="top" style="padding:10px 8px;border-right:1px solid #e4e5dc;text-align:left;">
        <div style="font-family:'Manrope',Arial,sans-serif;font-size:9px;font-weight:800;letter-spacing:0.14em;color:#9f734b;text-transform:uppercase;">${esc(m.label)}</div>
        <div style="font-family:Georgia,'Playfair Display',serif;font-size:19px;font-weight:700;color:#17382e;margin:4px 0 2px;">${esc(m.value)}</div>
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#68766b;line-height:1.35;">${esc(m.sub)}</div>
      </td>`
    )
    .join('');

  const bulletsHtml = (item.bullets || [])
    .map(
      (b) => `
      <tr>
        <td valign="top" width="22" style="padding:0 10px 12px 0;color:#b58a5f;font-size:15px;font-weight:bold;">✦</td>
        <td valign="top" style="padding:0 0 12px 0;font-family:'DM Sans',Arial,sans-serif;font-size:14.5px;line-height:1.7;color:#2c3f34;">${esc(b)}</td>
      </tr>`
    )
    .join('');

  const otherDevsHtml = EMPREENDIMENTOS.map(
    (e) => `
    <tr>
      <td style="padding:11px 14px;border-bottom:1px solid #e6e7de;font-family:'Manrope',Arial,sans-serif;font-size:13px;font-weight:700;color:#17382e;">
        <a href="${SITE_ORIGIN}/empreendimentos/${e.slug}/" style="color:#17382e;text-decoration:none;">${esc(e.shortName)}</a>
        <div style="font-size:11px;font-weight:400;color:#68766b;margin-top:2px;">${esc(e.region)} · ${esc(e.modality)}</div>
      </td>
      <td align="right" style="padding:11px 14px;border-bottom:1px solid #e6e7de;font-family:Georgia,serif;font-size:13px;font-weight:700;color:#9f734b;white-space:nowrap;">
        <a href="${SITE_ORIGIN}/empreendimentos/${e.slug}/" style="color:#17382e;text-decoration:underline;">${esc(e.priceHighlight)} ↗</a>
      </td>
    </tr>`
  ).join('');

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(item.subject)}</title>
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
  @media only screen and (max-width: 600px) {
    .wrapper { width: 100% !important; max-width: 100% !important; }
    .pad-main { padding: 24px 18px !important; }
    .pad-header { padding: 20px 18px !important; }
    .hero-title { font-size: 25px !important; line-height: 1.2 !important; }
    .metric-col { display: block !important; width: 100% !important; border-right: 0 !important; border-bottom: 1px solid #e4e5dc !important; padding: 12px 10px !important; }
    .btn-block { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#edeae0;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1a382e;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    ${esc(item.preheader)} &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#edeae0;padding:24px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" class="wrapper" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#f8f7f2;border:1px solid #dcdad0;overflow:hidden;">

          <!-- TOP BRAND HEADER -->
          <tr>
            <td class="pad-header" style="background-color:#17382e;padding:22px 32px;border-bottom:3px solid #b58a5f;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <a href="${SITE_ORIGIN}/" style="text-decoration:none;color:#f6f5f0;display:inline-block;">
                      <span style="display:inline-block;background-color:#214a3e;border:1px solid #b58a5f;color:#e3bc88;font-family:Georgia,serif;font-size:18px;padding:6px 10px;margin-right:10px;vertical-align:middle;">T·O</span>
                      <span style="vertical-align:middle;display:inline-block;">
                        <strong style="display:block;font-family:'Manrope',Arial,sans-serif;font-size:14px;letter-spacing:0.08em;color:#ffffff;">THONY OLIVEIRA</strong>
                        <span style="display:block;font-family:'DM Sans',Arial,sans-serif;font-size:9.5px;letter-spacing:0.18em;color:#c9d3cb;">IMÓVEIS · GOIÂNIA &amp; GOIANIRA · GO</span>
                      </span>
                    </a>
                  </td>
                  <td align="right" valign="middle" style="font-family:'Manrope',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.15em;color:#e3bc88;">
                    CURADORIA #${String(item.step).padStart(2, '0')}/20
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HOOK & INTRO -->
          <tr>
            <td class="pad-main" style="padding:32px 32px 20px 32px;background-color:#f8f7f2;">
              <div style="font-family:'Manrope',Arial,sans-serif;font-size:10.5px;font-weight:800;letter-spacing:0.18em;color:#9f734b;text-transform:uppercase;margin-bottom:10px;">
                ● ${esc(item.kicker)}
              </div>
              <h1 class="hero-title" style="margin:0 0 16px 0;font-family:Georgia,'Playfair Display',serif;font-size:29px;line-height:1.18;font-weight:600;color:#17382e;">
                ${esc(item.hookTitle)}
              </h1>
              <p style="margin:0 0 12px 0;font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.75;color:#2c3f34;">
                <strong>${greeting}</strong> ${esc(item.hookLead)}
              </p>
            </td>
          </tr>

          <!-- LOOPING VIDEO GIF CARD -->
          <tr>
            <td style="padding:0 32px 24px 32px;" class="pad-main">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#17382e;border:1px solid #17382e;overflow:hidden;">
                <tr>
                  <td style="position:relative;">
                    <a href="${devPageUrl}" style="text-decoration:none;display:block;">
                      <img src="${loopGifUrl}" alt="Perspectivas oficiais — ${esc(dev.name)}" width="536" style="width:100%;max-width:536px;height:auto;display:block;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;background-color:#17382e;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:'Manrope',Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.16em;color:#e3bc88;text-transform:uppercase;">
                          PERSPECTIVAS OFICIAIS · ${esc(dev.shortName)} (${esc(dev.city)} – GO)
                        </td>
                        <td align="right">
                          <a href="${devPageUrl}" style="font-family:'Manrope',Arial,sans-serif;font-size:11px;font-weight:800;color:#ffffff;text-decoration:underline;">Ver página completa ↗</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- METRICS BAR -->
          <tr>
            <td style="padding:0 32px 24px 32px;" class="pad-main">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #dfe2d7;">
                <tr>
                  ${metricsHtml}
                </tr>
              </table>
            </td>
          </tr>

          <!-- BULLETS & HIGHLIGHT -->
          <tr>
            <td class="pad-main" style="padding:0 32px 26px 32px;">
              <h2 style="margin:0 0 14px 0;font-family:'Manrope',Arial,sans-serif;font-size:16px;font-weight:800;letter-spacing:-0.01em;color:#17382e;">
                Por que este endereço merece sua atenção:
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${bulletsHtml}
              </table>

              <!-- PRICE REFERENCE CALLOUT -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;background-color:#17382e;padding:20px 22px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <div style="font-family:'Manrope',Arial,sans-serif;font-size:9.5px;font-weight:800;letter-spacing:0.18em;color:#e3bc88;text-transform:uppercase;">
                      CONDIÇÃO COMERCIAL DE REFERÊNCIA · ${esc(dev.shortName)}
                    </div>
                    <div style="font-family:Georgia,'Playfair Display',serif;font-size:24px;font-weight:700;color:#ffffff;margin:6px 0 4px;">
                      ${esc(dev.priceHighlight)}
                    </div>
                    <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12.5px;color:#cdd8d0;line-height:1.5;">
                      ${esc(dev.priceDetail)}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- PRIMARY & SECONDARY CTAs -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td align="center">
                    <a class="btn-block" href="${waUrl}" style="display:inline-block;background-color:#1fa855;color:#ffffff;font-family:'Manrope',Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:0.11em;text-decoration:none;padding:17px 26px;text-transform:uppercase;">
                      ${esc(item.ctaLabel)} ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:12px;">
                    <a href="${devPageUrl}" style="font-family:'Manrope',Arial,sans-serif;font-size:12px;font-weight:700;color:#17382e;text-decoration:underline;">
                      Ver galeria de fotos, implantação e documentação no site →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECONDARY OFFICIAL IMAGE -->
          <tr>
            <td class="pad-main" style="padding:0 32px 28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #dfe2d7;">
                <tr>
                  <td>
                    <a href="${devPageUrl}" style="text-decoration:none;display:block;">
                      <img src="${secondaryImgUrl}" alt="${esc(dev.name)}" width="536" style="width:100%;max-width:536px;height:auto;display:block;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.55;color:#5b6b60;">
                    ${esc(item.secondaryCaption)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PORTFOLIO QUICK COMPARISON -->
          <tr>
            <td class="pad-main" style="padding:26px 32px;background-color:#f0eee4;border-top:1px solid #dfe2d7;border-bottom:1px solid #dfe2d7;">
              <div style="font-family:'Manrope',Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.16em;color:#9f734b;text-transform:uppercase;margin-bottom:6px;">
                PORTFÓLIO OFICIAL · GOIÂNIA &amp; GOIANIRA
              </div>
              <div style="font-family:Georgia,serif;font-size:20px;font-weight:600;color:#17382e;margin-bottom:14px;">
                Compare os 4 empreendimentos disponíveis agora
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #dfe2d7;">
                ${otherDevsHtml}
              </table>
            </td>
          </tr>

          <!-- COMPLETE LEGAL FOOTER -->
          <tr>
            <td class="pad-main" style="padding:28px 32px;background-color:#17382e;color:#cbd5cd;font-family:'DM Sans',Arial,sans-serif;font-size:11.5px;line-height:1.7;">
              <strong style="color:#ffffff;font-family:'Manrope',Arial,sans-serif;font-size:13px;letter-spacing:0.06em;">THONY OLIVEIRA IMÓVEIS · GOIÂNIA &amp; GOIANIRA, GOIÁS</strong><br>
              Av. Nossa Senhora das Graças, Qd 11 Lote 25 — Residencial Monte Pascoal 2, Goiânia – GO, CEP 74494-564<br>
              Atendimento consultivo direto · WhatsApp: <a href="${waUrl}" style="color:#e3bc88;text-decoration:underline;">${WHATSAPP_SHOWN}</a> · Site oficial: <a href="${SITE_ORIGIN}/" style="color:#e3bc88;text-decoration:underline;">thonyoliveiraimoveis.online</a><br><br>
              <span style="color:#9eb0a3;font-size:11px;">
                *Aviso legal: valores, parcelas e condições comerciais citados são referenciais, extraídos das tabelas e lâminas oficiais das respectivas incorporadoras, estando sujeitos a alteração e à disponibilidade de unidades no momento da consulta. Você recebe este e-mail porque cadastrou seu endereço no site oficial thonyoliveiraimoveis.online para acompanhar oportunidades e lançamentos imobiliários.
              </span>
              <hr style="border:0;border-top:1px solid #2b4f43;margin:16px 0;">
              <div style="font-size:11px;line-height:1.9;">
                <a href="${SITE_ORIGIN}/privacidade/" style="color:#e3bc88;text-decoration:underline;margin-right:12px;">Política de Privacidade (LGPD)</a>
                <a href="${SITE_ORIGIN}/termos/" style="color:#e3bc88;text-decoration:underline;margin-right:12px;">Termos de Uso</a>
                <a href="${SITE_ORIGIN}/cookies/" style="color:#e3bc88;text-decoration:underline;margin-right:12px;">Política de Cookies</a>
                <a href="${unsubUrl}" style="color:#ffffff;font-weight:700;text-decoration:underline;">Cancelar inscrição (Descadastrar)</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
