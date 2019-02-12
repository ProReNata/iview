import isIntegerString from 'Global/Assets/isIntegerString';

export default function isSearchNumber(value) {
  const number = isIntegerString(value) ? Number(value) : value;

  return Number.isSafeInteger(number) && number >= -1;
}
