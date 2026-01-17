// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orina: {
          ink: "#0B1220",      // deep navy
          slate: "#5B657A",    // muted text
          bg: "#F6F8FC",       // app background
          card: "#FFFFFF",     // surfaces
          line: "#E8EDF5",     // borders
          primary: "#4F46E5",  // electric indigo
          accent: "#FFB020",   // mango (CTA)
          hot: "#FF4D6D",      // berry highlight
        },
      },
    },
  },
  plugins: [],
};

export default config;
