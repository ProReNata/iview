import deepFreeze from 'Global/Assets/deepFreeze';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';

const options = deepFreeze({month: 'short', year: 'numeric'});

export default function formatYearShortMonth(date, locale) {
  return dateTimeFormat(date, locale, options);
}
