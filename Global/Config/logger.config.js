/**
 * @file For catching logs early, first (as near as) thing loaded.
 * @copyright Copyright (c) 2017, ProReNata AB
 * @author Graham Fairweather <graham.fairweather@prorenata.se>
 * @module Logger
 * @version 1.0.0
 * https://www.npmjs.com/package/babel-plugin-js-logger#be-aware
 */

import Logger from 'js-logger';
import isProduction from 'Global/Assets/isProduction';

/**
 * Lightweight, unobtrusive, configurable JavaScript logger.
 *
 * @namespace logger
 * @type {ILogger}
 */

const developmentLevel = Logger.DEBUG;
const productionLevel = Logger.WARN;

Logger.useDefaults({
  defaultLevel: isProduction ? productionLevel : developmentLevel,
  /**
   * @param {Array} messages - The array of messages.
   * @param {Object} context - The context of the messages.
   */
  formatter(messages, context) {
    messages.unshift(`${context.name}:`);
  },
});
