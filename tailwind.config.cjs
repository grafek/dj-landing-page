/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple-primary": "#7e21d4",
        error: "#ff0033",
        success: "#22bb33",
      },
    },
  },
  plugins: [],
};
