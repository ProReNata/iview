/**
 * @file Utility to focus the first focusable element inside a given container.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/focusFirstFocusableElement
 */

import isDOMElement from 'Global/Assets/isDOMElement';

const ELEMENTS_RX = /button|input|select|textarea/;

export default function focusFirstFocusableElement(element, root) {
  if (!isDOMElement(element) || !isDOMElement(root)) {
    return true;
  }

  try {
    element.focus();
  } catch (err) {
    // Ignore.
  }

  const focused = document.activeElement;
  const isFocusable =
    focused.hasAttribute('tabindex') ||
    focused.hasAttribute('contenteditable') ||
    // IE11 fix so we don't get false positives with normal divs
    focused.tagName.toLowerCase().match(ELEMENTS_RX);

  if (focused === element && element !== root && isFocusable) {
    return true;
  }

  const candidates = [...element.children];
  const candidatesPreicate = function _candidatesPreicate(candidate) {
    return !!focusFirstFocusableElement(candidate, root);
  };

  return candidates.some(candidatesPreicate);
}
