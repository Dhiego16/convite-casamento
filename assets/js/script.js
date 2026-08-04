/* =========================================================================
   script.js
   Toda a lógica do convite. Lê exclusivamente de CONVITE_CONFIG
   (definido em config.js). Não deve conter conteúdo hard-coded.
   ========================================================================= */

(() => {
  "use strict";

  const cfg = window.CONVITE_CONFIG;
  if (!cfg) {
    console.error("CONVITE_CONFIG não encontrado. Verifique se config.js foi carregado antes de script.js.");
    return;
  }

  /* -----------------------------------------------------------------------
     Utilitários
  ----------------------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* -----------------------------------------------------------------------
     1. TEMA — injeta paleta do config.js como CSS variables
  ----------------------------------------------------------------------- */
  function aplicarTema() {
    const t = cfg.tema || {};
    const root = document.documentElement.style;
    if (t.corFundo) root.setProperty("--color-bg", t.corFundo);
    if (t.corFundoAlt) root.setProperty("--color-bg-alt", t.corFundoAlt);
    if (t.corDourado) root.setProperty("--color-gold", t.corDourado);
    if (t.corDouradoClaro) root.setProperty("--color-gold-soft", t.corDouradoClaro);
    if (t.corTexto) root.setProperty("--color-text", t.corTexto);
    if (t.corTextoSuave) root.setProperty("--color-text-muted", t.corTextoSuave);
    if (t.fonteDisplay) root.setProperty("--font-display", t.fonteDisplay);
    if (t.fonteCorpo) root.setProperty("--font-body", t.fonteCorpo);
  }

  /* -----------------------------------------------------------------------
     2. SEO / metadados dinâmicos
  ----------------------------------------------------------------------- */
  function aplicarSEO() {
    const s = cfg.compartilhamento || {};
    if (s.titulo) document.title = s.titulo;
    const desc = $('meta[name="description"]');
    if (desc && s.descricao) desc.setAttribute("content", s.descricao);
    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle && s.titulo) ogTitle.setAttribute("content", s.titulo);
    const ogDesc = $('meta[property="og:description"]');
    if (ogDesc && s.descricao) ogDesc.setAttribute("content", s.descricao);
  }

  /* -----------------------------------------------------------------------
     3. TELA DE CARREGAMENTO
  ----------------------------------------------------------------------- */
  function initLoading() {
    const el = $("#loading-screen");
    const minDuration = 1800;
    const start = Date.now();
    document.body.style.overflow = "hidden";
    window.addEventListener("load", () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        el.classList.add("hidden");
        document.body.style.overflow = "";
      }, wait);
    });
    // fallback caso 'load' já tenha disparado
    setTimeout(() => { document.body.style.overflow = ""; }, minDuration + 600);
  }

  /* -----------------------------------------------------------------------
     4. CURSOR PERSONALIZADO (apenas desktop)
  ----------------------------------------------------------------------- */
  function initCursor() {
    const cursor = $("#custom-cursor");
    if (!cursor || window.matchMedia("(hover: none)").matches) return;
    let active = false;
    window.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      if (!active) { cursor.classList.add("active"); active = true; }
    });
    $$("a, button, .gallery-item").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
    });
  }

  /* -----------------------------------------------------------------------
     5. HERO — preenchimento + parallax
  ----------------------------------------------------------------------- */
  function initHero() {
    const h = cfg.hero || {};
    const noivos = cfg.noivos || {};
    const evento = cfg.evento || {};

    const bg = $("#hero-bg");
    if (bg && h.imagemFundo) bg.style.backgroundImage = `url('${h.imagemFundo}')`;

    const dataEl = $("#hero-data");
    if (dataEl) dataEl.textContent = `${evento.diaSemana || ""} · ${evento.dataFormatada || ""}`.trim().replace(/^·\s*/, "");

    const monogramaHero = $("#hero-monogram-text");
    if (monogramaHero && noivos.monograma) monogramaHero.textContent = noivos.monograma;

    const namesEl = $("#hero-names");
    if (namesEl && noivos.noiva && noivos.noivo) {
      namesEl.innerHTML = `${noivos.noiva.primeiroNome} <span>&amp;</span> ${noivos.noivo.primeiroNome}`;
    }

    const phraseEl = $("#hero-phrase");
    if (phraseEl) phraseEl.textContent = h.frase || "";

    const btnEl = $("#hero-btn span");
    if (btnEl) btnEl.textContent = h.textoBotao || "Ver Convite";

    // Parallax discreto no scroll
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2 && bg) {
          bg.style.transform = `scale(1.12) translateY(${y * 0.18}px)`;
        }
        ticking = false;
      });
    }, { passive: true });

    // Monograma do rodapé
    const footerMono = $("#footer-monogram");
    if (footerMono && noivos.monograma) footerMono.textContent = noivos.monograma;
    const footerNames = $("#footer-names");
    if (footerNames && noivos.noiva && noivos.noivo) {
      footerNames.innerHTML = `${noivos.noiva.primeiroNome} &amp; ${noivos.noivo.primeiroNome}`;
    }
    const footerData = $("#footer-data");
    if (footerData && evento.dataISO) {
      const d = new Date(evento.dataISO);
      footerData.textContent = `${String(d.getDate()).padStart(2,"0")} · ${String(d.getMonth()+1).padStart(2,"0")} · ${d.getFullYear()}`;
    }

    // Monograma da tela de loading
    const loadingMono = $("#loading-svg text");
    if (loadingMono && noivos.monograma) loadingMono.textContent = noivos.monograma;
  }

  /* -----------------------------------------------------------------------
     6. MENSAGEM DE ABERTURA
  ----------------------------------------------------------------------- */
  function initMensagem() {
    const m = cfg.mensagemAbertura || {};
    const titulo = $("#mensagem-titulo");
    const texto = $("#mensagem-texto");
    if (titulo && m.titulo) titulo.textContent = m.titulo;
    if (texto && m.texto) texto.textContent = m.texto;
  }

  /* -----------------------------------------------------------------------
     7. CONTAGEM REGRESSIVA
  ----------------------------------------------------------------------- */
  function initCountdown() {
    const evento = cfg.evento || {};
    const dataEl = $("#countdown-data");
    if (dataEl) dataEl.textContent = `${evento.dataFormatada || ""} · ${evento.horario || ""}`;

    const target = new Date(evento.dataISO).getTime();
    if (Number.isNaN(target)) return;

    const grid = $("#countdown-grid");
    const arrivedEl = $("#countdown-arrived");
    const elDias = $("#cd-dias"), elHoras = $("#cd-horas"), elMin = $("#cd-min"), elSeg = $("#cd-seg");
    let intervalId = null;

    function tick() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        if (grid) grid.hidden = true;
        if (arrivedEl) arrivedEl.hidden = false;
        if (intervalId) clearInterval(intervalId);
        return;
      }

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const min = Math.floor((diff / (1000 * 60)) % 60);
      const seg = Math.floor((diff / 1000) % 60);

      if (elDias) elDias.textContent = String(dias).padStart(2, "0");
      if (elHoras) elHoras.textContent = String(horas).padStart(2, "0");
      if (elMin) elMin.textContent = String(min).padStart(2, "0");
      if (elSeg) elSeg.textContent = String(seg).padStart(2, "0");
    }

    tick();
    intervalId = setInterval(tick, 1000);
  }

  /* -----------------------------------------------------------------------
     7.5 ADICIONAR À AGENDA (arquivo .ics)
  ----------------------------------------------------------------------- */
  function initAddToCalendar() {
    const btn = $("#add-to-calendar");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const evento = cfg.evento || {};
      const cerimonia = cfg.cerimonia || {};
      const noivos = cfg.noivos || {};

      const start = new Date(evento.dataISO);
      if (Number.isNaN(start.getTime())) return;
      const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // duração estimada: 3h

      const fmt = (d) => (
        d.getFullYear().toString().padStart(4, "0") +
        String(d.getMonth() + 1).padStart(2, "0") +
        String(d.getDate()).padStart(2, "0") + "T" +
        String(d.getHours()).padStart(2, "0") +
        String(d.getMinutes()).padStart(2, "0") +
        String(d.getSeconds()).padStart(2, "0")
      );

      const nomeNoiva = noivos.noiva?.primeiroNome || "";
      const nomeNoivo = noivos.noivo?.primeiroNome || "";
      const titulo = `Casamento de ${nomeNoiva} & ${nomeNoivo}`;
      const local = [cerimonia.local, cerimonia.endereco].filter(Boolean).join(", ");
      const descricao = "Confirme sua presença: " + (window.location.href || "");

      const escapeICS = (str) => String(str).replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");

      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Convite de Casamento//PT-BR",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@convite-casamento`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${escapeICS(titulo)}`,
        `DESCRIPTION:${escapeICS(descricao)}`,
        `LOCATION:${escapeICS(local)}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "casamento.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    });
  }

  /* -----------------------------------------------------------------------
     9. GALERIA + LIGHTBOX
  ----------------------------------------------------------------------- */
  function initGaleria() {
    const g = cfg.galeria || {};
    const titulo = $("#galeria-titulo");
    const subtitulo = $("#galeria-subtitulo");
    if (titulo && g.titulo) titulo.textContent = g.titulo;
    if (subtitulo && g.subtitulo) subtitulo.textContent = g.subtitulo;

    const grid = $("#gallery-grid");
    const fotos = Array.isArray(g.fotos) ? g.fotos : [];
    if (!grid) return;

    grid.innerHTML = fotos.map((f, i) => `
      <figure class="gallery-item" data-aos="zoom-in" data-aos-delay="${(i % 3) * 80}" data-index="${i}">
        <img src="${f.src}" alt="${f.legenda || ''}" loading="lazy">
        <figcaption class="gallery-caption">${f.legenda || ''}</figcaption>
      </figure>
    `).join("");

    // Lightbox
    const lightbox = $("#lightbox");
    const imgEl = $("#lightbox-img");
    const capEl = $("#lightbox-caption");
    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      const foto = fotos[currentIndex];
      if (!foto) return;
      imgEl.src = foto.src;
      imgEl.alt = foto.legenda || "";
      capEl.textContent = foto.legenda || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function showRelative(delta) {
      currentIndex = (currentIndex + delta + fotos.length) % fotos.length;
      openLightbox(currentIndex);
    }

    $$(".gallery-item", grid).forEach((item) => {
      item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
    });
    $("#lightbox-close")?.addEventListener("click", closeLightbox);
    $("#lightbox-prev")?.addEventListener("click", () => showRelative(-1));
    $("#lightbox-next")?.addEventListener("click", () => showRelative(1));
    lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showRelative(-1);
      if (e.key === "ArrowRight") showRelative(1);
    });

    // Swipe (touch) no lightbox
    let touchStartX = 0;
    lightbox?.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    lightbox?.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) showRelative(dx > 0 ? -1 : 1);
    }, { passive: true });
  }

  /* -----------------------------------------------------------------------
     10. CERIMÔNIA & RECEPÇÃO
  ----------------------------------------------------------------------- */
  function preencherLocal(prefixo, dados) {
    if (!dados) return;
    const set = (id, val) => { const el = $(`#${id}`); if (el) el.textContent = val; };
    set(`${prefixo}-titulo`, dados.titulo);
    set(`${prefixo}-local`, dados.local);
    set(`${prefixo}-endereco`, dados.endereco);
    set(`${prefixo}-data`, dados.data);
    set(`${prefixo}-horario`, dados.horario);

    const link = $(`#${prefixo}-maps-link`);
    if (link && dados.linkMaps) link.setAttribute("href", dados.linkMaps);

    const mapEl = $(`#${prefixo}-map`);
    if (mapEl && dados.mapaQuery) {
      const src = `https://maps.google.com/maps?q=${encodeURIComponent(dados.mapaQuery)}&output=embed`;
      mapEl.innerHTML = `<iframe src="${src}" loading="lazy" title="Mapa - ${dados.local || ''}"></iframe>`;
    }
  }
  function initLocais() {
    preencherLocal("cerimonia", cfg.cerimonia);
  }

  /* -----------------------------------------------------------------------
     11. MENSAGEM FINAL
  ----------------------------------------------------------------------- */
  function initMensagemFinal() {
    const m = cfg.mensagemFinal || {};
    const texto = $("#mensagem-final-texto");
    if (texto && m.texto) texto.textContent = m.texto;
  }

  /* -----------------------------------------------------------------------
     11.5 CONFIRMAÇÃO DE PRESENÇA (RSVP)
  ----------------------------------------------------------------------- */
  function initRSVP() {
    const r = cfg.rsvp || {};
    const section = $("#rsvp");
    if (!r.ativo) { section?.remove(); return; }

    const set = (id, val) => { const el = $(`#${id}`); if (el) el.textContent = val; };
    set("rsvp-titulo", r.titulo);
    set("rsvp-subtitulo", r.subtitulo && r.dataLimite ? `${r.subtitulo} (até ${r.dataLimite})` : (r.subtitulo || ""));

    const form = $("#rsvp-form");
    const status = $("#rsvp-status");
    const submitBtn = $("#rsvp-submit");
    if (!form) return;

    function mostrarStatus(texto, tipo) {
      if (!status) return;
      status.textContent = texto;
      status.classList.remove("success", "error");
      if (tipo) status.classList.add(tipo);
    }

    async function enviarViaWebhook(dados) {
      const resp = await fetch(r.webhookUrl, {
        method: "POST",
        mode: "no-cors", // Google Apps Script Web Apps normalmente exigem isso
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(dados)
      });
      // com mode "no-cors" não dá pra ler o status da resposta — assume
      // sucesso se o fetch não estourou exceção de rede.
      return resp;
    }

    function enviarViaWhatsApp(dados) {
      const c = cfg.contato || {};
      if (!c.whatsapp) return false;
      const texto = encodeURIComponent(
        `Confirmação de presença — ${dados.nome}\n` +
        `Vai comparecer: ${dados.confirmacao === "sim" ? "Sim" : "Não"}\n` +
        `Acompanhantes: ${dados.acompanhantes}\n` +
        (dados.mensagem ? `Mensagem: ${dados.mensagem}` : "")
      );
      window.open(`https://wa.me/${c.whatsapp}?text=${texto}`, "_blank", "noopener");
      return true;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const dados = {
        nome: (fd.get("nome") || "").toString().trim(),
        acompanhantes: (fd.get("acompanhantes") || "0").toString(),
        confirmacao: (fd.get("confirmacao") || "sim").toString(),
        mensagem: (fd.get("mensagem") || "").toString().trim()
      };
      if (!dados.nome) return;

      if (submitBtn) submitBtn.disabled = true;
      mostrarStatus("Enviando...", null);

      try {
        if (r.webhookUrl) {
          await enviarViaWebhook(dados);
          mostrarStatus("Presença confirmada! Obrigado por avisar. 🎉", "success");
          form.reset();
        } else {
          // Sem backend configurado (config.rsvp.webhookUrl vazio):
          // abre o WhatsApp com os dados preenchidos, pro casal receber
          // a confirmação direto na conversa.
          const enviado = enviarViaWhatsApp(dados);
          mostrarStatus(
            enviado
              ? "Abrimos o WhatsApp pra você enviar a confirmação. 🎉"
              : "Confirmação de presença ainda não está configurada — avise o casal diretamente.",
            enviado ? "success" : "error"
          );
        }
      } catch (err) {
        mostrarStatus("Não foi possível enviar agora. Tente novamente em instantes.", "error");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* -----------------------------------------------------------------------
     14. PLAYER DE MÚSICA
  ----------------------------------------------------------------------- */
  function initMusica() {
    const m = cfg.musica || {};
    const audio = $("#bg-audio");
    const toggle = $("#music-toggle");
    const volume = $("#volume-range");
    if (!audio || !toggle) return;

    if (m.arquivo) audio.src = m.arquivo;
    audio.volume = typeof m.volumeInicial === "number" ? m.volumeInicial : 0.4;
    if (volume) volume.value = audio.volume;

    let isPlaying = false;

    function play() {
      audio.play().then(() => {
        isPlaying = true;
        toggle.classList.add("playing");
      }).catch(() => { /* autoplay bloqueado — aguarda interação */ });
    }
    function pause() {
      audio.pause();
      isPlaying = false;
      toggle.classList.remove("playing");
    }

    toggle.addEventListener("click", () => { isPlaying ? pause() : play(); });
    volume?.addEventListener("input", (e) => { audio.volume = Number(e.target.value); });

    if (m.autoplay) {
      // Navegadores bloqueiam autoplay COM SOM sem gesto do usuário — mas
      // autoplay MUDO é sempre permitido. Então a música já começa a
      // tocar (muda) assim que o site abre, e é desmutada automaticamente
      // no primeiro toque/clique/scroll/tecla do visitante — sem precisar
      // caçar o botão de play.
      audio.muted = true;
      let autoplayOk = false;
      audio.play().then(() => {
        autoplayOk = true;
        isPlaying = true;
        toggle.classList.add("playing");
      }).catch(() => { /* até mudo foi bloqueado; cai no fallback abaixo */ });

      const eventosInteracao = ["click", "touchstart", "keydown", "scroll"];
      const primeiraInteracao = () => {
        audio.muted = false;
        if (!autoplayOk) play(); // autoplay mudo foi bloqueado, toca agora
        eventosInteracao.forEach((ev) => document.removeEventListener(ev, primeiraInteracao));
      };
      eventosInteracao.forEach((ev) => document.addEventListener(ev, primeiraInteracao, { passive: true }));
    }
  }

  /* -----------------------------------------------------------------------
     16. SCROLL: barra de progresso + botão voltar ao topo
  ----------------------------------------------------------------------- */
  function initScrollEffects() {
    const progressFill = $("#progress-fill");
    const backToTop = $("#back-to-top");

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressFill) progressFill.style.width = pct + "%";
      if (backToTop) backToTop.classList.toggle("visible", scrollTop > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -----------------------------------------------------------------------
     BOOTSTRAP
  ----------------------------------------------------------------------- */
  function init() {
    aplicarTema();
    aplicarSEO();
    initLoading();
    initCursor();
    initHero();
    initMensagem();
    initCountdown();
    initAddToCalendar();
    initGaleria();
    initLocais();
    initRSVP();
    initMensagemFinal();
    initMusica();
    initScrollEffects();

    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 60
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
