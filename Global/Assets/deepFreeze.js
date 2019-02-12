export default function deepFreeze(object) {
  const propNamesIteratee = function _propNamesIteratee(name) {
    const value = object[name];

    object[name] = value && typeof value === 'object' ? deepFreeze(value) : value;
  };

  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  propNames.forEach(propNamesIteratee);

  return Object.freeze(object);
}
