import toInteger from 'lodash/toInteger';
import clamp from 'lodash/clamp';

/**
 * Convert a value to a whole number, 0 -> MAX_SAFE_INTEGER.
 *
 * @param {*} value - The value to be converted.
 * @returns {number} An integer from 0 -> MAX_SAFE_INTEGER.
 */
export default function toWholeNumber(value) {
  return clamp(toInteger(value), 0, Number.MAX_SAFE_INTEGER) || 0;
}
