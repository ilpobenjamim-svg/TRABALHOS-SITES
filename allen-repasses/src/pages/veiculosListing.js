const icons = require("../partials/icons");
const vehicleCard = require("../partials/vehicleCard");
const { buildWa } = require("../lib/format");

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/**
 * @param {{config: object, vehicles: object[]}} data
 */
function veiculosListing(data) {
  const { config, vehicles } = data;
  const waHref = buildWa(config, config.whatsappMessages.home);

  const marcas = uniqueSorted(vehicles.map((v) => v.marca));
  const modelos = uniqueSorted(vehicles.map((v) => v.modelo));
  const anos = uniqueSorted(vehicles.map((v) => v.anoFabModelo.split("/")[1] || v.anoFabModelo)).reverse();

  const main = `
<div class="breadcrumb container">
  <a href="/">Início</a> ${icons.chevronRight} <span>Veículos</span>
</div>

<section class="section--tight section section--light" style="padding-top:24px;">
  <div class="container">
    <div class="section-head">
      <span class="section-head__eyebrow">Estoque completo</span>
      <h1 style="font-family:var(--font-head);font-size:clamp(28px,4vw,40px);margin-bottom:14px;">Veículos disponíveis</h1>
      <p>Filtre por marca, modelo, ano, câmbio ou preço e encontre o veículo ideal. Qualquer dúvida, fale direto com a nossa equipe pelo WhatsApp.</p>
    </div>

    <form class="filters" id="vehicleFilters">
      <div class="filters__field">
        <label for="f-busca">Buscar veículo</label>
        <input type="search" id="f-busca" name="busca" placeholder="Ex: Polo, Onix, HB20...">
      </div>
      <div class="filters__field">
        <label for="f-marca">Marca</label>
        <select id="f-marca" name="marca">
          <option value="">Todas</option>
          ${marcas.map((m) => `<option value="${m}">${m}</option>`).join("")}
        </select>
      </div>
      <div class="filters__field">
        <label for="f-modelo">Modelo</label>
        <select id="f-modelo" name="modelo">
          <option value="">Todos</option>
          ${modelos.map((m) => `<option value="${m}">${m}</option>`).join("")}
        </select>
      </div>
      <div class="filters__field">
        <label for="f-ano">Ano</label>
        <select id="f-ano" name="ano">
          <option value="">Todos</option>
          ${anos.map((a) => `<option value="${a}">${a}</option>`).join("")}
        </select>
      </div>
      <div class="filters__field">
        <label for="f-cambio">Câmbio</label>
        <select id="f-cambio" name="cambio">
          <option value="">Todos</option>
          <option value="Automático">Automático</option>
          <option value="Manual">Manual</option>
        </select>
      </div>
      <div class="filters__field">
        <label for="f-preco">Preço</label>
        <select id="f-preco" name="preco">
          <option value="">Todos</option>
          <option value="ate-70000">Até R$ 70.000</option>
          <option value="70000-100000">R$ 70.000 a R$ 100.000</option>
          <option value="acima-100000">Acima de R$ 100.000</option>
        </select>
      </div>
      <button type="button" class="filters__reset" id="filtersReset">Limpar filtros</button>
    </form>

    <p class="filters__count"><strong id="filtersCount">${vehicles.length}</strong> veículo(s) encontrado(s)</p>

    <div class="vehicles-grid" id="vehiclesGrid">
      ${vehicles.map((v) => vehicleCard(v, config)).join("")}
      <div class="vehicle-card__empty" id="filtersEmpty" style="display:none;">
        <strong>Nenhum veículo encontrado</strong>
        <p>Tente ajustar os filtros ou fale com a nossa equipe — talvez tenhamos algo parecido chegando ao estoque.</p>
      </div>
    </div>
  </div>
</section>

<section class="section cta-final">
  <div class="container cta-final__inner">
    <h2>Não encontrou o que procurava?</h2>
    <p>Fale com a Allen Repasses e conte o que você está buscando. Podemos ter a oportunidade certa para você.</p>
    <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--accent btn--lg" data-track="whatsapp_click">${icons.whatsapp} Falar com a Allen Repasses</a>
  </div>
</section>`;

  return {
    title: "Veículos Disponíveis | Allen Repasses",
    description:
      "Confira todos os veículos de repasse disponíveis na Allen Repasses. Filtre por marca, modelo, ano e preço, e fale direto com a nossa equipe pelo WhatsApp.",
    path: "/veiculos/",
    active: "veiculos",
    waMessage: config.whatsappMessages.home,
    main,
  };
}

module.exports = veiculosListing;
