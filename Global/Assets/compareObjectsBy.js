import isObjectLike from 'lodash/isObjectLike';

export default function compareObjectBy(property) {
  return function _comparator(a, b) {
    return isObjectLike(a) && isObjectLike(b) && Object.is(a[property], b[property]);
  };
}
