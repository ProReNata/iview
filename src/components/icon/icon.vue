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
import findKey from 'lodash/findKey';
import memoize from 'lodash/memoize';
import * as SolidFontAwesome from '@fortawesome/pro-solid-svg-icons';
import * as RegularFontAwesome from '@fortawesome/pro-regular-svg-icons';
import * as LightFontAwesome from '@fortawesome/pro-light-svg-icons';
import isOneOf from 'Global/Assets/isOneOf';

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
const ICON_LIBRARIES = Object.freeze([SolidFontAwesome.fas, RegularFontAwesome.far, LightFontAwesome.fal]);
export function isOneOfIconNames(value) {
  const isIconName = function isIconName({iconName}) {
    return iconName === value;
  };

  return ICON_LIBRARIES.some(function libraryIteratee(library) {
    return Boolean(findKey(library, isIconName));
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
const createHTML = function createHTML(props = {}) {
  return new Vue({
    ...vueObject,

    propsData: {
      ...props,
    },
  }).$mount(el).$el.outerHTML;
};

export const getIconAsHTML = memoize(createHTML);

export default vueObject;
</script>
