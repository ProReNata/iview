import deepFreeze from 'Global/Assets/deepFreeze';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';

const options = deepFreeze({weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});

export default function formatLongDateWeekDay(date, locale) {
  return dateTimeFormat(date, locale, options);
}
