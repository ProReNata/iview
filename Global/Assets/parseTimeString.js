import inRange from 'lodash/inRange';

const MIN_PARTS = 2;
const HUMAN_PARTS = 3;
const MAX_PARTS = 4;

const createInvalidSplit = function _createInvalidSplit() {
  return Array(MAX_PARTS).fill(NaN);
};

const partsIteratee = function _partsIteratee(number, part, index) {
  number[index] = Number(part);

  return number;
};

export default function parseTimeString(value) {
  if (typeof value !== 'string') {
    return createInvalidSplit();
  }

  const parts = value.split(':');

  if (!inRange(parts.length, MIN_PARTS, MAX_PARTS)) {
    return createInvalidSplit();
  }

  if (parts.length === HUMAN_PARTS) {
    parts.push(...parts.pop().split('.'));
  }

  if (parts.length > MAX_PARTS) {
    return createInvalidSplit();
  }

  return parts.reduce(partsIteratee, Array(MAX_PARTS).fill(0));
}
