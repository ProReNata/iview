import Vue from 'vue';
import deepmerge from 'deepmerge';
import isNil from 'lodash/isNil';
import not from 'Global/Assets/not';
import formatTemplate from './format';
import defaultLang from './lang/en-US';

const EMPTY_STRING = '';
const PERIOD = '.';

const format = formatTemplate(Vue);
let lang = defaultLang;
let merged = false;
let i18nHandler = function _i18nHandler(...args) {
  /* eslint-disable-next-line babel/no-invalid-this */
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;

  if (typeof vuei18n === 'function' && Boolean(Vue.locale)) {
    if (not(merged)) {
      merged = true;
      Vue.locale(Vue.config.lang, deepmerge(lang, Vue.locale(Vue.config.lang) || {}, {clone: true}));
    }

    /* eslint-disable-next-line babel/no-invalid-this */
    return vuei18n.apply(this, args);
  }

  return undefined;
};

export function t(...args) {
  const [path, options] = args;
  /* eslint-disable-next-line babel/no-invalid-this */
  let value = i18nHandler.apply(this, args);

  if (not(isNil(value))) {
    return value;
  }

  const array = path.split(PERIOD);
  let current = lang;

  for (let i = 0, j = array.length; i < j; i += 1) {
    const property = array[i];
    value = current[property];

    if (i === j - 1) {
      return format(value, options);
    }

    if (not(value)) {
      return EMPTY_STRING;
    }

    current = value;
  }

  return EMPTY_STRING;
}

export function use(l) {
  lang = l || lang;
}

export function i18n(fn) {
  i18nHandler = fn || i18nHandler;
}
