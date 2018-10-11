// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.config.js');

module.exports = function(config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadless'],
    coverageReporter: {
      dir: './coverage',
      reporters: [{subdir: '.', type: 'lcov'}, {type: 'text-summary'}],
    },
    files: ['./index.js'],
    frameworks: ['mocha', 'sinon-chai'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['spec', 'coverage'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
