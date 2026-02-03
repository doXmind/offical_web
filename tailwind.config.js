/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#aaaaaa',
          400: '#8a8a8a',
          500: '#6a6a6a',
          600: '#4a4a4a',
          700: '#2a2a2a',
          800: '#1a1a1a',
          900: '#0a0a0a',
        },
        // Codex-inspired transparency system
        primary: {
          4: 'rgba(255, 255, 255, 0.04)',
          8: 'rgba(255, 255, 255, 0.08)',
          12: 'rgba(255, 255, 255, 0.12)',
          44: 'rgba(255, 255, 255, 0.44)',
          60: 'rgba(255, 255, 255, 0.60)',
          100: 'rgba(255, 255, 255, 1)',
        },
      },
      transitionTimingFunction: {
        'curve-a': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'curve-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'slideInRight': 'slideInRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInRight: {
          'from': { opacity: 0, transform: 'translateX(20px)' },
          'to': { opacity: 1, transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
    },
  },
  plugins: [
    // Custom plugin for light mode variant
    function({ addVariant }) {
      addVariant('light', '.light &');
    },
  ],
} 