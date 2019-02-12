import isGregorianLeapYear from 'Global/Assets/isGregorianLeapYear';

export default function daysInGregorianMonth(year, month) {
  if (month === 2) {
    return isGregorianLeapYear(year) ? 29 : 28;
  }

  return 31 - (((month - 1) % 7) % 2);
}
