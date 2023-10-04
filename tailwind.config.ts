import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        custonBreakpoint: '407px',
        bgBreakpoint: '28rem',
      },
      colors: {
        color1: '#e2e8f0',
        color2: '#64748b',
        color3: '#6b7280',
      },
    },
  },
  plugins: [],
};
export default config;
