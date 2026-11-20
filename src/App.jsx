import React,{useEffect,useMemo,useState} from 'react';
import {ArrowDown,ArrowRight,ArrowUpRight,BedDouble,Building2,Check,ChevronDown,Compass,Heart,Home,Instagram,MapPin,Menu,MoveUpRight,Phone,Search,ShieldCheck,SlidersHorizontal,TreePine,X} from 'lucide-react';
import HouseTour from './components/HouseTour.jsx';
import HouseBuild from './components/HouseBuild.jsx';

const demoMode=import.meta.env.VITE_DEMO_MODE!=='false';
const wa=(import.meta.env.VITE_WHATSAPP_NUMBER||'').replace(/\D/g,'');
const properties=[
 {id:1,type:'Casa',district:'Jardim Goiás',title:'Arquitetura para viver bem',subtitle:'Uma residência com integração entre espaços e natureza.',beds:4,area:320,photo:'/images/casa-1.jpg',tags:['Casa','Jardim Goiás','Condomínio'],slug:'casas-a-venda-em-goiania'},
 {id:2,type:'Apartamento',district:'Setor Bueno',title:'Uma nova perspectiva da cidade',subtitle:'Luz natural, linhas elegantes e a cidade ao redor.',beds:3,area:145,photo:'/images/apto-1.jpg',tags:['Apartamento','Setor Bueno'],slug:'apartamentos-a-venda-em-goiania'},
 {id:3,type:'Casa',district:'Setor Marista',title:'Detalhes que fazem sentido',subtitle:'Volumes contemporâneos e ambientes para reunir.',beds:3,area:280,photo:'/images/casa-2.jpg',tags:['Casa','Setor Marista','Alto padrão'],slug:'casas-em-condominio-fechado-goiania'},
 {id:4,type:'Apartamento',district:'Jardim Goiás',title:'Contemporâneo, por natureza',subtitle:'Uma pausa sofisticada no ritmo da capital.',beds:2,area:98,photo:'/images/apto-2.jpg',tags:['Apartamento','Jardim Goiás'],slug:'apartamentos-2-quartos-goiania'},
 {id:5,type:'Terreno',district:'Aparecida de Goiânia',title:'O espaço do seu projeto',subtitle:'Uma página em branco para um endereço só seu.',beds:null,area:450,photo:'/images/terreno.jpg',tags:['Terreno','Aparecida de Goiânia'],slug:'terrenos-a-venda-em-goiania'},
 {id:6,type:'Casa',district:'Parque Amazônia',title:'Conforto em cada ambiente',subtitle:'Ambientes amplos para novos começos.',beds:3,area:212,photo:'/images/casa-3.jpg',tags:['Casa','Parque Amazônia'],slug:'casas-a-venda-em-goiania'},
];
const keywordGroups=[
 {title:'Comprar imóveis',links:[['Imóveis em Goiânia','imoveis-em-goiania'],['Casas à venda','casas-a-venda-em-goiania'],['Apartamentos à venda','apartamentos-a-venda-em-goiania'],['Terrenos à venda','terrenos-a-venda-em-goiania'],['Imóveis em Aparecida de Goiânia','imoveis-em-aparecida-de-goiania']]},
 {title:'Por estilo de vida',links:[['Casas em condomínio','casas-em-condominio-fechado-goiania'],['Apartamentos na planta','apartamentos-na-planta-goiania'],['Imóveis de alto padrão','imoveis-alto-padrao-goiania'],['Apartamentos de 2 quartos','apartamentos-2-quartos-goiania'],['Apartamentos de 3 quartos','apartamentos-3-quartos-goiania']]},
 {title:'Por região',links:[['Setor Bueno','imoveis-setor-bueno-goiania'],['Setor Marista','imoveis-setor-marista-goiania'],['Jardim Goiás','imoveis-jardim-goias'],['Parque Amazônia','imoveis-parque-amazonia'],['Setor Oeste','imoveis-setor-oeste-goiania']]},
];
const imageTags=['CURADORIA DE ENDEREÇOS','GOIÂNIA, GO · BRASIL'];
function ContactButton({className='',children='Fale com Thony',message='Olá, Thony! Quero saber mais sobre os imóveis em Goiânia.'}){
 if(wa.length>=12) return <a className={className} href={'https://wa.me/'+wa+'?text='+encodeURIComponent(message)} target="_blank" rel="noopener noreferrer">{children}</a>;
 return <a className={className} href="#contato" title="Número de WhatsApp será configurado na publicação">{children}</a>;
}
function Header(){
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);fn();window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
 const nav=[['Explorar imóveis','#imoveis'],['Experiência 3D','#visita-imersiva'],['Terrenos','#terreno-ganha-vida'],['Sobre','#sobre']];
 return <header className={'site-header '+(scrolled?'is-scrolled':'')}>
  <a className="brand" href="/" aria-label="Thony Oliveira Imóveis — início"><span className="brand-mark"><span>T<span className="mark-dot">·</span>O</span></span><span className="brand-copy"><b>THONY OLIVEIRA</b><small>IMÓVEIS · GOIÂNIA</small></span></a>
  <nav className={'nav-links '+(open?'open':'')} aria-label="Navegação principal">{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}<ContactButton className="mobile-contact">Agendar conversa <ArrowUpRight size={15}/></ContactButton></nav>
  <div className="nav-actions"><span className="nav-city"><span className="online-dot"/> GOIÂNIA · GO</span><ContactButton className="nav-cta">FALE COM THONY <ArrowUpRight size={15}/></ContactButton><button className="menu-button" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>
 </header>;
}
function Hero(){
 return <section className="hero" id="inicio">
   <div className="hero-left"><div className="hero-grid-line"/>
      <div className="hero-serial"><span className="tiny-circle"/> MERCADO IMOBILIÁRIO · GOIÁS <span className="serial-num">01 / 05</span></div>
      <div className="hero-headline"><span className="eyebrow">MAIS QUE UM IMÓVEL. UM LUGAR SEU.</span><h1>Seu próximo<br/>capítulo <em>tem<br/>endereço.</em></h1><p>Casas, apartamentos e terrenos em Goiânia e região. Uma curadoria de possibilidades para encontrar o lugar certo para a sua história.</p><div className="hero-actions"><a className="button dark-button" href="#busca">EXPLORE SEU PRÓXIMO LAR <ArrowUpRight size={18}/></a><a className="text-link" href="#visita-imersiva">Conheça a experiência 3D <ArrowRight size={17}/></a></div></div>
      <div className="hero-bottom-left"><span>THONY OLIVEIRA IMÓVEIS</span><span><ArrowDown size={13}/> DESCUBRA MAIS</span></div>
   </div>
   <div className="hero-right"><img src="/images/hero.jpg" alt="Residência contemporânea com fachada envidraçada, imagem ilustrativa" fetchPriority="high"/><div className="hero-photo-shade"/><div className="hero-topmark">LOCALIZADO EM GOIÂNIA <span>16°40'S · 49°15'W</span></div><div className="hero-image-caption"><span className="image-caption-number">01 <i/> 03</span><div><span>VIVER NÃO É APENAS MORAR</span><strong>É pertencer.</strong></div><span className="square-arrow"><ArrowUpRight size={22}/></span></div><span className="hero-image-legal">FOTOGRAFIA ARQUITETÔNICA ILUSTRATIVA</span></div>
 </section>;
}
function Finder({onApply,onReset,filters,setFilters}){
 const change=(k,v)=>setFilters(s=>({...s,[k]:v}));
 return <section className="finder-section" id="busca">
 <div className="finder-heading"><div><span className="eyebrow"><span className="tiny-circle"/> UMA BUSCA À SUA MEDIDA</span><h2>Encontre o que<br/><em>combina com você.</em></h2></div><div className="finder-intro"><p>Comece pelo que importa. Explore os imóveis por tipo e localização — e descubra possibilidades por toda Goiânia.</p><span>01 — ENCONTRE SEU LUGAR</span></div></div>
 <div className="search-panel">
  <div className="finder-tabs" role="group" aria-label="Tipo de busca">{['Comprar','Alugar','Lançamentos'].map(t=><button key={t} className={filters.intent===t?'active':''} onClick={()=>change('intent',t)}>{t}</button>)}</div>
  <form className="finder-form" onSubmit={(e)=>{e.preventDefault();onApply();}}>
   <label><span>TIPO DE IMÓVEL</span><div className="select-wrap"><Home size={19}/><select value={filters.type} onChange={e=>change('type',e.target.value)}><option value="Todos">Todos os tipos</option><option>Casa</option><option>Apartamento</option><option>Terreno</option></select><ChevronDown size={15}/></div></label>
   <label><span>LOCALIZAÇÃO</span><div className="select-wrap"><MapPin size={19}/><select value={filters.district} onChange={e=>change('district',e.target.value)}><option value="Todas">Goiânia e região</option>{[...new Set(properties.map(p=>p.district))].map(d=><option key={d}>{d}</option>)}</select><ChevronDown size={15}/></div></label>
   <label><span>QUARTOS</span><div className="select-wrap"><BedDouble size={19}/><select value={filters.beds} onChange={e=>change('beds',e.target.value)}><option value="Qualquer">Qualquer</option><option value="2">2 quartos</option><option value="3">3 quartos</option><option value="4">4+ quartos</option></select><ChevronDown size={15}/></div></label>
   <button className="search-submit" type="submit"><Search size={20}/><span>BUSCAR IMÓVEIS</span><ArrowUpRight size={18}/></button>
  </form>
 </div>
 <div className="popular-queries"><span>BUSCAS POPULARES</span>{[['Casas à venda','casas-a-venda-em-goiania'],['Apartamentos no Bueno','imoveis-setor-bueno-goiania'],['Terrenos','terrenos-a-venda-em-goiania'],['Condomínios','casas-em-condominio-fechado-goiania'],['Na planta','apartamentos-na-planta-goiania']].map(([txt,slug])=><a key={slug} href={'/explorar/'+slug+'/'}>{txt}<ArrowUpRight size={13}/></a>)}</div>
 </section>;
}
function Listings({filters,applied,setFilters}){
 const result=useMemo(()=>properties.filter(p=>(applied.type==='Todos'||p.type===applied.type)&&(applied.district==='Todas'||p.district===applied.district)&&(applied.beds==='Qualquer'||(p.beds!==null&&p.beds>=Number(applied.beds)))) ,[applied]);
 const noResults=applied.intent!=='Comprar';
 return <section className="listings-section" id="imoveis">
  <div className="section-heading"><div><span className="eyebrow"><span className="tiny-circle"/> SELEÇÃO PARA INSPIRAR</span><h2>O lugar certo<br/><em>muda tudo.</em></h2></div><div className="section-heading-right"><p>Explore diferentes possibilidades de morar em Goiânia e imagine o próximo capítulo da sua história.</p><span className="listings-count">{noResults?0:result.length} EXEMPLOS ILUSTRATIVOS</span></div></div>
  {demoMode&&<div className="demo-notice"><ShieldCheck size={18}/><span>Protótipo visual: os imóveis e imagens abaixo são exemplos fictícios, não anúncios disponíveis. Preços, endereço, disponibilidade e corretor responsável serão incluídos após validação.</span></div>}
  {noResults||result.length===0?<div className="empty-results"><SlidersHorizontal size={24}/><h3>Vamos ajustar a busca?</h3><p>{noResults?'O catálogo demonstrativo apresenta apenas exemplos de compra. Imóveis para aluguel e lançamentos poderão ser integrados posteriormente.':'Nenhum exemplo visual corresponde aos filtros selecionados.'}</p><button className="button dark-button" onClick={()=>{setFilters({intent:'Comprar',type:'Todos',district:'Todas',beds:'Qualquer'});document.getElementById('busca')?.scrollIntoView({behavior:'smooth'});}}>REFAZER BUSCA <ArrowRight size={17}/></button></div>:<div className="property-grid">
  {result.map((p,i)=><article className="property-card" key={p.id}>
     <a className="property-image" href={'/explorar/'+p.slug+'/'} aria-label={'Explorar '+p.type+' em '+p.district}><img src={p.photo} alt={'Imagem ilustrativa de '+p.type.toLowerCase()+' em estilo contemporâneo'} loading="lazy"/><span className="property-label">CONCEITO {String(p.id).padStart(2,'0')}</span><span className="property-arrow"><ArrowUpRight size={20}/></span></a>
     <div className="property-meta"><span><MapPin size={14}/> {p.district.toUpperCase()}</span><span>GOIÁS, BR</span></div>
     <div className="property-body"><h3>{p.title}</h3><p>{p.subtitle}</p></div>
     <div className="property-footer"><span>{p.type.toUpperCase()} <i/> {p.beds?p.beds+' QUARTOS · ':''} {p.area} m² (ILUSTRATIVO)</span><a href={'/explorar/'+p.slug+'/'} aria-label={'Ver categoria '+p.type}><ArrowUpRight size={20}/></a></div>
   </article>)}
 </div>}
 </section>;
}
function Categories(){return <section className="categories-section" id="bairros"><div className="categories-intro"><span className="eyebrow light"><span className="tiny-circle"/> EXPLORE A CIDADE</span><h2>Goiânia tem<br/><em>um lugar para você.</em></h2><p>Do movimento do Bueno à tranquilidade de bairros residenciais, encontre imóveis por região, estilo de vida ou tipo de propriedade.</p><a href="/explorar/imoveis-em-goiania/" className="inline-light">DESCUBRA TODAS AS REGIÕES <ArrowUpRight size={17}/></a></div>
 <div className="categories-list">{[['01','Setor Bueno','imoveis-setor-bueno-goiania'],['02','Setor Marista','imoveis-setor-marista-goiania'],['03','Jardim Goiás','imoveis-jardim-goias'],['04','Parque Amazônia','imoveis-parque-amazonia'],['05','Aparecida de Goiânia','imoveis-em-aparecida-de-goiania']].map(([id,name,slug])=><a key={id} href={'/explorar/'+slug+'/'}><span>{id}</span><strong>{name}</strong><ArrowUpRight size={22}/></a>)}</div></section>;}
function About(){return <section className="about-section" id="sobre"><div className="about-photo"><img loading="lazy" src="/images/arquitetura.jpg" alt="Ambiente arquitetônico sofisticado, imagem ilustrativa"/><div className="about-photo-caption">IMÓVEIS QUE FAZEM SENTIDO <span>GOIÂNIA · GO</span></div></div><div className="about-copy"><span className="eyebrow"><span className="tiny-circle"/> SOBRE A MARCA</span><h2>Conexões reais.<br/><em>Novos começos.</em></h2><p>Thony Oliveira Imóveis nasce da ideia de que encontrar uma propriedade é muito mais do que comparar metragens. É descobrir possibilidades, conhecer regiões e tomar decisões com clareza.</p><p>Este espaço está sendo desenvolvido para reunir imóveis, informações locais e uma experiência digital que aproxima você do seu próximo endereço.</p><ContactButton className="button dark-button">CONVERSE SOBRE SEU PRÓXIMO IMÓVEL <ArrowUpRight size={18}/></ContactButton><div className="about-footer"><span>ATENDIMENTO EM GOIÂNIA E REGIÃO</span><Compass size={22}/></div></div></section>;}
function KeywordDirectory(){return <section className="keyword-section" id="explorar"><div className="keyword-intro"><span className="eyebrow"><span className="tiny-circle"/> ENCONTRE DO SEU JEITO</span><h2>Seu caminho<br/><em>começa na busca.</em></h2><p>Navegue por tipo de imóvel, bairro e características. Cada categoria tem sua própria página, pensada para responder às dúvidas de quem está procurando.</p></div><div className="keyword-columns">{keywordGroups.map(g=><div className="keyword-group" key={g.title}><h3>{g.title}</h3>{g.links.map(([title,slug])=><a key={slug} href={'/explorar/'+slug+'/'}>{title}<ArrowUpRight size={15}/></a>)}</div>)}</div></section>}
function FAQ(){return <section className="faq-section" id="duvidas"><div><span className="eyebrow"><span className="tiny-circle"/> VOCÊ PERGUNTA, A GENTE EXPLICA</span><h2>Dúvidas que<br/><em>abrem portas.</em></h2></div><div className="faq-list">{[
 ['Onde procurar casas à venda em Goiânia?','Você pode começar pelos bairros, pelo tipo de casa ou pela faixa de preço. Compare localização, infraestrutura, documentação, metragem e condições de financiamento antes de decidir.'],
 ['Quais bairros de Goiânia vale a pena conhecer?','Setor Bueno, Setor Marista, Jardim Goiás, Parque Amazônia e Setor Oeste são regiões frequentemente pesquisadas. A melhor escolha depende do orçamento e da rotina de cada família.'],
 ['Como escolher entre apartamento, casa e terreno?','Compare manutenção, condomínio, privacidade, mobilidade, custos de construção e objetivos de longo prazo. Um terreno exige uma análise especial de zoneamento, infraestrutura e documentação.'],
 ['O site já está anunciando imóveis reais?','Ainda não. Esta versão é um protótipo visual. As imagens, áreas e nomes dos imóveis são demonstrações e serão substituídos por anúncios verificados antes da publicação comercial.']
 ].map(([q,a],i)=><details key={q}><summary><span>{String(i+1).padStart(2,'0')}</span><b>{q}</b><span className="faq-plus">+</span></summary><p>{a}</p></details>)}</div></section>}
function Footer(){return <footer id="contato" className="footer"><div className="footer-top"><span className="eyebrow light"><span className="tiny-circle"/> CADA NOVA HISTÓRIA COMEÇA COM UM OLÁ</span><h2>Vamos encontrar<br/><em>o seu lugar?</em></h2><ContactButton className="footer-cta">COMECE UMA CONVERSA <ArrowUpRight size={24}/></ContactButton>{!wa&&<p className="footer-note">Contato demonstrativo: configure VITE_WHATSAPP_NUMBER para ativar o WhatsApp.</p>}</div><div className="footer-mid"><a className="footer-brand" href="/"><strong>THONY<br/>OLIVEIRA.</strong><span>IMÓVEIS & NOVOS COMEÇOS</span></a><div><span>EXPLORAR</span><a href="#imoveis">Imóveis</a><a href="#visita-imersiva">Experiência 3D</a><a href="#terreno-ganha-vida">Terrenos</a></div><div><span>LOCALIZAÇÕES</span><a href="/explorar/imoveis-setor-bueno-goiania/">Setor Bueno</a><a href="/explorar/imoveis-setor-marista-goiania/">Setor Marista</a><a href="/explorar/imoveis-em-aparecida-de-goiania/">Aparecida de Goiânia</a></div><div><span>CONTATO</span><p>Goiânia e região · Goiás, Brasil</p>{wa?<ContactButton>WhatsApp comercial ↗</ContactButton>:<p>Contato em configuração</p>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} THONY OLIVEIRA IMÓVEIS · PROTÓTIPO</span><span>FEITO PARA QUEM NÃO QUER APENAS ENCONTRAR. QUER PERTENCER.</span><a href="#inicio">VOLTAR AO INÍCIO ↑</a></div></footer>}
export default function App(){
 const initial={intent:'Comprar',type:'Todos',district:'Todas',beds:'Qualquer'};
 const [filters,setFilters]=useState(initial),[applied,setApplied]=useState(initial);
 const apply=()=>{setApplied({...filters});document.getElementById('imoveis')?.scrollIntoView({behavior:'smooth'});};
 return <><Header/><main><Hero/><Finder onApply={apply} onReset={()=>{setFilters(initial);setApplied(initial)}} filters={filters} setFilters={setFilters}/><Listings filters={filters} applied={applied} setFilters={setFilters}/><div className="between-3d"><span>ALÉM DAS FOTOS. UMA NOVA PERSPECTIVA.</span><ArrowDown size={16}/><span>02 — EXPERIMENTE O ESPAÇO</span></div><HouseTour/><Categories/><div className="between-build"><span>O SEU SONHO AINDA NÃO FOI CONSTRUÍDO?</span><span>DESCUBRA O POTENCIAL DE UM TERRENO <ArrowDown size={15}/></span></div><HouseBuild/><About/><KeywordDirectory/><FAQ/></main><Footer/></>;
}
