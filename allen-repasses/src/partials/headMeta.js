/**
 * Monta o <head> de cada página: SEO (title, description, canonical,
 * Open Graph, Twitter Card), favicon, fontes e scripts de analytics —
 * estes últimos só são inseridos quando o respectivo ID está preenchido
 * em src/data/config.js, evitando requisições quebradas para IDs vazios.
 *
 * @param {{
 *   title: string,
 *   description: string,
 *   path: string,
 *   config: object,
 *   structuredData?: object | object[],
 *   ogImage?: string
 * }} opts
 */
function headMeta(opts) {
  const { title, description, path, config, structuredData, ogImage } = opts;
  const canonical = `${config.siteUrl}${path}`;
  const image = ogImage || `${config.siteUrl}/assets/img/og-cover.svg`;

  const jsonLd = structuredData
    ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`
    : "";

  const analytics = [];

  if (config.gtmContainerId) {
    analytics.push(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.gtmContainerId}');</script>`);
  }

  if (config.ga4MeasurementId) {
    analytics.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${config.ga4MeasurementId}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${config.ga4MeasurementId}');${config.googleAdsId ? `gtag('config','${config.googleAdsId}');` : ""}</script>`);
  }

  if (config.metaPixelId) {
    analytics.push(`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${config.metaPixelId}');fbq('track','PageView');</script>`);
  }

  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0a0b0d">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Allen Repasses">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="pt_BR">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">

<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
${jsonLd}
${analytics.join("\n")}`;
}

function gtmNoscript(config) {
  if (!config.gtmContainerId) return "";
  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config.gtmContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
}

module.exports = { headMeta, gtmNoscript };
