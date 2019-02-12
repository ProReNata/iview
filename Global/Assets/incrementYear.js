import isValidDate from 'Global/Assets/isValidDate';
import toInteger from 'lodash/toInteger';
import toDateObject from 'Global/Assets/toDateObject';

export default function incrementYear(date, increment = 1) {
  const next = toDateObject(date);

  if (!isValidDate(next)) {
    return next;
  }

  next.setFullYear(next.getFullYear() + toInteger(increment));

  return next;
}
