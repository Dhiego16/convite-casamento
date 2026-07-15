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
      nomeCompleto: "Maicon",
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
    frase: "Depois de tudo, escolhemos um ao outro. Todos os dias, escolheríamos de novo.",
    textoBotao: "Ver Convite"
  },

  /* ---------------------------------------------------------------------
     4. DATA & HORA DO CASAMENTO
     Formato ISO 8601 — usado pela contagem regressiva.
  --------------------------------------------------------------------- */
  evento: {
    dataISO: "2026-11-21T16:00:00",
    dataFormatada: "21 de Novembro de 2026",
    diaSemana: "Sábado",
    horario: "16h00"
  },

  /* ---------------------------------------------------------------------
     5. MENSAGEM DE ABERTURA
  --------------------------------------------------------------------- */
  mensagemAbertura: {
    titulo: "Vamos nos casar",
    texto: "Com o coração transbordando de alegria e a certeza de que encontramos, um no outro, o nosso melhor lugar do mundo, convidamos você para celebrar conosco o início dessa nova jornada."
  },

  /* ---------------------------------------------------------------------
     6. NOSSA HISTÓRIA (timeline)
  --------------------------------------------------------------------- */
  historia: {
    titulo: "Nossa História",
    subtitulo: "Cada capítulo nos trouxe até aqui",
    momentos: [
      {
        data: "Março de 2019",
        titulo: "Onde tudo começou",
        texto: "Um encontro marcado por amigos em comum se tornou o início de tudo. Bastou uma conversa para sabermos que ali havia algo diferente.",
        imagem: "assets/images/historia-01.jpg"
      },
      {
        data: "Dezembro de 2020",
        titulo: "Primeira viagem juntos",
        texto: "Trocamos a rotina por estradas desconhecidas e descobrimos que os melhores lugares são aqueles que vivemos em boa companhia.",
        imagem: "assets/images/historia-02.jpeg"
      },
      {
        data: "Julho de 2023",
        titulo: "Nossa casa",
        texto: "Decidimos construir um lar. Entre caixas de mudança e novos hábitos, aprendemos o valor de fazer da rotina algo especial.",
        imagem: "assets/images/historia-03.jpg"
      },
      {
        data: "Fevereiro de 2026",
        titulo: "O pedido",
        texto: "Sob o céu que testemunhou tantos dos nossos momentos, um pedido, um sim, e a certeza de que o próximo passo seria para sempre.",
        imagem: "assets/images/historia-04.png"
      }
    ]
  },

  /* ---------------------------------------------------------------------
     7. GALERIA DE FOTOS
  --------------------------------------------------------------------- */
  galeria: {
    titulo: "Galeria",
    subtitulo: "Momentos que guardamos com carinho",
    fotos: [
      { src: "assets/images/galeria-01.jpg", legenda: "Ensaio pré-wedding" },
      { src: "assets/images/galeria-02.jpg", legenda: "Viagem à Serra" },
      { src: "assets/images/galeria-03.jpg", legenda: "Aniversário de namoro" },
      { src: "assets/images/galeria-04.jpg", legenda: "Pedido de casamento" },
      { src: "assets/images/galeria-05.jpg", legenda: "Em casa" },
      { src: "assets/images/galeria-06.jpg", legenda: "Ensaio pré-wedding" }
    ]
  },

  /* ---------------------------------------------------------------------
     8. CERIMÔNIA
  --------------------------------------------------------------------- */
  cerimonia: {
    titulo: "Cerimônia",
    local: "Igreja Paróquia Santo Antônio de Pádua ",
    endereco: "Rua S-1, Conj, Morada do Morro, Senador Canedo - Goiânia - GO",
    data: "21 de Novembro de 2026",
    horario: "16h",
    linkMaps: "https://maps.google.com/?q=Espaco+Villa+Toscana+Goiania",
    latitude: -16.686810,
    longitude: -49.113090, 
  },

  /* ---------------------------------------------------------------------
     9. RECEPÇÃO
  --------------------------------------------------------------------- */
  recepcao: {
    titulo: "Recepção",
    local: "Espaço Villa Toscana",
    endereco: "Rod. GO-070, km 6 — Zona Rural, Goiânia - GO",
    data: "14 de Novembro de 2026",
    horario: "19h00",
    linkMaps: "https://maps.google.com/?q=Espaco+Villa+Toscana+Goiania",
    latitude: -16.686810,
    longitude: -49.113090, 
  },

  /* ---------------------------------------------------------------------
     10. LISTA DE PRESENTES
  --------------------------------------------------------------------- */
  presentes: {
    titulo: "Lista de Presentes",
    subtitulo: "Sua presença é o nosso maior presente. Mas se desejar nos presentear, preparamos esta lista com carinho.",
    chavePix: "beatriz.rafael.casamento@email.com",
    tipoChave: "E-mail",
    itens: [
      {
        nome: "Lua de Mel",
        descricao: "Contribua com nossa viagem dos sonhos",
        valor: 500.00,
        imagem: "assets/images/presente-01.svg",
        linkExterno: null
      },
      {
        nome: "Jogo de Jantar",
        descricao: "Porcelana para os jantares em família",
        valor: 350.00,
        imagem: "assets/images/presente-02.svg",
        linkExterno: null
      },
      {
        nome: "Enxoval de Cama",
        descricao: "Roupa de cama para o novo lar",
        valor: 280.00,
        imagem: "assets/images/presente-03.svg",
        linkExterno: null
      },
      {
        nome: "Eletrodomésticos",
        descricao: "Ajude a equipar nossa cozinha",
        valor: 420.00,
        imagem: "assets/images/presente-04.svg",
        linkExterno: "https://www.exemplo-loja.com.br/lista/beatriz-rafael"
      },
      {
        nome: "Decoração",
        descricao: "Detalhes que farão da nossa casa um lar",
        valor: 190.00,
        imagem: "assets/images/presente-05.svg",
        linkExterno: null
      },
      {
        nome: "Mobília Sala",
        descricao: "Contribua para a nossa sala de estar",
        valor: 600.00,
        imagem: "assets/images/presente-06.svg",
        linkExterno: null
      }
    ]
  },

  /* ---------------------------------------------------------------------
     11. DRESS CODE (opcional — defina "ativo: false" para ocultar)
  --------------------------------------------------------------------- */
  dressCode: {
    ativo: true,
    titulo: "Dress Code",
    texto: "Traje Esporte Fino / Cerimônia",
    observacao: "Pedimos gentilmente que se evite o uso da cor branca, reservada à noiva.",
    paletaCores: ["#0a0a0b", "#3b3a38", "#7d7568", "#c9a868", "#e8e2d5"]
  },

  /* ---------------------------------------------------------------------
     12. CONTATO
  --------------------------------------------------------------------- */
  contato: {
    titulo: "Contato",
    whatsapp: "5562999998888",
    telefone: "(62) 99999-8888",
    instagram: "@beatrizerafael2026"
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
    titulo: "Beatriz & Rafael | 14 de Novembro de 2026",
    descricao: "Você está convidado para celebrar o casamento de Beatriz e Rafael.",
    imagemPreview: "assets/images/hero.svg",
    urlSite: "https://beatrizerafael.com.br"
  }

};

/* Exposição explícita em window — necessária porque `const` no escopo
   global NÃO cria propriedade em window (diferente de `var`). */
if (typeof window !== "undefined") {
  window.CONVITE_CONFIG = CONVITE_CONFIG;
}