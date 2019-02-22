<template>
  <div
    :class="[prefixCls + '-saturation-wrapper']"
    tabindex="0"
    @click="$el.focus()"
    @keydown="onKeydown"
  >
    <div
      ref="container"
      :style="bgColorStyle"
      :class="[prefixCls + '-saturation']"
      @mousedown="handleMouseDown"
    >
      <div :class="[prefixCls + '-saturation--white']">
      </div>
      <div :class="[prefixCls + '-saturation--black']">
      </div>
      <div
        :style="pointerStyle"
        :class="[prefixCls + '-saturation-pointer']"
      >
        <div :class="[prefixCls + '-saturation-circle']">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';
import HSAMixin from './hsaMixin';
import Prefixes from './prefixMixin';
import {clamp, getIncrement} from './utils';

export default {
  name: 'Saturation',

  mixins: [HSAMixin, Prefixes],

  data() {
    const normalStep = 0.01;

    return {
      down: -normalStep,
      left: -normalStep,
      multiplier: 10,
      powerKey: 'shiftKey',
      right: normalStep,
      up: normalStep,
    };
  },

  computed: {
    bgColorStyle() {
      return {background: `hsl(${this.value.hsv.h}, 100%, 50%)`};
    },
    pointerStyle() {
      return {left: `${this.value.hsv.s * 100}%`, top: `${-(this.value.hsv.v * 100) + 1 + 100}%`};
    },
  },

  methods: {
    change(h, s, v, a) {
      this.$emit('change', {a, h, s, source: 'hsva', v});
    },
    handleChange(e) {
      e.preventDefault();
      e.stopPropagation();

      const {clientWidth, clientHeight} = this.$refs.container;
      const left = clamp(this.getLeft(e), 0, clientWidth);
      const top = clamp(this.getTop(e), 0, clientHeight);
      const saturation = left / clientWidth;
      const bright = clamp(1 - top / clientHeight, 0, 1);

      this.change(this.value.hsv.h, saturation, bright, this.value.hsv.a);
    },
    handleMouseDown(e) {
      HSAMixin.methods.handleMouseDown.call(this, e);
      window.addEventListener('mouseup', this.handleChange);
    },
    handleSlide(e, direction, key) {
      e.preventDefault();
      e.stopPropagation();

      const isPowerKey = e[this.powerKey];
      const increment = isPowerKey ? direction * this.multiplier : direction;
      const {h, s, v, a} = this.value.hsv;
      const saturation = clamp(s + getIncrement(key, ['left', 'right'], increment), 0, 1);
      const bright = clamp(v + getIncrement(key, ['up', 'down'], increment), 0, 1);

      this.change(h, saturation, bright, a);
    },
    onKeydown(event) {
      const {key} = event;

      if (isOneOf(key, ['Esc', 'Escape'])) {
        this.handleEscape(event);
      } else if (isOneOf(key, ['Up', 'ArrowUp'])) {
        this.handleUp(event);
      } else if (isOneOf(key, ['Down', 'ArrowDown'])) {
        this.handleDown(event);
      } else if (isOneOf(key, ['Left', 'ArrowLeft'])) {
        this.handleLeft(event);
      } else if (isOneOf(key, ['Right', 'ArrowRight'])) {
        this.handleRight(event);
      }
    },
    unbindEventListeners(e) {
      HSAMixin.methods.unbindEventListeners.call(this, e);
      window.removeEventListener('mouseup', this.handleChange);
    },
  },
};
</script>
