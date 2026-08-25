const icons = require("./icons");

/**
 * Barra fixa de WhatsApp na parte inferior da tela, usada nas páginas
 * de veículo (mobile). Some automaticamente em telas maiores via CSS.
 * @param {{waHref: string, vehicleName: string, vehicleSlug: string, vehiclePrice: number}} opts
 */
function mobileStickyCta(opts) {
  const { waHref, vehicleName, vehicleSlug, vehiclePrice } = opts;
  return `
<div class="mobile-sticky-cta">
  <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--whatsapp" data-track="vehicle_interest" data-vehicle-name="${vehicleName}" data-vehicle-slug="${vehicleSlug}" data-vehicle-price="${vehiclePrice}">
    ${icons.whatsapp}
    <span>Chamar no WhatsApp</span>
  </a>
</div>`;
}

module.exports = mobileStickyCta;
