<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-btn-group';

export default {
  name: 'ButtonGroup',
  props: {
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
    vertical: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-vertical`]: this.vertical,
        },
      ];
    },
  },
};
</script>
