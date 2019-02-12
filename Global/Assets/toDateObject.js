import isDateString from 'Global/Assets/isDateString';
import stringToDate from 'Global/Assets/stringToDate';

export default function toDateObject(date) {
  return isDateString(date) ? stringToDate(date) : new Date(date);
}
