<template>
  <li 
    :class="classes" 
    :style="itemStyle" 
    @click.stop="handleClick"
  >
    <slot></slot>
  </li>
</template>
<script>
import Emitter from '../../mixins/emitter';
import {findComponentUpward} from '../../utils/assist';
import mixin from './mixin';

const prefixCls = 'ivu-menu';

export default {
  name: 'MenuItem',
  mixins: [Emitter, mixin],
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.active,
          [`${prefixCls}-item-selected`]: this.active,
          [`${prefixCls}-item-disabled`]: this.disabled,
        },
      ];
    },
    itemStyle() {
      return this.hasParentSubmenu && this.mode !== 'horizontal'
        ? {
            paddingLeft: `${43 + (this.parentSubmenuNum - 1) * 24}px`,
          }
        : {};
    },
  },
  mounted() {
    this.$on('on-update-active-name', (name) => {
      if (this.name === name) {
        this.active = true;
        this.dispatch('Submenu', 'on-update-active-name', name);
      } else {
        this.active = false;
      }
    });
  },
  methods: {
    handleClick() {
      if (this.disabled) {
        return;
      }

      const parent = findComponentUpward(this, 'Submenu');

      if (parent) {
        this.dispatch('Submenu', 'on-menu-item-select', this.name);
      } else {
        this.dispatch('Menu', 'on-menu-item-select', this.name);
      }
    },
  },
};
</script>
