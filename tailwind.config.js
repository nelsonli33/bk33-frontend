let plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

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
          black: "rgba(0,0,0,.84)",
          linen: "#f7f0e9",
          green: {
            light: "#029352",
            "light-hover": "rgba(93,238,176,0.07)",
            DEFAULT: "#2e7d6d",
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
          yellow: {
            DEFAULT: "#FFD52E",
            50: "#FFFAE6",
            100: "#FFF6D1",
            200: "#FFEEA8",
            300: "#FFE580",
            400: "#FFDD57",
            500: "#FFD52E",
            600: "#F5C400",
            700: "#BD9700",
            800: "#856A00",
            900: "#4D3D00",
          },
        },
        "gray-light": "#f5f5f5",
        weak: "#444444",
        danger: "#d72c0d",
        skeleton: "#e4e5e7",
        destructive: withOpacityValue("--color-background-destructive"),
      },
      textColor: {
        "brand-primary": withOpacityValue("--color-text-brand-primary"),
        "brand-green": withOpacityValue("--color-text-brand-green"),
        destructive: withOpacityValue("--color-text-destructive"),
        "destructive-hover": withOpacityValue("--color-text-destructive-hover"),
      },
      backgroundColor: {
        destructive: withOpacityValue("--color-background-destructive"),
        "destructive-active": withOpacityValue(
          "--color-background-destructive-active"
        ),
        "destructive-hover": withOpacityValue(
          "--color-background-destructive-hover"
        ),
      },
      opacity: {
        45: ".45",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        25: "6.25rem",
        68: "17rem",
        76: "19rem",
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
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".7" },
        },
      },
      strokeWidth: {
        1.5: "1.575",
      },
      transitionDuration: {
        125: "125ms",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("last-not-first", "&:last-child:not(:first-child)");
      addVariant(
        "peer-not-placeholder-shown",
        ".peer:not(:placeholder-shown) ~ .peer-not-placeholder-shown"
      );
    }),
    require("@tailwindcss/forms"),
  ],
};
