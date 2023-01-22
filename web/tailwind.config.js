/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['"Quicksand"', "sans-serif"],
      },
      colors: {
        primaryOrange: "#f18d07",
        complementaryBlue: "#0080f1",
        complementaryPink: "#f10080",
        accentYellow: "#ffbf00",
        accentOrange: "#ff7f00",
        accentDarkOrange: "ff4f00",
        neutralGray: "#d9d9d9",
        neutralLightGray: "#f2f2f2",
        neutralDarkGray: "#8c8c8c",

        // ...
      },
      daisyui: {
        themes: [
          {
            mytheme: {
              primary: "#e043be",

              secondary: "#f4be53",

              accent: "#3cd190",

              neutral: "#1D1C26",

              "base-100": "#2A2E3C",

              info: "#96C0DF",

              success: "#17734B",

              warning: "#D5AF07",

              error: "#F85C54",
            },
          },
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
