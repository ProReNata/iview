import deepFreeze from 'Global/Assets/deepFreeze';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';

const options = deepFreeze({day: 'numeric', month: 'short', year: 'numeric'});

export default function formatShortDate(date, locale) {
  return dateTimeFormat(date, locale, options);
}
