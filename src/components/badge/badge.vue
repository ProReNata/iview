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
    className: String,
    count: [Number, String],
    dot: {
      default: false,
      type: Boolean,
    },
    overflowCount: {
      default: 99,
      type: [Number, String],
    },
  },
  computed: {
    alone() {
      return this.$slots.default === undefined;
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
    classes() {
      return `${prefixCls}`;
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
    dotClasses() {
      return `${prefixCls}-dot`;
    },
    finalCount() {
      return parseInt(this.count, 10) >= parseInt(this.overflowCount, 10) ? `${this.overflowCount}+` : this.count;
    },
  },
};
</script>
