import isWholeNumberString from 'Global/Assets/isWholeNumberString';

export default function isCountingNumberString(value) {
  return isWholeNumberString(value) && !value.startsWith('0');
}
