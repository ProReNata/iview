const merge = require('webpack-merge');
const appConfig = require('../../webpack.config')({storybook: true})[0];

delete appConfig.mode;
delete appConfig.bail;
delete appConfig.entry;
delete appConfig.externals;
delete appConfig.output;
delete appConfig.optimization;
delete appConfig.context;
delete appConfig.watchOptions;
delete appConfig.performance;
delete appConfig.target;
delete appConfig.resolve.extensions;

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig /* , configType */) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.


  delete storybookBaseConfig.module;

  return merge(storybookBaseConfig, appConfig);
};
