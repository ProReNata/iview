<template>
  <font-awesome-icon
    :icon="icon"
    :fixed-width="fw"
    v-bind="$attrs"
    v-on="$listeners"
  ></font-awesome-icon>
</template>

<script>
import findKey from 'lodash/findKey';
import {fas} from '@fortawesome/pro-solid-svg-icons';
import {far} from '@fortawesome/pro-regular-svg-icons';
import {fal} from '@fortawesome/pro-light-svg-icons';
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
const ICON_LIBRARIES = Object.freeze([fas, far, fal]);
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

export default {
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
</script>
