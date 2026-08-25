// Funções utilitárias compartilhadas pelos templates do build.

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function formatKm(value) {
  return `${value.toLocaleString("pt-BR")} km`;
}

function whatsappInterestMessage(vehicle) {
  return `Olá! Vi o ${vehicle.marca} ${vehicle.modelo} ${vehicle.versao} no site da Allen Repasses e gostaria de mais informações.`;
}

function vehicleTitle(vehicle) {
  return `${vehicle.marca} ${vehicle.modelo} ${vehicle.versao}`;
}

function buildWa(config, message) {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

module.exports = { formatPrice, formatKm, whatsappInterestMessage, vehicleTitle, buildWa };
