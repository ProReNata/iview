import flatted from 'flatted';
import isPrimitive from 'is-primitive';
import toWholeNumber from 'Global/Assets/toWholeNumber';

/**
 * Prepare a message as a string.
 *
 * @param {*} value - The value to be stringified.
 * @param {number} space - Indicates the number of space characters to use as white space.
 * @returns {string} The message as a string.
 */
export default function messageStringifier(value, space = 0) {
  if (isPrimitive(value)) {
    return String(value);
  }

  const spc = toWholeNumber(space);

  try {
    return JSON.stringify(value, null, spc);
  } catch (error) {
    return flatted.stringify(value, null, spc);
  }
}
