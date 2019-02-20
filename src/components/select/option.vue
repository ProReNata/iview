<template>
  <li
    :class="classes"
    @click.stop="select"
    @touchend.stop="select"
    @mousedown.prevent
    @touchstart.prevent
  >
    <i
      v-if="preIconName"
      :class="preIconName"
    >
    </i>
    <slot>{{ showLabel }}</slot>
    <i
      v-if="postIconName"
      :class="postIconName"
    >
    </i>
  </li>
</template>

<script>
import Emitter from '../../mixins/emitter';
import {findComponentUpward} from '../../utils/assist';

const prefixCls = 'byx-select-item';

export default {
  name: 'IOption',

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
      default: undefined,
      type: [String, Number],
    },
    postIconName: {
      default: '',
      type: String,
    },
    preIconName: {
      default: '',
      type: String,
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
    hasDefaultSlot() {
      return Boolean(this.$slots.default);
    },
    optionLabel() {
      return this.label || (this.$el && this.$el.textContent.trim());
    },
    showLabel() {
      return this.label ? this.label : this.value;
    },
  },

  mounted() {
    const Select = findComponentUpward(this, 'ISelect');

    if (Select) {
      this.autoComplete = Select.autoComplete;
    }
  },

  methods: {
    select() {
      if (this.disabled) {
        return;
      }

      this.dispatch('ISelect', 'on-select-selected', {
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
