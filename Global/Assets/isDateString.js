import inRange from 'lodash/inRange';
import isWholeNumber from 'Global/Assets/isWholeNumber';
import daysInGregorianMonth from 'Global/Assets/daysInGregorianMonth';
import parseDateString from 'Global/Assets/parseDateString';

export default function isDateString(value) {
  const parts = parseDateString(value);

  if (!Array.isArray(parts) || parts.length !== 3 || !parts.every(isWholeNumber)) {
    return false;
  }

  const [year, month, day] = parts;

  if (!inRange(year, 1582, 10000) || !inRange(month, 1, 13) || !inRange(day, 1, 32)) {
    return false;
  }

  // Epoch is 1582-10-15
  if (year === 1582 && (month < 10 || day < 15)) {
    return false;
  }

  return daysInGregorianMonth(year, month) >= day;
}
