/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
import isNil from 'lodash/isNil';
import has from 'lodash/has';
import not from 'Global/Assets/not';

const EMPTY_STRING = '';
const OPEN_BRACE = '{';
const CLOSE_BRACE = '}';
const RE_NARGS = new RegExp(`(%|)${OPEN_BRACE}(\\w+)${CLOSE_BRACE}`, 'g');

export default function formatTemplate() {
  /**
   * Template.
   *
   * @param {string} string - The string to format.
   * @param {Array} templateArgs - The template arguments.
   * @returns {string} The formatted string.
   */
  return function template(string, ...templateArgs) {
    const [first] = templateArgs;
    let args = templateArgs;

    if (args.length === 1 && typeof first === 'object') {
      args = first;
    }

    if (not(args) || not(args.hasOwnProperty)) {
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      if (string[index - 1] === OPEN_BRACE && string[index + match.length] === CLOSE_BRACE) {
        return i;
      }

      const result = has(args, i) ? args[i] : null;

      return isNil(result) ? EMPTY_STRING : result;
    });
  };
}
