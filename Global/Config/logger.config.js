/**
 * @file For catching logs early, first (as near as) thing loaded.
 * @copyright Copyright (c) 2017, ProReNata AB
 * @author Graham Fairweather <graham.fairweather@prorenata.se>
 * @module Logger
 * @version 1.0.0
 * https://www.npmjs.com/package/babel-plugin-js-logger#be-aware
 */

import Vue from 'vue';
import Logger from 'js-logger';
import isError from 'lodash/isError';
import get from 'lodash/get';
import noop from 'lodash/noop';
import isProduction from 'Global/Assets/isProduction';
import isCircular from 'Global/Assets/isCircular';
import messageStringifier from 'Global/Assets/messageStringifier';
import oneOf from 'Global/Assets/oneOf';

/**
 * Lightweight, unobtrusive, configurable JavaScript logger.
 *
 * @namespace logger
 * @type {ILogger}
 */

/**
 * @typedef {Readonly.<Raven.LogLevel>}
 * @property {Raven.LogLevel} Info
 * @property {Raven.LogLevel} Warning
 * @property {Raven.LogLevel} Error
 */
const Severity = Object.freeze({
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
});

/** @type {ReadonlyArray.<Raven.LogLevel>} */
const SENTRY_LEVELS = Object.freeze([Severity.Info, Severity.Warning, Severity.Error]);
const developmentLevel = Logger.DEBUG;
const productionLevel = Logger.WARN;
/**
 * @type {Readonly.<Raven.LogLevel>}
 * @property {Raven.LogLevel} error
 * @property {Raven.LogLevel} warn
 * @property {Raven.LogLevel} info
 */
const sentryLevelMap = Object.freeze(
  Object.create(null, {
    /** @name error */
    [Logger.ERROR.name]: {
      enumerable: true,
      value: Severity.Error,
    },
    /** @name warn */
    [Logger.WARN.name]: {
      enumerable: true,
      value: Severity.Warning,
    },
    /** @name info */
    [Logger.INFO.name]: {
      enumerable: true,
      value: Severity.Info,
    },
  }),
);

/**
 * Get the severity level for Sentry.
 *
 * @param {string} name - The logger severity name.
 * @returns {Raven.LogLevel} The Sentry severity level.
 */
const getSentryLevel = function _getSentryLevel(name) {
  return oneOf(sentryLevelMap[name], SENTRY_LEVELS, Severity.Info);
};

/**
 * Convert message to a string if necessary to avoid errors.
 *
 * @param {*} message - The message to test and convert if needed.
 * @returns {*} The original message or a string representation.
 */
const restMessagesIteratee = function _restMessagesIteratee(message) {
  if (message instanceof Vue) {
    return '[Object Vue]';
  }

  return isCircular(message) ? messageStringifier(message, 2) : message;
};

const {Raven} = window;

Logger.useDefaults({
  defaultLevel: isProduction ? productionLevel : developmentLevel,
  /**
   * @param {Array} messages - The array of messages.
   * @param {Object} context - The context of the messages.
   */
  formatter(messages, context) {
    if (Raven && Raven.isSetup() && context.level.value >= productionLevel.value) {
      const [firstMessage] = messages;
      const errorObject = isError(firstMessage) && firstMessage;
      /** @type {Raven.LogLevel} */
      const sentryLevel = getSentryLevel(context.level.name);
      const restMessages = messages.slice(1);
      const options = {
        /** @type {(Array|undefined)} */
        extra: restMessages.length ? restMessages.map(restMessagesIteratee) : undefined,
        /** @type {Raven.LogLevel} */
        level: sentryLevel,
        logger: 'js-logger',
        tags: {
          /** @type {string} */
          NODE_ENV: process.env.NODE_ENV,
          /** @type {string} */
          context: context.name,
          /** @type {string} */
          eketorpVersion: window.eketorpVersion,
          name: 'Byxelkrok',
          /** @type {string} */
          username: get(window, 'ottenby.currentUser', {get: noop}).get('username'),
        },
      };

      if (sentryLevel === Severity.Error && errorObject) {
        Raven.captureException(errorObject, options);
      } else {
        Raven.captureMessage(`${context.name}: ${messageStringifier(firstMessage)}`, options);
      }
    }

    messages.unshift(`${context.name}:`);
  },
});
