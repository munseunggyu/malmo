import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      typography: (theme: (arg0: string) => any) => ({
        white: {
          css: {
            "--tw-prose-body": theme("colors.white"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.white"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.white"),
            "--tw-prose-bullets": theme("colors.white"),
            "--tw-prose-hr": theme("colors.white"),
            "--tw-prose-links": "#959595",
            "--tw-prose-quotes": theme("colors.white"),
            "--tw-prose-quote-borders": theme("colors.white"),
            "--tw-prose-captions": theme("colors.white"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.white"),
            "--tw-prose-pre-bg": "none",
            "--tw-prose-th-borders": theme("colors.white"),
            "--tw-prose-td-borders": theme("colors.white")
          }
        }
      }),
      fontFamily: {
        sans: ["WantedSans"]
      },
      fontWeight: {
        extraBlack: "900",
        extraBold: "800"
      },
      borderRadius: {
        sm: "12px",
        md: "16px",
        lg: "32px"
      },
      colors: {
        main: "#E5FF39",
        hats: {
          1: "#2FC206",
          2: "#0B1014",
          3: "#FFFFFF",
          4: "#FFDF85",
          5: "#EB5757",
          6: "#5D5FEF"
        },
        grey: {
          1: "#FFFFFF",
          2: "#FDFEFF",
          3: "#E8ECF1",
          4: "#C0CBD9",
          5: "#808996",
          6: "#4E5867",
          7: "#2E3034",
          8: "#0F0F10",
          9: "#ffffff99"
        },
        success: {
          1: "#FAFDFB",
          2: "#3FB876"
        },
        error: {
          1: "#FFFBFB",
          2: "#F04443"
        },
        bg: {
          1: "#0B1014",
          2: "#2E2E2E",
          3: "#4F4F4F"
        },
        divider: {
          1: "#222527"
        }
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "96px",
        xxl: "128px"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
export default config;
