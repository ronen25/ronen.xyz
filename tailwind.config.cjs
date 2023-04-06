/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: 'Inter, sans-serif',
    },
    extend: {
      colors: {
        'zurich-blue': {
          400: '#0078bf',
          600: '#005c93',
          900: '#00456f',
        },
        'zurich-blue-invert': '#00a1ff',
        'zurich-gray': '#919191',
        'zurich-dark-background': '#303030',
        'zurich-indigo': '#503a92',
        'zurich-indigo-invert': '#ff2c95',
        'zurich-green': { 400: '#00a030', 900: '#015e1d' },
        'zurich-green-invert': '#00b837',
        'zurich-amber': { 300: '#f08400', 900: '#9c5701' },
        'zurich-purple': { 400: '#a30d65', 900: '#6e0a45' },
        'zurich-purple-invert': '#ff61dd',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
