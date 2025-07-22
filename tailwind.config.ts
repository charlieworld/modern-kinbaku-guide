import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#EFEFEF',
        white: "#ffffff",
        primary: {
          link: "#AB3B3A",
          base: "#302e2d",
          light: '#aca49b'
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
