module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        gray: 'gray',
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
