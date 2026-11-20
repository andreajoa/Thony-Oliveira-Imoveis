# Thony Oliveira Imóveis — Goiânia

Protótipo navegável, editorial e responsivo para uma futura plataforma imobiliária voltada a **Goiânia e região**. Criado para demonstração na NexaCloud.

## O que funciona

- **Home premium:** hero arquitetônico, busca filtrável, cartões demonstrativos e links de exploração.
- **Visita imersiva 3D:** cena procedural com fachada, sala, cozinha e suíte. A câmera avança com o scroll e recua ao inverter a rolagem.
- **Construção 3D por scroll:** terreno → fundação → paredes → cobertura → acabamento, também reversível.
- **15 páginas estáticas de busca:** cada categoria tem HTML completo, título, meta description, texto informativo, FAQ e navegação interna.
- **Pesquisa SEO:** script e CSV com sugestões reais extraídas do Google Suggest (41 consultas iniciais; atualizar com o script).
- **Sem backend:** usa Vite + React + Three.js + React Three Fiber + GSAP ScrollTrigger. Output estático e pronto para hospedagem.

## Requisitos

Node.js 20.19+ ou 22.12+; npm.

```bash
npm install
npm run dev
# abra http://localhost:5173

npm run build
# publique o diretório dist/ como site estático
```

## Deploy na NexaCloud

Configure:
- Root directory: raiz do repositório
- Install command: `npm ci` (ou `npm install` se não houver lockfile)
- Build command: `npm run build`
- Publish/Output directory: `dist`
- Tipo: **site estático**, sem servidor Node em produção
- Se houver regra de redirect de SPA, **não redirecione tudo para /index.html**: existem rotas estáticas reais `/explorar/.../index.html`.

As páginas estáticas foram geradas para SEO. Experiências 3D dependem de WebGL; o conteúdo de navegação e as páginas informativas não dependem dele.

## DEMO MODE: proteção contra anúncios fictícios

**Atenção:** imagens, descrições e áreas da home são demonstrativas. Não correspondem a imóveis reais disponíveis. Não foram inventados CRECI, endereço comercial, número de WhatsApp nem depoimentos.

Por padrão o site está em modo demonstração e recebe `noindex,nofollow`; assim o protótipo não compete no Google com anúncios fictícios.

Para produção:
1. Substitua cartões e imagens pelos **anúncios reais e autorizados**, preços e descrições verificadas.
2. Configure `VITE_WHATSAPP_NUMBER=5562XXXXXXXXX`.
3. Configure `VITE_DEMO_MODE=false`.
4. Configure `SITE_URL=https://seudominio.com.br` no build.
5. Confirme titularidade de negócio, CRECI se aplicável, política de privacidade, termos e dados de contato.
6. Rode novo build, revise conteúdo e envie o sitemap gerado ao Google Search Console.

Variáveis no arquivo `.env.example`.

## Palavras-chave e arquitetura

Execute na raiz:

```bash
python3 scripts/coletar-sugestoes.py
```

Gera:
- `seo/consultas-google-suggest.json` (origem e sugestões por consulta);
- `seo/mapa-palavras-chave.csv` (termos, intenção estimada e página correspondente).

**Atenção:** Google Suggest não fornece volume mensal nem dificuldade SEO. A localização é Brasil (`gl=br`) e as palavras incluem Goiânia; o resultado pode mudar e não é um ranking exclusivo de dispositivos em Goiás. Use Google Ads Keyword Planner e Search Console para números reais depois do lançamento.

Evite criar páginas repetidas trocando uma palavra. A estratégia atual usa **páginas por intenção distinta**, com conteúdo útil e espaço para anúncios reais.

## Origem visual

- Direção editorial inspirada na referência em vídeo enviada pelo solicitante.
- Fotografias de inspiração arquitetônica do Unsplash (`images.unsplash.com`), todas identificadas como imagens ilustrativas.
- Cenas 3D criadas com geometrias procedurais e materiais em tempo real. **Não são modelos 3D de imóveis à venda**.

## Estrutura

```
src/App.jsx                         Home + busca demonstrativa
src/components/HouseTour.jsx        Visita 3D reversível
src/components/HouseBuild.jsx       Obra 3D reversível
src/styles.css                      Design system responsivo
scripts/generate-pages.mjs          15 páginas SEO estáticas
scripts/coletar-sugestoes.py        Coleta de autocomplete
public/images/                      Fotos ilustrativas
public/landing.css                  Estilo das páginas SEO
seo/                                Mapa de palavras-chave
```

## Próximos passos

Integrar catálogo de imóveis (CMS/banco), filtros reais por preço/área, páginas individuais com dados estruturados fiéis ao anúncio, galeria fotográfica por imóvel, agendamento e analytics com consentimento. Para visitas 3D de **imóveis reais**, será preciso importar modelos GLB, scans ou panoramas com autorização.
