import Vue from 'vue';
import isProduction from 'Global/Assets/isProduction';

// https://vuejs.org/v2/api/#Global-Config
Object.assign(Vue.config, {
  devtools: !isProduction,

  /**
   * Assign a handler for uncaught errors during component render function and watchers.
   * The handler gets called with the error and the Vue instance.
   *
   * @param {Error} error - The error object.
   * @param {!Object} vm - The ViewModel referring to our Vue instance.
   * @param {string} info - The Vue-specific error info; which lifecycle hook the error was found in.
   * @see https://vuejs.org/v2/api/#errorHandler
   */
  errorHandler(error, vm, info) {
    logger.error(error, info);
  },

  performance: false,

  productionTip: !isProduction,

  silent: isProduction,

  /**
   * Assign a custom handler for runtime Vue warnings.
   * Note this only works during development and is ignored in production.
   *
   * @param {string} message - The warning message.
   * @param {!Object} vm - The ViewModel referring to our Vue instance.
   * @param {string} trace - The component hierarchy trace.
   * @see https://vuejs.org/v2/api/#warnHandler
   */
  warnHandler(message, vm, trace) {
    logger.warn(message, trace);
  },
});
