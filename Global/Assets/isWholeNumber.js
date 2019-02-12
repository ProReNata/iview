import isCountingNumber from 'Global/Assets/isCountingNumber';

/**
 * Test if a value is a whole number, 0 -> MAX_SAFE_INTEGER.
 *
 * @param {*} value - The value to be tested.
 * @returns {boolean} True if value is a whole number.
 */
export default function isWholeNumber(value) {
  return Object.is(value, 0) || isCountingNumber(value);
}
