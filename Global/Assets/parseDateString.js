const HUMAN_PARTS = 3;

const createInvalidSplit = function createInvalidSplit() {
  return Array(HUMAN_PARTS).fill(NaN);
};

export default function parseDateString(value) {
  if (typeof value !== 'string') {
    return createInvalidSplit();
  }

  const parts = value.split('-');

  if (parts.length !== HUMAN_PARTS) {
    return createInvalidSplit();
  }

  return parts.map(Number);
}
