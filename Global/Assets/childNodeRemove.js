/**
 * @file Utility that removes the object from the tree it belongs to.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/childNodeRemove
 */

import isDOMNode from 'Global/Assets/isDOMNode';

/**
 * The ChildNode interface contains methods that are particular to Node objects that can have a parent.
 *
 * @external ChildNode
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode ChildNode}
 */

/**
 * Remove the object from the tree it belongs to.
 *
 * @param {Node} ChildNode - The child node to be removed from the DOM.
 * @returns {boolean} True if the child node was removed; otherwise false.
 */
export default function childNodeRemove(ChildNode) {
  if (isDOMNode(ChildNode)) {
    const {parentElement} = ChildNode;

    try {
      if (parentElement && parentElement.contains(ChildNode)) {
        parentElement.removeChild(ChildNode);

        return true;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  return false;
}
