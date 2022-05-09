const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          150: "#ebeef0",
          350: "#b0b0b0",
        },
        transparent: "rgba(255,255,255,0)",
        brand: {
          black: "#181b1f",
          linen: "#f7f0e9",
          green: {
            light: "#029352",
            "light-hover": "rgba(93,238,176,0.07)",
            default: "#008563",
            dark: "#005446",
            50: "#f2f9f7",
            100: "#e6f3ef",
            200: "#bfe1d8",
            300: "#99cec1",
            400: "#4daa92",
            500: "#008563",
            600: "#007859",
            700: "#00644a",
            800: "#00503b",
            900: "#004131",
          },
        },
        "gray-light": "#f5f5f5",
        weak: "#444444",
        danger: "#d72c0d",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        68: "17rem",
        90: "22.5rem",
        128: "32rem",
        144: "36rem",
      },
      fontFamily: {
        serif: ["charter", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        xl: ["1.25rem", { lineHeight: "2.146rem" }],
      },
      flex: {
        0: "0 0 auto",
        "auto-no-shrink": "1 0 auto",
      },
      maxWidth: {
        "2xl": "44rem",
      },
      boxShadow: {
        1: "0 5px 15px 0 rgba(0, 0, 0, 0.15)",
        2: "0 5px 25px 0 rgba(0, 0, 0, 0.25)",
        3: "0 0 16px 0 rgb(0,0,0, 0.10), 0 8px 16px 0 rgb(0,0,0,0.06)",
        card: "0 4px 8px rgba(0 ,0, 0, 0.12)",
      },
      aspectRatio: {
        portrait: "4 / 5",
      },
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
