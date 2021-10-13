module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4e7eff',
          dark: '#091A42',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
