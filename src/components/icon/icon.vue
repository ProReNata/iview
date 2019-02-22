<template>
  <font-awesome-icon
    :icon="icon"
    :fixed-width="fw"
    v-bind="$attrs"
    v-on="$listeners"
  ></font-awesome-icon>
</template>

<script>
import Vue from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/pro-solid-svg-icons';
import {far} from '@fortawesome/pro-regular-svg-icons';
import {fal} from '@fortawesome/pro-light-svg-icons';
// noinspection ES6CheckImport
import {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText} from '@fortawesome/vue-fontawesome';
import findKey from 'lodash/findKey';
import memoize from 'lodash/memoize';
import isOneOf from 'Global/Assets/isOneOf';

library.add(fas);
library.add(far);
library.add(fal);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

const SOLID = 'solid';
const REGULAR = 'regular';
const LIGHT = 'light';
const ICON_WEIGHTS = Object.freeze([SOLID, REGULAR, LIGHT]);
export function isOneOfIconWeights(value) {
  return isOneOf(value, ICON_WEIGHTS);
}

const FAS = 'fas';
const FAR = 'far';
const FAL = 'fal';
const ICON_LIBRARIES = Object.freeze([fas, far, fal]);
export function isOneOfIconNames(value) {
  const isIconName = function isIconName({iconName}) {
    return iconName === value;
  };

  return ICON_LIBRARIES.some(function libraryIteratee(iconLibrary) {
    return Boolean(findKey(iconLibrary, isIconName));
  });
}

const WEIGHT_MAP = Object.create(null, {
  [SOLID]: {
    enumerable: true,
    value: FAS,
  },
  [REGULAR]: {
    enumerable: true,
    value: FAR,
  },
  [LIGHT]: {
    enumerable: true,
    value: FAL,
  },
});

const vueObject = {
  name: 'Icon',

  props: {
    fw: {
      default: false,
      type: Boolean,
    },
    type: {
      required: true,
      type: String,
      validator: isOneOfIconNames,
    },
    weight: {
      default: REGULAR,
      type: String,
      validator: isOneOfIconWeights,
    },
  },

  computed: {
    icon() {
      const weightClass = WEIGHT_MAP[this.weight] || WEIGHT_MAP[REGULAR];
      const definition = [weightClass];

      if (this.type) {
        definition.push(this.type);
      }

      return definition;
    },
  },
};

const el = document.createElement('div');

export const getIconAsHTML = memoize(function createHTML(props = {}) {
  return new Vue({
    ...vueObject,

    propsData: {
      ...props,
    },
  }).$mount(el).$el.outerHTML;
});

export default vueObject;
</script>
