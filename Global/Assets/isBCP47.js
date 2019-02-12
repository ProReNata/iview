import bcp47 from 'bcp-47';

export default function isBCP47(value) {
  if (typeof value !== 'string') {
    return false;
  }

  return Object.keys(bcp47.parse(value)).length > 0;
}
