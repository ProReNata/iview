<template>
  <label>
    <textarea
      ref="redactor"
      :name="name"
      :placeholder="placeholder"
      :value="value"
    ></textarea>
  </label>
</template>

<script>
import Vue from 'vue';
import stubObject from 'lodash/stubObject';
import $R from './redactor-3_1_6/redactor/redactor';

const NAME = 'Richtext';
const EMPTY_STRING = '';

export default {
  name: NAME,

  redactor: false,

  props: {
    value: {
      default: EMPTY_STRING,
      type: String,
    },
    placeholder: {
      default: null,
      type: String,
    },
    name: {
      default: null,
      type: String,
    },
    config: {
      default: stubObject,
      type: Object,
    },
  },
  watch: {
    value(newValue) {
      if (!this.redactor.editor.isFocus()) {
        this.redactor.source.setCode(newValue);
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const me = this;
      const callbacks = {
        changed(html) {
          me.handleInput(html);

          return html;
        },
      };

      // extend config
      Vue.set(this.config, 'callbacks', callbacks);

      // call Redactor
      const app = $R(this.$refs.redactor, this.config);

      // set instance
      this.redactor = app;
      this.$parent.redactor = app;
    },
    handleInput(val) {
      this.$emit('input', val);
    },
  },
};
</script>
