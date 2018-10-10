/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const pkg = require('../package.json');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

/**
 * The NODE_ENV environment variable.
 * @type {!Object}
 */
const {NODE_ENV} = process.env;

/**
 * The production string.
 * @type {string}
 */
const PRODUCTION = 'production';

/**
 * The default exclude regex.
 * @type {regexp}
 */
const DEFAULT_EXCLUDE_RX = /node_modules/;

/**
 * Indicates if linting errors should fail the build.
 * @type {boolean}
 */
const FAIL_ON_LINT_ERRORS = false;

/**
 * Shared (.js & .vue) eslint-loader options.
 * @type {!Object}
 * @see {@link https://github.com/MoOx/eslint-loader}
 */
const eslintLoader = {
  loader: 'eslint-loader',
  options: {
    emitError: true,
    emitWarning: NODE_ENV !== PRODUCTION,
    failOnError: FAIL_ON_LINT_ERRORS,
    failOnWarning: false,
    formatter: eslintFriendlyFormatter,
    quiet: NODE_ENV === PRODUCTION,
  },
};

/**
 * Shared (.js & .vue) babel-loader options.
 * @type {!Object}
 * @see {@link https://github.com/babel/babel-loader}
 */
const babelLoader = {
  exclude: DEFAULT_EXCLUDE_RX,
  loader: 'babel-loader',
};

/**
 * Adds CSS to the DOM by injecting a <style> tag.
 * @type {!Object}
 * @see {@link https://webpack.js.org/loaders/style-loader/}
 */
const styleLoader = {
  loader: 'style-loader',
  options: {
    singleton: true,
    sourceMap: true,
  },
};

/**
 * The css-loader interprets @import and url() like import/require() and will resolve them.
 * Also consider: https://webpack.js.org/loaders/css-loader/#extract
 * @type {!Object}
 * @see {@link https://webpack.js.org/loaders/css-loader/}
 */
const cssLoader = {
  loader: 'css-loader',
  options: {
    camelCase: true,
    sourceMap: true,
  },
};

/**
 * Compiles Less to CSS.
 * @type {!Object}
 * @see {@link https://webpack.js.org/loaders/less-loader/}
 *
 * Usually, it's recommended to extract the style sheets into a dedicated file in
 * production using the ExtractTextPlugin. This way your styles are not dependent
 * on JavaScript.
 *
 * Uses webpack's resolver by default.
 * @see {@link https://webpack.js.org/loaders/less-loader/#webpack-resolver}
 */
const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
    // strictMath: true,
  },
};

/**
 * Generate style loaders for 'vue-loader'.
 *
 * @param {(Object|string)} [loader] - The loader prefix.
 * @returns {Array} A new array with the required loaders.
 */
const generateLoaders = (loader) => {
  const loaders = [cssLoader];

  if (loader) {
    loaders.push(loader);
  }

  return ['vue-style-loader', ...loaders];
};

module.exports = {
  // 加载器
  module: {
    // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
    rules: [
      /**
       * Extract sourceMappingURL comments from modules and offer it to webpack
       * @see {@link https://github.com/webpack-contrib/source-map-loader}
       */
      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/,
      },

      {
        ...eslintLoader,
        enforce: 'pre',
        exclude: DEFAULT_EXCLUDE_RX,
        // json does not work because of ESM import
        test: /\.(js|vue)$/,
      },

      /**
       * vue-loader is a loader for webpack that can transform Vue components written
       * in the following format into a plain JavaScript module.
       * @type {!Object}
       * @see {@link https://vue-loader.vuejs.org/en/}
       */
      {
        loaders: [
          // https://vue-loader.vuejs.org/en/
          {
            loader: 'vue-loader',
            options: {
              // https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md#csssourcemap
              cssSourceMap: true,
              // https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md#loaders
              loaders: {
                css: generateLoaders(),
                js: [babelLoader],
                less: generateLoaders(lessLoader),
              },
              // https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md#transformtorequire
              transformToRequire: {
                image: 'xlink:href',
                img: 'src',
                source: 'src',
                video: ['src', 'poster'],
              },
            },
          },
          {...eslintLoader},
        ],
        test: /\.vue$/,
      },

      /**
       * This package allows transpiling JavaScript files using Babel and webpack.
       * @type {!Object}
       * @see {@link https://webpack.js.org/loaders/babel-loader/}
       */
      {
        ...babelLoader,
        test: /\.js$/,
      },

      /* Style loading. */
      {
        loaders: [
          styleLoader,
          cssLoader,
          {
            loader: 'autoprefixer-loader',
          },
        ],
        test: /\.(css)(\?\S*)?$/,
      },
      {
        loaders: [styleLoader, cssLoader, lessLoader],
        test: /\.(less)(\?\S*)?$/,
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader',
      },
    ],
  },
  node: {
    child_process: 'empty',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    tls: 'empty',
  },
  resolve: {
    extensions: ['.js', ',jsx', '.vue', '.json'],
    alias: {
      /**
       * ES module builds are intended for use with modern bundlers like webpack 2 or rollup.
       * @type {string}
       * @see {@link https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds}
       */
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  plugins: [
    /**
     * In the past, one of webpack’s trade-offs when bundling was that each module in your bundle would
     * be wrapped in individual function closures. These wrapper functions made it slower for your JavaScript
     * to execute in the browser. In comparison, tools like Closure Compiler and RollupJS ‘hoist’ or
     * concatenate the scope of all your modules into one closure and allow for your code to have a
     * faster execution time in the browser.
     * This plugin will enable the same concatenation behavior in webpack.
     * @type {!Object}
     * @see {@link https://webpack.js.org/plugins/module-concatenation-plugin/}
     */
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`,
    }),
    /**
     * Smaller lodash builds. We are not opting in to path feature.
     * @type {!Object}
     * @see {@link https://github.com/lodash/lodash-webpack-plugin}
     */
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
    /**
     * Visualize size of webpack output files with an interactive zoomable treemap..
     * @type {!Object}
     * @see {@link https://github.com/webpack-contrib/webpack-bundle-analyzer}
     */
    ...(process.env.REPORT ? [new BundleAnalyzerPlugin()] : []),
  ],
  /**
   * These options allows you to control how webpack notifies you of assets and
   * entrypoints that exceed a specific file limit.
   * @type {!Object}
   * @see {@link https://webpack.js.org/configuration/performance/}
   */
  performance: {
    hints: false,
  },
};
