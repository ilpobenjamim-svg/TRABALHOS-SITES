const icons = require("../partials/icons");

/**
 * @param {{config: object}} data
 */
function privacidade(data) {
  const { config } = data;

  const main = `
<div class="breadcrumb container">
  <a href="/">Início</a> ${icons.chevronRight} <span>Política de Privacidade</span>
</div>

<section class="section section--light" style="padding-top:24px;">
  <div class="container prose">
    <h1 style="font-family:var(--font-head);font-size:clamp(26px,3.6vw,36px);margin-bottom:20px;">Política de Privacidade</h1>

    <h2>Coleta de informações</h2>
    <p>A Allen Repasses coleta apenas as informações necessárias para viabilizar o contato comercial, como nome e número de WhatsApp, informados voluntariamente pelo visitante ao preencher os formulários do site (por exemplo, ao demonstrar interesse em um veículo ou solicitar avaliação para venda/repasse).</p>

    <h2>Uso das informações</h2>
    <p>As informações enviadas são utilizadas exclusivamente para dar continuidade ao atendimento comercial, por meio do WhatsApp, e não são compartilhadas com terceiros para fins alheios a essa finalidade.</p>

    <h2>Cookies e ferramentas de análise</h2>
    <p>Este site pode utilizar ferramentas como Google Analytics, Google Tag Manager, Google Ads e Meta Pixel para entender como os visitantes utilizam o site e mensurar a efetividade das campanhas de marketing. Essas ferramentas podem coletar dados de navegação de forma agregada e anônima.</p>

    <h2>Contato</h2>
    <p>Em caso de dúvidas sobre esta política, entre em contato pelo WhatsApp <a href="https://wa.me/${config.whatsappNumber}" target="_blank" rel="noopener" style="color:var(--accent-dark);font-weight:600;">${config.whatsappDisplay}</a> ou pelo e-mail ${config.contactEmail}.</p>
  </div>
</section>`;

  return {
    title: "Política de Privacidade | Allen Repasses",
    description: "Saiba como a Allen Repasses coleta e utiliza as informações fornecidas pelos visitantes do site.",
    path: "/politica-de-privacidade/",
    active: "",
    waMessage: config.whatsappMessages.home,
    main,
  };
}

module.exports = privacidade;
