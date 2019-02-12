import get from 'lodash/get';
import isBCP47 from 'Global/Assets/isBCP47';

export default function getContentLanguage() {
  const {locale} = new Intl.DateTimeFormat().resolvedOptions();
  const fallback = isBCP47(locale) ? locale : 'en';

  if (typeof window === 'undefined') {
    return fallback;
  }

  const lang = get(window, 'document.documentElement.lang');

  return isBCP47(lang) ? lang : fallback;
}
