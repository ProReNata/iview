const INTEGER_RX = /^(?:-)?\d+$/;

export default function isIntegerString(value) {
  return typeof value === 'string' && INTEGER_RX.test(value);
}
