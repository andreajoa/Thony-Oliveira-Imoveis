# Plano — Catálogo Real de Empreendimentos (Thony Oliveira Imóveis)

## Overview
Transformar o site **Thony Oliveira Imóveis** de protótipo demonstrativo em vitrine comercial real para os **4 empreendimentos oficiais** em Goiânia e Goianira, mantendo a identidade editorial (verde `#17382e`, areia `#f6f5f0`, dourado `#b58a5f`) e as experiências cinematográficas `ScrollFilm`, além de criar 4 landing pages dedicadas de alta conversão com SEO/GEO completos e dentro dos limites de deploy da NexaCloud (< 490 arquivos, < 95 MB).

## Project Type
WEB (Vite 7 + React 19 + gerador de páginas estáticas Node ESM)

## Empreendimentos Incluídos
1. **Residencial Parque Universitário** — Goiânia (Região Norte, ao lado da UFG Campus Samambaia) · Landcorp + Ética Urbanismo · 528 lotes (480 res. + 48 com.), a partir de 270 m², +48 mil m² natureza/lazer, a partir de R$ 990/m².
2. **Condomínio Horizontal Terraví Ipês** — Goianira (Eixo GO-070) · Terrano Urbanismo · 578 lotes (1ª etapa 230 a 482 m²), +115 mil m² área verde, +30 itens de lazer, Tour Virtual 360° real, Decreto 170/2025, Matrícula 50.510 (R-4), entrega 1ª etapa Jul/2029, parcelas a partir de R$ 697,76* (Tabela Black Nov/26).
3. **Condomínio Horizontal Pinheiros (EM DESTAQUE)** — Goianira (800 m da GO-070) · MAC Empreendimentos + VGV Brasil · 109 lotes (287 a 486 m²), lago de +5 mil m², 19 itens de lazer, Decretos 122/2025 e 148/2025, Matrícula 45.383 (R-5), entrega prevista Mai/2029, parcelas a partir de R$ 654,19*.
4. **Residencial Flora Nogueira** — Goianira (900 m da GO-070) · MAC Empreendimentos + VGV Brasil · 468 lotes (231 a 502 m², 11 m frente), obras avançadas já entregues (asfalto, meio-fio, galeria pluvial), +14 mil m² área verde, Decretos 118/2025 e 147/2025, Matrícula 50.000 (R-4), parcelas a partir de R$ 481,76*.

## Success Criteria
- Zero anúncios fictícios na vitrine principal e zero números de telefone de terceiros/stands nas imagens ou textos.
- 100% dos CTAs apontando para WhatsApp do Thony `(62) 98529-2886` com mensagem pré-preenchida por empreendimento.
- 4 páginas estáticas ricas em `dist/empreendimentos/<slug>/index.html` com galeria lightbox, implantação, tempos de deslocamento, segurança jurídica, FAQ e JSON-LD (`BreadcrumbList`, `FAQPage`, `RealEstateListing`).
- Páginas `/explorar/` atualizadas com Goianira + Região Norte/UFG e cards dos empreendimentos reais.
- `index,follow`, `sitemap.xml` e `robots.txt` em modo produção por padrão (mantendo aviso de simulação ilustrativa apenas em `HouseBuild` e `HouseTour`).
- Deploy `dist/` abaixo de **320 arquivos** e **70 MB** (limites NexaCloud: 490 arquivos / 95 MB).
- Build (`npm run build`) limpo e verificação visual em desktop e mobile.

## Tech Stack & File Structure
- `src/data/empreendimentos.js` — fonte única de dados dos 4 empreendimentos (usada pela SPA React e pelo gerador estático).
- `public/empreendimentos/<slug>/*.webp` — ~30 fotos oficiais curadas e otimizadas em WebP (1400px, q=82).
- `public/empreendimento.css` — folha de estilo editorial dedicada das páginas de empreendimento (com lightbox JS leve inline).
- `src/App.jsx` + `src/styles.css` + `src/retention.jsx` + `src/retention.css` — Home reestruturada (Hero → Busca real → Vitrine dos 4 empreendimentos + Comparativo → `HouseBuild` → `HouseTour` → Regiões → Sobre → Diretório SEO → FAQ → Rodapé).
- `scripts/generate-pages.mjs` + `public/landing.css` — gera as 4 landing pages em `dist/empreendimentos/<slug>/index.html`, atualiza as páginas `/explorar/<slug>/index.html` (incluindo Goianira e Região Norte/UFG), injeta fallback semântico no `dist/index.html`, `sitemap.xml` e `robots.txt`.
- `index.html` + `.env.example` + `README.md` — atualizados para o catálogo real e modo produção.

## Task Breakdown
- [x] **T1 — Curadoria e otimização de mídia (`public/empreendimentos/`)**: converter as melhores perspectivas limpas e mapas de implantação dos 4 empreendimentos para WebP leve (1400px), conferindo contagem total de arquivos e MB. *(33 WebPs oficiais gerados, 7,97 MB total)*
- [x] **T2 — Catálogo central (`src/data/empreendimentos.js`)**: modelar ficha técnica, diferenciais, tempos de acesso, registro em cartório, galeria, FAQs, condições comerciais de referência e mensagens de WhatsApp.
- [x] **T3 — Reestruturação da Home (`src/App.jsx`, `src/styles.css`, `src/retention.jsx`, `src/retention.css`, `index.html`)**: Hero atualizado, busca real funcional, vitrine dos 4 empreendimentos reais + tabela comparativa rápida, `HouseBuild` em destaque antes de `HouseTour`, regiões reais, Sobre real, FAQ real e Rodapé atualizado.
- [x] **T4 — Landing Pages de Empreendimento + SEO Regional (`scripts/generate-pages.mjs`, `public/empreendimento.css`, `public/landing.css`)**: gerar `/empreendimentos/<slug>/index.html` com galeria interativa/lightbox, Tour 360° no Terraví Ipês, implantação, localização, segurança jurídica, isca de Book/Tabela no WhatsApp, Schema JSON-LD e atualizar `/explorar/` + `sitemap.xml`.
- [x] **T5 — Documentação e Env (`.env.example`, `README.md`)**: alinhar variáveis de produção (`VITE_DEMO_MODE=false`, `SITE_URL`, `VITE_CRECI` opcional).
- [x] **T6 — Phase X (Verificação)**: `npm run build`, checagem de contagem de arquivos/tamanho de `dist/` para NexaCloud, verificação de links/HTML/JSON-LD, renderização em navegador real (desktop + mobile) com screenshots inspecionados visualmente.

## ✅ PHASE X COMPLETE
- **Data:** 2026-11-21
- **Build (`npm run build`):** PASSOU (4,59 s · Vite 7.3.8 + `scripts/generate-pages.mjs`)
- **Limites NexaCloud (`dist/`):** **286 arquivos** (limite prático ~490) · **66,55 MB total** (limite 95 MB) · maior arquivo **0,54 MB** (limite 25 MB)
- **Páginas HTML geradas:** **24** (Home + 4 landing pages `/empreendimentos/<slug>/` + 19 páginas `/explorar/<slug>/`) · `sitemap.xml` e `robots.txt` em modo produção (`index,follow`)
- **Mídia oficial otimizada:** **33 imagens WebP** (`public/empreendimentos/`, 7,97 MB total)
- **Auditoria técnica e de higiene:** `0` links/ativos locais quebrados · `0` erros de JSON-LD · `0` vazamentos de telefones de terceiros/stands · `0` hexes roxos/violetas em `src/` e `public/*.css`
- **Verificação visual (Chrome desktop 1440×900 e mobile 390×844):** PASSOU após 2 rodadas de inspeção — contraste do cabeçalho na Home, âncoras `/#imoveis` e `/#comparativo`, dobra inicial desktop das páginas de empreendimento com ambos CTAs visíveis, foto acima da dobra e grade 2×2 no mobile.
