export default function createPush(target, property, value) {
  const object = Object(target);

  if (!Array.isArray(object[property])) {
    object[property] = [];
  }

  object[property].push(value);

  return object;
}
