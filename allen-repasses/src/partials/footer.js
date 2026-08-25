const icons = require("./icons");

/**
 * @param {{config: object, waHref: string}} opts
 */
function footer(opts) {
  const { config, waHref } = opts;
  const year = new Date().getFullYear();

  return `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a href="/" class="brand" aria-label="Allen Repasses — página inicial">
          <span class="brand__mark">${icons.car}</span>
          <span class="brand__text">Allen Repasses<span>Veículos de repasse</span></span>
        </a>
        <p>Veículos de repasse selecionados, boas oportunidades e negociação direta pelo WhatsApp.</p>
      </div>

      <div class="footer__col">
        <h4>Navegação</h4>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/veiculos/">Veículos</a></li>
          <li><a href="/sobre/">Sobre</a></li>
          <li><a href="/contato/">Contato</a></li>
          <li><a href="/politica-de-privacidade/">Política de Privacidade</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h4>Contato</h4>
        <ul>
          <li><a href="https://wa.me/${config.whatsappNumber}" target="_blank" rel="noopener">WhatsApp: ${config.whatsappDisplay}</a></li>
          <li><a href="${config.instagramUrl}" target="_blank" rel="noopener">Instagram: ${config.instagramHandle}</a></li>
          <li class="muted">${config.address}</li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <span>&copy; ${year} Allen Repasses. Todos os direitos reservados.</span>
      <span>Site desenvolvido por Prime Ads</span>
    </div>
  </div>
</footer>

<a href="${waHref}" target="_blank" rel="noopener" class="wa-float" aria-label="Falar no WhatsApp" data-track="whatsapp_click">
  ${icons.whatsapp}
</a>`;
}

module.exports = footer;
