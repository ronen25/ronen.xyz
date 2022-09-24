// The palette is: https://www.canva.com/colors/color-palettes/thwarted-summer-shower/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tiffany-blue': {
          500: '#BCECE0',
          700: '#97e8d4',
          900: '#12dba9',
        },
        cyan: '#36EEE0',
        'hot-pink': '#F652A0',
        cornflower: {
          500: '#4C5270',
        },
      },
    },
  },
  plugins: [],
};
