const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const entry = require('./locale');

process.env.NODE_ENV = 'production';

module.exports = {
  devtool: 'source-map',
  entry,
  externals: {
    vue: {
      amd: 'vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      root: 'Vue',
    },
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          sourceMap: true,
        },
        test: /\.js$/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    library: 'iview/locale',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist/locale'),
    publicPath: '/dist/locale/',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        ecma: 5,
      },
    }),
  ],
};
