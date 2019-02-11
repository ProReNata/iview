import Vue from 'vue';
import deepmerge from 'deepmerge';
import isNil from 'lodash/isNil';
import Format from './format';
import defaultLang from './lang/zh-CN';

/* eslint-disable-next-line babel/new-cap */
const format = Format(Vue);
let lang = defaultLang;
let merged = false;
let i18nHandler = function _i18nHandler(...args) {
  /* eslint-disable-next-line babel/no-invalid-this */
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;

  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(Vue.config.lang, deepmerge(lang, Vue.locale(Vue.config.lang) || {}, {clone: true}));
    }

    /* eslint-disable-next-line babel/no-invalid-this */
    return vuei18n.apply(this, args);
  }

  return undefined;
};

export const t = function _t(...args) {
  const [path, options] = args;
  /* eslint-disable-next-line babel/no-invalid-this */
  let value = i18nHandler.apply(this, args);

  if (!isNil(value)) {
    return value;
  }

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i += 1) {
    const property = array[i];
    value = current[property];

    if (i === j - 1) {
      return format(value, options);
    }

    if (!value) {
      return '';
    }

    current = value;
  }

  return '';
};

export const use = function _use(l) {
  lang = l || lang;
};

export const i18n = function _i18n(fn) {
  i18nHandler = fn || i18nHandler;
};
