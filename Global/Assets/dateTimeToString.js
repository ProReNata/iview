import dateToString from 'Global/Assets/dateToString';
import getTimeString from 'Global/Assets/getTimeString';
import isValidDate from 'Global/Assets/isValidDate';

export default function dateTimeToString(d, options) {
  if (!isValidDate(d)) {
    return 'Invalid Date';
  }

  const opts = {separator: 'T', type: 'long', ...Object(options)};

  return dateToString(d) + opts.separator + getTimeString(d, opts.type);
}
