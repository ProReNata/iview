import isValidDate from 'Global/Assets/isValidDate';
import toDateObject from 'Global/Assets/toDateObject';

export default function startOfDay(date) {
  const clone = toDateObject(date);

  if (!isValidDate(clone)) {
    return clone;
  }

  clone.setHours(0, 0, 0, 0);

  return clone;
}
