/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'orange-500': '#e67e22',
      },
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      textColor: {
        'brown-500': '#3d2816',
      },
    },
  },
  plugins: [],
};
