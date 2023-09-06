/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        lowshadow: "0 3px 10px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        branco: {
          branco: "#ffffff",
          escuro: "#d8d8d8",
          hover: "#fbfbfb",
          cinza: "#C9C9C9",
        },
        vermelho: {
          botao: "#CE3838",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
