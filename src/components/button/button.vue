<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    v-on="$listeners"
  >
    <icon
      v-if="loading"
      type="circle-notch"
      :spin="true"
      :fw="true"
    >
    </icon>
    <icon
      v-if="showIcon"
      :type="icon"
      :weight="iconWeight"
      :fw="true"
    >
    </icon>
    <span
      v-if="showSlot"
      ref="slot"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Icon, {isOneOfIconNames, isOneOfIconWeights} from 'Components/icon';
import isOneOf from 'Global/Assets/isOneOf';
import not from 'Global/Assets/not';

const prefixCls = 'byx-btn';
const DEFAULT = 'default';
const BUTTON = 'button';
const SUBMIT = 'submit';
const RESET = 'RESET';
const HTML_TYPES = Object.freeze([BUTTON, SUBMIT, RESET]);
const SMALL = 'small';
const LARGE = 'large';
const SIZES = Object.freeze([SMALL, LARGE, DEFAULT]);
export function isOneOfSizes(value) {
  return isOneOf(value, SIZES);
}

const PRIMARY = 'primary';
const TEXT = 'text';
const INFO = 'info';
const SUCCESS = 'success';
const WARNING = 'warning';
const ERROR = 'error';
const TYPES = Object.freeze([PRIMARY, TEXT, INFO, SUCCESS, WARNING, ERROR, DEFAULT]);

export default {
  name: 'Button',

  components: {Icon},

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    htmlType: {
      default: BUTTON,
      validator(value) {
        return isOneOf(value, HTML_TYPES);
      },
    },
    icon: {
      default: undefined,
      type: String,
      validator: isOneOfIconNames,
    },
    iconWeight: {
      default: undefined,
      type: String,
      validator: isOneOfIconWeights,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    long: {
      default: false,
      type: Boolean,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, SIZES);
      },
    },
    type: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, TYPES);
      },
    },
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: this.type,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.size}`]: this.size,
          [`${prefixCls}-loading`]: this.loading,
          [`${prefixCls}-icon-only`]: not(this.showSlot) && (this.icon || this.loading),
        },
      ];
    },
    showIcon() {
      return Boolean(this.icon) && not(this.loading);
    },
    showSlot() {
      return Boolean(this.$slots.default);
    },
  },
};
</script>
