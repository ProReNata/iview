// Thanks to: https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js
// Thanks to: https://github.com/calebroseland/vue-dom-portal
import not from 'Global/Assets/not';

const EMPTY_STRING = '';
const TRUE = 'true';
const V_TRANSFER_DOM = 'v-transfer-dom';

/**
 * Get target DOM Node.
 *
 * @param {(Node|string|boolean)} [node=document.body] - DOM Node, CSS selector, or Boolean.
 * @returns {Node} The target that the el will be appended to.
 */
function getTarget(node = document.body) {
  if (node === true) {
    return document.body;
  }

  return node instanceof window.Node ? node : document.querySelector(node);
}

export default {
  componentUpdated(el, {value}) {
    if (el.dataset && el.dataset.transfer !== TRUE) {
      return;
    }

    // need to make sure children are done updating (vs. `update`)
    if (not(el.__transferDomData)) {
      return;
    }

    // homes.get(el)
    const {hasMovedOut, home, parentNode} = el.__transferDomData; // recall where home is

    if (not(hasMovedOut) && value) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el);
      // append to target
      getTarget(value).appendChild(el);
      el.__transferDomData = {
        ...el.__transferDomData,
        ...{
          hasMovedOut: true,
          target: getTarget(value),
        },
      };
    } else if (hasMovedOut && value === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home);
      el.__transferDomData = {
        ...el.__transferDomData,
        ...{
          hasMovedOut: false,
          target: getTarget(value),
        },
      };
    } else if (value) {
      // already moved, going somewhere else
      getTarget(value).appendChild(el);
    }
  },

  inserted(el, {value} /* , vnode */) {
    if (el.dataset && el.dataset.transfer !== TRUE) {
      return;
    }

    el.className = el.className ? `${el.className} ${V_TRANSFER_DOM}` : V_TRANSFER_DOM;
    const {parentNode} = el;

    if (not(parentNode)) {
      return;
    }

    const home = document.createComment(EMPTY_STRING);
    let hasMovedOut = false;

    if (value !== false) {
      parentNode.replaceChild(home, el); // moving out, el is no longer in the document
      getTarget(value).appendChild(el); // moving into new place
      hasMovedOut = true;
    }

    if (not(el.__transferDomData)) {
      el.__transferDomData = {
        hasMovedOut,
        home,
        parentNode,
        target: getTarget(value),
      };
    }
  },

  unbind(el) {
    if (el.dataset && el.dataset.transfer !== TRUE) {
      return;
    }

    el.className = el.className.replace(V_TRANSFER_DOM, EMPTY_STRING);

    if (not(el.__transferDomData)) {
      return;
    }

    if (el.__transferDomData.hasMovedOut === true && el.__transferDomData.parentNode) {
      el.__transferDomData.parentNode.appendChild(el);
    }

    el.__transferDomData = null;
  },
};
