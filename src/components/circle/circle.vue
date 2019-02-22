<template>
  <div
    :style="circleSize"
    :class="wrapClasses"
  >
    <svg viewBox="0 0 100 100">
      <path
        :d="pathString"
        :stroke="trailColor"
        :stroke-width="trailWidth"
        :fill-opacity="0"
      >
      </path>
      <path
        :d="pathString"
        :stroke-linecap="strokeLinecap"
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        fill-opacity="0"
        :style="pathStyle"
      >
      </path>
    </svg>
    <div :class="innerClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';

const prefixCls = 'ivu-chart-circle';

export default {
  name: 'ICircle',

  props: {
    percent: {
      default: 0,
      type: Number,
    },
    size: {
      default: 120,
      type: Number,
    },
    strokeColor: {
      default: '#2db7f5',
      type: String,
    },
    strokeLinecap: {
      default: 'round',
      type: String,
      validator(value) {
        return isOneOf(value, ['square', 'round']);
      },
    },
    strokeWidth: {
      default: 6,
      type: Number,
    },
    trailColor: {
      default: '#eaeef2',
      type: String,
    },
    trailWidth: {
      default: 5,
      type: Number,
    },
  },

  computed: {
    circleSize() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
      };
    },
    innerClasses() {
      return `${prefixCls}-inner`;
    },
    len() {
      return Math.PI * 2 * this.radius;
    },
    pathString() {
      return `M 50,50 m 0,-${this.radius}
                a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
                a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`;
    },
    pathStyle() {
      return {
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'stroke-dashoffset': `${((100 - this.percent) / 100) * this.len}px`,
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
      };
    },
    radius() {
      return 50 - this.strokeWidth / 2;
    },
    wrapClasses() {
      return `${prefixCls}`;
    },
  },
};
</script>
