import oneOf from 'Global/Assets/oneOf';

export default function isOneOf(comparate, comparates) {
  return Boolean(oneOf(comparate, comparates));
}
