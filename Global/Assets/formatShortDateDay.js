import deepFreeze from 'Global/Assets/deepFreeze';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';

const options = deepFreeze({day: 'numeric', month: 'numeric', weekday: 'short'});

export default function formatShortDateDay(date, locale) {
  return dateTimeFormat(date, locale, options);
}
