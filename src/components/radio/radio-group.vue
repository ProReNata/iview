<template>
  <div
    :class="classes"
    :name="name"
  >
    <slot></slot>
  </div>
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';
import {findComponentsDownward} from 'Src/utils/assist';
import Emitter from 'Src/mixins/emitter';

const prefixCls = 'ivu-radio-group';

let seed = 0;
const now = Date.now();
const getUuid = () => {
  const value = `ivuRadioGroup_${now}_${(seed += 1)}`;

  seed += 1;

  return value;
};

export default {
  name: 'RadioGroup',

  mixins: [Emitter],

  props: {
    name: {
      default: getUuid,
      type: String,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['small', 'large', 'default']);
      },
    },
    type: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['button']);
      },
    },
    value: {
      default: '',
      type: [String, Number],
    },
    vertical: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      childrens: [],
      currentValue: this.value,
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`ivu-radio-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-vertical`]: this.vertical,
        },
      ];
    },
  },

  watch: {
    value() {
      if (this.currentValue !== this.value) {
        this.currentValue = this.value;
        this.updateValue();
      }
    },
  },

  mounted() {
    this.updateValue();
  },

  methods: {
    change(data) {
      this.currentValue = data.value;
      this.updateValue();
      this.$emit('input', data.value);
      this.$emit('on-change', data.value);
      this.dispatch('FormItem', 'on-form-change', data.value);
    },
    updateValue() {
      this.childrens = findComponentsDownward(this, 'Radio');

      if (this.childrens) {
        this.childrens.forEach((child) => {
          child.currentValue = this.currentValue === child.label;
          child.group = true;
        });
      }
    },
  },
};
</script>
