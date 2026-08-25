const icons = require("../partials/icons");
const vehicleCard = require("../partials/vehicleCard");
const { formatPrice, formatKm, whatsappInterestMessage, vehicleTitle, buildWa } = require("../lib/format");

/**
 * @param {{config: object, vehicle: object, related: object[]}} data
 */
function veiculoDetail(data) {
  const { config, vehicle, related } = data;
  const title = vehicleTitle(vehicle);
  const price = formatPrice(vehicle.precoValue);
  const km = formatKm(vehicle.kmValue);
  const waHref = buildWa(config, whatsappInterestMessage(vehicle));
  const photos = vehicle.fotos.map((f) => `/assets/img/veiculos/${f}`);
  const photoLabels = ["Frente", "Lateral", "Traseira", "Interior"];

  const main = `
<div class="breadcrumb container">
  <a href="/">Início</a> ${icons.chevronRight} <a href="/veiculos/">Veículos</a> ${icons.chevronRight} <span>${title}</span>
</div>

<section class="vehicle-detail container">
  <div class="vehicle-detail__layout">
    <div>
      <div class="gallery">
        <div class="gallery__main">
          <img src="${photos[0]}" alt="${title} — ${photoLabels[0]}" id="galleryMain" width="960" height="720">
        </div>
        <div class="gallery__thumbs">
          ${photos
            .map(
              (src, i) => `
          <button type="button" data-gallery-thumb="${src}" data-gallery-alt="${title} — ${photoLabels[i] || "foto"}" class="${i === 0 ? "is-active" : ""}" aria-label="Ver foto: ${photoLabels[i] || "foto " + (i + 1)}">
            <img src="${src}" alt="" loading="lazy" width="240" height="180">
          </button>`
            )
            .join("")}
        </div>
      </div>

      <div class="vehicle-detail__info">
        <span class="vehicle-detail__brand">${vehicle.marca}</span>
        <h1 class="vehicle-detail__title">${vehicle.modelo} ${vehicle.versao}</h1>
        <span class="vehicle-detail__year">${vehicle.anoFabModelo} · ${km}</span>
      </div>

      <div class="detail-block">
        <h2>Principais opcionais</h2>
        <ul class="options-list">
          ${vehicle.opcionais.map((op) => `<li>${icons.check} ${op}</li>`).join("")}
        </ul>
      </div>

      <div class="detail-block">
        <h2>Observações sobre o veículo</h2>
        <p class="detail-block__text">${vehicle.observacoes}</p>
      </div>
    </div>

    <aside>
      <div class="spec-panel">
        <div class="spec-panel__price">
          <span>Valor</span>
          <strong>${price}</strong>
        </div>
        <div class="spec-list">
          <div class="spec-list__item"><span>Ano/Modelo</span><strong>${vehicle.anoFabModelo}</strong></div>
          <div class="spec-list__item"><span>Quilometragem</span><strong>${km}</strong></div>
          <div class="spec-list__item"><span>Câmbio</span><strong>${vehicle.cambio}</strong></div>
          <div class="spec-list__item"><span>Combustível</span><strong>${vehicle.combustivel}</strong></div>
          <div class="spec-list__item"><span>Cor</span><strong>${vehicle.cor}</strong></div>
          <div class="spec-list__item"><span>Motor</span><strong>${vehicle.motor}</strong></div>
          <div class="spec-list__item"><span>Localização</span><strong>${vehicle.localizacao}</strong></div>
        </div>
        <div class="spec-panel__actions">
          <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--accent btn--block btn--lg" data-track="vehicle_interest" data-vehicle-name="${title}" data-vehicle-slug="${vehicle.slug}" data-vehicle-price="${vehicle.precoValue}">${icons.car} Tenho interesse neste veículo</a>
          <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--block" data-track="whatsapp_click" data-vehicle-name="${title}" data-vehicle-slug="${vehicle.slug}">${icons.whatsapp} Chamar no WhatsApp</a>
        </div>
      </div>
    </aside>
  </div>

  ${
    related.length
      ? `<h2 class="related-heading">Outros veículos disponíveis</h2>
  <div class="vehicles-grid">${related.map((v) => vehicleCard(v, config)).join("")}</div>`
      : ""
  }
</section>`;

  return {
    title: `${title} — ${vehicle.anoFabModelo} | Allen Repasses`,
    description: `${title}, ${vehicle.anoFabModelo}, ${km}, câmbio ${vehicle.cambio}, ${vehicle.combustivel}, por ${price}. Fale agora com a Allen Repasses pelo WhatsApp.`,
    path: `/veiculos/${vehicle.slug}/`,
    active: "veiculos",
    waMessage: whatsappInterestMessage(vehicle),
    ogImage: `${config.siteUrl}${photos[0]}`,
    bodyAttrs: ` data-vehicle-slug="${vehicle.slug}" data-vehicle-name="${title}" data-vehicle-price="${vehicle.precoValue}"`,
    showMobileSticky: true,
    stickyProps: { waHref, vehicleName: title, vehicleSlug: vehicle.slug, vehiclePrice: vehicle.precoValue },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Vehicle",
      name: title,
      brand: vehicle.marca,
      model: vehicle.modelo,
      vehicleModelDate: vehicle.anoFabModelo,
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: vehicle.kmValue,
        unitCode: "KMT",
      },
      vehicleTransmission: vehicle.cambio,
      fuelType: vehicle.combustivel,
      color: vehicle.cor,
      offers: {
        "@type": "Offer",
        price: vehicle.precoValue,
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
    main,
  };
}

module.exports = veiculoDetail;
