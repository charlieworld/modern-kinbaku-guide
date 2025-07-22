import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#EFEFEF',
        white: "#ffffff",
        black: "#000000",
        primary: {
          link: "#AB3B3A",
          base: "#302e2d",
          light: '#aca49b'
        },
        footer: {
          text: "#EECCBB",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
