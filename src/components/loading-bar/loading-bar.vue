<template>
  <transition name="fade">
    <div
      v-show="show"
      :class="classes"
      :style="outerStyles"
    >
      <div
        :class="innerClasses"
        :style="styles"
      >
      </div>
    </div>
  </transition>
</template>

<script>
const prefixCls = 'ivu-loading-bar';

export default {
  props: {
    color: {
      default: 'primary',
      type: String,
    },
    failedColor: {
      default: 'error',
      type: String,
    },
    height: {
      default: 2,
      type: Number,
    },
  },

  data() {
    return {
      percent: 0,
      show: false,
      status: 'success',
    };
  },

  computed: {
    classes() {
      return `${prefixCls}`;
    },
    innerClasses() {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-color-primary`]: this.color === 'primary' && this.status === 'success',
          [`${prefixCls}-inner-failed-color-error`]: this.failedColor === 'error' && this.status === 'error',
        },
      ];
    },
    outerStyles() {
      return {
        height: `${this.height}px`,
      };
    },
    styles() {
      const style = {
        height: `${this.height}px`,
        width: `${this.percent}%`,
      };

      if (this.color !== 'primary' && this.status === 'success') {
        style.backgroundColor = this.color;
      }

      if (this.failedColor !== 'error' && this.status === 'error') {
        style.backgroundColor = this.failedColor;
      }

      return style;
    },
  },
};
</script>
