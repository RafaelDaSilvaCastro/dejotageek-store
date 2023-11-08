/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        negativa: "-4rem",
      },
      height: {
        barraCinza: "34rem",
        imagemCard: "250px",
      },
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
          botaoHover: "#A81414",
          pessego: "#EC8E8E",
        },
        azul: {
          botao: "#2079FF",
          grafico: "#63ABFD",
        },
        cinza: {
          aviso: "#8F8F8F",
          claro: "#C9C9C9",
          barra: "#ECECEC",
          grafico: "#828282",
        },
        verde: {
          caqui: "#BBE9A6",
        },
        roxo: {
          grafico: "#E697FF",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bubblegumSans: ["Bubblegum Sans", "Roboto"],
      },
      fontSize: {
        "10xl": "15rem",
      },
      backgroundImage: {
        "imagem-vazia": "url('./public/assets/imagem-vazia.png')",
      },

      weight: {
        imagemCard: "250px",
      },
    },
  },
  plugins: [],
};
