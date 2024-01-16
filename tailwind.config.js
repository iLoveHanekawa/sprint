/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        nav: '17.115%'
      },
      backgroundColor: {
        primary: 'rgb(6, 8, 24)',
        secondary: 'rgb(14, 23, 38)',
        tertiary: 'rgb(24, 31, 50)',
        quarternary: 'rgba(59, 63, 92, 0.08)'
      },
      textColor: {
        primary: 'rgb(224, 230, 237)',
        secondary: 'rgb(136, 142, 168)',
        teritary: 'rgb(81, 83, 101)',
        "active-nav-link": 'rgb(136, 142, 168)',
        "inactive-nav-link": 'rgb(80, 102, 144)',
        link: 'rgb(67, 97, 238)',
      },
      fontFamily: {
        archivo: 'Archivo, sans-serif',
        inter: 'Inter, sans-serif',
        nunito: 'Nunito, sans-serif'
      }
    },
  },
  plugins: [],
}

