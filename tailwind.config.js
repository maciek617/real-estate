/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-mobile': 'rgba(0,0,0,0.8)'
      },
      height: {
        'vh': '90vh',
      },
      minHeight: {
        'mn': '112px',
      },
      fontSize: {
        'very-large': '1.2rem'
      },
      translate: {
        'trans-center': 'translate(-50%)'
      },
    },
  },
  plugins: [],
}