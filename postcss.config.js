const postcssHTML = require('postcss-html');
const postcssURL = require('postcss-url');
const postcssSafe = require('postcss-safe-parser');
const postcssAutoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss')('./tailwind.js');
// const postcssNano = require('cssnano');
// const utils = require('./DevTools/Build/utils');

const plugins = [postcssHTML, postcssURL, postcssSafe, tailwindcss, postcssAutoprefixer];

// if (utils.IS_PRODUCTION) {
//   plugins.push(postcssNano);
// }

module.exports = {
  plugins,
};
