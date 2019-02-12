/**
 * @file Utility to test if a `value` is a DOM Element.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/isDOMElement
 */

import isDOMNode from 'Global/Assets/isDOMNode';

/**
 * This method tests if `value` is a DOM Element.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} True if a DOM Element, otherwise false.
 */
export default function isDOMElement(value) {
  return isDOMNode(value) && value.nodeType === 1;
}
