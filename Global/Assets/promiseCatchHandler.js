/**
 * @file Utility for reporting promise catch errors.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/promiseCatchHandler
 */

/**
 * Log and notify the user of a promise failure.
 *
 * @param {Array} args - The arguments array.
 */
export default function promiseCatchHandler(...args) {
  logger.error(...args);
}
