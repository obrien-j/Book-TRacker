/**
 * Space Explorer Theme
 * "30 Books. 30 Planets. One Super Reader."
 */
const spaceExplorerTheme = {
  id: "space-explorer",
  name: { en: "Space Explorer", fr: "Explorateur Spatial" },
  tagline: {
    en: "30 Books. 30 Planets. One Super Reader. 🚀",
    fr: "30 livres. 30 planètes. Un super lecteur. 🚀",
  },
  colors: {
    background: "#0b0d2e",
    backgroundGradient: "radial-gradient(ellipse at 50% 0%, #1a1a4e 0%, #0b0d2e 70%)",
    cardFront: "#1c1f5a",
    cardFrontBorder: "#4a4fc7",
    cardCompleted: "#2e8b57",
    cardCompletedBorder: "#5dde8e",
    cardHover: "#2a2d7a",
    text: "#e0e0ff",
    textAccent: "#ffdd57",
    headerText: "#ffffff",
    taglineText: "#a0a0ff",
    gridBorder: "#3a3d8a",
    modalBackground: "#12144a",
    modalBorder: "#5a5dda",
    progressBar: "#ffdd57",
    progressTrack: "#1c1f5a",
    celebrationColor: "#ffdd57",
  },
  fonts: {
    heading: "'Fredoka One', cursive",
    body: "'Nunito', sans-serif",
  },
  squareLabels: {
    en: [
      "Mercury", "Venus", "Mars", "Jupiter", "Saturn",
      "Neptune", "Pluto", "Comet X1", "Nebula 7", "Star Base",
      "Andromeda", "Orion", "Luna", "Titan", "Europa",
      "Callisto", "Phobos", "Triton", "Ceres", "Eris",
      "Io", "Ganymede", "Oberon", "Ariel", "Charon",
      "Kepler-22b", "Proxima B", "Sirius", "Vega", "Nova Prime",
    ],
    fr: [
      "Mercure", "Vénus", "Mars", "Jupiter", "Saturne",
      "Neptune", "Pluton", "Comète X1", "Nébuleuse 7", "Base Stellaire",
      "Andromède", "Orion", "Lune", "Titan", "Europe",
      "Callisto", "Phobos", "Triton", "Cérès", "Éris",
      "Io", "Ganymède", "Obéron", "Ariel", "Charon",
      "Kepler-22b", "Proxima B", "Sirius", "Véga", "Nova Prime",
    ],
  },
  squareEmojis: [
    "🪨", "🌋", "🔴", "🪐", "💫",
    "🔵", "❄️", "☄️", "🌌", "🛸",
    "🌀", "⭐", "🌙", "🧊", "🌊",
    "🪨", "🌑", "🔱", "⚪", "💎",
    "🌋", "🌍", "🌗", "✨", "🔮",
    "🌎", "🪐", "🌟", "💫", "🚀",
  ],
  completedEmojis: [
    "🛰️", "🧑‍🚀", "🌠", "🎆", "🏆",
  ],
  celebrationMessages: {
    en: [
      "Planet discovered! 🪐",
      "New world explored! 🌍",
      "Mission complete! 🚀",
      "Star charted! ⭐",
      "Orbit achieved! 🛸",
    ],
    fr: [
      "Planète découverte ! 🪐",
      "Nouveau monde exploré ! 🌍",
      "Mission accomplie ! 🚀",
      "Étoile cartographiée ! ⭐",
      "Orbite atteinte ! 🛸",
    ],
  },
  allCompleteMessage: {
    en: "🏆 Mission Complete! You've explored all 30 planets, Super Reader! 🚀🌟",
    fr: "🏆 Mission accomplie ! Tu as exploré les 30 planètes, Super Lecteur ! 🚀🌟",
  },
  modalCelebration: {
    type: "emoji-rain",
    emojis: ["⭐", "🚀", "🪐", "🌟", "💫", "☄️"],
  },
  backgroundExtras: {
    type: "particles",
    description: "Twinkling stars in background",
    particleChar: "✦",
    particleCount: 60,
  },
  borderDecoration: {
    type: "emoji-border",
    emojis: ["🚀", "👽", "🛸", "🧑‍🚀", "⭐", "🪐", "☄️", "🌙"],
  },
  sounds: {
    click: null,       // path to audio file or null
    complete: null,    // path to audio file or null
    allComplete: null, // path to audio file or null
  },
};
