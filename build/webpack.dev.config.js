/**
 * 本地预览
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');

process.env.NODE_ENV = 'development';

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  // 入口
  entry: {
    main: './examples/main',
    vendors: ['vue', 'vue-router'],
  },
  mode: process.env.NODE_ENV,
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    path: path.join(__dirname, '../examples/dist'),
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../examples/index.html'),
    }),
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  resolve: {
    alias: {
      iview: '../../src/index',
      vue$: 'vue/dist/vue.esm.js',
      // vue: 'vue/dist/vue.runtime.js'
    },
  },
});
