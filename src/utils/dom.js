import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

/* istanbul ignore next */
export const on = (function iife() {
  if (!isServer && document.addEventListener) {
    return function addEvent(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }

  return function addEvent(element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
})();

/* istanbul ignore next */
export const off = (function iife() {
  if (!isServer && document.removeEventListener) {
    return function removeEvent(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }

  return function removeEvent(element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
})();
