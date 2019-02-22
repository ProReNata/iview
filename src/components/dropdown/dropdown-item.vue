<template>
  <li
    :class="classes"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script>
import {findComponentUpward} from 'Src/utils/assist';

const prefixCls = 'ivu-dropdown-item';

export default {
  name: 'DropdownItem',

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    divided: {
      default: false,
      type: Boolean,
    },
    name: {
      default: undefined,
      type: [String, Number],
    },
    selected: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected,
          [`${prefixCls}-divided`]: this.divided,
        },
      ];
    },
  },

  methods: {
    handleClick() {
      const $parent = findComponentUpward(this, 'Dropdown');
      const hasChildren = this.$parent && this.$parent.$options.name === 'Dropdown';

      if (this.disabled) {
        this.$nextTick(() => {
          $parent.currentVisible = true;
        });
      } else if (hasChildren) {
        this.$parent.$emit('on-haschild-click');
      } else if ($parent && $parent.$options.name === 'Dropdown') {
        $parent.$emit('on-hover-click');
      }

      $parent.$emit('on-click', this.name);
    },
  },
};
</script>
