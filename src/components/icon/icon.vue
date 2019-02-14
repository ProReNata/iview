<template>
  <font-awesome-icon
    :icon="icon"
    :fixed-width="fw"
    v-bind="$attrs"
    v-on="$listeners"
  ></font-awesome-icon>
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';

const SOLID = 'solid';
const REGULAR = 'regular';
const LIGHT = 'light';
const ivuWeights = Object.freeze([SOLID, REGULAR, LIGHT]);
const FAS = 'fas';
const FAR = 'far';
const FAL = 'fal';
const weightMap = Object.create(null, {
  [SOLID]: {
    value: FAS,
  },
  [REGULAR]: {
    value: FAR,
  },
  [LIGHT]: {
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
    },
    weight: {
      default: REGULAR,
      type: String,
      validator(value) {
        return isOneOf(value, ivuWeights);
      },
    },
  },

  computed: {
    icon() {
      const weightClass = weightMap[this.weight] || weightMap[REGULAR];
      const definition = [weightClass];

      if (this.type) {
        definition.push(this.type);
      }

      return definition;
    },
  },
};
</script>
