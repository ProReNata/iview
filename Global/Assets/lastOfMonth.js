import toDateObject from 'Global/Assets/toDateObject';
import isValidDate from 'Global/Assets/isValidDate';
import incrementMonth from 'Global/Assets/incrementMonth';

export default function lastOfMonth(date) {
  const clone = toDateObject(date);

  if (!isValidDate(clone)) {
    return clone;
  }

  const next = incrementMonth(clone);
  next.setDate(0);

  return next;
}
