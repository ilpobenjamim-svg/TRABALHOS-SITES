const icons = require("../partials/icons");
const { buildWa } = require("../lib/format");

/**
 * @param {{config: object}} data
 */
function contato(data) {
  const { config } = data;
  const waHref = buildWa(config, config.whatsappMessages.contato);

  const main = `
<div class="breadcrumb container">
  <a href="/">Início</a> ${icons.chevronRight} <span>Contato</span>
</div>

<section class="section section--light" style="padding-top:24px;">
  <div class="container contact-grid">
    <div>
      <span class="section-head__eyebrow">Fale com a gente</span>
      <h1 style="font-family:var(--font-head);font-size:clamp(28px,4vw,40px);margin-bottom:14px;">Contato</h1>
      <p style="color:var(--gray-600);font-size:16px;margin-bottom:28px;">Tire suas dúvidas, converse sobre um veículo do estoque ou fale sobre o repasse do seu carro. Respondemos rápido pelo WhatsApp.</p>

      <div class="contact-cards">
        <div class="contact-card">
          <span class="contact-card__icon">${icons.whatsapp}</span>
          <div><h3>WhatsApp</h3><a href="https://wa.me/${config.whatsappNumber}" target="_blank" rel="noopener" data-track="whatsapp_click">${config.whatsappDisplay}</a></div>
        </div>
        <div class="contact-card">
          <span class="contact-card__icon">${icons.instagram}</span>
          <div><h3>Instagram</h3><a href="${config.instagramUrl}" target="_blank" rel="noopener">${config.instagramHandle}</a></div>
        </div>
        <div class="contact-card">
          <span class="contact-card__icon">${icons.pin}</span>
          <div><h3>Endereço</h3><p>${config.address}</p></div>
        </div>
        <div class="contact-card">
          <span class="contact-card__icon">${icons.clock}</span>
          <div><h3>Horário de funcionamento</h3>${config.openingHours.map((h) => `<p>${h.dias}: ${h.horario}</p>`).join("")}</div>
        </div>
      </div>
    </div>

    <form class="sell-form" id="contactForm" data-wa-base="https://wa.me/${config.whatsappNumber}" novalidate style="background:var(--off-white);border-color:var(--line-on-light);">
      <div class="sell-form__grid">
        <div class="sell-form__field sell-form__field--full">
          <label for="contact-nome" style="color:var(--gray-600);">Nome</label>
          <input type="text" id="contact-nome" name="nome" placeholder="Seu nome" required style="background:var(--white);border-color:var(--line-on-light);color:var(--gray-800);">
        </div>
        <div class="sell-form__field sell-form__field--full">
          <label for="contact-whatsapp" style="color:var(--gray-600);">WhatsApp</label>
          <input type="tel" id="contact-whatsapp" name="whatsapp" placeholder="(00) 00000-0000" required style="background:var(--white);border-color:var(--line-on-light);color:var(--gray-800);">
        </div>
        <div class="sell-form__field sell-form__field--full">
          <label for="contact-mensagem" style="color:var(--gray-600);">Mensagem</label>
          <input type="text" id="contact-mensagem" name="mensagem" placeholder="Como podemos ajudar?" required style="background:var(--white);border-color:var(--line-on-light);color:var(--gray-800);">
        </div>
      </div>
      <button type="submit" class="btn btn--whatsapp btn--block btn--lg">${icons.whatsapp} Enviar mensagem</button>
      <p class="sell-form__note">Ao enviar, você será direcionado ao WhatsApp da Allen Repasses com os dados preenchidos.</p>
    </form>
  </div>
</section>

${
  config.googleMapsEmbedSrc
    ? `<section class="section--tight section section--muted"><div class="container"><div class="map-frame"><iframe src="${config.googleMapsEmbedSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Localização da Allen Repasses"></iframe></div></div></section>`
    : ""
}`;

  return {
    title: "Contato | Allen Repasses",
    description:
      "Fale com a Allen Repasses pelo WhatsApp, Instagram ou visite nossa loja. Tire suas dúvidas sobre veículos de repasse e boas oportunidades.",
    path: "/contato/",
    active: "contato",
    waMessage: config.whatsappMessages.contato,
    main,
  };
}

module.exports = contato;
