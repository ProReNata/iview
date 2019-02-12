import upperFirst from 'lodash/upperFirst';

export default function snakeToPascal(name) {
  return String(name)
    .split('_')
    .map(upperFirst)
    .join('');
}
