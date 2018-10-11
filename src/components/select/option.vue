<template>
  <li
    :class="classes"
    @click.stop="select"
    @touchend.stop="select"
    @mousedown.prevent
    @touchstart.prevent
  >
    <slot>{{ showLabel }}</slot>
  </li>
</template>
<script>
import Emitter from '../../mixins/emitter';
import {findComponentUpward} from '../../utils/assist';

const prefixCls = 'ivu-select-item';

export default {
  name: 'iOption',
  componentName: 'select-item',
  mixins: [Emitter],
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    isFocused: {
      default: false,
      type: Boolean,
    },
    label: {
      type: [String, Number],
    },
    selected: {
      default: false,
      type: Boolean,
    },
    value: {
      required: true,
      type: [String, Number],
    },
  },
  data() {
    return {
      autoComplete: false,
      // the slot value (textContent)
      searchLabel: '',
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected && !this.autoComplete,
          [`${prefixCls}-focus`]: this.isFocused,
        },
      ];
    },
    optionLabel() {
      return this.label || (this.$el && this.$el.textContent.trim());
    },
    showLabel() {
      return this.label ? this.label : this.value;
    },
  },
  mounted() {
    const Select = findComponentUpward(this, 'iSelect');

    if (Select) {
      this.autoComplete = Select.autoComplete;
    }
  },
  methods: {
    select() {
      if (this.disabled) {
        return false;
      }

      this.dispatch('iSelect', 'on-select-selected', {
        label: this.optionLabel,
        value: this.value,
      });
      this.$emit('on-select-selected', {
        label: this.optionLabel,
        value: this.value,
      });
    },
  },
};
</script>
