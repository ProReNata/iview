import isPopulatedString from 'Global/Assets/isPopulatedString';
import not from 'Global/Assets/not';

const SPACES_RX = /\s/gim;

export default function isValidHTML5Id(value) {
  return isPopulatedString(value) && not(SPACES_RX.test(value));
}
