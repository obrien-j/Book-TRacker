/**
 * Book Tracker – Advent Calendar Style Reading App
 * Core engine: theme-agnostic, driven entirely by theme config objects.
 */
(function () {
  "use strict";

  // ===== Theme Registry =====
  const themes = [spaceExplorerTheme, monsterCollectionTheme];
  const TOTAL_BOOKS = 30;
  const STORAGE_KEY_PREFIX = "book-tracker-";

  // ===== State =====
  let currentTheme = null;
  let currentLang = "en";
  let booksRead = new Set(); // set of 0-based indices

  // ===== Localized text helper =====
  /** Resolve a localized field: returns value[lang] if object, else raw value. */
  function t(field) {
    if (field && typeof field === "object" && !Array.isArray(field)) {
      return field[currentLang] || field.en || Object.values(field)[0];
    }
    return field;
  }

  /** Resolve a localized array field. */
  function tArr(field) {
    if (field && typeof field === "object" && !Array.isArray(field)) {
      return field[currentLang] || field.en || Object.values(field)[0];
    }
    return field;
  }

  /** Get UI string from i18n object. */
  function ui(key) {
    const strings = i18n[currentLang] || i18n.en;
    return strings[key];
  }

  // ===== DOM refs =====
  const $ = (sel) => document.querySelector(sel);
  const grid = $("#book-grid");
  const progressBar = $("#progress-bar");
  const progressText = $("#progress-text");
  const appTitle = $("#app-title");
  const appTagline = $("#app-tagline");
  const themeSelect = $("#theme-select");
  const langSelect = $("#lang-select");
  const themeLabel = $("#theme-label");
  const langLabel = $("#lang-label");
  const modalOverlay = $("#modal-overlay");
  const modalClose = $("#modal-close");
  const modalTitle = $("#modal-title");
  const modalEmoji = $("#modal-emoji");
  const modalBookLabel = $("#modal-book-label");
  const btnMarkRead = $("#btn-mark-read");
  const btnMarkUnread = $("#btn-mark-unread");
  const modalCelebrateText = $("#modal-celebrate-text");
  const modalCelebration = $("#modal-celebration");
  const completeBanner = $("#complete-banner");
  const completeMessage = $("#complete-message");
  const bgParticles = $("#bg-particles");
  const borderDecoration = $("#border-decoration");

  // ===== Persistence =====
  function storageKey() {
    return STORAGE_KEY_PREFIX + (currentTheme ? currentTheme.id : "default");
  }

  function saveState() {
    try {
      const data = { booksRead: [...booksRead], themeId: currentTheme.id, lang: currentLang };
      localStorage.setItem("book-tracker-state", JSON.stringify(data));
    } catch {
      // localStorage not available — silent fail
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem("book-tracker-state");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // ===== Theme Application =====
  function applyTheme(theme) {
    currentTheme = theme;
    const c = theme.colors;
    const root = document.documentElement;

    root.style.setProperty("--bg-color", c.background);
    root.style.setProperty("--bg-gradient", c.backgroundGradient);
    root.style.setProperty("--card-front", c.cardFront);
    root.style.setProperty("--card-front-border", c.cardFrontBorder);
    root.style.setProperty("--card-completed", c.cardCompleted);
    root.style.setProperty("--card-completed-border", c.cardCompletedBorder);
    root.style.setProperty("--card-hover", c.cardHover);
    root.style.setProperty("--text-color", c.text);
    root.style.setProperty("--text-accent", c.textAccent);
    root.style.setProperty("--header-text", c.headerText);
    root.style.setProperty("--tagline-text", c.taglineText);
    root.style.setProperty("--grid-border", c.gridBorder);
    root.style.setProperty("--modal-bg", c.modalBackground);
    root.style.setProperty("--modal-border", c.modalBorder);
    root.style.setProperty("--progress-bar", c.progressBar);
    root.style.setProperty("--progress-track", c.progressTrack);
    root.style.setProperty("--celebration-color", c.celebrationColor);
    root.style.setProperty("--font-heading", theme.fonts.heading);
    root.style.setProperty("--font-body", theme.fonts.body);

    appTitle.textContent = t(theme.name);
    appTagline.textContent = t(theme.tagline);

    applyLanguageLabels();
    renderBackgroundParticles(theme);
    renderBorderDecoration(theme);
    renderGrid();
    updateProgress();
    saveState();
  }

  // ===== Background Particles =====
  function renderBackgroundParticles(theme) {
    bgParticles.innerHTML = "";
    const extras = theme.backgroundExtras;
    if (!extras || extras.type !== "particles") return;

    for (let i = 0; i < extras.particleCount; i++) {
      const span = document.createElement("span");
      span.className = "particle";
      span.textContent = extras.particleChar;
      span.style.left = Math.random() * 100 + "%";
      span.style.top = (100 + Math.random() * 20) + "%";
      span.style.animationDuration = (8 + Math.random() * 16) + "s";
      span.style.animationDelay = Math.random() * 20 + "s";
      span.style.fontSize = (0.4 + Math.random() * 0.6) + "rem";
      bgParticles.appendChild(span);
    }
  }

  // ===== Border Decoration =====
  function renderBorderDecoration(theme) {
    borderDecoration.innerHTML = "";
    const bd = theme.borderDecoration;
    if (!bd || bd.type !== "emoji-border") return;

    const emojis = bd.emojis;
    const totalPerSide = 6;
    const sides = ["top", "bottom", "left", "right"];

    sides.forEach((side) => {
      for (let i = 0; i < totalPerSide; i++) {
        const span = document.createElement("span");
        span.className = "border-emoji";
        span.textContent = emojis[(i + sides.indexOf(side) * totalPerSide) % emojis.length];
        span.style.animationDelay = (i * 0.6 + Math.random() * 2) + "s";

        const pct = ((i + 0.5) / totalPerSide) * 100;
        if (side === "top") {
          span.style.top = "8px";
          span.style.left = pct + "%";
        } else if (side === "bottom") {
          span.style.bottom = "8px";
          span.style.left = pct + "%";
        } else if (side === "left") {
          span.style.left = "8px";
          span.style.top = pct + "%";
        } else {
          span.style.right = "8px";
          span.style.top = pct + "%";
        }
        borderDecoration.appendChild(span);
      }
    });
  }

  // ===== Grid Rendering =====
  function renderGrid() {
    grid.innerHTML = "";
    const labels = tArr(currentTheme.squareLabels);
    for (let i = 0; i < TOTAL_BOOKS; i++) {
      const square = document.createElement("button");
      square.className = "book-square" + (booksRead.has(i) ? " completed" : "");
      square.setAttribute("aria-label", `${ui("bookTitle")(i + 1)}: ${labels[i]}`);
      square.dataset.index = i;

      square.innerHTML = `
        <span class="square-number">#${i + 1}</span>
        <span class="square-emoji">${currentTheme.squareEmojis[i]}</span>
        <span class="square-label">${labels[i]}</span>
        <span class="square-check">✅</span>
      `;

      square.addEventListener("click", () => openModal(i));
      grid.appendChild(square);
    }
  }

  // ===== Progress =====
  function updateProgress() {
    const count = booksRead.size;
    const pct = (count / TOTAL_BOOKS) * 100;
    progressBar.style.width = pct + "%";
    progressText.textContent = ui("progressText")(count, TOTAL_BOOKS);

    if (count === TOTAL_BOOKS) {
      completeBanner.classList.remove("hidden");
      completeMessage.textContent = t(currentTheme.allCompleteMessage);
    } else {
      completeBanner.classList.add("hidden");
    }
  }

  // ===== Modal =====
  let currentModalIndex = null;

  function openModal(index) {
    currentModalIndex = index;
    const isRead = booksRead.has(index);
    const labels = tArr(currentTheme.squareLabels);

    modalTitle.textContent = ui("bookTitle")(index + 1);
    modalEmoji.textContent = currentTheme.squareEmojis[index];
    modalBookLabel.textContent = labels[index];

    btnMarkRead.classList.toggle("hidden", isRead);
    btnMarkUnread.classList.toggle("hidden", !isRead);
    modalCelebrateText.classList.add("hidden");
    modalCelebration.innerHTML = "";

    modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
    currentModalIndex = null;
  }

  function markRead() {
    if (currentModalIndex === null) return;
    booksRead.add(currentModalIndex);
    updateSquare(currentModalIndex, true);
    updateProgress();
    saveState();

    // celebration
    btnMarkRead.classList.add("hidden");
    btnMarkUnread.classList.remove("hidden");

    const msgs = tArr(currentTheme.celebrationMessages);
    modalCelebrateText.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    modalCelebrateText.classList.remove("hidden");

    triggerModalCelebration();
    playSound("complete");

    if (booksRead.size === TOTAL_BOOKS) {
      setTimeout(() => {
        closeModal();
        triggerConfetti();
        playSound("allComplete");
      }, 1200);
    }
  }

  function markUnread() {
    if (currentModalIndex === null) return;
    booksRead.delete(currentModalIndex);
    updateSquare(currentModalIndex, false);
    updateProgress();
    saveState();

    btnMarkRead.classList.remove("hidden");
    btnMarkUnread.classList.add("hidden");
    modalCelebrateText.classList.add("hidden");
  }

  function updateSquare(index, completed) {
    const squares = grid.querySelectorAll(".book-square");
    if (squares[index]) {
      squares[index].classList.toggle("completed", completed);
    }
  }

  // ===== Modal Celebration (emoji rain) =====
  function triggerModalCelebration() {
    modalCelebration.innerHTML = "";
    const mc = currentTheme.modalCelebration;
    if (!mc || mc.type !== "emoji-rain") return;

    for (let i = 0; i < 15; i++) {
      const span = document.createElement("span");
      span.className = "rain-emoji";
      span.textContent = mc.emojis[Math.floor(Math.random() * mc.emojis.length)];
      span.style.left = Math.random() * 100 + "%";
      span.style.animationDuration = (1 + Math.random() * 1.5) + "s";
      span.style.animationDelay = Math.random() * 0.5 + "s";
      modalCelebration.appendChild(span);
    }
  }

  // ===== Confetti (all-complete) =====
  function triggerConfetti() {
    const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6bdf", "#a855f7"];
    for (let i = 0; i < 80; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.top = "-10px";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (6 + Math.random() * 8) + "px";
      piece.style.height = (6 + Math.random() * 8) + "px";
      piece.style.animationDuration = (2 + Math.random() * 2) + "s";
      piece.style.animationDelay = Math.random() * 1 + "s";
      document.body.appendChild(piece);

      piece.addEventListener("animationend", () => piece.remove());
    }
  }

  // ===== Sound =====
  function playSound(type) {
    if (!currentTheme.sounds) return;
    const src = currentTheme.sounds[type];
    if (!src) return;
    try {
      const audio = new Audio(src);
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {
      // sound not available
    }
  }

  // ===== Theme Switcher =====
  function populateThemeSelect() {
    themeSelect.innerHTML = "";
    themes.forEach((thm, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = t(thm.name);
      themeSelect.appendChild(opt);
    });
  }

  // ===== Language Labels =====
  function applyLanguageLabels() {
    themeLabel.textContent = ui("themeLabel");
    langLabel.textContent = ui("langLabel");
    btnMarkRead.textContent = ui("markRead");
    btnMarkUnread.textContent = ui("markUnread");
    modalClose.setAttribute("aria-label", ui("closeLabel"));
  }

  // ===== Event Listeners =====
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  btnMarkRead.addEventListener("click", markRead);
  btnMarkUnread.addEventListener("click", markUnread);

  themeSelect.addEventListener("change", () => {
    const idx = parseInt(themeSelect.value, 10);
    applyTheme(themes[idx]);
  });

  langSelect.addEventListener("change", () => {
    currentLang = langSelect.value;
    populateThemeSelect();
    // Keep same theme selected
    const idx = themes.indexOf(currentTheme);
    if (idx >= 0) themeSelect.value = idx;
    applyTheme(currentTheme);
  });

  // ===== Init =====
  function init() {
    // Restore saved state
    const saved = loadState();
    if (saved) {
      booksRead = new Set(saved.booksRead || []);
      if (saved.lang && i18n[saved.lang]) {
        currentLang = saved.lang;
        langSelect.value = currentLang;
      }
      populateThemeSelect();
      const savedThemeIdx = themes.findIndex((th) => th.id === saved.themeId);
      if (savedThemeIdx >= 0) {
        themeSelect.value = savedThemeIdx;
        applyTheme(themes[savedThemeIdx]);
      } else {
        applyTheme(themes[0]);
      }
    } else {
      populateThemeSelect();
      applyTheme(themes[0]);
    }
  }

  init();
})();
