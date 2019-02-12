import isDateString from 'Global/Assets/isDateString';
import isTimeString from 'Global/Assets/isTimeString';

export default function isDateTimeString(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const parts = value.split(' ');

  if (parts.length !== 2) {
    return false;
  }

  const [date, time] = parts;

  return isDateString(date) && isTimeString(time);
}
