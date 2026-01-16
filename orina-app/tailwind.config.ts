import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orina: {
          primary: "#3B1D3A",  // aubergine
          accent: "#F4B63A",   // saffron
          hot: "#E4572E",      // paprika
          cream: "#FFF4E6",
          ink: "#15161A",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
