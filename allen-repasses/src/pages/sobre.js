const icons = require("../partials/icons");
const { buildWa } = require("../lib/format");

/**
 * @param {{config: object}} data
 */
function sobre(data) {
  const { config } = data;
  const waHref = buildWa(config, config.whatsappMessages.home);

  const main = `
<div class="breadcrumb breadcrumb--dark container" style="background:var(--black);">
  <a href="/" style="color:#8a8f98;">Início</a> ${icons.chevronRight} <span style="color:#fff;">Sobre nós</span>
</div>

<section class="simple-hero" style="padding-top:36px;">
  <div class="container">
    <span class="hero__eyebrow">Institucional</span>
    <h1>Sobre a Allen Repasses</h1>
    <p>Confiança, oportunidade e agilidade em cada negociação.</p>
  </div>
</section>

<section class="section section--light">
  <div class="container about-grid">
    <div class="about-grid__media">
      <img src="/assets/img/about.svg" alt="Allen Repasses — atendimento automotivo" width="800" height="600" loading="lazy">
    </div>
    <div class="about-grid__text prose">
      <p>A Allen Repasses atua no mercado automotivo oferecendo oportunidades para quem busca veículos com boas condições de negociação.</p>
      <p>Nosso objetivo é proporcionar um atendimento rápido, transparente e próximo, facilitando todo o processo para quem deseja encontrar seu próximo veículo.</p>
      <p>Cada oportunidade apresentada em nosso estoque possui suas características e condições descritas de forma clara para que nossos clientes possam tomar a melhor decisão.</p>
      <a href="/veiculos/" class="btn btn--accent" style="margin-top:8px;">${icons.car} Ver veículos disponíveis</a>
    </div>
  </div>
</section>

<section class="section section--graphite">
  <div class="container">
    <div class="section-head section-head--center" style="margin-left:auto;margin-right:auto;">
      <span class="section-head__eyebrow">O que nos guia</span>
      <h2>Confiança, oportunidade e velocidade</h2>
    </div>
    <div class="opportunities-grid">
      <div class="opportunity-card">
        <div class="opportunity-card__icon">${icons.shieldCheck}</div>
        <h3>Transparência</h3>
        <p>Informações claras sobre cada veículo do nosso estoque.</p>
      </div>
      <div class="opportunity-card">
        <div class="opportunity-card__icon">${icons.handshake}</div>
        <h3>Negociação direta</h3>
        <p>Atendimento próximo, sem intermediários, direto pelo WhatsApp.</p>
      </div>
      <div class="opportunity-card">
        <div class="opportunity-card__icon">${icons.sparkle}</div>
        <h3>Agilidade</h3>
        <p>Processo simples, do primeiro contato ao fechamento do negócio.</p>
      </div>
    </div>
  </div>
</section>

<section class="section cta-final">
  <div class="container cta-final__inner">
    <h2>Encontrou o carro ideal?</h2>
    <p>Fale agora com a Allen Repasses e consulte todas as informações sobre o veículo.</p>
    <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--accent btn--lg" data-track="whatsapp_click">${icons.whatsapp} Falar com a Allen Repasses</a>
  </div>
</section>`;

  return {
    title: "Sobre a Allen Repasses | Veículos e Oportunidades Automotivas",
    description:
      "Conheça a Allen Repasses: atendimento rápido, transparente e próximo para quem busca veículos de repasse com boas condições de negociação.",
    path: "/sobre/",
    active: "sobre",
    waMessage: config.whatsappMessages.home,
    main,
  };
}

module.exports = sobre;
