import isValidDate from 'Global/Assets/isValidDate';
import toDateObject from 'Global/Assets/toDateObject';

export default function endOfDay(date) {
  const clone = toDateObject(date);

  if (!isValidDate(clone)) {
    return clone;
  }

  clone.setHours(23, 59, 59, 999);

  return clone;
}
