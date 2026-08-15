/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6F8",     // fundo, "papel"
        blush: "#FFD3E0",     // rosa suave
        rose: "#F58FB2",      // rosa principal (botões, destaques)
        plum: "#4A2E3A",      // texto escuro, contraste
        mauve: "#B5708C",     // títulos, subtítulos
        gold: "#F7CE7A",      // estrelas / detalhes dourados
        // paleta do tema escuro — um "céu noturno" para combinar com a
        // árvore de estrelas, mantendo o mesmo espírito rosa/dourado
        night: "#1B1530",     // fundo principal no escuro
        nightCard: "#251D40", // cartões / páginas do livro no escuro
        nightBlush: "#3A2A4A",// bordas suaves no escuro
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: 0.35, transform: "scale(0.85)" },
          "50%": { opacity: 1, transform: "scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        twinkle: "twinkle 3.2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
