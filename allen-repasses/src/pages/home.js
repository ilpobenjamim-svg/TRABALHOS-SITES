const icons = require("../partials/icons");
const vehicleCard = require("../partials/vehicleCard");
const { buildWa } = require("../lib/format");

function starRow() {
  return `<div class="testimonial-card__stars">${icons.star.repeat(5)}</div>`;
}

/**
 * @param {{config: object, vehicles: object[], testimonials: object[]}} data
 */
function home(data) {
  const { config, vehicles, testimonials } = data;
  const destaques = vehicles.filter((v) => v.destaque).slice(0, 3);
  const featured = destaques.length ? destaques : vehicles.slice(0, 3);
  const waHref = buildWa(config, config.whatsappMessages.home);

  const testimonialsMarkup = testimonials.length
    ? `<div class="testimonials-grid">
        ${testimonials
          .map(
            (t) => `
        <div class="testimonial-card">
          ${starRow()}
          <p class="quote">"${t.comentario}"</p>
          <p class="testimonial-card__author">${t.nome}</p>
        </div>`
          )
          .join("")}
      </div>`
    : `<div class="testimonials-empty">
        <strong>Em breve, avaliações reais por aqui</strong>
        <p>Estamos reunindo os depoimentos dos nossos clientes. Em breve você poderá conferir avaliações reais de quem já negociou com a Allen Repasses.</p>
      </div>`;

  const main = `
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__content">
      <span class="hero__eyebrow">${icons.sparkle} Veículos de repasse selecionados</span>
      <h1>Seu próximo carro <span class="h1-mark">pode estar aqui.</span></h1>
      <p class="hero__subtitle">Veículos de repasse selecionados, boas oportunidades e negociação direta.</p>
      <div class="hero__actions">
        <a href="/veiculos/" class="btn btn--accent btn--lg">${icons.car} Ver veículos disponíveis</a>
        <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--outline-dark btn--lg" data-track="whatsapp_click">${icons.whatsapp} Falar no WhatsApp</a>
      </div>
      <ul class="hero__trust">
        <li>${icons.check} Veículos selecionados</li>
        <li>${icons.check} Negociação rápida</li>
        <li>${icons.check} Atendimento pelo WhatsApp</li>
      </ul>
    </div>
    <div class="hero__media">
      <img src="/assets/img/hero-vehicle.svg" alt="Veículo em destaque na Allen Repasses" width="960" height="720">
      <div class="hero__media-badge">${icons.shieldCheck}<span>Procedência<br><strong>verificada</strong></span></div>
    </div>
  </div>
</section>

<section class="section section--light" id="veiculos-destaque">
  <div class="container">
    <div class="section-head">
      <span class="section-head__eyebrow">Estoque atualizado</span>
      <h2>Veículos disponíveis</h2>
      <p>Conheça algumas das oportunidades em destaque no nosso estoque. Veja todos os veículos disponíveis e fale direto com a nossa equipe.</p>
    </div>
    <div class="vehicles-grid">
      ${featured.map((v) => vehicleCard(v, config)).join("")}
    </div>
    <div class="stock-cta">
      <a href="/veiculos/" class="btn btn--outline-light btn--lg">Ver todos os veículos ${icons.arrowRight}</a>
    </div>
  </div>
</section>

<section class="section section--graphite">
  <div class="container">
    <div class="section-head section-head--center" style="margin-left:auto;margin-right:auto;">
      <span class="section-head__eyebrow">Por que comprar na Allen Repasses</span>
      <h2>Veículos de repasse com oportunidades reais</h2>
      <p style="margin:0 auto;">Na Allen Repasses você encontra veículos selecionados e oportunidades para quem procura comprar bem e negociar de forma rápida e transparente.</p>
    </div>
    <div class="opportunities-grid">
      <div class="opportunity-card">
        <div class="opportunity-card__icon">${icons.shieldCheck}</div>
        <h3>Boas oportunidades</h3>
        <p>Veículos selecionados com preços competitivos.</p>
      </div>
      <div class="opportunity-card">
        <div class="opportunity-card__icon">${icons.handshake}</div>
        <h3>Negociação direta</h3>
        <p>Atendimento rápido para facilitar sua compra.</p>
      </div>
      <div class="opportunity-card">
        <div class="opportunity-card__icon">${icons.sparkle}</div>
        <h3>Novos veículos constantemente</h3>
        <p>Nosso estoque é atualizado com novas oportunidades.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--light" id="como-funciona">
  <div class="container">
    <div class="section-head">
      <span class="section-head__eyebrow">Passo a passo</span>
      <h2>Comprar seu veículo ficou simples</h2>
    </div>
    <div class="steps-grid">
      <div class="step">
        <span class="step__number">01</span>
        <h3>Escolha o veículo</h3>
        <p>Veja os veículos disponíveis em nosso estoque.</p>
      </div>
      <div class="step">
        <span class="step__number">02</span>
        <h3>Fale conosco</h3>
        <p>Clique no botão de WhatsApp e tire suas dúvidas.</p>
      </div>
      <div class="step">
        <span class="step__number">03</span>
        <h3>Conheça o veículo</h3>
        <p>Agende para conferir o carro e conhecer todos os detalhes.</p>
      </div>
      <div class="step">
        <span class="step__number">04</span>
        <h3>Feche o negócio</h3>
        <p>Faça sua negociação diretamente com a Allen Repasses.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--muted">
  <div class="container about-grid">
    <div class="about-grid__media">
      <img src="/assets/img/about.svg" alt="Allen Repasses — atendimento automotivo" width="800" height="600" loading="lazy">
    </div>
    <div class="about-grid__text">
      <span class="section-head__eyebrow">Sobre a Allen Repasses</span>
      <h2>Confiança e oportunidade em cada negociação</h2>
      <p>A Allen Repasses atua no mercado automotivo oferecendo oportunidades para quem busca veículos com boas condições de negociação, com atendimento rápido, transparente e próximo.</p>
      <a href="/sobre/" class="btn btn--outline-light">Conheça a Allen Repasses ${icons.arrowRight}</a>
    </div>
  </div>
</section>

<section class="section section--dark sell-section" id="vender-veiculo">
  <div class="container sell-grid">
    <div class="sell-grid__intro">
      <span class="section-head__eyebrow">Venda ou repasse seu carro</span>
      <h2 style="font-size:clamp(26px,3.6vw,36px);margin-bottom:16px;">Quer vender seu veículo?</h2>
      <p>Envie as informações do seu carro para nossa equipe e veja as possibilidades de negociação.</p>
      <ul class="sell-grid__points">
        <li>${icons.check} Avaliação rápida e sem compromisso</li>
        <li>${icons.check} Negociação direta pelo WhatsApp</li>
        <li>${icons.check} Atendimento transparente do início ao fim</li>
      </ul>
    </div>

    <form class="sell-form" id="sellVehicleForm" data-wa-base="https://wa.me/${config.whatsappNumber}" novalidate>
      <div class="sell-form__grid">
        <div class="sell-form__field">
          <label for="sell-nome">Nome</label>
          <input type="text" id="sell-nome" name="nome" placeholder="Seu nome" required>
        </div>
        <div class="sell-form__field">
          <label for="sell-whatsapp">WhatsApp</label>
          <input type="tel" id="sell-whatsapp" name="whatsapp" placeholder="(00) 00000-0000" required>
        </div>
        <div class="sell-form__field">
          <label for="sell-marca">Marca do veículo</label>
          <input type="text" id="sell-marca" name="marca" placeholder="Ex: Volkswagen" required>
        </div>
        <div class="sell-form__field">
          <label for="sell-modelo">Modelo</label>
          <input type="text" id="sell-modelo" name="modelo" placeholder="Ex: Polo" required>
        </div>
        <div class="sell-form__field">
          <label for="sell-ano">Ano</label>
          <input type="text" id="sell-ano" name="ano" placeholder="Ex: 2022/2023" required>
        </div>
        <div class="sell-form__field">
          <label for="sell-km">Quilometragem</label>
          <input type="text" id="sell-km" name="km" placeholder="Ex: 45.000 km" required>
        </div>
        <div class="sell-form__field sell-form__field--full">
          <label for="sell-valor">Valor pretendido</label>
          <input type="text" id="sell-valor" name="valor" placeholder="Ex: R$ 70.000" required>
        </div>
      </div>
      <button type="submit" class="btn btn--whatsapp btn--block btn--lg">${icons.whatsapp} Enviar meu veículo</button>
      <p class="sell-form__note">Ao enviar, você será direcionado ao WhatsApp da Allen Repasses com os dados preenchidos.</p>
    </form>
  </div>
</section>

<section class="section section--light">
  <div class="container">
    <div class="section-head section-head--center" style="margin-left:auto;margin-right:auto;">
      <span class="section-head__eyebrow">Prova social</span>
      <h2>Quem negocia, recomenda</h2>
      <p style="margin:0 auto;">Depoimentos reais de clientes que já negociaram com a Allen Repasses.</p>
    </div>
    ${testimonialsMarkup}
  </div>
</section>

<section class="section section--muted">
  <div class="container">
    <div class="section-head section-head--center" style="margin-left:auto;margin-right:auto;">
      <span class="section-head__eyebrow">Instagram</span>
      <h2>Acompanhe nossas oportunidades</h2>
      <p style="margin:0 auto;">Siga a Allen Repasses e fique por dentro das novidades do estoque em primeira mão.</p>
    </div>
    <div class="instagram-grid">
      ${[1, 2, 3, 4]
        .map(
          (n) => `
      <a href="${config.instagramUrl}" target="_blank" rel="noopener" class="instagram-card" aria-label="Ver publicação no Instagram">
        <img src="/assets/img/instagram-placeholder-0${n}.svg" alt="Publicação Allen Repasses no Instagram" loading="lazy" width="400" height="400">
        <span class="instagram-card__overlay">${icons.instagram} @allenrepasses</span>
      </a>`
        )
        .join("")}
    </div>
    <div class="instagram-cta">
      <a href="${config.instagramUrl}" target="_blank" rel="noopener" class="btn btn--accent">${icons.instagram} Seguir no Instagram</a>
    </div>
  </div>
</section>

<section class="section section--light" id="localizacao">
  <div class="container location-grid">
    <div>
      <span class="section-head__eyebrow">Onde estamos</span>
      <h2 style="font-size:clamp(26px,3.6vw,36px);margin-bottom:24px;">Venha nos visitar</h2>
      <div class="location-list">
        <div class="location-item">
          <span class="location-item__icon">${icons.pin}</span>
          <div><h4>Endereço</h4><p>${config.address}</p></div>
        </div>
        <div class="location-item">
          <span class="location-item__icon">${icons.clock}</span>
          <div><h4>Horário de funcionamento</h4>${config.openingHours.map((h) => `<p>${h.dias}: ${h.horario}</p>`).join("")}</div>
        </div>
        <div class="location-item">
          <span class="location-item__icon">${icons.whatsapp}</span>
          <div><h4>WhatsApp</h4><a href="https://wa.me/${config.whatsappNumber}" target="_blank" rel="noopener">${config.whatsappDisplay}</a></div>
        </div>
        <div class="location-item">
          <span class="location-item__icon">${icons.instagram}</span>
          <div><h4>Instagram</h4><a href="${config.instagramUrl}" target="_blank" rel="noopener">${config.instagramHandle}</a></div>
        </div>
      </div>
    </div>
    ${
      config.googleMapsEmbedSrc
        ? `<div class="map-frame"><iframe src="${config.googleMapsEmbedSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Localização da Allen Repasses"></iframe></div>`
        : `<div class="map-frame map-frame--placeholder">${icons.mapOff}<strong>Mapa em breve</strong><span>O mapa será exibido aqui assim que o endereço definitivo da loja for confirmado.</span></div>`
    }
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
    title: "Allen Repasses | Veículos e Oportunidades Automotivas",
    description:
      "Encontre veículos de repasse e boas oportunidades na Allen Repasses. Confira nosso estoque e fale diretamente com nossa equipe pelo WhatsApp.",
    path: "/",
    active: "home",
    waMessage: config.whatsappMessages.home,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AutomotiveBusiness",
      name: "Allen Repasses",
      url: config.siteUrl,
      image: `${config.siteUrl}/assets/img/og-cover.svg`,
      telephone: config.whatsappDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: config.address,
      },
    },
    main,
  };
}

module.exports = home;
