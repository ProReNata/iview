const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');

process.env.NODE_ENV = 'production';

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

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  entry: {
    main: './src/index.js',
  },
  externals: {
    vue: {
      amd: 'vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      root: 'Vue',
    },
  },
  mode: process.env.NODE_ENV,
  output: {
    filename: 'iview.min.js',
    // https://github.com/webpack/webpack/issues/6525
    globalObject: `(${getGlobal.toString()}())`,
    library: 'iview',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    umdNamedDefine: true,
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
      algorithm: 'gzip',
      filename: '[path].gz[query]',
      minRatio: 0.8,
      test: /\.(js|css)$/,
      threshold: 10240,
    }),
  ],
});
