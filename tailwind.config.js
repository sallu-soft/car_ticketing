// tailwind.config.js
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#2563EB', // Replace Tailwind's oklch blue with HEX
        },
        gray: {
          500: '#6B7280',
          100: '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
}

export default config
