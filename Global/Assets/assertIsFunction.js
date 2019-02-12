/**
 * @file Utility check value is a function or throw an error.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/assertIsFunction
 */

/**
 * Tests `value` to see if it is a function, throws a `TypeError` if it is
 * not. Otherwise returns the `callback`.
 *
 * @param {*} value - The argument to be tested.
 * @throws {TypeError} Throws if `callback` is not a function.
 * @returns {*} Returns `value` if it is function.
 */

export default function assertIsFunction(value) {
  if (typeof value !== 'function') {
    throw new TypeError('Not a function');
  }

  return value;
}
