export default function findOrLast(arrayLike, predicate, ...defaultValue) {
  const array = Array.isArray(arrayLike) ? arrayLike : Array.from(arrayLike);
  let currentItem;
  const arrayPredicate = function _arrayPredicate(item, index) {
    currentItem = item;

    return predicate(item, index, array);
  };

  const isFound = array.some(arrayPredicate);

  if (isFound || !defaultValue.length) {
    return currentItem;
  }

  return defaultValue[0];
}
