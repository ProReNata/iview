export default function snakeToLowerCase(name) {
  return String(name)
    .split('_')
    .join('');
}
