const icons = require("./icons");

const NAV_ITEMS = [
  { key: "home", label: "Início", href: "/" },
  { key: "veiculos", label: "Veículos", href: "/veiculos/" },
  { key: "como-funciona", label: "Como funciona", href: "/#como-funciona" },
  { key: "sobre", label: "Sobre nós", href: "/sobre/" },
  { key: "contato", label: "Contato", href: "/contato/" },
];

/**
 * @param {{active: string, waHref: string}} opts
 */
function header(opts) {
  const { active, waHref } = opts;

  const navLinks = (linkClass) =>
    NAV_ITEMS.map((item) => {
      const current = item.key === active ? ' aria-current="page"' : "";
      return `<a href="${item.href}" class="${linkClass}"${current}>${item.label}</a>`;
    }).join("\n");

  return `
<a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
<header class="header">
  <div class="container header__inner">
    <a href="/" class="brand" aria-label="Allen Repasses — página inicial">
      <span class="brand__mark">${icons.car}</span>
      <span class="brand__text">Allen Repasses<span>Veículos de repasse</span></span>
    </a>

    <nav class="nav" aria-label="Navegação principal">
      ${navLinks("")}
    </nav>

    <div class="header__actions">
      <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm header__whatsapp" data-track="whatsapp_click">
        ${icons.whatsapp}
        <span>Falar no WhatsApp</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <div class="mobile-nav" id="mobileNav">
    ${navLinks("")}
    <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--block" data-track="whatsapp_click">
      ${icons.whatsapp}
      <span>Falar no WhatsApp</span>
    </a>
  </div>
</header>`;
}

module.exports = header;
