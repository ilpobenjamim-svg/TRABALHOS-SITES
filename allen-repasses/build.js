#!/usr/bin/env node
// ============================================================================
// BUILD — ALLEN REPASSES
// Gera o site estático (HTML) a partir dos dados em src/data e dos templates
// em src/pages. Rode "node build.js" sempre que:
//   - adicionar, editar ou remover um veículo em src/data/vehicles.js
//   - editar contato/redes sociais/analytics em src/data/config.js
//   - adicionar depoimentos em src/data/testimonials.js
//   - alterar qualquer template em src/pages ou src/partials
// ============================================================================

const fs = require("fs");
const path = require("path");

const config = require("./src/data/config");
const vehicles = require("./src/data/vehicles");
const testimonials = require("./src/data/testimonials");

const header = require("./src/partials/header");
const footer = require("./src/partials/footer");
const { headMeta, gtmNoscript } = require("./src/partials/headMeta");
const mobileStickyCta = require("./src/partials/mobileStickyCta");
const { buildWa } = require("./src/lib/format");

const home = require("./src/pages/home");
const veiculosListing = require("./src/pages/veiculosListing");
const veiculoDetail = require("./src/pages/veiculoDetail");
const sobre = require("./src/pages/sobre");
const contato = require("./src/pages/contato");
const privacidade = require("./src/pages/privacidade");

const ROOT = __dirname;

const GENERATED_ENTRIES = ["index.html", "404.html", "sitemap.xml", "robots.txt", "veiculos", "sobre", "contato", "politica-de-privacidade"];

function clean() {
  GENERATED_ENTRIES.forEach((entry) => {
    const full = path.join(ROOT, entry);
    if (fs.existsSync(full)) {
      fs.rmSync(full, { recursive: true, force: true });
    }
  });
}

function renderDocument(page) {
  const navWaHref = buildWa(config, page.waMessage || config.whatsappMessages.home);

  const headInner = headMeta({
    title: page.title,
    description: page.description,
    path: page.path,
    config,
    structuredData: page.structuredData,
    ogImage: page.ogImage,
  });

  const headerHtml = header({ active: page.active, waHref: navWaHref });
  const footerHtml = footer({ config, waHref: navWaHref });
  const gtmNs = gtmNoscript(config);
  const stickyHtml = page.showMobileSticky ? mobileStickyCta(page.stickyProps) : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
${headInner}
</head>
<body${page.bodyAttrs || ""}>
${gtmNs}
${headerHtml}
<main id="conteudo">
${page.main}
</main>
${stickyHtml}
${footerHtml}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

function writeRoute(routePath, html) {
  const trimmed = routePath.replace(/^\/|\/$/g, "");
  const dir = trimmed ? path.join(ROOT, trimmed) : ROOT;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
  console.log(`  ✓ ${routePath}`);
}

function build() {
  console.log("Allen Repasses — gerando site...\n");
  clean();

  const routes = [];

  writeRoute("/", renderDocument(home({ config, vehicles, testimonials })));
  routes.push({ path: "/", priority: "1.0" });

  writeRoute("/veiculos/", renderDocument(veiculosListing({ config, vehicles })));
  routes.push({ path: "/veiculos/", priority: "0.9" });

  vehicles.forEach((vehicle) => {
    const related = vehicles.filter((v) => v.slug !== vehicle.slug).slice(0, 3);
    writeRoute(`/veiculos/${vehicle.slug}/`, renderDocument(veiculoDetail({ config, vehicle, related })));
    routes.push({ path: `/veiculos/${vehicle.slug}/`, priority: "0.8" });
  });

  writeRoute("/sobre/", renderDocument(sobre({ config })));
  routes.push({ path: "/sobre/", priority: "0.6" });

  writeRoute("/contato/", renderDocument(contato({ config })));
  routes.push({ path: "/contato/", priority: "0.6" });

  writeRoute("/politica-de-privacidade/", renderDocument(privacidade({ config })));
  routes.push({ path: "/politica-de-privacidade/", priority: "0.2" });

  // 404
  const notFoundHtml = renderDocument({
    title: "Página não encontrada | Allen Repasses",
    description: "A página que você procura não foi encontrada.",
    path: "/404/",
    active: "",
    waMessage: config.whatsappMessages.home,
    main: `
<section class="simple-hero" style="padding-bottom:100px;">
  <div class="container">
    <h1>Página não encontrada</h1>
    <p>O conteúdo que você procura não existe ou foi movido. Que tal ver os veículos disponíveis?</p>
    <div style="margin-top:28px;">
      <a href="/veiculos/" class="btn btn--accent btn--lg">Ver veículos disponíveis</a>
    </div>
  </div>
</section>`,
  });
  fs.writeFileSync(path.join(ROOT, "404.html"), notFoundHtml, "utf8");
  console.log("  ✓ /404.html");

  // sitemap.xml
  const urlset = routes
    .map((r) => `  <url><loc>${config.siteUrl}${r.path}</loc><priority>${r.priority}</priority></url>`)
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
  console.log("  ✓ /sitemap.xml");

  // robots.txt
  const robots = `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(ROOT, "robots.txt"), robots, "utf8");
  console.log("  ✓ /robots.txt");

  console.log(`\nConcluído: ${routes.length} páginas + 404 geradas a partir de ${vehicles.length} veículo(s).`);
}

build();
