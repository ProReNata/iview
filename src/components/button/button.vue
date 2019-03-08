<template>
  <button
    :class="classes"
    :type="htmlType"
    :disabled="disabled"
    v-on="$listeners"
  >
    <icon
      v-if="showIcon"
      :type="icon"
      :weight="iconWeight"
      :fw="true"
    >
    </icon>

    <icon
      v-if="iconLeft"
      :type="iconLeft"
      :weight="iconLeftWeight"
      :fw="true"
    >
    </icon>

    <span
      v-if="showSlot"
      ref="slot"
    >
      <slot></slot>
    </span>

    <icon
      v-if="iconRight"
      :type="iconRight"
      :weight="iconRightWeight"
      :fw="true"
    >
    </icon>
  </button>
</template>

<script>
import Icon, {isOneOfIconNames, isOneOfIconWeights} from 'Components/icon';
import isOneOf from 'Global/Assets/isOneOf';
import not from 'Global/Assets/not';

const prefixCls = 'sr-btn';

const BUTTON = 'button';
const SUBMIT = 'submit';
const RESET = 'reset';
const HTML_TYPES = Object.freeze([BUTTON, SUBMIT, RESET]);

export default {
  name: 'SrButton',

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
    iconLeft: {
      default: undefined,
      type: String,
      validator: isOneOfIconNames,
    },
    iconRight: {
      default: undefined,
      type: String,
      validator: isOneOfIconNames,
    },
    iconLeftWeight: {
      default: undefined,
      type: String,
      validator: isOneOfIconWeights,
    },
    iconRightWeight: {
      default: undefined,
      type: String,
      validator: isOneOfIconWeights,
    },
    size: {
      default: 'regular',
      type: String,
      validator(value) {
        return ['large', 'regular', 'small', 'extra-small'].includes(value);
      },
    },
    variant: {
      default: 'secondary',
      type: String,
      validator(value) {
        return ['primary', 'secondary', 'danger'].includes(value);
      },
    },
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.variant}`]: this.variant,
          [`${prefixCls}-${this.size}`]: this.size,
          [`${prefixCls}-icon-only`]: not(this.showSlot) && (this.icon || this.loading),
          [`${prefixCls}-icon`]: this.showIcon || this.iconLeft,
          [`${prefixCls}-icon-right ${prefixCls}-icon`]: this.iconRight,
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
