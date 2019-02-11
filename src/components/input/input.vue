<template>
  <div :class="wrapClasses">
    <template v-if="type !== 'textarea'">
      <div
        v-if="prepend"
        v-show="slotReady"
        :class="[prefixCls + '-group-prepend']"
      >
        <slot name="prepend">
        </slot>
      </div>
      <i
        v-if="clearable && currentValue"
        class="ivu-icon"
        :class="['ivu-icon-ios-close', prefixCls + '-icon', prefixCls + '-icon-clear' , prefixCls + '-icon-normal']"
        @click="handleClear"
      >
      </i>
      <i
        v-else-if="icon"
        class="ivu-icon"
        :class="['ivu-icon-' + icon, prefixCls + '-icon', prefixCls + '-icon-normal']"
        @click="handleIconClick"
      >
      </i>
      <transition name="fade">
        <i
          v-if="!icon"
          class="ivu-icon ivu-icon-load-c ivu-load-loop"
          :class="[prefixCls + '-icon', prefixCls + '-icon-validate']"
        >
        </i>
      </transition>
      <label>
        <input
          :id="elementId"
          ref="input"
          :autocomplete="autocomplete"
          :spellcheck="spellcheck"
          :type="type"
          :class="inputClasses"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="maxlength"
          :readonly="readonly"
          :name="name"
          :value="currentValue"
          :number="number"
          :autofocus="autofocus"
          @keyup="onKeyup"
          @keypress="handleKeypress"
          @keydown="handleKeydown"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange"
        >
      </label>
      <div
        v-if="append"
        v-show="slotReady"
        :class="[prefixCls + '-group-append']"
      >
        <slot name="append">
        </slot>
      </div>
    </template>
    <template v-else>
      <label>
        <textarea
          :id="elementId"
          ref="textarea"
          :wrap="wrap"
          :autocomplete="autocomplete"
          :spellcheck="spellcheck"
          :class="textareaClasses"
          :style="textareaStyles"
          :placeholder="placeholder"
          :disabled="disabled"
          :rows="rows"
          :maxlength="maxlength"
          :readonly="readonly"
          :name="name"
          :value="currentValue"
          :autofocus="autofocus"
          @keyup="onKeyup"
          @keypress="handleKeypress"
          @keydown="handleKeydown"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        >
        </textarea>
      </label>
    </template>
  </div>
</template>

<script>
import {oneOf, findComponentUpward} from '../../utils/assist';
import calcTextareaHeight from '../../utils/calcTextareaHeight';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-input';

export default {
  name: 'Input',

  mixins: [Emitter],

  props: {
    autocomplete: {
      default: 'off',
      validator(value) {
        return oneOf(value, ['on', 'off']);
      },
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: false,
      type: [Boolean, Object],
    },
    clearable: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    elementId: {
      default: undefined,
      type: String,
    },
    icon: {
      default: undefined,
      type: String,
    },
    maxlength: {
      default: undefined,
      type: Number,
    },
    name: {
      default: undefined,
      type: String,
    },
    number: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: '',
      type: String,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    rows: {
      default: 2,
      type: Number,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    spellcheck: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'text',
      type: String,
      validator(value) {
        return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
      },
    },
    value: {
      default: '',
      type: [String, Number],
    },
    wrap: {
      default: 'soft',
      type: String,
      validator(value) {
        return oneOf(value, ['hard', 'soft']);
      },
    },
  },

  data() {
    return {
      append: true,
      currentValue: this.value,
      prefixCls,
      prepend: true,
      slotReady: false,
      textareaStyles: {},
    };
  },

  computed: {
    inputClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.disabled,
        },
      ];
    },
    textareaClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
        },
      ];
    },
    wrapClasses() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
          [`${prefixCls}-type`]: this.type,
          [`${prefixCls}-group`]: this.prepend || this.append,
          [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append) && !!this.size,
          [`${prefixCls}-group-with-prepend`]: this.prepend,
          [`${prefixCls}-group-with-append`]: this.append,
          [`${prefixCls}-hide-icon`]: this.append, // #554
        },
      ];
    },
  },

  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
  },

  mounted() {
    if (this.type !== 'textarea') {
      this.prepend = this.$slots.prepend !== undefined;
      this.append = this.$slots.append !== undefined;
    } else {
      this.prepend = false;
      this.append = false;
    }

    this.slotReady = true;
    this.resizeTextarea();
  },

  methods: {
    blur() {
      if (this.type === 'textarea') {
        this.$refs.textarea.blur();
      } else {
        this.$refs.input.blur();
      }
    },
    focus() {
      if (this.type === 'textarea') {
        this.$refs.textarea.focus();
      } else {
        this.$refs.input.focus();
      }
    },
    handleBlur(event) {
      this.$emit('on-blur', event);

      if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
        this.dispatch('FormItem', 'on-form-blur', this.currentValue);
      }
    },
    handleChange(event) {
      this.$emit('on-input-change', event);
    },
    handleClear() {
      const e = {target: {value: ''}};
      this.$emit('input', '');
      this.setCurrentValue('');
      this.$emit('on-change', e);
    },
    handleEnter(event) {
      this.$emit('on-enter', event);
    },
    handleFocus(event) {
      this.$emit('on-focus', event);
    },
    handleIconClick(event) {
      this.$emit('on-click', event);
    },
    handleInput(event) {
      let {value} = event.target;

      if (this.number) {
        value = Number.isNaN(Number(value)) ? value : Number(value);
      }

      this.$emit('input', value);
      this.setCurrentValue(value);
      this.$emit('on-change', event);
    },
    handleKeydown(event) {
      this.$emit('on-keydown', event);
    },
    handleKeypress(event) {
      this.$emit('on-keypress', event);
    },
    handleKeyup(event) {
      this.$emit('on-keyup', event);
    },
    onKeyup(event) {
      if (event.key === 'Enter') {
        this.handleEnter(event);
      } else {
        this.handleKeyup(event);
      }
    },
    resizeTextarea() {
      const {autosize} = this;

      if (!autosize || this.type !== 'textarea') {
        return;
      }

      const {minRows} = autosize;
      const {maxRows} = autosize;

      this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    setCurrentValue(value) {
      if (value === this.currentValue) {
        return;
      }

      this.$nextTick(() => {
        this.resizeTextarea();
      });
      this.currentValue = value;

      if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
        this.dispatch('FormItem', 'on-form-change', value);
      }
    },
  },
};
</script>
