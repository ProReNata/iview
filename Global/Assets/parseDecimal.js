/**
 * @file Utility to parse a string to a decimal value.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/parseDecimal
 */

/**
 * Parse a string to a decimal value.
 *
 * @param {(number|string)} string - The string to be converted to a decimal value.
 * @returns {number} The parsed decimal value.
 */
export default function parseDecimal(string) {
  return Number.parseInt(string, 10);
}
