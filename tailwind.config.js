const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height:{
        '500':'500px',
        '450' : '450px',
        '550' : '550px',
        ...defaultTheme.height
      },
      colors:{
        primary: '#2D75F2',
        ...defaultTheme.colors
      }
    },
    
  },
  plugins: [],
}