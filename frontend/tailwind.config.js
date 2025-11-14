/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sw-green': '#0f7a3f'
      },
      borderRadius: {
        '2xl-lg': '18px'
      }
    }
  },
  plugins: [],
};

