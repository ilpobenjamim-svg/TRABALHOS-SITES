const icons = require("./icons");
const { formatPrice, formatKm, whatsappInterestMessage, vehicleTitle } = require("../lib/format");

/**
 * Card de veículo reutilizado na Home (destaques) e na listagem /veiculos/.
 * @param {object} vehicle
 * @param {{whatsappNumber: string}} config
 */
function vehicleCard(vehicle, config) {
  const title = vehicleTitle(vehicle);
  const price = formatPrice(vehicle.precoValue);
  const km = formatKm(vehicle.kmValue);
  const cover = `/assets/img/veiculos/${vehicle.fotos[0]}`;
  const anoCorte = vehicle.anoFabModelo.split("/")[1] || vehicle.anoFabModelo;
  const waHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(whatsappInterestMessage(vehicle))}`;

  const busca = [vehicle.marca, vehicle.modelo, vehicle.versao].join(" ").toLowerCase();

  return `
<article class="vehicle-card" data-card
  data-marca="${vehicle.marca}"
  data-modelo="${vehicle.modelo}"
  data-cambio="${vehicle.cambio}"
  data-ano="${anoCorte}"
  data-preco="${vehicle.precoValue}"
  data-busca="${busca}">
  <a href="/veiculos/${vehicle.slug}/" class="vehicle-card__media" aria-label="Ver detalhes de ${title}">
    <img src="${cover}" alt="${title}" loading="lazy" width="480" height="360">
    ${vehicle.destaque ? '<span class="vehicle-card__badge">Oportunidade</span>' : ""}
    <span class="vehicle-card__year">${vehicle.anoFabModelo}</span>
  </a>
  <div class="vehicle-card__body">
    <h3 class="vehicle-card__title"><span class="brand">${vehicle.marca}</span><a href="/veiculos/${vehicle.slug}/">${vehicle.modelo} ${vehicle.versao}</a></h3>

    <ul class="vehicle-card__specs">
      <li>${icons.gauge}${km}</li>
      <li>${icons.gearbox}${vehicle.cambio}</li>
      <li>${icons.fuel}${vehicle.combustivel}</li>
      <li>${icons.pin}${vehicle.localizacao}</li>
    </ul>

    <div class="vehicle-card__footer">
      <div class="vehicle-card__price-row">
        <span class="vehicle-card__price">${price}</span>
      </div>
      <div class="vehicle-card__actions">
        <a href="/veiculos/${vehicle.slug}/" class="btn btn--outline-light btn--card">Ver detalhes</a>
        <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--card" data-track="vehicle_interest" data-vehicle-name="${title}" data-vehicle-slug="${vehicle.slug}" data-vehicle-price="${vehicle.precoValue}">Tenho interesse</a>
      </div>
    </div>
  </div>
</article>`;
}

module.exports = vehicleCard;
