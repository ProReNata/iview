import toDateObject from 'Global/Assets/toDateObject';
import isValidDate from 'Global/Assets/isValidDate';
import {MINUTES_IN_HOUR, SECONDS_IN_MINUTE} from 'Global/Assets/time';

export default function getSecondsInDay(date) {
  const dt = toDateObject(date);

  if (!isValidDate(dt)) {
    return NaN;
  }

  const minutes = dt.getMinutes() + MINUTES_IN_HOUR * dt.getHours();

  return SECONDS_IN_MINUTE * minutes + dt.getSeconds();
}
