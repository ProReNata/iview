import get from 'lodash/get';
import getFullName from 'Global/Assets/getFullName';

export default function getFullNameTitle(userObject) {
  return `${get(userObject, 'title')} ${getFullName(userObject)}`;
}
