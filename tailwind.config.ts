import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        chatlist: "#171717",
        white: "#fff",
        black: "#000",
        "gray-50": "#f9f9f9",
        "gray-100": "#ececec",
        "gray-200": "#e3e3e3",
        "gray-300": " #cdcdcd",
        "gray-400": "#b4b4b4",
        "gray-500": "#9b9b9b",
        "gray-600": "#676767",
        "gray-700": "#424242",
        "gray-750": "#2f2f2f",
        "gray-800": "#212121",
        "gray-900": "#171717",
        "gray-950": "#0d0d0d",
        "red-500": "#ef4444",
        "red-700": "#b91c1c",
        "brand-purple": " #ab68ff",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
