import isValidDate from 'Global/Assets/isValidDate';
import toDateObject from 'Global/Assets/toDateObject';
import parseTimeString from 'Global/Assets/parseTimeString';

export default function mergeDateHour(date, hour) {
  const d = toDateObject(date);

  if (!isValidDate(d)) {
    return d;
  }

  const [h, m] = parseTimeString(hour);

  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d;
}
