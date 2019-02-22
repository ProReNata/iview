<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import stubArray from 'lodash/stubArray';
import isOneOf from 'Global/Assets/isOneOf';
import {findComponentsDownward} from 'Src/utils/assist';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-checkbox-group';

export default {
  name: 'CheckboxGroup',
  mixins: [Emitter],
  props: {
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['small', 'large', 'default']);
      },
    },
    value: {
      default: stubArray,
      type: Array,
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
          [`ivu-checkbox-${this.size}`]: !!this.size,
        },
      ];
    },
  },
  watch: {
    value() {
      this.updateModel(true);
    },
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    change(data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
      this.dispatch('FormItem', 'on-form-change', data);
    },
    updateModel(update) {
      this.childrens = findComponentsDownward(this, 'Checkbox');

      if (this.childrens) {
        const {value} = this;
        this.childrens.forEach((child) => {
          child.model = value;

          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
  },
};
</script>
