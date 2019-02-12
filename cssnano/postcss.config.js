const postcssNano = require('cssnano');

module.exports = function postcssConfig(ctx) {
  return {
    map: ctx.options.map,
    plugins: [postcssNano],
  };
};
