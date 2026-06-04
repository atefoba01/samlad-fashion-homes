/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50:  '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d8',
          300: '#f5a9b8',
          400: '#ef7590',
          500: '#e4476b',
          600: '#cf2950',
          700: '#ac1d41',
          800: '#8e1a3b',
          900: '#4A1020',
          950: '#2d0a16',
        },
        gold: {
          50:  '#fdfbf0',
          100: '#faf5d6',
          200: '#f4e8a8',
          300: '#ecd572',
          400: '#e2be42',
          500: '#C9A84C',
          600: '#b8921e',
          700: '#97741b',
          800: '#7c5e1c',
          900: '#694f1c',
          950: '#3c2c0b',
        },
        cream: {
          50:  '#FFFEF8',
          100: '#FFF8F0',
          200: '#FDEFD8',
          300: '#FAE0BE',
          400: '#F5C89A',
        },
        rose: {
          gold: '#B76E79',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'ken-burns': 'kenBurns 8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-2%, -1%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #F5E09A 50%, #C9A84C 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(45,10,22,0.7) 0%, rgba(74,16,32,0.4) 50%, rgba(45,10,22,0.85) 100%)',
      },
    },
  },
  plugins: [],
};
