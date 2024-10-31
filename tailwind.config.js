/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue, ts, js}"],
  theme: {
    extend: {
      colors: {
        "cream": "#fcf7f0",
        "green-light": "#75815A", 
        "green-dark": "#4c5930",
        "orangered" :"#df5139",
        
      },
       fontFamily: {
      Montserrat: "Montserrat, sans-serif",
    },
  /*   container: {
      center: true,
      padding: "2rem",
    }, */
    },
  },
  plugins: [],
}

