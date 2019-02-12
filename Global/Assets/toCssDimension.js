/**
 * @file Utility to create a formatted CSS value with unit type.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/toCssDimension
 */

import callFunctionOrIdentity from 'Global/Assets/callFunctionOrIdentity';
import oneOf from 'Global/Assets/oneOf';

const EMPTY_STRING = '';
const PX = 'px';
const units = Object.freeze(['%', 'cm', 'em', 'ex', 'in', 'mm', 'pc', 'pt', PX, 'vh', 'vw', 'vmin']);

/**
 * Create a formatted CSS value with unit type.
 *
 * @param {number|string|Function} [number=0] - The numeric value of the dimension.
 * @param {number|string|Function} [unit=px] - The unit type of the dimension.
 * @returns {string} The formatted CSS value with unit.
 */
export default function toCssDimention(number = 0, unit = PX) {
  const unitValue = Number.parseFloat(callFunctionOrIdentity(number));
  const cssUnit = number === 0 ? EMPTY_STRING : oneOf(callFunctionOrIdentity(unit), units, PX);

  return `${unitValue}${cssUnit}`;
}
