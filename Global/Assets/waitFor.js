import clamp from 'lodash/clamp';
import assertIsFunction from 'Global/Assets/assertIsFunction';
import parseDecimal from 'Global/Assets/parseDecimal';

const DEFAULT_DELAY = 500;

/**
 * A timed wait: Test a predicate and if falsey then wait X ms and try again. If truthy the execute a callback and exit.
 *
 * @param {Array} args - The arguments array.
 * @param {Function} args.predicate - The function that tests a condition and returns truthy or falsey.
 * @param {Function} args.done - If the predicate is truthy then this function is executed and the function exits.
 * @param {number} [args.milliSeconds=500] - How long to wait before calling the predicate again.
 */
export default function waitFor(...args) {
  const [predicate, done, milliSeconds] = args;

  assertIsFunction(predicate);
  assertIsFunction(done);

  const ms = args.length < 3 ? DEFAULT_DELAY : clamp(parseDecimal(milliSeconds), Number.MAX_SAFE_INTEGER);

  const waiting = function _waiting() {
    if (predicate()) {
      done();
    } else {
      setTimeout(_waiting, ms);
    }
  };

  waiting();
}
