// ============================================================================
// ESTOQUE DE VEÍCULOS — ALLEN REPASSES
//
// ⚠️ IMPORTANTE: os veículos abaixo são EXEMPLOS ILUSTRATIVOS para demonstrar
// a estrutura do site (cards, filtros, página individual). Preços, quilo-
// metragens e opcionais são fictícios. Antes de publicar o site, substitua
// pelos veículos reais do estoque e pelas fotos reais de cada carro.
//
// COMO ADICIONAR UM VEÍCULO NOVO:
// 1. Copie um dos objetos abaixo e cole no fim do array.
// 2. Preencha os campos com as informações reais do veículo.
// 3. Troque "fotos" pelos caminhos das fotos reais (coloque os arquivos em
//    assets/img/veiculos/<slug>/ e liste os nomes aqui).
// 4. Rode "node build.js" na raiz de allen-repasses/ para gerar a página do
//    veículo e atualizar a listagem automaticamente.
// 5. Para remover um veículo do site, apague (ou comente) o objeto dele.
// ============================================================================

/** @typedef {{
 *   slug: string,
 *   marca: string,
 *   modelo: string,
 *   versao: string,
 *   anoFabModelo: string,
 *   kmValue: number,
 *   cambio: "Automático" | "Manual",
 *   combustivel: string,
 *   cor: string,
 *   motor: string,
 *   precoValue: number,
 *   localizacao: string,
 *   opcionais: string[],
 *   observacoes: string,
 *   fotos: string[],
 *   destaque: boolean
 * }} Vehicle */

/** @type {Vehicle[]} */
const vehicles = [
  {
    slug: "volkswagen-polo-comfortline-2023",
    marca: "Volkswagen",
    modelo: "Polo",
    versao: "Comfortline 200 TSI",
    anoFabModelo: "2022/2023",
    kmValue: 45000,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Branco Cristal",
    motor: "1.0 TSI Turbo",
    precoValue: 79900,
    localizacao: "Loja Allen Repasses",
    opcionais: [
      "Central multimídia com Android Auto/CarPlay",
      "Ar-condicionado digital",
      "Direção elétrica progressiva",
      "Sensor de estacionamento traseiro",
      "Rodas de liga leve",
      "Vidros e travas elétricas",
    ],
    observacoes:
      "Consulte nossa equipe para informações completas de procedência, histórico de revisões e condições de negociação deste veículo.",
    fotos: ["placeholder-01.svg", "placeholder-02.svg", "placeholder-03.svg", "placeholder-04.svg"],
    destaque: true,
  },
  {
    slug: "chevrolet-onix-plus-lt-2022",
    marca: "Chevrolet",
    modelo: "Onix Plus",
    versao: "LT 1.0 Turbo",
    anoFabModelo: "2021/2022",
    kmValue: 38500,
    cambio: "Manual",
    combustivel: "Flex",
    cor: "Prata",
    motor: "1.0 Turbo",
    precoValue: 68500,
    localizacao: "Loja Allen Repasses",
    opcionais: [
      "Multimídia 8 polegadas",
      "Ar-condicionado",
      "Direção elétrica",
      "Airbags duplos",
      "Vidros elétricos dianteiros",
    ],
    observacoes:
      "Consulte nossa equipe para informações completas de procedência, histórico de revisões e condições de negociação deste veículo.",
    fotos: ["placeholder-01.svg", "placeholder-02.svg", "placeholder-03.svg"],
    destaque: true,
  },
  {
    slug: "fiat-argo-drive-2022",
    marca: "Fiat",
    modelo: "Argo",
    versao: "Drive 1.3",
    anoFabModelo: "2022/2022",
    kmValue: 52000,
    cambio: "Manual",
    combustivel: "Flex",
    cor: "Vermelho",
    motor: "1.3 Firefly",
    precoValue: 62900,
    localizacao: "Loja Allen Repasses",
    opcionais: ["Ar-condicionado", "Direção hidráulica", "Rádio Bluetooth", "Travas elétricas"],
    observacoes:
      "Consulte nossa equipe para informações completas de procedência, histórico de revisões e condições de negociação deste veículo.",
    fotos: ["placeholder-01.svg", "placeholder-02.svg", "placeholder-03.svg"],
    destaque: false,
  },
  {
    slug: "hyundai-hb20-comfort-2023",
    marca: "Hyundai",
    modelo: "HB20",
    versao: "Comfort Plus 1.0",
    anoFabModelo: "2023/2023",
    kmValue: 21000,
    cambio: "Manual",
    combustivel: "Flex",
    cor: "Cinza Grafite",
    motor: "1.0 12V",
    precoValue: 71900,
    localizacao: "Loja Allen Repasses",
    opcionais: [
      "Central multimídia com espelhamento",
      "Ar-condicionado",
      "Sensor de estacionamento",
      "Volante multifuncional",
    ],
    observacoes:
      "Consulte nossa equipe para informações completas de procedência, histórico de revisões e condições de negociação deste veículo.",
    fotos: ["placeholder-01.svg", "placeholder-02.svg", "placeholder-03.svg"],
    destaque: true,
  },
  {
    slug: "toyota-corolla-gli-2021",
    marca: "Toyota",
    modelo: "Corolla",
    versao: "GLi 2.0 Flex",
    anoFabModelo: "2020/2021",
    kmValue: 67000,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Preto",
    motor: "2.0 Dynamic Force",
    precoValue: 118900,
    localizacao: "Loja Allen Repasses",
    opcionais: [
      "Multimídia com câmera de ré",
      "Bancos em couro",
      "Piloto automático",
      "Ar-condicionado digital dual zone",
      "Rodas de liga leve aro 16",
    ],
    observacoes:
      "Consulte nossa equipe para informações completas de procedência, histórico de revisões e condições de negociação deste veículo.",
    fotos: ["placeholder-01.svg", "placeholder-02.svg", "placeholder-03.svg", "placeholder-04.svg"],
    destaque: false,
  },
  {
    slug: "jeep-renegade-sport-2021",
    marca: "Jeep",
    modelo: "Renegade",
    versao: "Sport 1.8",
    anoFabModelo: "2020/2021",
    kmValue: 58200,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Branco",
    motor: "1.8 E.torQ",
    precoValue: 89900,
    localizacao: "Loja Allen Repasses",
    opcionais: [
      "Central multimídia Uconnect",
      "Ar-condicionado",
      "Sensor de estacionamento dianteiro e traseiro",
      "Rodas de liga leve aro 17",
      "Controle de tração",
    ],
    observacoes:
      "Consulte nossa equipe para informações completas de procedência, histórico de revisões e condições de negociação deste veículo.",
    fotos: ["placeholder-01.svg", "placeholder-02.svg", "placeholder-03.svg"],
    destaque: false,
  },
];

module.exports = vehicles;
