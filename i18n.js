/**
 * Internationalization – UI chrome translations.
 * Theme-specific text (taglines, labels, celebrations) lives in each theme file.
 */
const i18n = {
  en: {
    siteTitle: "Reading Adventure",
    themeLabel: "Theme:",
    langLabel: "Language:",
    progressText: (count, total) => `${count} / ${total} books read`,
    bookTitle: (n) => `Book #${n}`,
    markRead: "Mark as Read ✅",
    markUnread: "Mark Unread",
    closeLabel: "Close",
  },
  fr: {
    siteTitle: "Aventure Lecture",
    themeLabel: "Thème :",
    langLabel: "Langue :",
    progressText: (count, total) => `${count} / ${total} livres lus`,
    bookTitle: (n) => `Livre nº${n}`,
    markRead: "Marquer comme lu ✅",
    markUnread: "Marquer non lu",
    closeLabel: "Fermer",
  },
};
