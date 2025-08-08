/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary-start': '#667eea',
        'brand-primary-end': '#764ba2',
        'brand-secondary-start': '#48bb78',
        'brand-secondary-end': '#38a169',
        'brand-analytics-start': '#ed8936',
        'brand-analytics-end': '#dd6b20',
        'brand-header-start': '#1e3c72',
        'brand-header-end': '#2a5298',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        contentAppear: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        contentAppear: 'contentAppear 0.6s ease-out',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}