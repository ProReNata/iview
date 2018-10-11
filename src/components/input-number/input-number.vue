<template>
  <div :class="wrapClasses">
    <div :class="handlerClasses">
      <a
        :class="upClasses"
        @click="up"
        @mousedown="preventDefault"
      >
        <span
          :class="innerUpClasses"
          @click="preventDefault"
        >
        </span>
      </a>
      <a
        :class="downClasses"
        @click="down"
        @mousedown="preventDefault"
      >
        <span
          :class="innerDownClasses"
          @click="preventDefault"
        >
        </span>
      </a>
    </div>
    <div :class="inputWrapClasses">
      <label>
        <input
          :id="elementId"
          :class="inputClasses"
          :disabled="disabled"
          autocomplete="off"
          spellcheck="false"
          :autofocus="autofocus"
          :readonly="readonly || !editable"
          :name="name"
          :value="formatterValue"
          :placeholder="placeholder"
          @focus="focus"
          @blur="blur"
          @keydown.stop="keyDown"
          @input="change"
          @mouseup="preventDefault"
          @change="change"
        >
      </label>
    </div>
  </div>
</template>
<script>
import {oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-input-number';
const iconPrefixCls = 'ivu-icon';

function addNum(num1, num2) {
  let sq1;
  let sq2;
  try {
    sq1 = num1.toString().split('.')[1].length;
  } catch (e) {
    sq1 = 0;
  }

  try {
    sq2 = num2.toString().split('.')[1].length;
  } catch (e) {
    sq2 = 0;
  }

  //        if (sq1 === 0 || sq2 === 0) {
  //            return num1 + num2;
  //        } else {
  //            m = Math.pow(10, Math.max(sq1, sq2));
  //            return (num1 * m + num2 * m) / m;
  //        }
  const m = Math.pow(10, Math.max(sq1, sq2));

  return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
}

export default {
  name: 'InputNumber',
  mixins: [Emitter],
  props: {
    autofocus: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    editable: {
      default: true,
      type: Boolean,
    },
    elementId: {
      type: String,
    },
    formatter: {
      type: Function,
    },
    max: {
      default: Infinity,
      type: Number,
    },
    min: {
      default: -Infinity,
      type: Number,
    },
    name: {
      type: String,
    },
    parser: {
      type: Function,
    },
    placeholder: {
      default: '',
      type: String,
    },
    precision: {
      type: Number,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    step: {
      default: 1,
      type: Number,
    },
    value: {
      default: 1,
      type: Number,
    },
  },
  data() {
    return {
      currentValue: this.value,
      downDisabled: false,
      focused: false,
      upDisabled: false,
    };
  },
  computed: {
    downClasses() {
      return [
        `${prefixCls}-handler`,
        `${prefixCls}-handler-down`,
        {
          [`${prefixCls}-handler-down-disabled`]: this.downDisabled,
        },
      ];
    },
    formatterValue() {
      if (this.formatter && this.precisionValue !== null) {
        return this.formatter(this.precisionValue);
      }

      return this.precisionValue;
    },
    handlerClasses() {
      return `${prefixCls}-handler-wrap`;
    },
    innerDownClasses() {
      return `${prefixCls}-handler-down-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-down`;
    },
    innerUpClasses() {
      return `${prefixCls}-handler-up-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-up`;
    },
    inputClasses() {
      return `${prefixCls}-input`;
    },
    inputWrapClasses() {
      return `${prefixCls}-input-wrap`;
    },
    precisionValue() {
      // can not display 1.0
      if (!this.currentValue) {
        return this.currentValue;
      }

      return this.precision ? this.currentValue.toFixed(this.precision) : this.currentValue;
    },
    upClasses() {
      return [
        `${prefixCls}-handler`,
        `${prefixCls}-handler-up`,
        {
          [`${prefixCls}-handler-up-disabled`]: this.upDisabled,
        },
      ];
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-focused`]: this.focused,
        },
      ];
    },
  },
  watch: {
    currentValue(val) {
      this.changeVal(val);
    },
    max() {
      this.changeVal(this.currentValue);
    },
    min() {
      this.changeVal(this.currentValue);
    },
    value(val) {
      this.currentValue = val;
    },
  },
  mounted() {
    this.changeVal(this.currentValue);
  },
  methods: {
    blur() {
      this.focused = false;
      this.$emit('on-blur');
    },
    change(event) {
      let val = event.target.value.trim();

      if (this.parser) {
        val = this.parser(val);
      }

      if (event.type === 'input' && val.match(/^-?\.?$|\.$/)) {
        return;
      } // prevent fire early if decimal. If no more input the change event will fire later

      const {min, max} = this;
      const isEmptyString = val.length === 0;
      val = Number(val);

      if (isEmptyString) {
        if (min === -Infinity && max === Infinity) {
          this.setValue(null);
        } else if (min !== -Infinity) {
          this.setValue(min);
        } else if (max !== Infinity) {
          this.setValue(max);
        }

        return;
      }

      if (event.type === 'change') {
        if (val === this.currentValue && val > min && val < max) {
          return;
        } // already fired change for input event
      }

      if (!Number.isNaN(val) && !isEmptyString) {
        this.currentValue = val;

        if (event.type === 'input' && val < min) {
          return;
        } // prevent fire early in case user is typing a bigger number. Change will handle this otherwise.

        if (val > max) {
          this.setValue(max);
        } else if (val < min) {
          this.setValue(min);
        } else {
          this.setValue(val);
        }
      } else {
        event.target.value = this.currentValue;
      }
    },
    changeStep(type, e) {
      if (this.disabled || this.readonly) {
        return false;
      }

      const targetVal = Number(e.target.value);
      let val = Number(this.currentValue);
      const step = Number(this.step);

      if (Number.isNaN(val)) {
        return false;
      }

      // input a number, and key up or down
      if (!Number.isNaN(targetVal)) {
        if (type === 'up') {
          if (addNum(targetVal, step) <= this.max) {
            val = targetVal;
          } else {
            return false;
          }
        } else if (type === 'down') {
          if (addNum(targetVal, -step) >= this.min) {
            val = targetVal;
          } else {
            return false;
          }
        }
      }

      if (type === 'up') {
        val = addNum(val, step);
      } else if (type === 'down') {
        val = addNum(val, -step);
      }

      this.setValue(val);
    },
    changeVal(val) {
      val = Number(val);

      if (!Number.isNaN(val)) {
        const {step} = this;

        this.upDisabled = val + step > this.max;
        this.downDisabled = val - step < this.min;
      } else {
        this.upDisabled = true;
        this.downDisabled = true;
      }
    },
    down(e) {
      const targetVal = Number(e.target.value);

      if (this.downDisabled && Number.isNaN(targetVal)) {
        return false;
      }

      this.changeStep('down', e);
    },
    focus(event) {
      this.focused = true;
      this.$emit('on-focus', event);
    },
    keyDown(e) {
      if (e.keyCode === 38) {
        e.preventDefault();
        this.up(e);
      } else if (e.keyCode === 40) {
        e.preventDefault();
        this.down(e);
      }
    },
    preventDefault(e) {
      e.preventDefault();
    },
    setValue(val) {
      // 如果 step 是小数，且没有设置 precision，是有问题的
      if (val && !Number.isNaN(this.precision)) {
        val = Number(Number(val).toFixed(this.precision));
      }

      this.$nextTick(() => {
        this.currentValue = val;
        this.$emit('input', val);
        this.$emit('on-change', val);
        this.dispatch('FormItem', 'on-form-change', val);
      });
    },
    up(e) {
      const targetVal = Number(e.target.value);

      if (this.upDisabled && Number.isNaN(targetVal)) {
        return false;
      }

      this.changeStep('up', e);
    },
  },
};
</script>
