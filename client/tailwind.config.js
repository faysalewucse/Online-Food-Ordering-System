/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        green: "#38ac33",
        greenHover: "#309e2b",
      },
    },
  },
  plugins: [require("daisyui")],
};
