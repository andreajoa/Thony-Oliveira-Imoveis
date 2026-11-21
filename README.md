# Thony Oliveira Imóveis — Goiânia & Goianira

Plataforma editorial e comercial da **Thony Oliveira Imóveis**, estruturada para apresentar loteamentos planejados e condomínios horizontais reais em **Goiânia** e **Goianira (GO-070)**, com páginas estáticas otimizadas para SEO/GEO, galeria oficial e atendimento direto via WhatsApp `(62) 98529-2886`.

## Empreendimentos em destaque

1. **Residencial Parque Universitário** (`/empreendimentos/parque-universitario-goiania/`) — Goiânia · Região Norte (ao lado da UFG Campus Samambaia) · Landcorp + Ética Urbanismo · 528 lotes (480 res. + 48 com.) a partir de 270 m².
2. **Condomínio Horizontal Terraví Ipês** (`/empreendimentos/condominio-terravi-ipes-goianira/`) — Goianira · GO-070 · Terrano Urbanismo · 578 lotes (1ª etapa 230 a 482 m²), +115 mil m² de área verde, +30 itens de lazer e Tour Virtual 360° oficial.
3. **Condomínio Horizontal Pinheiros** (`/empreendimentos/condominio-pinheiros-goianira/`) — Goianira · 800 m da GO-070 · MAC Empreendimentos + VGV Brasil · 109 lotes (287 a 486 m²), lago de +5 mil m² e 19 itens de lazer.
4. **Residencial Flora Nogueira** (`/empreendimentos/residencial-flora-nogueira-goianira/`) — Goianira · 900 m da GO-070 · MAC Empreendimentos + VGV Brasil · 468 lotes (231 a 502 m²), asfalto/meio-fio/galeria já entregues e +14 mil m² de área verde.

## O que funciona

- **Home editorial + busca funcional:** filtros por modalidade, região e perfil sobre o catálogo real (`src/data/empreendimentos.js`) + tabela comparativa lado a lado.
- **4 Landing Pages estáticas dedicadas (`/empreendimentos/<slug>/`):** galeria curada com lightbox, mapa de implantação ampliável, Tour 360° no Terraví Ipês, tempos de deslocamento, ficha jurídica (decretos e matrícula no CRI), FAQ, Schema JSON-LD (`RealEstateListing`, `BreadcrumbList`, `FAQPage`) e CTAs contextuais para o WhatsApp do Thony.
- **Experiências cinematográficas `ScrollFilm`:** *Do Terreno ao Lar* (`HouseBuild`) e *Visita Imersiva* (`HouseTour`) em canvas 2D leve com mosaicos WebP 2×2 (identificadas como simulações ilustrativas).
- **33 páginas regionais de busca (`/explorar/<slug>/`) + `llms.txt` / `llms-full.txt`:** HTML estático completo conectado aos empreendimentos reais cobrindo Goiás, Goiânia, Goianira e Região Metropolitana + `sitemap.xml` e `robots.txt`.
- **Pop-up de Captura com Vídeo em Loop (`src/components/LeadPopup.jsx`):**
  - Exibe vídeo curto em loop (`/email/popup-loop.mp4`) com fallback automático para imagem oficial.
  - **Regra fixa de destaque automático (`getPopupFeaturedEmpreendimento` em `src/data/empreendimentos.js`):** sempre que um novo imóvel é adicionado ao array `EMPREENDIMENTOS` (com `addedAt` mais recente ou `featuredInPopup: true`), ele assume automaticamente o destaque do Pop-up.
- **Sequência de 20 E-mails de 5 em 5 dias (`src/data/emailCampaigns.js` + Cloudflare Worker `thony-oliveira-email`):**
  - Disparo imediato do E-mail #01 no cadastro + Cron diário (`0 12 * * *`) enviando os E-mails #02 a #20 de 5 em 5 dias (Dia 0 ao Dia 95) via **Resend** (primário) e **Brevo** (CRM + failover + 20 templates sincronizados), com GIFs em loop (`/email/loop-*.gif`), paleta editorial oficial e rodapé completo com links para `/privacidade/`, `/termos/`, `/cookies/` e `/descadastrar/`.

## Desenvolvimento e build

```bash
npm install
npm run dev
# http://localhost:5173

npm run build
# gera dist/ (SPA + 4 páginas de empreendimentos + 19 páginas SEO + sitemap.xml)
```

## Deploy na NexaCloud

Publicado em **https://thonyoliveiraimoveis.online** (com `www.thonyoliveiraimoveis.online` e redirecionamento automático de `thony-oliveira-imoveis.nexaclouds.online`) via `.github/workflows/nexacloud.yml`.
- Respeita os limites da NexaCloud (25 MB/arquivo, 95 MB totais e < 490 arquivos por deploy).
- Não redirecione todas as rotas para `/index.html`, pois existem páginas estáticas reais em `/empreendimentos/.../index.html` e `/explorar/.../index.html`.
- Variáveis opcionais em `.env.example` (`VITE_WHATSAPP_NUMBER`, `VITE_CRECI`, `SITE_URL`, `VITE_DEMO_MODE`).
