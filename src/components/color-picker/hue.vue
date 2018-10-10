<template>
  <div
    :class="[prefixCls + '-hue']"
    tabindex="0"
    @click="$el.focus()"
    @keydown="onKeydown"
  >
    <div
      ref="container"
      :class="[prefixCls + '-hue-container']"
      @mousedown="handleMouseDown"
      @touchmove="handleChange"
      @touchstart="handleChange"
    >
      <div
        :style="{top: 0, left: `${percent}%`}"
        :class="[prefixCls + '-hue-pointer']"
      >
        <div :class="[prefixCls + '-hue-picker']">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HASMixin from './hsaMixin';
import Prefixes from './prefixMixin';
import {clamp} from './utils';
import {oneOf} from '../../utils/assist';

export default {
  name: 'Hue',

  mixins: [HASMixin, Prefixes],

  data() {
    const normalStep = (1 / 360) * 25;
    const jumpStep = 20 * normalStep;

    return {
      left: -normalStep,
      right: normalStep,
      up: jumpStep,
      down: -jumpStep,
      powerKey: 'shiftKey',
      percent: clamp((this.value.hsl.h * 100) / 360, 0, 100),
    };
  },

  watch: {
    value() {
      this.percent = clamp((this.value.hsl.h * 100) / 360, 0, 100);
    },
  },

  methods: {
    change(percent) {
      this.percent = clamp(percent, 0, 100);

      const {h, s, l, a} = this.value.hsl;
      const newHue = clamp((percent / 100) * 360, 0, 360);

      if (h !== newHue) {
        this.$emit('change', {h: newHue, s, l, a, source: 'hsl'});
      }
    },
    handleSlide(e, direction) {
      e.preventDefault();
      e.stopPropagation();

      if (e[this.powerKey]) {
        this.change(direction < 0 ? 0 : 100);

        return;
      }

      this.change(this.percent + direction);
    },
    handleChange(e) {
      e.preventDefault();
      e.stopPropagation();

      const left = this.getLeft(e);

      if (left < 0) {
        this.change(0);

        return;
      }

      const {clientWidth} = this.$refs.container;

      if (left > clientWidth) {
        this.change(100);

        return;
      }

      this.change((left * 100) / clientWidth);
    },
    onKeydown(event) {
      const {key} = event;

      if (oneOf(key, ['Esc', 'Escape'])) {
        this.handleEscape(event);
      } else if (oneOf(key, ['Up', 'ArrowUp'])) {
        this.handleUp(event);
      } else if (oneOf(key, ['Down', 'ArrowDown'])) {
        this.handleDown(event);
      } else if (oneOf(key, ['Left', 'ArrowLeft'])) {
        this.handleLeft(event);
      } else if (oneOf(key, ['Right', 'ArrowRight'])) {
        this.handleRight(event);
      }
    },
  },
};
</script>
