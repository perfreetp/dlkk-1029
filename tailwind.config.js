/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFF9F2",
          50: "#FFFCF8",
          100: "#FFF9F2",
          200: "#FFF2E0",
        },
        orange: {
          DEFAULT: "#F5A962",
          50: "#FEF6EC",
          100: "#FDE8CE",
          200: "#FAD19D",
          300: "#F7BA6C",
          400: "#F5A962",
          500: "#E8923F",
          600: "#D07826",
        },
        mint: {
          DEFAULT: "#A8D8B9",
          50: "#F1F9F4",
          100: "#DEF3E5",
          200: "#C2E7CF",
          300: "#A8D8B9",
          400: "#86C79E",
          500: "#63B583",
        },
        brown: {
          DEFAULT: "#8B6F47",
          50: "#F9F5EF",
          100: "#EFE6D6",
          200: "#DDCBAB",
          300: "#C9AF80",
          400: "#AA8A59",
          500: "#8B6F47",
          600: "#6F5838",
        },
        pink: {
          DEFAULT: "#FFB6C1",
          50: "#FFF0F3",
          100: "#FFE0E6",
          200: "#FFCCD8",
          300: "#FFB6C1",
          400: "#FF91A4",
        },
        sky: {
          DEFAULT: "#B5D8EB",
          50: "#F0F7FC",
          100: "#E0EFF8",
          200: "#CCE4F2",
          300: "#B5D8EB",
          400: "#8FC2DE",
        },
      },
      fontFamily: {
        "zcool-kuaile": ['"ZCOOL KuaiLe"', "cursive"],
        "noto-serif-sc": ['"Noto Serif SC"', "serif"],
        "playfair-display": ['"Playfair Display"', "serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        confetti: {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "pulse-ring": "pulseRing 1.5s ease-out infinite",
        confetti: "confetti 3s linear forwards",
      },
    },
  },
  plugins: [],
};
