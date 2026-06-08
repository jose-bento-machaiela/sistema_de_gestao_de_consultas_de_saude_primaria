/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3f7',
          100: '#b8dce8',
          200: '#89c5d9',
          300: '#5baeca',
          400: '#2c97ba',
          500: '#0080aa',
          600: '#006688',
          700: '#004d66',
          800: '#003344',
          900: '#001a22',
        },
        secondary: {
          50: '#e6f3e6',
          100: '#b8e6b8',
          200: '#89d989',
          300: '#5bcc5b',
          400: '#2cbf2c',
          500: '#00b200',
          600: '#008f00',
          700: '#006600',
          800: '#004400',
          900: '#002200',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
