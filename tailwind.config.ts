import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: {
          link: "#AB3B3A",
          base: "#0B346E",
          light: '#FFB11B'
        },
        footer: {
          text: "#EECCBB",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
