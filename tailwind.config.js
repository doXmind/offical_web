/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'slideInRight': 'slideInRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(30px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInRight: {
          'from': { opacity: 0, transform: 'translateX(30px)' },
          'to': { opacity: 1, transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
        blink: {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
} 