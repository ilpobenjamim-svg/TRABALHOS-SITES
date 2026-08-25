#!/usr/bin/env node
// Gera as ilustrações placeholder (SVG) usadas enquanto fotos reais dos
// veículos e da loja não estão disponíveis. Rode "node tools/generate-placeholders.js"
// apenas se precisar recriar/alterar essas artes. Não é executado pelo build.js.

const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "assets", "img");
const OUT_VEHICLES = path.join(OUT, "veiculos");
fs.mkdirSync(OUT_VEHICLES, { recursive: true });

const CAR_PATH = `M60 300c0-14 8-26 20-33l24-46c8-15 24-25 41-25h150c17 0 33 10 41 25l24 46c12 7 20 19 20 33v70c0 8-6 14-14 14h-18c-8 0-14-6-14-14v-10H106v10c0 8-6 14-14 14H74c-8 0-14-6-14-14v-70z`;
const WHEEL_L = { cx: 132, cy: 372 };
const WHEEL_R = { cx: 388, cy: 372 };
const WINDOW_PATH = `M148 242l16-38c4-9 13-15 23-15h106c10 0 19 6 23 15l16 38H148z`;

function carSvg({ w = 800, h = 600, bgFrom, bgTo, accent, label, sublabel }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${bgFrom}"/>
      <stop offset="1" stop-color="${bgTo}"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="30%" r="60%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g transform="translate(${w / 2 - 224}, ${h / 2 - 190})" opacity="0.92">
    <path d="${CAR_PATH}" fill="none" stroke="${accent}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="${WINDOW_PATH}" fill="none" stroke="${accent}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" opacity="0.75"/>
    <circle cx="${WHEEL_L.cx}" cy="${WHEEL_L.cy}" r="30" fill="none" stroke="${accent}" stroke-width="6"/>
    <circle cx="${WHEEL_R.cx}" cy="${WHEEL_R.cy}" r="30" fill="none" stroke="${accent}" stroke-width="6"/>
  </g>
  <g font-family="Arial, sans-serif">
    <text x="32" y="44" fill="#ffffff" opacity="0.55" font-size="13" font-weight="700" letter-spacing="2">ALLEN REPASSES</text>
    <text x="32" y="${h - 28}" fill="#ffffff" font-size="20" font-weight="700">${label}</text>
    ${sublabel ? `<text x="32" y="${h - 8}" fill="#ffffff" opacity="0.55" font-size="12">${sublabel}</text>` : ""}
  </g>
</svg>`;
}

const vehicleViews = [
  { file: "placeholder-01.svg", label: "Frente" },
  { file: "placeholder-02.svg", label: "Lateral" },
  { file: "placeholder-03.svg", label: "Traseira" },
  { file: "placeholder-04.svg", label: "Interior" },
];

vehicleViews.forEach((view, i) => {
  const svg = carSvg({
    bgFrom: "#15171b",
    bgTo: "#0a0b0d",
    accent: "#ff6a1a",
    label: view.label,
    sublabel: "Imagem ilustrativa — substituir por foto real",
  });
  fs.writeFileSync(path.join(OUT_VEHICLES, view.file), svg, "utf8");
});

// Hero (imagem grande da home)
fs.writeFileSync(
  path.join(OUT, "hero-vehicle.svg"),
  carSvg({
    w: 960,
    h: 720,
    bgFrom: "#1c1f25",
    bgTo: "#0a0b0d",
    accent: "#ff8c4d",
    label: "Veículo em destaque",
    sublabel: "Imagem ilustrativa — substituir por foto real",
  }),
  "utf8"
);

// Sobre / institucional
fs.writeFileSync(
  path.join(OUT, "about.svg"),
  carSvg({
    w: 800,
    h: 600,
    bgFrom: "#131519",
    bgTo: "#000000",
    accent: "#ff6a1a",
    label: "Allen Repasses",
    sublabel: "Imagem ilustrativa — substituir por foto real da loja/equipe",
  }),
  "utf8"
);

// OG cover (compartilhamento em redes sociais)
fs.writeFileSync(
  path.join(OUT, "og-cover.svg"),
  carSvg({
    w: 1200,
    h: 630,
    bgFrom: "#1c1f25",
    bgTo: "#0a0b0d",
    accent: "#ff8c4d",
    label: "Allen Repasses",
    sublabel: "Veículos e Oportunidades Automotivas",
  }),
  "utf8"
);

// Instagram (grade de publicações)
for (let i = 1; i <= 4; i += 1) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="g${i}" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1c1f25"/>
      <stop offset="1" stop-color="#0a0b0d"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g${i})"/>
  <g transform="translate(76,120)" opacity="0.9">
    <path d="${CAR_PATH}" transform="scale(0.6)" fill="none" stroke="#ff6a1a" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
  </g>
  <text x="24" y="368" fill="#ffffff" font-family="Arial, sans-serif" font-size="15" font-weight="700" opacity="0.7">@allenrepasses</text>
</svg>`;
  fs.writeFileSync(path.join(OUT, `instagram-placeholder-0${i}.svg`), svg, "utf8");
}

// Favicon simples (marca minimalista)
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#0a0b0d"/>
  <g transform="translate(9,15)" opacity="0.95">
    <path d="M4 24c0-1.2.6-2.2 1.6-2.8l2-3.8c.6-1.2 2-2.1 3.4-2.1h12.6c1.4 0 2.8.9 3.4 2.1l2 3.8c1 .6 1.6 1.6 1.6 2.8v5.8c0 .7-.5 1.2-1.2 1.2h-1.5c-.7 0-1.2-.5-1.2-1.2v-.8H8.9v.8c0 .7-.5 1.2-1.2 1.2H6.2c-.7 0-1.2-.5-1.2-1.2V24z" fill="none" stroke="#ff6a1a" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="11" cy="30.5" r="2.4" fill="none" stroke="#ff6a1a" stroke-width="2.2"/>
    <circle cx="31" cy="30.5" r="2.4" fill="none" stroke="#ff6a1a" stroke-width="2.2"/>
  </g>
</svg>`;
fs.writeFileSync(path.join(OUT, "favicon.svg"), favicon, "utf8");

console.log("Placeholders gerados em assets/img/");
