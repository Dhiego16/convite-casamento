/* =========================================================================
   config.js
   ÚNICO arquivo que você precisa editar para criar um novo convite.
   Todo o site lê os dados daqui. Não é necessário tocar em index.html,
   style.css ou script.js para trocar o conteúdo de um convite.
   ========================================================================= */

const CONVITE_CONFIG = {

  /* ---------------------------------------------------------------------
     1. IDENTIDADE DO CASAL
  --------------------------------------------------------------------- */
  noivos: {
    noiva: {
      nomeCompleto: "Ana Laizia",
      primeiroNome: "Ana",
      inicial: "A"
    },
    noivo: {
      nomeCompleto: "Maicon Miranda",
      primeiroNome: "Maicon",
      inicial: "M"
    },
    // Usado no monograma SVG animado da tela inicial
    monograma: "A & M"
  },

  /* ---------------------------------------------------------------------
     2. TEMA / PALETA (aplicado via CSS variables em tempo de execução)
  --------------------------------------------------------------------- */
  tema: {
    corFundo: "#0a0a0b",
    corFundoAlt: "#121214",
    corDourado: "#c9a868",
    corDouradoClaro: "#e3cfa0",
    corTexto: "#f5f3ee",
    corTextoSuave: "#a8a49c",
    fonteDisplay: "'Fraunces', serif",
    fonteCorpo: "'Manrope', sans-serif"
  },

  /* ---------------------------------------------------------------------
     3. TELA INICIAL (HERO)
  --------------------------------------------------------------------- */
  hero: {
    imagemFundo: "assets/images/hero.jpg",
    frase: "Para que todos vejam, e saibam, e considerem, e juntamente entendam que a mão do Senhor fez isto - Isaías 41:20",
    textoBotao: "Ver Convite"
  },

  /* ---------------------------------------------------------------------
     4. DATA & HORA DO CASAMENTO
     Formato ISO 8601 — usado pela contagem regressiva.
  --------------------------------------------------------------------- */
  evento: {
    // ATENÇÃO: esta é a data usada pela contagem regressiva. Mantenha
    // igual à data da cerimônia abaixo (ajuste se cerimônia e recepção
    // acontecerem em dias diferentes).
    dataISO: "2026-11-21T15:00:00",
    dataFormatada: "21 de Novembro de 2026",
    diaSemana: "Sábado",
    horario: "15h00"
  },

  /* ---------------------------------------------------------------------
     5. MENSAGEM DE ABERTURA
  --------------------------------------------------------------------- */
  mensagemAbertura: {
    titulo: "Vamos nos casar",
    texto: "Com o coração transbordando de alegria e a certeza de que encontramos, um no outro, o nosso melhor lugar do mundo, convidamos você para celebrar conosco o início dessa nova jornada."
  },

  /* ---------------------------------------------------------------------
     7. GALERIA DE FOTOS
  --------------------------------------------------------------------- */
  galeria: {
    titulo: "Galeria",
    subtitulo: "Momentos que guardamos com carinho",
    fotos: [
      { src: "assets/images/galeria-01.jpg"},
      { src: "assets/images/galeria-02.jpg"},
      { src: "assets/images/galeria-03.jpg"},
      { src: "assets/images/galeria-04.jpg"},
      { src: "assets/images/galeria-05.jpg"},
      { src: "assets/images/galeria-06.jpg"}
    ]
  },

  /* ---------------------------------------------------------------------
     8. CERIMÔNIA
  --------------------------------------------------------------------- */
  cerimonia: {
    titulo: "Cerimônia",
    local: "Igreja Paróquia Santo Antônio de Pádua",
    endereco: "Rua S-1 c/ S-30, Qd. 77, Lt. 01, Conj. Morada do Morro, Senador Canedo - GO",
    data: "21 de Novembro de 2026",
    horario: "15h",
    linkMaps: "https://maps.google.com/?q=Paroquia+Santo+Antonio+de+Padua+Senador+Canedo",
    // Mapa embutido por busca de endereço (sem API key, sem precisar de
    // latitude/longitude na mão — o Google localiza a partir do texto
    // abaixo). Se quiser trocar o local, só editar essa linha.
    mapaQuery: "Igreja Paróquia Santo Antônio de Pádua, Rua S-1 c/ S-30, Qd. 77, Conj. Morada do Morro, Senador Canedo - GO"
  },

  /* ---------------------------------------------------------------------
     10. MENSAGEM FINAL
  --------------------------------------------------------------------- */
  mensagemFinal: {
    texto: "Sua presença é essencial. Caso deseje nos presentear, agradecemos o carinho, mas a sua participação já é o nosso melhor presente."
  },

  /* ---------------------------------------------------------------------
     11. CONTATO
     Usado internamente pelo fallback de RSVP (abre o WhatsApp com os
     dados preenchidos). Não é exibido como seção no site.
  --------------------------------------------------------------------- */
  contato: {
    whatsapp: "+5562994415344"
  },

  /* ---------------------------------------------------------------------
     13. MÚSICA DE FUNDO
  --------------------------------------------------------------------- */
  musica: {
    arquivo: "assets/music/trilha.mp3",
    autoplay: true,
    volumeInicial: 0.5
  },

  /* ---------------------------------------------------------------------
     14. COMPARTILHAMENTO / SEO
  --------------------------------------------------------------------- */
  compartilhamento: {
    // IMPORTANTE: como o site é 100% estático, o WhatsApp/Facebook/Instagram
    // NÃO executam esse JS antes de gerar o preview do link — eles leem
    // direto as tags <meta og:title>/<meta og:description> do index.html.
    // Ou seja: se mudar titulo/descricao aqui, troque também as mesmas
    // tags no <head> do index.html, senão o preview do link continua
    // mostrando o texto genérico antigo.
    titulo: "Ana & Maicon | 21 de Novembro de 2026",
    descricao: "Você está convidado para celebrar o casamento de Ana e Maicon.",
    imagemPreview: "assets/images/hero.jpg",
    urlSite: "https://anaemaicon.com.br"
  },

  /* ---------------------------------------------------------------------
     15. CONFIRMAÇÃO DE PRESENÇA (RSVP)
  --------------------------------------------------------------------- */
  rsvp: {
    ativo: true,
    titulo: "Confirme sua Presença",
    subtitulo: "Pedimos a gentileza de confirmar até a data abaixo, pra gente organizar tudo certinho.",
    dataLimite: "01 de Novembro de 2026",
    // Cole aqui a URL do seu Google Apps Script Web App (veja README,
    // seção "Configurando o RSVP") para as respostas caírem numa planilha
    // do Google Sheets. Deixe "" pra usar o fallback por WhatsApp.
    webhookUrl: ""
  }

};

/* Exposição explícita em window — necessária porque `const` no escopo
   global NÃO cria propriedade em window (diferente de `var`). */
if (typeof window !== "undefined") {
  window.CONVITE_CONFIG = CONVITE_CONFIG;
}
