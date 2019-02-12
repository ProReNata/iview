import range from 'lodash/range';
import toDateObject from 'Global/Assets/toDateObject';
import isValidDate from 'Global/Assets/isValidDate';
import isOneOf from 'Global/Assets/isOneOf';
import incrementDay from 'Global/Assets/incrementDay';
import {DAYS_IN_WEEK} from 'Global/Assets/time';

const weekStartDays = Object.freeze(range(DAYS_IN_WEEK));
const createInvalidDate = function _createInvalidDate() {
  return new Date(NaN);
};

export default function getWeek(date, weekStartDay = 1) {
  const d = toDateObject(date);

  if (!isValidDate(d) || !isOneOf(weekStartDay, weekStartDays)) {
    return weekStartDays.map(createInvalidDate);
  }

  const day = d.getDay();
  const dayOfWeek = weekStartDay === 1 && day === 0 ? DAYS_IN_WEEK : day;
  const weekStartDaysIteratee = function _weekStartDaysIteratee(index) {
    return incrementDay(toDateObject(date), index + weekStartDay - dayOfWeek);
  };

  return weekStartDays.map(weekStartDaysIteratee);
}
