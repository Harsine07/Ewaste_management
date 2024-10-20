/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Look for Tailwind classes in all JS/JSX/TS/TSX files in the src folder
    './public/index.html',         // Include the main HTML file if applicable
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
