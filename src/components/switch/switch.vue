<template>
  <span
    tabindex="0"
    :class="wrapClasses"
    @click="toggle"
    @keydown="onKeydown"
  >
    <input 
      type="hidden" 
      :name="name" 
      :value="currentValue"
    >
    <span :class="innerClasses">
      <slot 
        v-if="currentValue === trueValue" 
        name="open"
      >
      </slot>
      <slot 
        v-if="currentValue === falseValue" 
        name="close"
      >
      </slot>
    </span>
  </span>
</template>
<script>
import {oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-switch';

export default {
  name: 'iSwitch',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      validator(value) {
        return oneOf(value, ['large', 'small', 'default']);
      },
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-${this.size}`]: !!this.size,
        },
      ];
    },
    innerClasses() {
      return `${prefixCls}-inner`;
    },
  },
  watch: {
    value(val) {
      if (val !== this.trueValue && val !== this.falseValue) {
        throw new Error('Value should be trueValue or falseValue.');
      }

      this.currentValue = val;
    },
  },
  methods: {
    toggle(event) {
      event.preventDefault();

      if (this.disabled) {
        return false;
      }

      const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

      this.currentValue = checked;
      this.$emit('input', checked);
      this.$emit('on-change', checked);
      this.dispatch('FormItem', 'on-form-change', checked);
    },
    onKeydown(event) {
      if (oneOf(event.key, [' ', 'Space', 'Spacebar'])) {
        this.toggle(event);
      }
    },
  },
};
</script>
