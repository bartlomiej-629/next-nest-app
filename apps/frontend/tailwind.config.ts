import type { Config } from "tailwindcss";

const catalystColors = {
  blue: {
    50: "#0ea5e9",
  },
  gray: {
    50: "#f8f9fa",
    100: "#f1f3f5",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: catalystColors,
      spacing: {
        header_height: "100px",
      },
      width: {
        offset_width: "calc(100% - 80px)",
      },
    },
  },
  plugins: [],
};
export default config;
