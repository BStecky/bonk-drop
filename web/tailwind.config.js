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
        backgroundPrimary: "#F5F5DC",
        accentYellow: "#ffbf00",
        accentOrange: "#ff7f00",
        accentDarkOrange: "#ff4f00",
        accentLightYellow: "#FDF3E7",
        neutralGray: "#d9d9d9",
        neutralLightGray: "#f2f2f2",
        neutralDarkGray: "#8c8c8c",

        // ...
      },
    },
    daisyui: {
      styled: true,
      themes: [
        "luxury",
        {
          mytheme: {
            primary: "#f18d07",

            secondary: "#f18d07",

            accent: "#f18d07",

            neutral: "#f18d07",

            "base-100": "#f18d07",

            info: "#f18d07",

            success: "#f18d07",

            warning: "#f18d07",

            error: "#f18d07",
          },
        },
      ],
      base: true,
      utils: true,
      logs: true,
      rtl: true,
      prefix: "",
      darkTheme: "black",
    },
  },
  plugins: [require("daisyui")],
};
