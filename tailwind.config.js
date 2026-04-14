/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-green": "#84C2AD",
        "dark-green": "#5F9B85",
        "darker-green":"#4B7F6A",
        "creem-green": "#F2F8F2",
        "grey":"#A8A8A8",
        "light-grey":"#F2F8F2",
        "cream-grey" : "#D9D9D9",
        "orange": "#FFA63E"
      },
      boxShadow: {
        'all': '0 0,0 0 1em rgba(0, 0, 0, 0.14)',
      },

    },
  },
  plugins: [],
};
