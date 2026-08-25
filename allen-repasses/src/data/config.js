// ============================================================================
// CONFIGURAÇÃO CENTRAL — ALLEN REPASSES
// Edite este arquivo para atualizar contato, redes sociais e integrações
// em TODO o site de uma só vez. Depois de editar, rode: node build.js
// ============================================================================

module.exports = {
  siteName: "Allen Repasses",
  siteUrl: "https://www.allenrepasses.com.br", // TROCAR pelo domínio definitivo antes de publicar

  // --- WhatsApp -------------------------------------------------------------
  // Formato: código do país + DDD + número, somente dígitos. Ex: 5583999999999
  whatsappNumber: "5500000000000", // PENDENTE: informar número real da Allen Repasses
  whatsappDisplay: "(00) 00000-0000", // PENDENTE: número formatado para exibição

  // --- Instagram --------------------------------------------------------------
  instagramHandle: "@allenrepasses", // PENDENTE: confirmar usuário oficial
  instagramUrl: "https://instagram.com/allenrepasses", // PENDENTE: confirmar link oficial

  // --- Localização ------------------------------------------------------------
  address: "Endereço a ser definido", // PENDENTE: endereço completo da loja
  addressCity: "Cidade / UF", // PENDENTE
  openingHours: [
    { dias: "Segunda a Sexta", horario: "09h às 18h" }, // PENDENTE: confirmar horário real
    { dias: "Sábado", horario: "09h às 13h" },
    { dias: "Domingo", horario: "Fechado" },
  ],
  // Cole aqui a URL de incorporação (src do iframe) do Google Maps quando o
  // endereço definitivo estiver disponível. Enquanto vazio, o site mostra um
  // bloco de "mapa em breve" em vez de um iframe quebrado.
  googleMapsEmbedSrc: "",

  // --- E-mail de contato --------------------------------------------------------
  contactEmail: "contato@allenrepasses.com.br", // PENDENTE: confirmar e-mail real

  // --- Analytics & Ads (preencha os IDs reais quando disponíveis) -------------
  // Enquanto os IDs abaixo estiverem vazios, os respectivos scripts não são
  // carregados — não há chamadas quebradas nem requisições para IDs inválidos.
  ga4MeasurementId: "", // Ex: "G-XXXXXXXXXX"
  gtmContainerId: "", // Ex: "GTM-XXXXXXX"
  metaPixelId: "", // Ex: "000000000000000"
  googleAdsId: "", // Ex: "AW-000000000"

  whatsappMessages: {
    home: "Olá! Vim pelo site da Allen Repasses e gostaria de conhecer os veículos disponíveis.",
    contato: "Olá! Estou no site da Allen Repasses e gostaria de falar com a equipe.",
    vendas: "Olá! Gostaria de negociar um veículo com a Allen Repasses.",
  },
};
