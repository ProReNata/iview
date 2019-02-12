/**
 * Test if a value is a circular object.
 *
 * @param {*} value - The value to be tested.
 * @returns {boolean} True if a circular object.
 */
export default function isCircular(value) {
  try {
    JSON.stringify(value);

    return false;
  } catch (ignore) {
    return true;
  }
}
