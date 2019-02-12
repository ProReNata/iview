/**
 * @file Utility to test if a value is a valid Date object.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/isValidDate
 */

import isDate from 'lodash/isDate';

/**
 * Test if a given argument is a valid Date object.
 *
 * @param {*} value - The value to be tested.
 * @returns {boolean} True if value is a valid Date object; otherwise false.
 */
export default function isValidDate(value) {
  return isDate(value) && !Number.isNaN(value.getTime());
}
