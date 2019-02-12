import range from 'lodash/range';
import clamp from 'lodash/clamp';
import pad from 'Global/Assets/pad';
import {MINUTES_IN_HOUR, HOURS_IN_DAY} from 'Global/Assets/time';

const divisionsPerHour = 4;
const divisionsPerHourList = Object.freeze(range(divisionsPerHour));
const divisionMinutes = MINUTES_IN_HOUR / divisionsPerHour;
const rangeIteratee = function _rangeIteratee(lines, hour) {
  const stepsIteratee = function _stepsIteratee(step) {
    return `${pad(hour)}:${pad(step * divisionMinutes)}`;
  };

  return [...lines, ...divisionsPerHourList.map(stepsIteratee)];
};

const calendarRangeIteratee = function _calendarRangeIteratee(limit) {
  return limit % MINUTES_IN_HOUR;
};

const getHours = function _getHours(value, defaultValue) {
  return Number.isNaN(value) ? defaultValue : clamp(value, 0, HOURS_IN_DAY);
};

export default function getTimeFrames(calendarRange) {
  const start = getHours(Math.floor(calendarRange[0] / MINUTES_IN_HOUR), 0);
  const end = getHours(Math.ceil(calendarRange[1] / MINUTES_IN_HOUR), HOURS_IN_DAY);
  let rows = range(start, end).reduce(rangeIteratee, []);

  // correct row entries if time limits do not start end att 00 minutes.
  const [startOffset, endOffset] = calendarRange.map(calendarRangeIteratee);

  if (startOffset) {
    const diff = Math.floor((startOffset / MINUTES_IN_HOUR) * divisionsPerHour);

    rows = rows.slice(diff);
  }

  if (endOffset) {
    const diff = divisionsPerHour - Math.ceil((endOffset / MINUTES_IN_HOUR) * divisionsPerHour);

    rows = rows.slice(0, rows.length - diff);
  }

  return rows;
}
