<template>
  <span
    v-if="dot"
    ref="badge"
    :class="classes"
  >
    <slot></slot>
    <sup
      v-show="badge"
      :class="dotClasses"
    >
    </sup>
  </span>
  <span
    v-else
    ref="badge"
    :class="classes"
  >
    <slot></slot>
    <sup
      v-if="count"
      v-show="badge"
      :class="countClasses"
    >
      {{ finalCount }}
    </sup>
  </span>
</template>
<script>
const prefixCls = 'ivu-badge';

export default {
  name: 'Badge',
  props: {
    count: [Number, String],
    dot: {
      type: Boolean,
      default: false,
    },
    overflowCount: {
      type: [Number, String],
      default: 99,
    },
    className: String,
  },
  computed: {
    classes() {
      return `${prefixCls}`;
    },
    dotClasses() {
      return `${prefixCls}-dot`;
    },
    countClasses() {
      return [
        `${prefixCls}-count`,
        {
          [`${this.className}`]: !!this.className,
          [`${prefixCls}-count-alone`]: this.alone,
        },
      ];
    },
    finalCount() {
      return parseInt(this.count, 10) >= parseInt(this.overflowCount, 10) ? `${this.overflowCount}+` : this.count;
    },
    badge() {
      let status = false;

      if (this.count) {
        status = !(parseInt(this.count, 10) === 0);
      }

      if (this.dot) {
        status = true;

        if (this.count !== null) {
          if (parseInt(this.count, 10) === 0) {
            status = false;
          }
        }
      }

      return status;
    },
    alone() {
      return this.$slots.default === undefined;
    },
  },
};
</script>
