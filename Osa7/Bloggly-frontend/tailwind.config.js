module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffa07a",
        secondary: {
          100: "#e5838d",
          200: "#b67398",
          300: "#7f6792",
          400: "#4e5a7a",
          500: "#2f4858",
        },
        lightPrimary: "#ffe795",
        darkPrimary: "#c36b49",
        highlight: "#8e1600",
        darkHighlight: "#4f0113",
        primaryWhite: "#fff7f2",
        secondaryWhite: "#e5dbce",
      },
      fontFamily: {
        pacifico: ["Pacifico"],
        main: ["Source Sans Pro"],
      },
      backgroundImage: theme => ({
        laptop: "url('images/register.jpg')",
        books: "url('images/books.jpg')",
      }),
      animation: {
        alertEnd: "alertEnd 0.5s linear",
        alertStart: "alertStart 0.2s ease-in-out",
        reverseSpin: "reverseSpin 1s linear infinite",
      },
      keyframes: {
        alertEnd: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(1.1)", opacity: 0 },
        },
        alertStart: {
          "0%": { transform: "scale(0)", opacity: 0 },
          "60%": { transform: "scale(1.3)", opacity: 0.9 },
          "80%": { transform: "scale(1.3)", opacity: 0.9 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        reverseSpin: {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
}
