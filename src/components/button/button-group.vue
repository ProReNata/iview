<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
import {oneOf} from '../../utils/assist';

const prefixCls = 'byx-btn-group';

export default {
  name: 'ButtonGroup',
  props: {
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
        },
      ];
    },
  },
};
</script>
