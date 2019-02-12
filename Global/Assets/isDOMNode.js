/**
 * @file Utility to test if a `value` is a DOM Node.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/isDOMNode
 */

let documentInheritsNode = false;
let element;
let hasChildNodes;

if (typeof document !== 'undefined') {
  try {
    element = document.createElement('div');
    hasChildNodes = Function.call.bind(document.hasChildNodes);
    documentInheritsNode = typeof hasChildNodes(element) === 'boolean';
  } catch (ignore) {
    hasChildNodes = null;
    documentInheritsNode = false;
  }
}

let tryAppendChild;

if (element && !documentInheritsNode) {
  hasChildNodes = Function.call.bind(element.hasChildNodes);
  const cloneNode = Function.call.bind(element.cloneNode);
  const appendChild = Function.call.bind(element.appendChild);
  tryAppendChild = function _tryAppendChild(value) {
    return appendChild(cloneNode(element, false), value);
  };
}

/**
 * This method tests if `value` is a DOM Node.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} True if a DOM Node, otherwise false.
 */
export default function isDOMNode(value) {
  if (hasChildNodes && value && typeof value.nodeType === 'number') {
    if (value === document) {
      return true;
    }

    try {
      return typeof hasChildNodes(value) === 'boolean';
    } catch (ignore) {
      /* ignore */
    }

    if (!documentInheritsNode) {
      try {
        return Boolean(tryAppendChild(value));
      } catch (ignore) {
        /* ignore */
      }
    }
  }

  return false;
}
