<template>
  <li :class="itemClasses">
    <div :class="tailClasses">
    </div>
    <div
      ref="dot"
      :class="headClasses"
      :style="customColor"
    >
      <slot name="dot">
      </slot>
    </div>
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </li>
</template>
<script>
const prefixCls = 'ivu-timeline';

export default {
  name: 'TimelineItem',
  props: {
    color: {
      default: 'blue',
      type: String,
    },
  },
  data() {
    return {
      dot: false,
    };
  },
  computed: {
    contentClasses() {
      return `${prefixCls}-item-content`;
    },
    customColor() {
      let style = {};

      if (this.color) {
        if (!this.headColorShow) {
          style = {
            color: this.color,
            'border-color': this.color,
          };
        }
      }

      return style;
    },
    headClasses() {
      return [
        `${prefixCls}-item-head`,
        {
          [`${prefixCls}-item-head-custom`]: this.dot,
          [`${prefixCls}-item-head-${this.color}`]: this.headColorShow,
        },
      ];
    },
    headColorShow() {
      return this.color === 'blue' || this.color === 'red' || this.color === 'green';
    },
    itemClasses() {
      return `${prefixCls}-item`;
    },
    tailClasses() {
      return `${prefixCls}-item-tail`;
    },
  },
  mounted() {
    this.dot = !!this.$refs.dot.innerHTML.length;
  },
};
</script>
