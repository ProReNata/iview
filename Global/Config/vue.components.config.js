import Vue from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/pro-solid-svg-icons';
import {far} from '@fortawesome/pro-regular-svg-icons';
import {fal} from '@fortawesome/pro-light-svg-icons';
// noinspection ES6CheckImport
import {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText} from '@fortawesome/vue-fontawesome';

library.add(fas);
library.add(far);
library.add(fal);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);
