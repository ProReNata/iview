/**
 * @file Utility to test if a comparate exists in a list of comparates, return comparate or supply a fallback.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/oneOf
 */

import castArray from 'lodash/castArray';

/**
 * Tests if a comparate exists in a list of comparates an then returns the comparate if there
 * is a match; otherwise returns the fallback value.
 *
 * @param {*} comparate - The value to compare against the supplied list of comparates.
 * @param {Array|*} [comparates=[]] - An array of values or a single value for comparison.
 * @param {*} [fallback=undefined] - The returned value if no match exists.
 * @returns {*} - The comparate upon a match; otherwise the fallback value.
 */
export default function oneOf(comparate, comparates, fallback) {
  return castArray(comparates).includes(comparate) ? comparate : fallback;
}
