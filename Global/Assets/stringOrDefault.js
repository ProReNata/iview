export default function stringOrDefault(value, defaultValue) {
  return typeof value === 'string' ? value : defaultValue;
}
