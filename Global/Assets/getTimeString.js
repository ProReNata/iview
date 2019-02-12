import isValidDate from 'Global/Assets/isValidDate';
import pad from 'Global/Assets/pad';
import toDateObject from 'Global/Assets/toDateObject';

export default function getTimeString(date, options) {
  const d = toDateObject(date);

  if (!isValidDate(d)) {
    return d;
  }

  const parts = [d.getHours(), d.getMinutes()];
  const opts = {type: 'short'};

  Object.assign(opts, options);

  if (opts.type === 'long') {
    parts.push(d.getSeconds());
  }

  return parts.map(pad).join(':');
}
