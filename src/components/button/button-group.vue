<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import {isOneOfSizes} from './button.vue';

const prefixCls = 'sr-btn-group';

export default {
  name: 'ButtonGroup',

  props: {
    size: {
      default: undefined,
      type: String,
      validator: isOneOfSizes,
    },
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: this.size,
        },
      ];
    },
  },
};
</script>
