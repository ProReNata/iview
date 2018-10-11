<template>
  <div 
    :class="classes" 
    :name="name"
  >
    <slot></slot>
  </div>
</template>
<script>
import {oneOf, findComponentsDownward} from '../../utils/assist';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-radio-group';

let seed = 0;
const now = Date.now();
const getUuid = () => `ivuRadioGroup_${now}_${seed++}`;

export default {
  name: 'RadioGroup',
  mixins: [Emitter],
  props: {
    name: {
      default: getUuid,
      type: String,
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    type: {
      validator(value) {
        return oneOf(value, ['button']);
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
