import toDateObject from 'Global/Assets/toDateObject';
import isValidDate from 'Global/Assets/isValidDate';
import isBCP47 from 'Global/Assets/isBCP47';
import getContentLanguage from 'Global/Assets/getContentLanguage';

export default function dateTimeFormat(date, locale, options) {
  const d = toDateObject(date);

  if (!isValidDate(d)) {
    return 'Invalid Date';
  }

  const loc = isBCP47(locale) ? locale : getContentLanguage();

  return new Intl.DateTimeFormat(loc, Object(options)).format(d);
}
