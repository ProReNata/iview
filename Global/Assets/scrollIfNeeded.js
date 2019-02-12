/**
 * @file Utility to scroll an element into view of a container, only if needed.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/scrollIfNeeded
 */

/**
 * This method scrolls an element into view of a container, only if needed.
 *
 * @param {Node} element - The element to scroll to.
 * @param {*} container - The container of the element.
 */
export default function scrollIfNeeded(element, container) {
  if (!element || !container) {
    return;
  }

  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop;
  } else {
    const offsetBottom = element.offsetTop + element.offsetHeight;
    const scrollBottom = container.scrollTop + container.offsetHeight;

    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight;
    }
  }
}
