<template>
  <label :class="wrapClasses">
    <span :class="radioClasses">
      <span :class="innerClasses">
      </span>
      <input
        type="radio"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="groupName"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
    </span><slot>{{ label }}</slot>
  </label>
</template>

<script>
import {findComponentUpward, oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-radio';

export default {
  name: 'Radio',

  mixins: [Emitter],

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    falseValue: {
      default: false,
      type: [String, Number, Boolean],
    },
    label: {
      default: undefined,
      type: [String, Number],
    },
    name: {
      default: undefined,
      type: String,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    trueValue: {
      default: true,
      type: [String, Number, Boolean],
    },
    value: {
      default: false,
      type: [String, Number, Boolean],
    },
  },

  data() {
    return {
      currentValue: this.value,
      focusInner: false,
      focusWrapper: false,
      group: false,
      groupName: this.name,
      parent: findComponentUpward(this, 'RadioGroup'),
    };
  },

  computed: {
    innerClasses() {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-focus`]: this.focusInner,
        },
      ];
    },
    inputClasses() {
      return `${prefixCls}-input`;
    },
    radioClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue,
          [`${prefixCls}-disabled`]: this.disabled,
        },
      ];
    },
    wrapClasses() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-group-item`]: this.group,
          [`${prefixCls}-wrapper-checked`]: this.currentValue,
          [`${prefixCls}-wrapper-disabled`]: this.disabled,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-focus`]: this.focusWrapper,
        },
      ];
    },
  },

  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateValue();
      } else {
        throw new Error('Value should be trueValue or falseValue.');
      }
    },
  },

  mounted() {
    if (this.parent) {
      this.group = true;

      if (this.name && this.name !== this.parent.name) {
        /* eslint-disable-next-line no-console */
        if (console.warn) {
          /* eslint-disable-next-line no-console */
          console.warn('[iview] Name does not match Radio Group name.');
        }
      } else {
        this.groupName = this.parent.name;
      }
    }

    if (this.group) {
      this.parent.updateValue();
    } else {
      this.updateValue();
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return;
      }

      const {checked} = event.target;
      this.currentValue = checked;

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);

      if (this.group) {
        if (this.label !== undefined) {
          this.parent.change({
            checked: this.value,
            value: this.label,
          });
        }
      } else {
        this.$emit('on-change', value);
        this.dispatch('FormItem', 'on-form-change', value);
      }
    },
    onBlur() {
      this.focusWrapper = false;
      this.focusInner = false;
    },
    onFocus() {
      if (this.group && this.parent.type === 'button') {
        this.focusWrapper = true;
      } else {
        this.focusInner = true;
      }
    },
    updateValue() {
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>
