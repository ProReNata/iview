// using with vue-i18n in CDN
import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

export default function(lang) {
  if (!isServer) {
    if (typeof iview !== 'undefined') {
      if (!('langs' in iview)) {
        iview.langs = {};
      }

      iview.langs[lang.i.locale] = lang;
    }
  }
}
