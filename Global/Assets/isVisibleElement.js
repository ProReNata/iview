/**
 * @file Utility to test if a DOM Element is visible.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/isVisibleElement
 */

import isDOMElement from 'Global/Assets/isDOMElement';

/**
 * Test if a given argument is a valid Date object.
 *
 * @param {*} element - The element to be tested.
 * @returns {boolean} True if element is visible; otherwise false.
 */
export default function isVisibleElement(element) {
  return isDOMElement(element) && element.offsetParent !== null;
}
