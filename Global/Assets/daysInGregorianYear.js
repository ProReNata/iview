import isGregorianLeapYear from 'Global/Assets/isGregorianLeapYear';

export default function daysInGregorianYear(year) {
  return isGregorianLeapYear(year) ? 366 : 365;
}
