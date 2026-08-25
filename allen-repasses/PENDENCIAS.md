# Pendências antes de publicar — Allen Repasses

O site foi desenvolvido por completo (todas as páginas, seções, filtros,
formulários e integração com WhatsApp funcionando). Antes de colocar no ar
para o público, os itens abaixo precisam de informações **reais** da Allen
Repasses — nada foi inventado como se fosse dado real.

## 1. Número de WhatsApp (obrigatório)
Hoje o site usa um número placeholder (`5500000000000`) em `src/data/config.js`
(`whatsappNumber` e `whatsappDisplay`). **Sem o número real, os botões de
WhatsApp não funcionam.** Assim que tiver o número, edite esse arquivo e rode
`node build.js`.

## 2. Endereço, horário de funcionamento e mapa
`src/data/config.js` está com endereço e cidade genéricos ("Endereço a ser
definido"). Assim que houver um endereço definitivo:
- preencha `address`, `addressCity` e `openingHours`;
- gere o link de incorporação do Google Maps (Google Maps → Compartilhar →
  Incorporar mapa → copiar o `src` do iframe) e cole em `googleMapsEmbedSrc`.
  Até lá, o site mostra um bloco "mapa em breve" (sem iframe quebrado).

## 3. Instagram oficial
`instagramHandle` e `instagramUrl` estão com `@allenrepasses` como
placeholder — confirme se é o usuário real antes de publicar.

## 4. E-mail de contato
`contactEmail` está com um valor genérico (`contato@allenrepasses.com.br`),
usado apenas na Política de Privacidade — confirme se é o e-mail real.

## 5. Veículos do estoque
Os 6 veículos em `src/data/vehicles.js` (Polo, Onix Plus, Argo, HB20,
Corolla, Renegade) são **exemplos ilustrativos** para demonstrar a estrutura
do site (cards, filtros, página individual) — preços, quilometragens e
opcionais são fictícios. **Substitua pelo estoque real** antes de publicar
(veja "Como adicionar um veículo" no README.md).

## 6. Fotos dos veículos e da loja
Como ainda não há fotos reais, o site usa ilustrações placeholder (SVG, com
o aviso "Imagem ilustrativa" visível) em vez de fotos genéricas de banco de
imagens ou fotos que pudessem passar por reais sem ser. Troque por fotos
reais em `assets/img/veiculos/` (uma pasta por veículo é recomendável) e
`assets/img/about.svg`/`hero-vehicle.svg` pela foto real da loja/equipe.

## 7. Depoimentos de clientes
A seção "Quem negocia, recomenda" está propositalmente vazia (mostra uma
mensagem "em breve") — **nenhum depoimento falso foi criado**. Assim que
houver avaliações reais, adicione em `src/data/testimonials.js`.

## 8. Publicações do Instagram
A seção "Acompanhe nossas oportunidades" usa 4 cards ilustrativos com o
aviso de marca — não são publicações reais simuladas como se fossem
verdadeiras. Quando houver interesse em automatizar (mostrar posts reais),
isso requer integração com a API do Instagram/Meta — hoje o botão "Seguir no
Instagram" já leva ao perfil real assim que `instagramUrl` for confirmado.

## 9. Analytics e anúncios
`ga4MeasurementId`, `gtmContainerId`, `metaPixelId` e `googleAdsId` estão
vazios em `config.js` — os scripts correspondentes só são carregados quando
esses IDs forem preenchidos (não há chamadas quebradas nesse meio tempo).
Preencha os IDs reais quando as contas de GA4/GTM/Meta Ads/Google Ads
estiverem criadas.

## 10. Domínio definitivo
`siteUrl` em `config.js` está como `https://www.allenrepasses.com.br`
(usado nas tags de SEO/Open Graph e no `sitemap.xml`). Confirme o domínio
definitivo antes de publicar e rode `node build.js` novamente se mudar.

---

Nenhum outro conteúdo (textos institucionais, seções, botões, fluxo de
navegação) depende de informação pendente — o restante do site já reflete
exatamente o que foi solicitado.
