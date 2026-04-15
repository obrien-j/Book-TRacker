/**
 * Monster Collection Theme
 * "Can you collect all 30 Book Monsters?"
 */
const monsterCollectionTheme = {
  id: "monster-collection",
  name: { en: "Monster Collection", fr: "Collection de Monstres" },
  tagline: {
    en: "Can you collect all 30 Book Monsters? 👾",
    fr: "Peux-tu collecter les 30 monstres des livres ? 👾",
  },
  colors: {
    background: "#1a0a2e",
    backgroundGradient: "radial-gradient(ellipse at 50% 100%, #2d1b4e 0%, #1a0a2e 70%)",
    cardFront: "#2d1b4e",
    cardFrontBorder: "#8b5cf6",
    cardCompleted: "#16a34a",
    cardCompletedBorder: "#4ade80",
    cardHover: "#3d2b5e",
    text: "#e8d5ff",
    textAccent: "#f472b6",
    headerText: "#ffffff",
    taglineText: "#c084fc",
    gridBorder: "#5b3d8a",
    modalBackground: "#1e0f38",
    modalBorder: "#a855f7",
    progressBar: "#f472b6",
    progressTrack: "#2d1b4e",
    celebrationColor: "#f472b6",
  },
  fonts: {
    heading: "'Fredoka One', cursive",
    body: "'Nunito', sans-serif",
  },
  squareLabels: {
    en: [
      "Giggles", "Bloop", "Fuzzbert", "Chompy", "Snorkel",
      "Wiggles", "Gloop", "Blinky", "Munchkin", "Zigzag",
      "Splotch", "Boomer", "Nibbles", "Sprocket", "Wobbly",
      "Fizz", "Rascal", "Pudge", "Sparky", "Doodle",
      "Buttons", "Snicker", "Tangle", "Bumble", "Pogo",
      "Squish", "Grumble", "Twitch", "Noodle", "Mega Boss",
    ],
    fr: [
      "Rigolo", "Bloop", "Poilu", "Croqueur", "Tuba",
      "Frétille", "Gluant", "Cligno", "Fripouille", "Zigzag",
      "Tacheur", "Boumeur", "Grignotin", "Bricoleur", "Bancal",
      "Pétillant", "Coquin", "Potelé", "Étincelle", "Gribouille",
      "Bouton", "Ricaneur", "Emmêleur", "Bourdon", "Bondisseur",
      "Écrasouille", "Grognon", "Tic-Tac", "Nouille", "Méga Boss",
    ],
  },
  squareEmojis: [
    "👾", "🐙", "👻", "🦖", "🐸",
    "🐛", "🤖", "👁️", "🧸", "🦎",
    "🐡", "💥", "🐭", "⚙️", "🫠",
    "🧪", "😈", "🐷", "⚡", "🎨",
    "🔘", "😜", "🕸️", "🐝", "🦘",
    "🫧", "😤", "🐿️", "🍜", "👑",
  ],
  completedEmojis: [
    "🎉", "🏅", "💪", "🌈", "🎊",
  ],
  celebrationMessages: {
    en: [
      "Monster collected! 👾",
      "New friend found! 🐙",
      "Got 'em! 💪",
      "Added to collection! 🏅",
      "Monster tamed! 🎉",
    ],
    fr: [
      "Monstre collecté ! 👾",
      "Nouvel ami trouvé ! 🐙",
      "Attrapé ! 💪",
      "Ajouté à la collection ! 🏅",
      "Monstre dompté ! 🎉",
    ],
  },
  allCompleteMessage: {
    en: "👑 You collected ALL 30 Book Monsters! You're the Monster Master! 🎊🏆",
    fr: "👑 Tu as collecté les 30 monstres des livres ! Tu es le Maître des Monstres ! 🎊🏆",
  },
  modalCelebration: {
    type: "emoji-rain",
    emojis: ["👾", "🎉", "🐙", "💪", "⭐", "🌈"],
  },
  backgroundExtras: {
    type: "particles",
    description: "Floating eyeballs and sparkles",
    particleChar: "👁️",
    particleCount: 40,
  },
  borderDecoration: {
    type: "emoji-border",
    emojis: ["👾", "🐙", "👻", "🦖", "😈", "🤖", "🐸", "🧸"],
  },
  sounds: {
    click: null,
    complete: null,
    allComplete: null,
  },
};
