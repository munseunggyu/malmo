import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["WantedSans"]
      },
      fontWeight: {
        extraBlack: "900",
        extraBold: "800",
        bold: "700"
      }
    }
  },
  plugins: []
};
export default config;
