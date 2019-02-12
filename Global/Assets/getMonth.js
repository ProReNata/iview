import oneOf from 'Global/Assets/oneOf';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';

const defaultValue = 'long';
const formats = Object.freeze(['narrow', 'short', defaultValue]);

export default function getMonth(date, locale, format) {
  return dateTimeFormat(date, locale, {month: oneOf(format, formats, defaultValue)});
}
