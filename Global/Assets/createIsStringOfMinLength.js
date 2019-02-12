import clamp from 'lodash/clamp';
import toInteger from 'lodash/toInteger';

export default function createIsStringOfMinLength(min) {
  const minimum = clamp(toInteger(min), 0, Number.MAX_SAFE_INTEGER);

  return function isStringOfMinLength(value) {
    return typeof value === 'string' && value.trim().length >= minimum;
  };
}
