<template>
  <div :class="itemClasses">
    <div
      :class="headerClasses"
      @click="toggle"
    >
      <icon type="arrow-right-b">
      </icon>
      <slot></slot>
    </div>
    <collapse-transition>
      <div
        v-show="isActive"
        :class="contentClasses"
      >
        <div :class="boxClasses">
          <slot name="content">
          </slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import Icon from 'Components/icon';
import CollapseTransition from 'Components/base/collapse-transition';

const prefixCls = 'ivu-collapse';

export default {
  name: 'Panel',

  components: {CollapseTransition, Icon},

  props: {
    name: {
      default: undefined,
      type: String,
    },
  },

  data() {
    return {
      index: 0, // use index for default when name is null
      isActive: false,
    };
  },

  computed: {
    boxClasses() {
      return `${prefixCls}-content-box`;
    },
    contentClasses() {
      return `${prefixCls}-content`;
    },
    headerClasses() {
      return `${prefixCls}-header`;
    },
    itemClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.isActive,
        },
      ];
    },
  },

  methods: {
    toggle() {
      this.$parent.toggle({
        isActive: this.isActive,
        name: this.name || this.index,
      });
    },
  },
};
</script>
