export default function isGregorianLeapYear(year) {
  if (!Number.isSafeInteger(year)) {
    return false;
  }

  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
