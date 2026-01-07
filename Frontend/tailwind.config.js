/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sport-primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'sport-dark': {
          50: '#faf8fb',
          100: '#f7f5f8',
          200: '#f0eef2',
          300: '#e7e6ea',
          400: '#d6d4db',
          500: '#bfb9c4',
          600: '#999092',
          700: '#6f686d',
          800: '#4b4448',
          900: '#2b2629',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.85rem',
        'base': '0.95rem',
        'lg': '1.1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(239,68,68,0.35)',
        'glow-lg': '0 0 40px rgba(239,68,68,0.45)',
        'premium': '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 1px rgba(255, 255, 255, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-sport': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
        'gradient-sport-light': 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
      },
    },
  },
  plugins: [],
};
