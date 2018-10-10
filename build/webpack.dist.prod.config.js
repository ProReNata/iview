const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');

process.env.NODE_ENV = 'production';

const getGlobal = function() {
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

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  entry: {
    main: './src/index.js',
  },
  output: {
    globalObject: `(${getGlobal.toString()}())`, // https://github.com/webpack/webpack/issues/6525
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'iview.min.js',
    library: 'iview',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
  plugins: [
    // @todo
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        ecma: 5,
      },
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
