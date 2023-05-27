/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#49ca45",
        primaryHover: "#38ac33",
      },
    },
  },
  plugins: [require("daisyui")],
};
