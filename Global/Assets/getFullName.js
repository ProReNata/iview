import get from 'lodash/get';

export default function getFullName(userObject) {
  return `${get(userObject, 'first_name')} ${get(userObject, 'last_name')}`;
}
