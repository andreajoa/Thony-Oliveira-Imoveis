import fs from 'node:fs';
import path from 'node:path';
const output='dist';
const site=(process.env.SITE_URL||'').replace(/\/$/,'');
const active=process.env.VITE_DEMO_MODE==='false';
const data=[
 ['imoveis-em-goiania','Imóveis em Goiânia','Explore opções de casas, apartamentos e terrenos em Goiânia. Compare regiões, formatos de imóvel e critérios de compra.','Antes de escolher, defina a faixa de investimento, tempo de deslocamento e características indispensáveis. A localização costuma influenciar o dia a dia tanto quanto a metragem.','Comece comparando bairros, modalidades de aquisição e documentação.','hero.jpg'],
 ['casas-a-venda-em-goiania','Casas à venda em Goiânia','Buscando casas à venda em Goiânia? Conheça critérios para comparar casas térreas, sobrados, quintal e condomínios.','Observe incidência de sol, ventilação, acessos, situação da matrícula e condições das instalações. Para quem tem filhos ou animais, o quintal pode fazer diferença na escolha.','Compare casas por metragem, localização e facilidade de manutenção.','casa-1.jpg'],
 ['apartamentos-a-venda-em-goiania','Apartamentos à venda em Goiânia','Encontre informações para buscar apartamentos à venda em Goiânia, com dicas sobre bairros, vagas, condomínio e áreas comuns.','Além da planta, considere a posição da unidade, ventilação, taxas condominiais, vagas de garagem e áreas de lazer. Visite em horários diferentes quando possível.','Compare apartamentos por bairro, número de quartos e custo total.','apto-1.jpg'],
 ['terrenos-a-venda-em-goiania','Terrenos à venda em Goiânia','Pesquise terrenos e lotes à venda em Goiânia e entenda os fatores essenciais antes de iniciar seu projeto.','Consulte o zoneamento, a topografia, infraestrutura urbana, recuos obrigatórios e documentação. Um terreno barato pode exigir investimento elevado em terraplenagem ou drenagem.','Avalie o terreno pelo potencial construtivo, não apenas pelo preço.','terreno.jpg'],
 ['imoveis-em-aparecida-de-goiania','Imóveis em Aparecida de Goiânia','Descubra possibilidades para comprar imóveis em Aparecida de Goiânia, perto de polos comerciais e acessos metropolitanos.','Aparecida de Goiânia oferece diferentes perfis de bairro. Compare a proximidade de serviços, escolas, transporte e os deslocamentos para suas atividades cotidianas.','Entenda a infraestrutura do entorno e escolha sua região.','casa-3.jpg'],
 ['casas-em-condominio-fechado-goiania','Casas em condomínio fechado em Goiânia','Conheça critérios para comprar casas em condomínio fechado em Goiânia: segurança, área de lazer, custos e localização.','Compare regras internas, valor do condomínio, qualidade da infraestrutura e acesso aos serviços da cidade. Peça informações sobre obras e reformas permitidas.','Privacidade, serviços e custo condominial precisam estar equilibrados.','casa-2.jpg'],
 ['apartamentos-na-planta-goiania','Apartamentos na planta em Goiânia','Veja o que analisar antes de comprar um apartamento na planta em Goiânia: incorporadora, memorial descritivo e prazo de entrega.','Consulte o registro da incorporação, o histórico da construtora, o fluxo de pagamentos, os índices de correção e as especificações contratuais.','Compare lançamentos pelo projeto e condições de aquisição.','apto-2.jpg'],
 ['imoveis-alto-padrao-goiania','Imóveis de alto padrão em Goiânia','Descubra critérios de escolha de imóveis de alto padrão em Goiânia, com atenção ao projeto arquitetônico e à localização.','Em imóveis de alto padrão, observe privacidade, acústica, materiais, automação, vagas e espaços de convivência. A manutenção deve integrar a avaliação.','Qualidade arquitetônica e localização fazem parte do investimento.','casa-1.jpg'],
 ['apartamentos-2-quartos-goiania','Apartamentos de 2 quartos em Goiânia','Pesquise apartamentos de 2 quartos em Goiânia e compare layouts, localização, condomínio e acessibilidade.','Dois quartos podem servir a casais, famílias pequenas e quem precisa de escritório em casa. Verifique área útil, disposição da cozinha e espaços de armazenamento.','Avalie planta funcional e despesas mensais.','apto-2.jpg'],
 ['apartamentos-3-quartos-goiania','Apartamentos de 3 quartos em Goiânia','Compare apartamentos de 3 quartos em Goiânia para famílias, escritório doméstico e mais conforto.','Observe distribuição dos quartos, existência de suíte, ventilação cruzada, vagas e elevadores. A localização influencia a rotina escolar e profissional.','Mais cômodos precisam significar mais funcionalidade.','apto-1.jpg'],
 ['imoveis-setor-bueno-goiania','Imóveis no Setor Bueno em Goiânia','Explore imóveis no Setor Bueno, em Goiânia, e saiba o que avaliar no bairro antes de comprar.','O Setor Bueno concentra comércio, serviços e áreas residenciais variadas. Compare ruas, circulação, perfil dos edifícios e facilidades do entorno.','Analise o endereço exato e os deslocamentos do cotidiano.','apto-1.jpg'],
 ['imoveis-setor-marista-goiania','Imóveis no Setor Marista em Goiânia','Conheça opções de busca por imóveis no Setor Marista, em Goiânia, e fatores de escolha para morar ou investir.','O Setor Marista reúne diferentes empreendimentos e serviços. Avalie mobilidade, ruído, disponibilidade de vagas e características da quadra do imóvel.','Compare infraestrutura e qualidade de vida no entorno imediato.','casa-2.jpg'],
 ['imoveis-jardim-goias','Imóveis no Jardim Goiás','Encontre orientações para comprar imóveis no Jardim Goiás, em Goiânia, considerando comércio, parques e perfil residencial.','O Jardim Goiás oferece diferentes opções de moradia. Pesquise a proximidade a áreas verdes, vias de acesso e serviços e compare a idade dos empreendimentos.','Escolha a rua com tanta atenção quanto o imóvel.','casa-1.jpg'],
 ['imoveis-parque-amazonia','Imóveis no Parque Amazônia em Goiânia','Conheça critérios para encontrar casas e apartamentos no Parque Amazônia, em Goiânia.','O Parque Amazônia apresenta diversidade de imóveis e ruas residenciais. Verifique conectividade, serviços próximos e características de cada quadra.','Compare infraestrutura, tamanho e custo-benefício.','casa-3.jpg'],
 ['imoveis-setor-oeste-goiania','Imóveis no Setor Oeste em Goiânia','Saiba como buscar imóveis no Setor Oeste em Goiânia e comparar apartamentos e casas por localização e comodidades.','No Setor Oeste, observe as características dos prédios, comércio, circulação de veículos e idade das instalações, além das condições de manutenção.','Localização central exige atenção ao entorno e aos custos.','apto-2.jpg']
];
const escapeHtml=t=>String(t).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const homeFile=path.join(output,'index.html');
if(fs.existsSync(homeFile)){
  let homeHtml=fs.readFileSync(homeFile,'utf8');
  if(active){
    homeHtml=homeHtml.replace('content="noindex,nofollow"','content="index,follow"');
    if(site.startsWith('https://')&&site!=='https://example.com'){
      homeHtml=homeHtml.replace('</head>','<link rel="canonical" href="'+site+'/"></head>');
    }
  }
  homeHtml=homeHtml.replace('<div id="root"></div>','<div id="root"><main><section><h1>Imóveis em Goiânia: casas, apartamentos e terrenos</h1><p>Explore casas à venda em Goiânia, apartamentos, terrenos, imóveis em condomínio fechado e oportunidades na região metropolitana.</p><nav><a href="/explorar/casas-a-venda-em-goiania/">Casas à venda em Goiânia</a> <a href="/explorar/apartamentos-a-venda-em-goiania/">Apartamentos à venda</a> <a href="/explorar/terrenos-a-venda-em-goiania/">Terrenos</a> <a href="/explorar/imoveis-setor-bueno-goiania/">Setor Bueno</a></nav></section></main></div>');
  fs.writeFileSync(homeFile,homeHtml);
}
const first=data.map(r=>r[0]);
function page(r,index){
 const [slug,title,description,body,takeaway,image]=r;
 const url='/explorar/'+slug+'/';
 const canonical=site&&site!=='https://example.com'?'<link rel="canonical" href="'+site+url+'">':'';
 const robots=active?'index,follow':'noindex,nofollow';
 const links=data.filter((x,j)=>j!==index).slice(index%5,index%5+6);
 const related=links.map(x=>'<a href="/explorar/'+x[0]+'/">'+escapeHtml(x[1])+' ↗</a>').join('');
 const crumbs=JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Início',item:site?site+'/':'/'},{'@type':'ListItem',position:2,name:title,item:site?site+url:url}]});
 const faq=[['Como começar a procurar '+title.toLowerCase()+'?','Defina orçamento, região e características essenciais. Antes de comprar, faça visitas e peça toda a documentação do imóvel.'],['O que verificar antes de assinar contrato?','Analise matrícula, certidões, condições de pagamento e os custos de transferência. Conte com profissionais habilitados para verificar a situação documental.']];
 return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="${robots}"><title>${escapeHtml(title)} | Thony Oliveira Imóveis</title><meta name="description" content="${escapeHtml(description)}">${canonical}<meta property="og:title" content="${escapeHtml(title)} | Thony Oliveira Imóveis"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:image" content="/images/${image}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;600;700&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet"><link rel="stylesheet" href="/landing.css"><script type="application/ld+json">${crumbs}</script></head>
 <body><header><a href="/" class="brand"><span class="badge">T·O</span><span><b>THONY OLIVEIRA</b><small>IMÓVEIS · GOIÂNIA</small></span></a><nav><a href="/">Início</a><a href="/#imoveis">Explorar imóveis</a><a href="/#visita-imersiva">Visita imersiva</a><a href="/#contato" class="nav-contact">Entre em contato ↗</a></nav></header>
 <main><section class="hero"><div class="hero-content"><p class="eyebrow">GOIÂNIA, GOIÁS · GUIA DE IMÓVEIS</p><p class="breadcrumbs"><a href="/">Início</a> / Explorar / ${escapeHtml(title)}</p><h1>${escapeHtml(title)}<em>.</em></h1><p class="lead">${escapeHtml(description)}</p><a class="cta" href="/#busca">FAZER UMA BUSCA PERSONALIZADA ↗</a></div><div class="hero-photo"><img src="/images/${image}" alt="Imagem arquitetônica ilustrativa para ${escapeHtml(title)}"><span>IMAGEM ILUSTRATIVA</span></div></section>
 <section class="details"><article><p class="eyebrow">ENTENDA SUA BUSCA</p><h2>Encontre uma escolha que faça sentido.</h2><p>${escapeHtml(body)}</p><h3>O que vale observar</h3><p>${escapeHtml(takeaway)} A comparação deve considerar endereço, documentação, custos totais, deslocamentos e condições reais da propriedade.</p><h3>Como filtrar imóveis na região</h3><p>Para avançar, separe os imóveis pelo tipo, bairro, número de quartos e características que você considera essenciais. Prefira anúncios com informações verificáveis, fotografias recentes e situação cadastral regular.</p><div class="notice">Este é um protótipo editorial. Não há oferta comercial ativa nesta página. As fotos são ilustrativas e serão substituídas por imóveis verificados após o lançamento oficial.</div></article><aside><div class="box"><p class="eyebrow">ORIENTAÇÃO THONY OLIVEIRA</p><h3>Antes de escolher, conheça cada detalhe.</h3><p>Converse com um profissional habilitado, visite o imóvel e avalie a documentação e as despesas antes de formalizar uma proposta.</p><a href="/#contato">FALE SOBRE SEU PRÓXIMO IMÓVEL ↗</a></div></aside></section>
 <section class="related"><p class="eyebrow">CONTINUE EXPLORANDO</p><h2>Outros caminhos para o seu próximo endereço.</h2><div class="links">${related}</div></section>
 <section class="faq"><p class="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas antes de encontrar seu novo lar.</h2>${faq.map(([q,a])=>'<details><summary>'+escapeHtml(q)+'</summary><p>'+escapeHtml(a)+'</p></details>').join('')}</section></main>
 <footer><strong>THONY OLIVEIRA.</strong><span>UM LUGAR PARA A SUA PRÓXIMA HISTÓRIA.</span><a href="/">VOLTAR PARA INÍCIO ↑</a></footer></body></html>`;
}
for(let i=0;i<data.length;i++){
 const folder=path.join(output,'explorar',data[i][0]);
 fs.mkdirSync(folder,{recursive:true});
 fs.writeFileSync(path.join(folder,'index.html'),page(data[i],i));
}
if(site.startsWith('https://')&&site!=='https://example.com'&&active){
 const urls=['/',...first.map(s=>'/explorar/'+s+'/')];
 fs.writeFileSync(path.join(output,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(p=>'<url><loc>'+site+p+'</loc></url>').join('\n')+'\n</urlset>');
 fs.writeFileSync(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+site+'/sitemap.xml\n');
}else{
 fs.writeFileSync(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\n# Protótipo: páginas com meta noindex até a publicação comercial.\n');
}
console.log('Páginas estáticas de SEO geradas: '+data.length+(active?' (modo produção)':' (modo demonstrativo: noindex)'));
