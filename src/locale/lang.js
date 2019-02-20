// using with vue-i18n in CDN
import Vue from 'vue';
import not from 'Global/Assets/not';

const isServer = Vue.prototype.$isServer;

export default function(lang) {
  if (not(isServer)) {
    if (typeof iview !== 'undefined') {
      if (not('langs' in iview)) {
        iview.langs = {};
      }

      iview.langs[lang.i.locale] = lang;
    }
  }
}
