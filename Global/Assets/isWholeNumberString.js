import isIntegerString from 'Global/Assets/isIntegerString';

export default function isWholeNumberString(value) {
  return isIntegerString(value) && !value.startsWith('-');
}
