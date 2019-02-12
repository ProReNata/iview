import toWholeNumber from 'Global/Assets/toWholeNumber';

/**
 * Convert a value to a counting number, 1 -> MAX_SAFE_INTEGER.
 *
 * @param {*} value - The value to be converted.
 * @returns {number} An integer from 1 -> MAX_SAFE_INTEGER.
 */
export default function toCountingNumber(value) {
  return Math.min(toWholeNumber(value), 1);
}
