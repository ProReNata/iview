import get from 'lodash/get';

export default function getFieldManifest(fields, name) {
  return Array.isArray(fields) && typeof name === 'string'
    ? fields.find((field) => get(field, 'config.name') === name)
    : undefined;
}
