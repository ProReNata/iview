import isValidDate from 'Global/Assets/isValidDate';
import toInteger from 'lodash/toInteger';
import toDateObject from 'Global/Assets/toDateObject';

export default function incrementDay(date, increment = 1) {
  const next = toDateObject(date);

  if (!isValidDate(next)) {
    return next;
  }

  next.setDate(next.getDate() + toInteger(increment));

  return next;
}