<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <icon
      v-if="loading"
      type="circle-notch"
      :spin="true"
      :fw="true"
    >
    </icon>
    <icon
      v-if="icon && !loading"
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
import Icon from '../icon';
import {oneOf} from '../../utils/assist';

const prefixCls = 'byx-btn';

export default {
  name: 'Button',

  components: {Icon},

  props: {
    disabled: Boolean,
    htmlType: {
      default: 'button',
      validator(value) {
        return oneOf(value, ['button', 'submit', 'reset']);
      },
    },
    icon: {
      default: undefined,
      type: String,
    },
    iconWeight: {
      default: undefined,
      type: String,
    },
    loading: Boolean,
    long: {
      default: false,
      type: Boolean,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    type: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['primary', 'text', 'info', 'success', 'warning', 'error', 'default']);
      },
    },
  },

  data() {
    return {
      showSlot: true,
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading),
        },
      ];
    },
  },

  mounted() {
    this.showSlot = this.$slots.default !== undefined;
  },

  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
