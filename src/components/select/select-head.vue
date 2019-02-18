<template>
  <div @click="onHeaderClick">
    <div
      v-for="(item, i) in selectedMultiple"
      :key="i"
      class="ivu-tag ivu-tag-checked"
    >
      <span class="ivu-tag-text">
        {{ item.label }}
      </span>
      <icon
        type="times"
        weight="regular"
        @click.native.stop="removeTag(item)"
      >
      </icon>
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
    <icon
      v-if="resetSelect"
      type="ios-close"
      :class="[prefixCls + '-arrow']"
      @click.native.stop="onClear"
    >
    </icon>
    <icon
      v-if="!resetSelect && !remote && !disabled"
      type="chevron-down"
      weight="solid"
      :class="[prefixCls + '-arrow']"
    >
    </icon>
  </div>
</template>

<script>
import stubArray from 'lodash/stubArray';
import Icon from '../icon';
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-select';

export default {
  name: 'ISelectHead',

  components: {Icon},

  mixins: [Emitter, Locale],

  props: {
    clearable: {
      default: false,
      type: [Function, Boolean],
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    filterable: {
      default: false,
      type: Boolean,
    },
    initialLabel: {
      default: undefined,
      type: [String, Number, Array],
    },
    inputElementId: {
      default: undefined,
      type: String,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: undefined,
      type: String,
    },
    queryProp: {
      default: '',
      type: String,
    },
    remote: {
      default: false,
      type: Boolean,
    },
    values: {
      default: stubArray,
      type: Array,
    },
  },

  data() {
    return {
      inputLength: 20,
      prefixCls,
      preventRemoteCall: false,
      query: '',
      remoteInitialLabel: this.initialLabel,
    };
  },
  computed: {
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
    resetSelect() {
      return !this.showPlaceholder && this.clearable;
    },
    selectedMultiple() {
      return this.multiple ? this.values : [];
    },
    selectedSingle() {
      const selected = this.values[0];

      return selected ? selected.label : this.remoteInitialLabel || '';
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
  },
  watch: {
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
        if (!this.query) {
          this.query = '';
        }
      } else {
        this.query = value.label;
      }

      this.$nextTick(() => {
        this.preventRemoteCall = false;
      }); // this should be after the query change setter above
    },
  },
  methods: {
    handleInputDelete() {
      if (this.multiple && this.selectedMultiple.length && this.query === '') {
        this.removeTag(this.selectedMultiple[this.selectedMultiple.length - 1]);
      }
    },
    onClear() {
      this.$emit('on-clear');
    },
    onHeaderClick(e) {
      if (this.filterable && e.target === this.$el) {
        this.$refs.input.focus();
      }
    },
    onInputFocus(e) {
      this.$emit(e.type === 'focus' ? 'on-input-focus' : 'on-input-blur');
    },
    onKeydown(event) {
      if (oneOf(event.key, ['Backspace', 'Delete'])) {
        this.handleInputDelete(event);
      }

      this.resetInputState(event);
    },
    removeTag(value) {
      if (this.disabled) {
        return;
      }

      this.dispatch('iSelect', 'on-select-selected', value);
    },
    resetInputState() {
      this.inputLength = this.$refs.input.value.length * 12 + 20;
    },
  },
};
</script>
