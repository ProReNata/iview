<template>
  <div :class="classes">
    <Input-number
      v-if="!range && showInput"
      :min="min"
      :size="inputSize"
      :max="max"
      :step="step"
      :value="exportValue[0]"
      :disabled="disabled"
      @on-change="handleInputChange"
    >
    </Input-number>
    <div
      ref="slider"
      :class="[prefixCls + '-wrap']" 
      @click.self="sliderClick"
    >
      <input 
        type="hidden" 
        :name="name" 
        :value="exportValue"
      >
      <template v-if="showStops">
        <div
          v-for="item in stops"
          :class="[prefixCls + '-stop']"
          :style="{ 'left': item + '%' }"
          @click.self="sliderClick"
        >
        </div>
      </template>
      <div
        :class="[prefixCls + '-bar']"
        :style="barStyle"
        @click.self="sliderClick"
      >
      </div>
      <div
        :class="[prefixCls + '-button-wrap']"
        :style="{left: minPosition + '%'}"
        @touchstart="onPointerDown($event, 'min')"
        @mousedown="onPointerDown($event, 'min')"
      >
        <Tooltip
          ref="minTooltip"
          :controlled="pointerDown === 'min'"
          placement="top"
          :content="tipFormat(exportValue[0])"
          :disabled="tipDisabled"
          :always="showTip === 'always'"
        >
          <div
            :class="minButtonClasses"
            tabindex="0"
            @focus="handleFocus('min')"
            @blur="handleBlur('min')"
            @keydown="onKeydown($event, 'min')"
          >
          </div>
        </Tooltip>
      </div>
      <div 
        v-if="range"
        :class="[prefixCls + '-button-wrap']"
        :style="{left: maxPosition + '%'}"
        @touchstart="onPointerDown($event, 'max')"
        @mousedown="onPointerDown($event, 'max')"
      >
        <Tooltip
          ref="maxTooltip"
          :controlled="pointerDown === 'max'"
          placement="top"
          :content="tipFormat(exportValue[1])"
          :disabled="tipDisabled"
          :always="showTip === 'always'"
        >
          <div
            :class="maxButtonClasses"
            tabindex="0"
            @focus="handleFocus('max')"
            @blur="handleBlur('max')"
            @keydown="onKeydown($event, 'max')"
          >
          </div>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import InputNumber from '../input-number/input-number.vue';
import Tooltip from '../tooltip/tooltip.vue';
import {getStyle, oneOf} from '../../utils/assist';
import {on, off} from '../../utils/dom';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-slider';

export default {
  name: 'Slider',
  components: {InputNumber, Tooltip},
  mixins: [Emitter],
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    inputSize: {
      default: 'default',
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    max: {
      default: 100,
      type: Number,
    },
    min: {
      default: 0,
      type: Number,
    },
    name: {
      type: String,
    },
    range: {
      default: false,
      type: Boolean,
    },
    showInput: {
      default: false,
      type: Boolean,
    },
    showStops: {
      default: false,
      type: Boolean,
    },
    showTip: {
      default: 'hover',
      type: String,
      validator(value) {
        return oneOf(value, ['hover', 'always', 'never']);
      },
    },
    step: {
      default: 1,
      type: Number,
    },
    tipFormat: {
      default(val) {
        return val;
      },
      type: Function,
    },
    value: {
      default: 0,
      type: [Number, Array],
    },
  },
  data() {
    const val = this.checkLimits(Array.isArray(this.value) ? this.value : [this.value]);

    return {
      currentValue: val,
      currentX: 0,
      dragging: false,
      oldValue: [...val],
      pointerDown: '',
      prefixCls,
      startPos: 0,
      startX: 0,
      valueIndex: {
        max: 1,
        min: 0,
      },
    };
  },
  computed: {
    barStyle() {
      const style = {
        width: `${((this.currentValue[0] - this.min) / this.valueRange) * 100}%`,
      };

      if (this.range) {
        style.left = `${((this.currentValue[0] - this.min) / this.valueRange) * 100}%`;
        style.width = `${((this.currentValue[1] - this.currentValue[0]) / this.valueRange) * 100}%`;
      }

      return style;
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-input`]: this.showInput && !this.range,
          [`${prefixCls}-range`]: this.range,
          [`${prefixCls}-disabled`]: this.disabled,
        },
      ];
    },
    exportValue() {
      const decimalCases = (String(this.step).split('.')[1] || '').length;

      return this.currentValue.map((nr) => Number(nr.toFixed(decimalCases)));
    },
    maxButtonClasses() {
      return [
        `${prefixCls}-button`,
        {
          [`${prefixCls}-button-dragging`]: this.pointerDown === 'max',
        },
      ];
    },
    maxPosition() {
      const val = this.currentValue;

      return ((val[1] - this.min) / this.valueRange) * 100;
    },
    minButtonClasses() {
      return [
        `${prefixCls}-button`,
        {
          [`${prefixCls}-button-dragging`]: this.pointerDown === 'min',
        },
      ];
    },
    minPosition() {
      const val = this.currentValue;

      return ((val[0] - this.min) / this.valueRange) * 100;
    },
    sliderWidth() {
      return parseInt(getStyle(this.$refs.slider, 'width'), 10);
    },
    stops() {
      const stopCount = this.valueRange / this.step;
      const result = [];
      const stepWidth = (100 * this.step) / this.valueRange;
      for (let i = 1; i < stopCount; i++) {
        result.push(i * stepWidth);
      }

      return result;
    },
    tipDisabled() {
      return this.tipFormat(this.currentValue[0]) === null || this.showTip === 'never';
    },
    valueRange() {
      return this.max - this.min;
    },
  },
  watch: {
    exportValue(values) {
      this.$nextTick(() => {
        this.$refs.minTooltip.updatePopper();

        if (this.range) {
          this.$refs.maxTooltip.updatePopper();
        }
      });
      const value = this.range ? values : values[0];
      this.$emit('input', value);
      this.$emit('on-input', value);
    },
    value(val) {
      val = this.checkLimits(Array.isArray(val) ? val : [val]);

      if (val[0] !== this.currentValue[0] || val[1] !== this.currentValue[1]) {
        this.currentValue = val;
      }
    },
  },
  mounted() {
    // #2852
    this.$on('on-visible-change', (val) => {
      if (val && this.showTip === 'always') {
        this.$refs.minTooltip.doDestroy();

        if (this.range) {
          this.$refs.maxTooltip.doDestroy();
        }

        this.$nextTick(() => {
          this.$refs.minTooltip.updatePopper();

          if (this.range) {
            this.$refs.maxTooltip.updatePopper();
          }
        });
      }
    });
  },
  methods: {
    changeButtonPosition(newPos, forceType) {
      const type = forceType || this.pointerDown;
      const index = type === 'min' ? 0 : 1;

      if (type === 'min') {
        newPos = this.checkLimits([newPos, this.max])[0];
      } else {
        newPos = this.checkLimits([this.min, newPos])[1];
      }

      const modulus = this.handleDecimal(newPos, this.step);
      const value = this.currentValue;
      value[index] = newPos - modulus;
      this.currentValue = [...value];

      if (!this.dragging) {
        if (this.currentValue[index] !== this.oldValue[index]) {
          this.emitChange();
          this.oldValue[index] = this.currentValue[index];
        }
      }
    },
    checkLimits([min, max]) {
      min = Math.max(this.min, min);
      min = Math.min(this.max, min);

      max = Math.max(this.min, min, max);
      max = Math.min(this.max, max);

      return [min, max];
    },
    emitChange() {
      const value = this.range ? this.exportValue : this.exportValue[0];
      this.$emit('on-change', value);
      this.dispatch('FormItem', 'on-form-change', value);
    },
    getCurrentValue(event, type) {
      if (this.disabled) {
        return;
      }

      const index = this.valueIndex[type];

      if (typeof index === 'undefined') {
        return;
      }

      return this.currentValue[index];
    },
    getPointerX(e) {
      return e.type.indexOf('touch') !== -1 ? e.touches[0].clientX : e.clientX;
    },
    handleBlur(type) {
      this.$refs[`${type}Tooltip`].handleClosePopper();
    },
    handleDecimal(pos, step) {
      if (step < 1) {
        const sl = step.toString();
        let multiple = 1;
        let m;
        try {
          m = sl.split('.')[1].length;
        } catch (e) {
          m = 0;
        }

        multiple = Math.pow(10, m);

        return ((pos * multiple) % (step * multiple)) / multiple;
      }

      return pos % step;
    },
    handleFocus(type) {
      this.$refs[`${type}Tooltip`].handleShowPopper();
    },
    handleInputChange(val) {
      this.currentValue = [val, this.currentValue[1]];
      this.emitChange();
    },
    onKeydown(event, range) {
      const {key} = event;

      if (oneOf(key, ['Up', 'ArrowUp'])) {
        this.onKeyRight(event, range);
      } else if (oneOf(key, ['Down', 'ArrowDown'])) {
        this.onKeyLeft(event, range);
      } else if (oneOf(key, ['Left', 'ArrowLeft'])) {
        this.onKeyLeft(event, range);
      } else if (oneOf(key, ['Right', 'ArrowRight'])) {
        this.onKeyRight(event, range);
      }
    },
    onKeyLeft(event, type) {
      const value = this.getCurrentValue(event, type);

      if (Number.isFinite(value)) {
        this.changeButtonPosition(value - this.step, type);
      }
    },
    onKeyRight(event, type) {
      const value = this.getCurrentValue(event, type);

      if (Number.isFinite(value)) {
        this.changeButtonPosition(value + this.step, type);
      }
    },

    onPointerDown(event, type) {
      if (this.disabled) {
        return;
      }

      event.preventDefault();
      this.pointerDown = type;

      this.onPointerDragStart(event);
      on(window, 'mousemove', this.onPointerDrag);
      on(window, 'touchmove', this.onPointerDrag);
      on(window, 'mouseup', this.onPointerDragEnd);
      on(window, 'touchend', this.onPointerDragEnd);
    },

    onPointerDrag(event) {
      this.dragging = true;
      this.$refs[`${this.pointerDown}Tooltip`].visible = true;
      this.currentX = this.getPointerX(event);
      const diff = ((this.currentX - this.startX) / this.sliderWidth) * this.valueRange;

      this.changeButtonPosition(this.startPos + diff);
    },

    onPointerDragEnd() {
      if (this.dragging) {
        this.dragging = false;
        this.$refs[`${this.pointerDown}Tooltip`].visible = false;
        this.emitChange();
      }

      this.pointerDown = '';
      off(window, 'mousemove', this.onPointerDrag);
      off(window, 'touchmove', this.onPointerDrag);
      off(window, 'mouseup', this.onPointerDragEnd);
      off(window, 'touchend', this.onPointerDragEnd);
    },

    onPointerDragStart(event) {
      this.dragging = false;
      this.startX = this.getPointerX(event);
      this.startPos = (this[`${this.pointerDown}Position`] * this.valueRange) / 100 + this.min;
    },

    sliderClick(event) {
      if (this.disabled) {
        return;
      }

      const currentX = this.getPointerX(event);
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
      const newPos = ((currentX - sliderOffsetLeft) / this.sliderWidth) * this.valueRange + this.min;

      if (!this.range || newPos <= this.minPosition) {
        this.changeButtonPosition(newPos, 'min');
      } else if (newPos >= this.maxPosition) {
        this.changeButtonPosition(newPos, 'max');
      } else {
        this.changeButtonPosition(newPos, newPos - this.firstPosition <= this.secondPosition - newPos ? 'min' : 'max');
      }
    },
  },
};
</script>
