/**
 * @file Utility that creates a function that is restricted to being invoked once until rearmed.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/onceUntilRearmed
 */
import assertIsFunction from 'Global/Assets/assertIsFunction';

export default function onceUntilRearmed(fn) {
  assertIsFunction(fn);
  let called = false;

  const bound = function boundOnceUntilRearmed(...args) {
    if (called) {
      return undefined;
    }

    called = true;

    return fn(...args);
  };

  bound.rearm = function rearm() {
    called = false;
  };

  return bound;
}
