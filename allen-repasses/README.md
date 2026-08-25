# Allen Repasses — Site

Site institucional e de vendas para a Allen Repasses (veículos de repasse). É um
site estático (HTML, CSS e JS puro, sem dependências em produção), gerado a
partir de templates em `src/` por um script Node (`build.js`) — isso permite
ter uma página própria e otimizada para cada veículo (SEO) sem precisar
escrever HTML repetido à mão.

## Estrutura

```
allen-repasses/
  build.js                 → gera todas as páginas HTML do site
  src/
    data/
      config.js             → WhatsApp, Instagram, endereço, analytics (EDITE AQUI)
      vehicles.js            → estoque de veículos (EDITE AQUI para add/remover carro)
      testimonials.js        → depoimentos reais de clientes (vazio até haver avaliações reais)
    partials/                → header, footer, ícones, SEO/analytics, whatsapp
    pages/                   → um template por página (home, listagem, detalhe, sobre, contato...)
    lib/format.js            → formatação de preço/km e link de WhatsApp
  tools/generate-placeholders.js → gera as artes placeholder em assets/img
  assets/
    css/style.css
    js/main.js               → menu mobile, filtros, formulários, analytics
    img/                      → imagens/ilustrações (placeholders até fotos reais)

  # Gerados por "node build.js" (não editar manualmente):
  index.html, veiculos/, sobre/, contato/, politica-de-privacidade/,
  404.html, sitemap.xml, robots.txt
```

## Como adicionar, editar ou remover um veículo

1. Abra `src/data/vehicles.js`.
2. Copie um objeto existente, cole no fim do array e preencha com os dados
   reais do veículo (marca, modelo, ano, km, câmbio, combustível, cor, motor,
   preço, opcionais, observações e fotos).
3. Coloque as fotos reais em `assets/img/veiculos/` e liste os nomes dos
   arquivos no campo `fotos` do veículo.
4. Para remover um veículo do site, apague (ou comente) o objeto correspondente.
5. Rode:

   ```bash
   node build.js
   ```

   Isso gera automaticamente: o card do veículo na listagem, a página
   individual dele (`/veiculos/nome-do-veiculo/`), o sitemap.xml e os links
   "Tenho interesse" já com a mensagem correta de WhatsApp.

## Como configurar contato, redes sociais e analytics

Tudo fica centralizado em `src/data/config.js`:

- `whatsappNumber` / `whatsappDisplay` — número real da Allen Repasses.
- `instagramHandle` / `instagramUrl` — Instagram oficial.
- `address`, `openingHours`, `googleMapsEmbedSrc` — localização (o mapa só
  aparece quando `googleMapsEmbedSrc` é preenchido; até lá, o site mostra um
  bloco "mapa em breve" em vez de um iframe quebrado).
- `ga4MeasurementId`, `gtmContainerId`, `metaPixelId`, `googleAdsId` — os
  scripts de analytics/ads só são inseridos no site quando o respectivo ID é
  preenchido aqui.

Depois de editar, rode `node build.js` para aplicar em todas as páginas.

## Rodando localmente

Não é necessário instalar nada para editar HTML/CSS/JS na mão, mas para
regenerar as páginas é preciso ter Node.js instalado.

```bash
node build.js              # gera/atualiza todas as páginas HTML
node tools/generate-placeholders.js   # (opcional) recria as ilustrações placeholder
```

Para pré-visualizar localmente, sirva a pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Eventos de analytics já implementados

O `assets/js/main.js` expõe `window.allenTrackEvent(nome, params)` e dispara
automaticamente para `dataLayer` (Google Tag Manager/GA4) e, se presentes,
`gtag()` e `fbq()`:

- `whatsapp_click` — qualquer clique em botão/link de WhatsApp.
- `vehicle_view` — ao abrir a página de um veículo.
- `vehicle_interest` — clique em "Tenho interesse" (também dispara `whatsapp_click`).
- `sell_vehicle_submit` — envio do formulário "Quer vender seu veículo?".
- `contact_submit` — envio do formulário de contato.

Basta preencher os IDs em `config.js` para os eventos passarem a alimentar
GA4, Google Ads e Meta Pixel.

## Publicação (deploy)

O site foi construído assumindo publicação na **raiz do domínio**
(ex: `https://www.allenrepasses.com.br/`) — todos os links internos e de
assets usam caminhos absolutos (`/veiculos/`, `/assets/...`). Basta publicar
o conteúdo desta pasta em qualquer hospedagem de site estático (Netlify,
Vercel, GitHub Pages com domínio próprio, Hostinger, etc.), sem build step
obrigatório no servidor — os arquivos HTML já vêm prontos.

Antes de publicar, veja o arquivo `PENDENCIAS.md` para a lista do que ainda
precisa de informação real (telefone, endereço, fotos, depoimentos, IDs de
analytics).
