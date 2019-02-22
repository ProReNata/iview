<template>
  <div :class="classes">
    <label
      v-if="label || $slots.label"
      :class="[prefixCls + '-label']"
      :for="labelFor"
      :style="labelStyles"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div
      :class="[prefixCls + '-content']"
      :style="contentStyles"
    >
      <slot></slot>
      <transition name="fade">
        <div
          v-if="validateState === 'error' && showMessage && form.showMessage"
          :class="[prefixCls + '-error-tip']"
        >
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import noop from 'lodash/noop';
import AsyncValidator from 'async-validator';
import Emitter from 'Src/mixins/emitter';

const prefixCls = 'ivu-form-item';

function getPropByPath(obj, pathString) {
  let tempObj = obj;
  let path = pathString.replace(/\[(\w+)]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;

  for (let len = keyArr.length; i < len - 1; i += 1) {
    const key = keyArr[i];

    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error('[iView warn]: please transfer a valid prop path to form item!');
    }
  }

  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]],
  };
}

export default {
  name: 'FormItem',

  mixins: [Emitter],

  props: {
    error: {
      default: undefined,
      type: String,
    },
    label: {
      default: '',
      type: String,
    },
    labelFor: {
      default: undefined,
      type: String,
    },
    labelWidth: {
      default: undefined,
      type: Number,
    },
    prop: {
      default: undefined,
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    rules: {
      default: undefined,
      type: [Object, Array],
    },
    showMessage: {
      default: true,
      type: Boolean,
    },
    validateStatus: {
      type: Boolean,
    },
  },

  data() {
    return {
      isRequired: false,
      prefixCls,
      validateDisabled: false,
      validateMessage: '',
      validateState: '',
      validator: {},
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-required`]: this.required || this.isRequired,
          [`${prefixCls}-error`]: this.validateState === 'error',
          [`${prefixCls}-validating`]: this.validateState === 'validating',
        },
      ];
    },
    contentStyles() {
      const style = {};
      const labelWidth = this.labelWidth || this.form.labelWidth;

      if (labelWidth) {
        style.marginLeft = `${labelWidth}px`;
      }

      return style;
    },
    // form() {
    //    let parent = this.$parent;
    //    while (parent.$options.name !== 'iForm') {
    //        parent = parent.$parent;
    //    }
    //    return parent;
    // },
    fieldValue: {
      cache: false,
      get() {
        const {model} = this.form;

        if (!model || !this.prop) {
          return undefined;
        }

        let path = this.prop;

        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        return getPropByPath(model, path).v;
      },
    },
    labelStyles() {
      const style = {};
      const labelWidth = this.labelWidth || this.form.labelWidth;

      if (labelWidth) {
        style.width = `${labelWidth}px`;
      }

      return style;
    },
  },

  watch: {
    error(val) {
      this.validateMessage = val;
      this.validateState = val === '' ? '' : 'error';
    },
    validateStatus(val) {
      this.validateState = val;
    },
  },

  inject: ['form'],

  mounted() {
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this);

      Object.defineProperty(this, 'initialValue', {
        value: this.fieldValue,
      });

      const rules = this.getRules();

      if (rules.length) {
        rules.every((rule) => {
          if (rule.required) {
            this.isRequired = true;

            return false;
          }

          return undefined;
        });
        this.$on('on-form-blur', this.onFieldBlur);
        this.$on('on-form-change', this.onFieldChange);
      }
    }
  },
  beforeDestroy() {
    this.dispatch('iForm', 'on-form-item-remove', this);
  },
  methods: {
    getFilteredRule(trigger) {
      const rules = this.getRules();

      return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(selfRules || formRules || []);
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;

        return;
      }

      this.validate('change');
    },
    resetField() {
      this.validateState = '';
      this.validateMessage = '';

      const {model} = this.form;
      const value = this.fieldValue;
      let path = this.prop;

      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      const prop = getPropByPath(model, path);

      //                if (Array.isArray(value) && value.length > 0) {
      //                    this.validateDisabled = true;
      //                    prop.o[prop.k] = [];
      //                } else if (value !== this.initialValue) {
      //                    this.validateDisabled = true;
      //                    prop.o[prop.k] = this.initialValue;
      //                }
      if (Array.isArray(value)) {
        this.validateDisabled = true;
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        this.validateDisabled = true;
        prop.o[prop.k] = this.initialValue;
      }
    },
    validate(trigger, callback = noop) {
      const rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        callback();

        return;
      }

      this.validateState = 'validating';

      const descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, {firstFields: true}, (errors) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage);
      });
      this.validateDisabled = false;
    },
  },
};
</script>
