# Convite Digital de Casamento — Premium

Convite 100% estático (HTML5 + CSS3 + JavaScript puro), sem frameworks, sem
back-end. Todo o conteúdo é controlado por **um único arquivo**:

```
assets/js/config.js
```

## Como criar um novo convite

1. Abra `assets/js/config.js`.
2. Edite os campos (nomes, datas, textos, endereços, presentes, etc.). Cada
   campo tem comentário explicando o que é.
3. Substitua as imagens em `assets/images/` pelas fotos reais, mantendo os
   mesmos nomes de arquivo (ou ajuste os caminhos no `config.js`).
   - Os arquivos `.svg` atuais são **placeholders** gerados automaticamente
     só para o site não quebrar antes de você subir as fotos reais.
   - Recomendado: fotos `.jpg` otimizadas, hero em pelo menos 1600×1000px.
4. Coloque a trilha sonora em `assets/music/` (mp3) e aponte o caminho em
   `musica.arquivo` dentro do `config.js`.
5. Não é necessário editar `index.html`, `style.css` ou `script.js` — eles
   já leem tudo do `config.js` automaticamente.

## Estrutura

```
/index.html                 → estrutura semântica de todas as seções
/assets/css/style.css       → design system completo (tokens, componentes)
/assets/js/config.js        → ÚNICA fonte de conteúdo do convite
/assets/js/script.js        → lógica (render, countdown, lightbox, pix, etc.)
/assets/images/             → fotos do convite
/assets/music/              → trilha sonora (mp3)
```

## Funcionalidades incluídas

- Tela de carregamento com monograma animado (stroke-draw SVG)
- Hero em tela cheia com parallax e monograma
- Player de música flutuante (play/pause/volume)
- Contagem regressiva em tempo real
- Timeline "Nossa História" com scroll reveal (AOS)
- Galeria com lightbox (zoom, swipe, teclado, navegação)
- Cerimônia e Recepção com mapa incorporado (OpenStreetMap, sem API key)
- Lista de presentes com cópia automática da chave Pix + toast de confirmação
- Dress code (opcional — desative com `dressCode.ativo = false`)
- Contato (WhatsApp, Instagram, telefone)
- Compartilhamento (WhatsApp, Facebook, copiar link)
- Botão voltar ao topo + barra de progresso de scroll
- Cursor personalizado discreto (desktop)
- 100% responsivo (desktop, tablet, mobile)

## Publicando

Como é um site 100% estático, basta subir a pasta inteira em qualquer
hospedagem estática: GitHub Pages, Netlify, Vercel, Cloudflare Pages ou até
um servidor compartilhado comum. Não há dependências de build — é só HTML,
CSS e JS puros.

## Confirmação de presença (RSVP)

O formulário de RSVP (seção "Confirme sua Presença") funciona de duas formas,
controladas por `rsvp.webhookUrl` em `config.js`:

- **Sem webhook configurado (`webhookUrl: ""`)**: ao enviar o formulário, o
  WhatsApp abre automaticamente com uma mensagem pronta contendo os dados
  preenchidos, usando o número em `contato.whatsapp`. Zero configuração,
  mas depende do convidado confirmar o envio manualmente no WhatsApp.
- **Com webhook configurado**: os dados são enviados via `fetch` (POST) pra
  URL informada, sem abrir nada — ideal se você quiser as respostas
  organizadas automaticamente numa planilha.

### Como configurar o webhook com Google Apps Script + Google Sheets (grátis)

1. Crie uma planilha nova no Google Sheets com as colunas `nome`,
   `telefone`, `acompanhantes`, `confirmacao`, `mensagem`, `data`.
2. Nela, vá em Extensões → Apps Script e cole um script que leia
   `e.postData.contents` (JSON), faça `JSON.parse` e use
   `SpreadsheetApp.getActiveSheet().appendRow([...])` pra gravar uma linha.
3. Implante como Web App (Deploy → New deployment → Web app), com acesso
   "Qualquer pessoa" e execução "Eu".
4. Copie a URL gerada (termina em `/exec`) e cole em
   `config.js > rsvp.webhookUrl`.

Sem essa etapa o formulário continua funcionando pelo fallback do WhatsApp.

## Mapas sem API key

O bloco de mapa usa o embed público do OpenStreetMap com as coordenadas
(`latitude`/`longitude`) definidas no `config.js` para `cerimonia` e
`recepcao`. Se preferir o Google Maps embutido, troque o `iframe` gerado em
`script.js` (`preencherLocal`) pela URL de embed do Google Maps.

## Checklist antes de publicar (coisas que o JS não resolve sozinho)

- **Coordenadas da cerimônia**: `cerimonia.latitude`/`longitude` estão como
  `null` de propósito — estavam duplicadas com as da recepção (apontava
  errado no mapa). Pegue as coordenadas reais no Google Maps (botão
  direito no pino → copiar coordenadas) e preencha.
- **Meta tags de compartilhamento**: as tags `<title>`, `og:title` e
  `og:description` no `<head>` do `index.html` são fixas — precisam ser
  editadas manualmente sempre que você mudar `compartilhamento` em
  `config.js`, porque o preview de link do WhatsApp/Facebook não executa
  o JavaScript do site antes de montar o preview.
- **Data do evento**: `evento.dataISO` (usada na contagem regressiva),
  `cerimonia.data` e `recepcao.data` precisam bater entre si.

## Performance

- Fontes carregadas via `<link>` com `preconnect`.
- Imagens da galeria e da timeline com `loading="lazy"`.
- Áudio com `preload="none"` (só carrega ao dar play).
- CSS e JS organizados em seções numeradas e comentadas.
"# convite-casamento"
