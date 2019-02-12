import deepFreeze from 'Global/Assets/deepFreeze';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';

const options = deepFreeze({day: 'numeric', month: 'short', weekday: 'short'});

export default function formatShortDateMonthDay(date, locale) {
  return dateTimeFormat(date, locale, options);
}
