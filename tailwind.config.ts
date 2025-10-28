import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0D0D0D',
          surface: '#1E1E1E',
          card: '#2A2A2A',
        },
        text: {
          primary: '#E0E0E0',
          secondary: '#A0A0A0',
        },
        accent: {
          blue: '#3B82F6',
          gold: '#FFC107',
          teal: '#00BFA6',
          pink: '#FF3CA6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;