/**
 * @file Utility to extract queryString data to a object.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/parseQueryString
 */

import deepFreeze from 'Global/Assets/deepFreeze';

const partsIteratee = function _partsIteratee(obj, keyValue) {
  const [key, value] = keyValue.split('=');

  return {
    ...obj,
    [key]: value,
  };
};

/**
 * @param {string} str - The query string with data.
 * @returns {!Object} - A Object with the data from the query string.
 */
export default function parseQueryString(str) {
  return deepFreeze(typeof str === 'string' ? str.split('&').reduce(partsIteratee, {}) : {});
}
