<template>
  <div @click="onHeaderClick">
    <div
      v-for="item in selectedMultiple"
      class="ivu-tag ivu-tag-checked"
    >
      <span class="ivu-tag-text">
        {{ item.label }}
      </span>
      <Icon
        type="ios-close-empty"
        @click.native.stop="removeTag(item)"
      >
      </Icon>
    </div>
    <span
      v-show="singleDisplayValue"
      :class="singleDisplayClasses"
    >
      {{ singleDisplayValue }}
    </span>
    <label>
      <input
        v-if="filterable"
        :id="inputElementId"
        ref="input"
        v-model="query"
        type="text"
        :disabled="disabled"
        :class="[prefixCls + '-input']"
        :placeholder="showPlaceholder ? localePlaceholder : ''"
        :style="inputStyle"
        autocomplete="off"
        spellcheck="false"
        @keydown="onKeydown"
        @focus="onInputFocus"
        @blur="onInputFocus"
      >
    </label>
    <Icon
      v-if="resetSelect"
      type="ios-close"
      :class="[prefixCls + '-arrow']"
      @click.native.stop="onClear"
    >
    </Icon>
    <Icon
      v-if="!resetSelect && !remote && !disabled"
      type="arrow-down-b"
      :class="[prefixCls + '-arrow']"
    >
    </Icon>
  </div>
</template>
<script>
import Icon from '../icon';
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-select';

export default {
  name: 'iSelectHead',
  components: {Icon},
  mixins: [Emitter, Locale],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    initialLabel: {
      type: [String, Number, Array],
    },
    values: {
      type: Array,
      default: () => [],
    },
    clearable: {
      type: [Function, Boolean],
      default: false,
    },
    inputElementId: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    queryProp: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      prefixCls,
      query: '',
      inputLength: 20,
      remoteInitialLabel: this.initialLabel,
      preventRemoteCall: false,
    };
  },
  computed: {
    singleDisplayClasses() {
      const {filterable, multiple, showPlaceholder} = this;

      return [
        {
          [`${prefixCls}-placeholder`]: showPlaceholder && !filterable,
          [`${prefixCls}-selected-value`]: !showPlaceholder && !multiple && !filterable,
        },
      ];
    },
    singleDisplayValue() {
      if ((this.multiple && this.values.length > 0) || this.filterable) {
        return '';
      }

      return `${this.selectedSingle}` || this.localePlaceholder;
    },
    showPlaceholder() {
      let status = false;

      if (!this.multiple) {
        const value = this.values[0];

        if (typeof value === 'undefined' || String(value).trim() === '') {
          status = !this.remoteInitialLabel;
        }
      } else if (!this.values.length > 0) {
        status = true;
      }

      return status;
    },
    resetSelect() {
      return !this.showPlaceholder && this.clearable;
    },
    inputStyle() {
      const style = {};

      if (this.multiple) {
        if (this.showPlaceholder) {
          style.width = '100%';
        } else {
          style.width = `${this.inputLength}px`;
        }
      }

      return style;
    },
    localePlaceholder() {
      if (this.placeholder === undefined) {
        return this.t('i.select.placeholder');
      }

      return this.placeholder;
    },
    selectedSingle() {
      const selected = this.values[0];

      return selected ? selected.label : this.remoteInitialLabel || '';
    },
    selectedMultiple() {
      return this.multiple ? this.values : [];
    },
  },
  watch: {
    values([value]) {
      if (!this.filterable) {
        return;
      }

      this.preventRemoteCall = true;

      if (this.multiple) {
        this.query = '';
        this.preventRemoteCall = false; // this should be after the query change setter above

        return;
      }

      // #982
      if (typeof value === 'undefined' || value === '' || value === null) {
        this.query = '';
      } else {
        this.query = value.label;
      }

      this.$nextTick(() => {
        this.preventRemoteCall = false;
      }); // this should be after the query change setter above
    },
    query(val) {
      if (this.preventRemoteCall) {
        this.preventRemoteCall = false;

        return;
      }

      this.$emit('on-query-change', val);
    },
    queryProp(query) {
      if (query !== this.query) {
        this.query = query;
      }
    },
  },
  methods: {
    onInputFocus(e) {
      this.$emit(e.type === 'focus' ? 'on-input-focus' : 'on-input-blur');
    },
    removeTag(value) {
      if (this.disabled) {
        return false;
      }

      this.dispatch('iSelect', 'on-select-selected', value);
    },
    resetInputState() {
      this.inputLength = this.$refs.input.value.length * 12 + 20;
    },
    handleInputDelete() {
      if (this.multiple && this.selectedMultiple.length && this.query === '') {
        this.removeTag(this.selectedMultiple[this.selectedMultiple.length - 1]);
      }
    },
    onHeaderClick(e) {
      if (this.filterable && e.target === this.$el) {
        this.$refs.input.focus();
      }
    },
    onClear() {
      this.$emit('on-clear');
    },
    onKeydown(event) {
      if (oneOf(event.key, ['Backspace', 'Delete'])) {
        this.handleInputDelete(event);
      }

      this.resetInputState(event);
    },
  },
};
</script>
