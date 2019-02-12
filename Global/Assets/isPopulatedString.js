/**
 * @file Utility to test that a value is a string and that it contains more than just whitespace.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/isPopulatedString
 */

import createIsStringOfMinLength from 'Global/Assets/createIsStringOfMinLength';

/**
 * Test that a value is a string and that it contains more than just whitespace.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} True if value is a string with non-whitespace content; otherwise false.
 */
export default createIsStringOfMinLength(1);
