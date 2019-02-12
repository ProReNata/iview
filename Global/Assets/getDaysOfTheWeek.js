import range from 'lodash/range';
import oneOf from 'Global/Assets/oneOf';
import dateTimeFormat from 'Global/Assets/dateTimeFormat';
import {DAYS_IN_WEEK} from 'Global/Assets/time';

const defaultValue = 'long';
const formats = Object.freeze(['narrow', 'short', defaultValue]);
const offset = 5;
const getEpochDate = function _getEpochDate(dayValue) {
  return new Date(1970, 0, dayValue + offset);
};

const dates = Object.freeze(range(DAYS_IN_WEEK).map(getEpochDate));

export default function getDaysOfTheWeek(locale, format) {
  const dateIteratee = function _dateIteratee(date) {
    return dateTimeFormat(date, locale, {weekday: oneOf(format, formats, defaultValue)});
  };

  return dates.map(dateIteratee);
}
