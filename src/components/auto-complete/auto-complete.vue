<template>
  <i-select
    ref="select"
    class="ivu-auto-complete"
    :label="label"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :size="size"
    :placement="placement"
    :value="currentValue"
    filterable
    remote
    auto-complete
    :remote-method="remoteMethod"
    :transfer="transfer"
    @on-change="handleChange"
  >
    <slot name="input">
      <i-input
        ref="input"
        slot="input"
        v-model="currentValue"
        :element-id="elementId"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        :icon="inputIcon"
        @on-click="handleClear"
        @on-focus="handleFocus"
        @on-blur="handleBlur"
      >
      </i-input>
    </slot>
    <slot>
      <i-option 
        v-for="item in filteredData" 
        :key="item" 
        :value="item"
      >
        {{ item }}
      </i-option>
    </slot>
  </i-select>
</template>
<script>
import iSelect from '../select/select.vue';
import iOption from '../select/option.vue';
import iInput from '../input/input.vue';
import {oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';

export default {
  name: 'AutoComplete',
  components: {iInput, iOption, iSelect},
  mixins: [Emitter],
  props: {
    clearable: {
      default: false,
      type: Boolean,
    },
    data: {
      default: () => [],
      type: Array,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    elementId: {
      type: String,
    },
    filterMethod: {
      default: false,
      type: [Function, Boolean],
    },
    icon: {
      type: String,
    },
    label: {
      default: '',
      type: [String, Number],
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    placement: {
      default: 'bottom',
      validator(value) {
        return oneOf(value, ['top', 'bottom']);
      },
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    transfer: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: [String, Number],
    },
  },
  data() {
    return {
      currentValue: this.value,
      disableEmitChange: false, // for Form reset
    };
  },
  computed: {
    filteredData() {
      if (this.filterMethod) {
        return this.data.filter((item) => this.filterMethod(this.currentValue, item));
      }

      return this.data;
    },
    inputIcon() {
      let icon = '';

      if (this.clearable && this.currentValue) {
        icon = 'ios-close';
      } else if (this.icon) {
        icon = this.icon;
      }

      return icon;
    },
  },
  watch: {
    currentValue(val) {
      this.$refs.select.query = val;
      this.$emit('input', val);

      if (this.disableEmitChange) {
        this.disableEmitChange = false;

        return;
      }

      this.$emit('on-change', val);
      this.dispatch('FormItem', 'on-form-change', val);
    },
    value(val) {
      if (this.currentValue !== val) {
        this.disableEmitChange = true;
      }

      this.currentValue = val;
    },
  },
  methods: {
    handleBlur(event) {
      this.$emit('on-blur', event);
    },
    handleChange(val) {
      this.currentValue = val;
      this.$refs.input.blur();
      this.$emit('on-select', val);
    },
    handleClear() {
      if (!this.clearable) {
        return;
      }

      this.currentValue = '';
      this.$refs.select.reset();
    },
    handleFocus(event) {
      this.$emit('on-focus', event);
    },
    remoteMethod(query) {
      this.$emit('on-search', query);
    },
  },
};
</script>
