/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
import isNil from 'lodash/isNil';
import head from 'lodash/head';

const RE_NARGS = /(%|){([0-9a-zA-Z_]+)}/g;

export default function() {
  // const { hasOwn } = Vue.util;
  function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  /**
   * template
   *
   * @param {String} string
   * @param {Array} templateArgs
   * @return {String}
   */

  function template(string, ...templateArgs) {
    let args = templateArgs;

    if (args.length === 1 && typeof args[0] === 'object') {
      args = head(args);
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      }

      const result = hasOwn(args, i) ? args[i] : null;

      if (isNil(result)) {
        return '';
      }

      return result;
    });
  }

  return template;
}
