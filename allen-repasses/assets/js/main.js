/* ============================================================================
   ALLEN REPASSES — main.js
   Menu mobile, tracking de eventos (GA4/GTM/Meta Pixel), formulários que
   levam o lead para o WhatsApp, e a galeria da página de veículo.
   Vanilla JS, sem dependências externas — carregamento rápido.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * Analytics helper
   * data-track="whatsapp_click|vehicle_interest|..." dispara para
   * dataLayer (GTM/GA4), gtag() e fbq() quando disponíveis no site.
   * ------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];

  function trackEvent(eventName, params) {
    params = params || {};
    try {
      window.dataLayer.push(Object.assign({ event: eventName }, params));
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      }
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", eventName, params);
      }
    } catch (err) {
      /* nunca deixar o tracking quebrar a navegação do usuário */
    }
  }
  window.allenTrackEvent = trackEvent;

  /* ---------------------------------------------------------------------
   * Menu mobile
   * ------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileNav");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Cliques em WhatsApp / interesse em veículo
   * Qualquer link com [data-track] dispara o evento correspondente.
   * Links com [data-track="vehicle_interest"] também disparam whatsapp_click.
   * ------------------------------------------------------------------- */
  function initTrackedLinks() {
    document.querySelectorAll("[data-track]").forEach(function (el) {
      el.addEventListener("click", function () {
        var eventName = el.getAttribute("data-track");
        var payload = {
          vehicle_name: el.getAttribute("data-vehicle-name") || undefined,
          vehicle_slug: el.getAttribute("data-vehicle-slug") || undefined,
          vehicle_price: el.getAttribute("data-vehicle-price") || undefined,
          page_location: window.location.href,
        };
        trackEvent(eventName, payload);
        if (eventName === "vehicle_interest") {
          trackEvent("whatsapp_click", payload);
        } else if (eventName !== "whatsapp_click" && el.hasAttribute("data-wa-also")) {
          trackEvent("whatsapp_click", payload);
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
   * vehicle_view — disparado automaticamente nas páginas de veículo
   * ------------------------------------------------------------------- */
  function initVehicleView() {
    var body = document.body;
    if (body.dataset.vehicleSlug) {
      trackEvent("vehicle_view", {
        vehicle_name: body.dataset.vehicleName,
        vehicle_slug: body.dataset.vehicleSlug,
        vehicle_price: body.dataset.vehiclePrice,
      });
    }
  }

  /* ---------------------------------------------------------------------
   * Galeria da página de veículo
   * ------------------------------------------------------------------- */
  function initGallery() {
    var main = document.getElementById("galleryMain");
    var thumbs = document.querySelectorAll("[data-gallery-thumb]");
    if (!main || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var src = thumb.getAttribute("data-gallery-thumb");
        var alt = thumb.getAttribute("data-gallery-alt") || "";
        main.setAttribute("src", src);
        main.setAttribute("alt", alt);
        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Formulário "Quer vender seu veículo?"
   * Monta a mensagem com os dados informados e abre o WhatsApp.
   * ------------------------------------------------------------------- */
  function initSellForm() {
    var form = document.getElementById("sellVehicleForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var base = form.getAttribute("data-wa-base");
      var data = new FormData(form);
      var nome = (data.get("nome") || "").toString().trim();
      var whatsapp = (data.get("whatsapp") || "").toString().trim();
      var marca = (data.get("marca") || "").toString().trim();
      var modelo = (data.get("modelo") || "").toString().trim();
      var ano = (data.get("ano") || "").toString().trim();
      var km = (data.get("km") || "").toString().trim();
      var valor = (data.get("valor") || "").toString().trim();

      var lines = [
        "Olá! Quero avaliar a venda/repasse do meu veículo:",
        "Nome: " + nome,
        "WhatsApp: " + whatsapp,
        "Veículo: " + marca + " " + modelo,
        "Ano: " + ano,
        "Quilometragem: " + km,
        "Valor pretendido: " + valor,
      ];
      var message = lines.join("\n");

      trackEvent("sell_vehicle_submit", { marca: marca, modelo: modelo, ano: ano });

      window.open(base + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  }

  /* ---------------------------------------------------------------------
   * Formulário de contato
   * ------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var base = form.getAttribute("data-wa-base");
      var data = new FormData(form);
      var nome = (data.get("nome") || "").toString().trim();
      var whatsapp = (data.get("whatsapp") || "").toString().trim();
      var mensagem = (data.get("mensagem") || "").toString().trim();

      var lines = [
        "Olá! Vim pelo site da Allen Repasses.",
        "Nome: " + nome,
        "WhatsApp: " + whatsapp,
        "Mensagem: " + mensagem,
      ];
      var message = lines.join("\n");

      trackEvent("contact_submit", {});

      window.open(base + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  }

  /* ---------------------------------------------------------------------
   * Filtros do estoque (progressive enhancement sobre os cards já
   * renderizados no HTML — funciona mesmo sem JS, apenas sem filtrar).
   * ------------------------------------------------------------------- */
  function initFilters() {
    var form = document.getElementById("vehicleFilters");
    var grid = document.getElementById("vehiclesGrid");
    if (!form || !grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-card]"));
    var emptyState = document.getElementById("filtersEmpty");
    var countEl = document.getElementById("filtersCount");

    function applyFilters() {
      var marca = form.marca ? form.marca.value : "";
      var modelo = form.modelo ? form.modelo.value : "";
      var ano = form.ano ? form.ano.value : "";
      var cambio = form.cambio ? form.cambio.value : "";
      var preco = form.preco ? form.preco.value : "";
      var busca = form.busca ? form.busca.value.trim().toLowerCase() : "";

      var visibleCount = 0;

      cards.forEach(function (card) {
        var matches = true;

        if (marca && card.dataset.marca !== marca) matches = false;
        if (modelo && card.dataset.modelo !== modelo) matches = false;
        if (cambio && card.dataset.cambio !== cambio) matches = false;
        if (ano && card.dataset.ano !== ano) matches = false;

        if (preco) {
          var precoValue = Number(card.dataset.preco || 0);
          if (preco === "ate-70000" && precoValue > 70000) matches = false;
          if (preco === "70000-100000" && (precoValue < 70000 || precoValue > 100000)) matches = false;
          if (preco === "acima-100000" && precoValue < 100000) matches = false;
        }

        if (busca) {
          var haystack = (card.dataset.busca || "").toLowerCase();
          if (haystack.indexOf(busca) === -1) matches = false;
        }

        card.style.display = matches ? "" : "none";
        if (matches) visibleCount += 1;
      });

      if (emptyState) emptyState.style.display = visibleCount === 0 ? "block" : "none";
      if (countEl) countEl.textContent = String(visibleCount);
    }

    form.addEventListener("input", applyFilters);
    form.addEventListener("change", applyFilters);

    var resetBtn = document.getElementById("filtersReset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        applyFilters();
      });
    }

    applyFilters();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initTrackedLinks();
    initVehicleView();
    initGallery();
    initSellForm();
    initContactForm();
    initFilters();
  });
})();
