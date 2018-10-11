<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <Icon 
      v-if="loading" 
      class="ivu-load-loop" 
      type="load-c"
    >
    </Icon>
    <Icon 
      v-if="icon && !loading" 
      :type="icon"
    >
    </Icon>
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

const prefixCls = 'ivu-btn';

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
    icon: String,
    loading: Boolean,
    long: {
      default: false,
      type: Boolean,
    },
    shape: {
      validator(value) {
        return oneOf(value, ['circle', 'circle-outline']);
      },
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    type: {
      validator(value) {
        return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default']);
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
          [`${prefixCls}-${this.shape}`]: !!this.shape,
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
