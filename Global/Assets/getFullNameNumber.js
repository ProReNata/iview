import get from 'lodash/get';
import getFullName from 'Global/Assets/getFullName';

export default function getFullNameNumber(userObject) {
  return `${getFullName(userObject)} (${get(userObject, 'personal_id')})`;
}
