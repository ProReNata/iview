import 'Global/Config';
import * as locale from './locale';

const install = function _install(Vue, opts = {}) {
  if (install.installed) {
    return;
  }

  locale.use(opts.locale);
  locale.i18n(opts.i18n);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  i18n: locale.i18n,
  install,
  locale: locale.use,
  version: process.env.VERSION,
  lang: (code) => {
    const langObject = window['iview/locale'].default;

    if (code === langObject.i.locale) {
      locale.use(langObject);
    } else {
      logger.warn(`The ${code} language pack is not loaded.`);
    }
  },
};
