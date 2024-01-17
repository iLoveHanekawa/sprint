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
      borderWidth: {
        '0.8': '0.8px',
      },
      borderColor: {
        primary: 'rgb(23, 38, 60)',
        secondary: 'rgb(37, 59, 92)',
        tertiary: 'rgb(67, 97, 238)'
      },
      backgroundColor: {
        error: 'rgb(231, 81, 90)',
        primary: 'rgb(6, 8, 24)',
        secondary: 'rgb(14, 23, 38)',
        tertiary: 'rgb(24, 31, 50)',
        quarternary: 'rgba(59, 63, 92, 0.08)',
        button: {
          secondary: 'rgb(33, 150, 243)',
          tertiary: 'rgb(0, 171, 85)'
        },
        group: {
          left: 'rgb(27, 46, 75)',
          right: 'rgb(18, 30, 50)',
          "left-alt": 'rgb(67, 97, 238)'
        }
      },
      minWidth :{
        half: '50%',
        forty: '40%'
      },
      textColor: {
        primary: 'rgb(224, 230, 237)',
        secondary: 'rgb(136, 142, 168)',
        tertiary: 'rgb(81, 83, 101)',
        "active-nav-link": 'rgb(136, 142, 168)',
        "inactive-nav-link": 'rgb(80, 102, 144)',
        link: 'rgb(67, 97, 238)',
        error: 'rgb(231, 81, 90)',
        success: 'rgb(0, 171, 85)'
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

