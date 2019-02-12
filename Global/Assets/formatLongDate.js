import deepFreeze from 'Global/Assets/deepFreeze';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';

const options = deepFreeze({day: 'numeric', month: 'long', year: 'numeric'});

export default function formatLongDatedate(date, locale) {
  return dateTimeFormat(date, locale, options);
}
