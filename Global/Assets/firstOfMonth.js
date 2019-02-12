import toDateObject from 'Global/Assets/toDateObject';
import isValidDate from 'Global/Assets/isValidDate';

export default function firstOfMonth(date) {
  const clone = toDateObject(date);

  if (!isValidDate(clone)) {
    return clone;
  }

  clone.setDate(1);

  return clone;
}
