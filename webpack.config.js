/**
 * @file Manages the base configuration settings for webpack.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @author Graham Fairweather <graham.fairweather@prorenata.se>
 * @module webpack/base/configuration
 * @version 2.0.0
 * @see {@link https://webpack.js.org/} for further information.
 */

const path = require('path');
const os = require('os');
const {readdirSync} = require('fs');
const childProcess = require('child_process');
const {BannerPlugin, EnvironmentPlugin} = require('webpack');
const merge = require('webpack-merge');
const semver = require('semver');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const stylelintFormatter = require('stylelint-formatter-pretty');
const TerserPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require('./DevTools/Build/utils');
const PACKAGE = require('./package.json');

const localeEntries = readdirSync('./src/locale/lang').reduce(
  /**
   * @param {!Object} entries - The file entries.
   * @param {string} file - The file name.
   */
  function(entries, file) {
    const [name] = file.split('.');

    return {
      ...entries,
      [`locale/${name}`]: `./src/locale/lang/${file}`,
    };
  },
  {},
);

const getGlobal = function() {
  'use strict';

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return Function('return this')();
};

const DEFAULT_EXCLUDE = /node_modules|redactor-3_1_6/;
/**
 * The ENVIRONMENT value.
 * @type {string}
 */
const ENVIRONMENT = utils.IS_PRODUCTION ? utils.PRODUCTION : utils.DEVELOPMENT;

utils.stdout(`Build platform: ${os.platform()}`);
utils.stdout(`Running Webpack build: ${ENVIRONMENT}`);

/**
 * The name of the project.
 * @type {string}
 */
const PROJECT_NAME = utils.getStringOption(PACKAGE, 'prorenata.name');

/**
 * The filename to output.
 * @type {string}
 */
const OUTPUT_FILENAME = `${PROJECT_NAME.toLowerCase()}.js`;

/**
 * The dist directory.
 * @type {string}
 */
// const OUTPUT_PATH = path.resolve(utils.getStringOption(PACKAGE, 'prorenata.outputPath'));

/**
 * Check to see if any files change on the AWS build server.
 * @type {boolean}
 */
const PERFORM_DIRTY_CHECK = false;

/**
 * Indicates if style linting should be performed.
 * @type {boolean}
 */
const STYLE_LINTING = false; // !IS_AWS;

/**
 * If the file is greater than the limit (in bytes) the file-loader is used by default
 * and all query parameters are passed to it.
 *
 * In development, we are unable to serve files so url encode everything.
 *
 * @type {(number|undefined)}
 * @see {@link https://github.com/webpack-contrib/url-loader#limit}
 */
const URL_LOADER_BYTES_LIMIT = undefined;

/**
 * Plugins are the backbone of webpack. webpack itself is built on the same plugin system
 * that you use in your webpack configuration!
 *
 * A webpack plugin is a JavaScript object that has an apply property. This apply property
 * is called by the webpack compiler, giving access to the entire compilation lifecycle.
 *
 * @type {Array.<!Object>}
 */
const PLUGINS = [
  /**
   * Use the shorthand version.
   * @type {!Object}
   * @see {@link https://webpack.js.org/plugins/environment-plugin/}
   */
  new EnvironmentPlugin({
    NODE_ENV: ENVIRONMENT,
    VERSION: `'${PACKAGE.version}'`,
  }),

  /**
   * Limit the output to a single chunk.
   * @type {!Object}
   * @see {@link https://webpack.js.org/plugins/limit-chunk-count-plugin/}
   */
  // new optimize.LimitChunkCountPlugin({
  //   maxChunks: 1,
  // }),
];

/* Add stylelint plugin if requested. */
if (STYLE_LINTING) {
  /**
   * A webpack plugin to lint your CSS/Sass code using stylelint.
   * @type {!Object}
   * @see {@link https://github.com/JaKXz/stylelint-webpack-plugin}
   */
  const styleLint = new StyleLintPlugin({
    emitErrors: !utils.IS_PRODUCTION,
    failOnError: false, // https://github.com/JaKXz/stylelint-webpack-plugin/issues/103
    files: ['**/*.(css|less|vue)'],
    formatter: stylelintFormatter,
  });

  /* Add the stylelint plugin object to the list of plugins. */
  PLUGINS.push(styleLint);
}

/**
 * The number of logical CPUs in the build system.
 * @type {number}
 */
const CPU_COUNT = os.cpus().length;

/**
 * How many logical system CPUS to use for Terser process.
 * @type {number}
 */
const LOGICAL_CPU_USE = Math.max(CPU_COUNT - 1, 1);

if (utils.IS_PRODUCTION) {
  utils.stdout(`Number of logical system CPUs: ${CPU_COUNT}`);
  utils.stdout(`Logical system CPUs used for Terser: ${LOGICAL_CPU_USE}`);

  const MINI_CSS_EXTRACT_PLUGIN_INSTANCE = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  });

  PLUGINS.push(MINI_CSS_EXTRACT_PLUGIN_INSTANCE);
} else {
  const html = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/index.html'),
  });

  PLUGINS.push(html);
}

/**
 * Shared (.js & .vue) babel-loader options.
 * @type {!Object}
 * @see {@link https://github.com/babel/babel-loader}
 */
const babelLoader = {
  exclude: DEFAULT_EXCLUDE,
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

const miniCssExtactLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {},
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
    javascriptEnabled: true,
    sourceMap: true,
    strictMath: true,
  },
};

/**
 * Transforming styles with JS plugins.
 * @type {!Object}
 * @see {@link https://github.com/postcss/postcss#usage/}
 */
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
  },
};

module.exports = (env = {}) => {
  /**
   * The date as of now.
   * @type {string}
   */
  const NOW = new Date().toISOString();

  /**
   * The reference created by git describe --dirty`
   * @type {string}
   * @see {@link https://git-scm.com/docs/git-describe}
   */
  const DESCRIBE = childProcess
    .spawnSync('git', ['describe', '--dirty'])
    .stdout.toString()
    .trim();

  if (PERFORM_DIRTY_CHECK && utils.IS_PRODUCTION) {
    /**
     * Indicates if the build is dirty.
     * @type {boolean}
     */
    const IS_DIRTY = DESCRIBE.includes('-dirty');

    /**
     * Fail the build if we are on AWS and it is dirty.
     */
    if (IS_DIRTY) {
      return utils
        .spawn('git', ['status'], {collect: false})
        .then(() => utils.spawn('git', ['--no-pager', 'diff'], {collect: false}))
        .then(() => {
          throw new Error('Build is dirty!');
        });
    }
  }

  /**
   * Adds a banner to the top of each generated chunk.
   * @type {!Object}
   * @see {@link https://webpack.js.org/plugins/banner-`plugin/}
   */
  const BANNER_PLUGIN = new BannerPlugin({
    banner: `/*!\n${JSON.stringify(
      {
        copywrite: utils.getStringOption(PACKAGE, 'copyright'),
        date: NOW,
        describe: DESCRIBE,
        description: utils.getStringOption(PACKAGE, 'description'),
        file: '[file]',
        hash: '[hash]',
        license: utils.getStringOption(PACKAGE, 'license'),
        version: utils.getStringOption(PACKAGE, 'version'),
      },
      null,
      2,
    )}\n*/`,
    raw: true,
  });

  PLUGINS.push(BANNER_PLUGIN);

  /**
   * Indicates if "storybook" config.
   * @type {boolean}
   */
  const IS_STORYBOOK = utils.getBooleanOption(env, 'storybook');

  /**
   * Smaller lodash builds. We are not opting in to path feature.
   * @type {!Object}
   * @see {@link https://github.com/lodash/lodash-webpack-plugin}
   */
  const LODASH_PLUGIN = new LodashModuleReplacementPlugin({
    collections: IS_STORYBOOK,
    paths: true,
    shorthands: IS_STORYBOOK,
  });

  PLUGINS.push(LODASH_PLUGIN);

  if (!IS_STORYBOOK) {
    /**
     * Indicates if bundle reporting should be run.
     * @type {boolean}
     */
    const RUN_REPORT = utils.getBooleanOption(env, 'report');

    if (RUN_REPORT) {
      /**
       * Webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap.
       * @type {!Object}
       * @see {@link https://github.com/webpack-contrib/webpack-bundle-analyzer}
       */
      const BUNDLE_ANALYZER_PLUGIN_INSTANCE = new BundleAnalyzerPlugin();

      PLUGINS.push(BUNDLE_ANALYZER_PLUGIN_INSTANCE);
    }
  }

  /**
   * Only add these plugins if it is not storybook that is building code.
   */
  if (!IS_STORYBOOK) {
    /**
     * Add the vue-loader plugin object to the list of plugins.
     * Required by v15+ of vue-loader.
     * @type {!Object}
     * @see {@link https://vue-loader.vuejs.org/guide/}
     */
    PLUGINS.push(new VueLoaderPlugin());
  }

  const base = {
    name: PROJECT_NAME,

    /**
     * The context directory of Byxelkrok.
     * @type {string}
     */
    context: __dirname,

    /**
     * This option controls if and how source maps are generated.
     *
     * nosources-source-map - A SourceMap is created without the sourcesContent in it.
     * It can be used to map stack traces on the client without exposing all of the
     * source code. You can deploy the Source Map file to the webserver.
     *
     * eval-source-map - Each module is executed with eval() and a SourceMap is added as
     * a DataUrl to the eval(). Initially it is slow, but it provides fast rebuild speed
     * and yields real files. Line numbers are correctly mapped since it gets mapped to
     * the original code. It yields the best quality SourceMaps for development.
     *
     * source-map - A full SourceMap is emitted as a separate file. It adds a reference
     * comment to the bundle so development tools know where to find it.
     *
     * @type {(string|boolean)}
     * @see {@link https://webpack.js.org/configuration/devtool/}
     */
    devtool: 'source-map',

    entry: utils.IS_PRODUCTION
      ? {
          iview: [path.join(__dirname, 'src/index.js'), path.join(__dirname, 'src/styles/index.less')],
          ...localeEntries,
        }
      : {
          iview: path.join(__dirname, 'examples/main.js'),
          vendors: ['vue', 'vue-router'],
        },

    externals: utils.IS_PRODUCTION
      ? {
          vue: {
            amd: 'vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            root: 'Vue',
          },
        }
      : {},

    mode: ENVIRONMENT,

    module: {
      /**
       * In modular programming, developers break programs up into discrete chunks of functionality
       * called a module. Each module has a smaller surface area than a full program, making verification,
       * debugging, and testing trivial. Well-written modules provide solid abstractions and encapsulation
       * boundaries, so that each module has a coherent design and a clear purpose within the overall
       * application.
       *
       * webpack supports modules written in a variety of languages and preprocessors, via loaders.
       * Loaders describe to webpack how to process non-JavaScript modules and include these dependencies
       * into your bundles.
       *
       * @type {Array.<!Object>}
       * @see {@link https://webpack.js.org/configuration/module/#module-rules}
       */
      rules: [
        /**
         * Shared (.js & .vue) eslint-loader options.
         * @type {!Object}
         * @see {@link https://github.com/MoOx/eslint-loader}
         */
        {
          enforce: 'pre',
          exclude: DEFAULT_EXCLUDE,
          loader: 'eslint-loader',
          options: {
            emitError: true,
            emitWarning: true,
            failOnError: utils.IS_PRODUCTION,
            failOnWarning: utils.IS_PRODUCTION,
            // currently disabled as not working in <= v2.1.1
            fix:
              !utils.IS_PRODUCTION &&
              semver.satisfies(semver.coerce(utils.getStringOption(PACKAGE, 'devDependencies.eslint-loader')), '>2.1.1'),
            formatter: eslintFriendlyFormatter,
            quiet: utils.IS_PRODUCTION,
          },
          // json does not work because of ESM import
          test: /\.(js|vue)$/,
        },

        /**
         * Extract sourceMappingURL comments from modules and offer it to webpack
         * @see {@link https://github.com/webpack-contrib/source-map-loader}
         */
        {
          enforce: 'pre',
          loader: 'source-map-loader',
          test: /\.js$/,
        },

        /* Style loading. */
        {
          loaders: [utils.IS_PRODUCTION ? miniCssExtactLoader : styleLoader, cssLoader, postcssLoader],
          test: /\.css$/,
        },

        {
          loaders: [utils.IS_PRODUCTION ? miniCssExtactLoader : styleLoader, cssLoader, postcssLoader, lessLoader],
          test: /\.less$/,
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
                  css: ['vue-style-loader', cssLoader, postcssLoader],
                  js: [babelLoader],
                  less: ['vue-style-loader', cssLoader, postcssLoader, lessLoader],
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
          ],
          test: /\.vue$/,
        },

        ...[
          {
            mimetype: 'application/vnd.ms-fontobject',
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          },
          {
            mimetype: 'application/font-woff',
            test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
          },
          {
            mimetype: 'application/octet-stream',
            test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
          },
          {
            mimetype: 'image/svg+xml',
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          },
          {
            mimetype: 'image/bmp',
            test: /\.bmp(\?\S*)?$/,
          },
          {
            mimetype: 'image/png',
            test: /\.png(\?\S*)?$/,
          },
          {
            mimetype: 'image/jpeg',
            test: /\.jpe?g(\?\S*)?$/,
          },
          {
            mimetype: 'image/gif',
            test: /\.gif(\?\S*)?$/,
          },
        ].map(({mimetype, test}) => ({
          loader: 'url-loader',
          options: {
            limit: URL_LOADER_BYTES_LIMIT,
            mimetype,
            // publicPath: PUBLIC_PATH,
          },
          test,
        })),
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

    optimization: {
      minimize: false,
    },

    /**
     * Configuring the output configuration options tells webpack how to write the compiled
     * files to disk.
     * @type {!Object}
     * @see {@link https://webpack.js.org/configuration/output/}
     */
    output: utils.IS_PRODUCTION
      ? {
          filename: '[name].js',
          // https://github.com/webpack/webpack/issues/6525
          globalObject: `(${getGlobal.toString()}())`,
          library: 'iview',
          libraryTarget: 'umd',
          path: path.resolve(__dirname, 'dist'),
          publicPath: '/dist/',
          umdNamedDefine: true,
        }
      : {
          chunkFilename: '[name].chunk.js',
          filename: '[name].js',
          path: path.join(__dirname, 'examples/dist'),
          publicPath: '',
        },

    plugins: PLUGINS,

    /**
     * These options allows you to control how webpack notifies you of assets and
     * entry points that exceed a specific file limit.
     * @type {!Object}
     * @see {@link https://webpack.js.org/configuration/performance/}
     */
    performance: {
      assetFilter(assetFilename) {
        return !assetFilename.includes(OUTPUT_FILENAME);
      },
      hints: utils.IS_PRODUCTION ? 'warning' : false,
      maxAssetSize: 600000,
    },

    /**
     * These options change how modules are resolved.
     * @type {!Object}
     * @see {@link https://webpack.js.org/configuration/resolve/}
     */
    resolve: {
      /**
       * Create aliases to import or require certain modules more easily.
       * @type {!Object}
       * @see {@link https://webpack.js.org/configuration/resolve/#resolve-alias}
       */
      alias: {
        iview: path.join(__dirname, 'src/index'),
        Global: path.join(__dirname, 'Global'),
        RootDir: __dirname,
        Stories: path.join(__dirname, 'Storybook/Stories'),
        /**
         * ES module builds are intended for use with modern bundlers like webpack 2 or rollup.
         * @type {string}
         * @see {@link https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds}
         */
        vue$: 'vue/dist/vue.esm.js',
      },
      extensions: ['.js', '.vue', '.json'],
    },

    /**
     * webpack can compile for multiple environments or targets.
     * @type {string}
     * @see {@link https://webpack.js.org/configuration/target/}
     */
    target: 'web',

    /**
     * A set of options used to customize watch mod.
     * @type {!Object}
     * @see {@link https://webpack.js.org/configuration/watch/#watchoptions}
     */
    watchOptions: {
      aggregateTimeout: 300,
    },
  };

  const createMinifiedConfig = function() {
    /**
     * This plugin uses Terser to minify your JavaScript.
     * @type {!Object}
     * @see {@link https://webpack.js.org/plugins/terser-webpack-plugin/}
     */
    const terser = new TerserPlugin({
      parallel: LOGICAL_CPU_USE,
      sourceMap: true,
      terserOptions: {
        ecma: 5,
      },
    });

    return merge(base, {
      plugins: [terser],

      output: {
        filename: '[name].min.js',
      },
    });
  };

  const configs = [base];

  if (utils.IS_PRODUCTION) {
    configs.push(createMinifiedConfig());
  }

  return configs;
};
