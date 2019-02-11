<template>
  <label :class="wrapClasses">
    <span :class="checkboxClasses">
      <span :class="innerClasses">
      </span>
      <input
        v-if="group"
        v-model="model"
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :value="label"
        :name="name"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
      <input
        v-else
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="name"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
    </span>
    <slot>
      <span v-if="showSlot">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script>
import {findComponentUpward, oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-checkbox';

export default {
  name: 'Checkbox',

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
    indeterminate: {
      default: false,
      type: Boolean,
    },
    label: {
      default: undefined,
      type: [String, Number, Boolean],
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
      group: false,
      model: [],
      parent: findComponentUpward(this, 'CheckboxGroup'),
      showSlot: true,
    };
  },

  computed: {
    checkboxClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-indeterminate`]: this.indeterminate,
        },
      ];
    },
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
    wrapClasses() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-group-item`]: this.group,
          [`${prefixCls}-wrapper-checked`]: this.currentValue,
          [`${prefixCls}-wrapper-disabled`]: this.disabled,
          [`${prefixCls}-${this.size}`]: !!this.size,
        },
      ];
    },
  },

  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw new Error('Value should be trueValue or falseValue.');
      }
    },
  },

  mounted() {
    this.parent = findComponentUpward(this, 'CheckboxGroup');

    if (this.parent) {
      this.group = true;
    }

    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
      this.showSlot = this.$slots.default !== undefined;
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
        this.parent.change(this.model);
      } else {
        this.$emit('on-change', value);
        this.dispatch('FormItem', 'on-form-change', value);
      }
    },
    onBlur() {
      this.focusInner = false;
    },
    onFocus() {
      this.focusInner = true;
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>
