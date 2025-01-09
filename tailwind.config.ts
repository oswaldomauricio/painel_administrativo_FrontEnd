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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'sidebar_main': "#001529",
        'sidebar-btn-secudanry': "#000C17",
        'btn-selected': "#1677FF",
        'btn-send': "#1890FF",
        'bg-select': "#EAEAEA",
        'bg-entrada': "#FFF79E",
        'bg-saida': "#F2ADA0",
        'bg-saldo': "#F2ADA0",
        'bg-table-cabecalho': "#FAFAFA",
        'bg-table_hover': "#F8F8F8",
        'bg-logout': "#FF2D08",
        'bg-screnn': "#E1E1E1",
        'bg-logo': "#003399",
      },
    },
  },
  plugins: [],
} satisfies Config;
