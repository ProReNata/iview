<template>
  <form
    :class="classes"
    :autocomplete="autocomplete"
  >
    <slot></slot>
  </form>
</template>

<script>
// https://github.com/ElemeFE/element/blob/dev/packages/form/src/form.vue
import isOneOf from 'Global/Assets/isOneOf';

const prefixCls = 'ivu-form';

export default {
  name: 'IForm',

  props: {
    autocomplete: {
      default: 'off',
      type: String,
      validator(value) {
        return isOneOf(value, ['on', 'off']);
      },
    },
    inline: {
      default: false,
      type: Boolean,
    },
    labelPosition: {
      default: 'right',
      validator(value) {
        return isOneOf(value, ['left', 'right', 'top']);
      },
    },
    labelWidth: {
      default: undefined,
      type: Number,
    },
    model: {
      default: undefined,
      type: Object,
    },
    rules: {
      default: undefined,
      type: Object,
    },
    showMessage: {
      default: true,
      type: Boolean,
    },
  },

  provide() {
    return {form: this};
  },

  data() {
    return {
      fields: [],
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-label-${this.labelPosition}`,
        {
          [`${prefixCls}-inline`]: this.inline,
        },
      ];
    },
  },

  watch: {
    rules() {
      this.validate();
    },
  },

  created() {
    this.$on('on-form-item-add', (field) => {
      if (field) {
        this.fields.push(field);
      }

      return false;
    });
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }

      return false;
    });
  },

  methods: {
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    validate(callback) {
      /* eslint-disable-next-line compat/compat */
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate('', (errors) => {
            if (errors) {
              valid = false;
            }

            count += 1;

            if (count === this.fields.length) {
              // all finish
              resolve(valid);

              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    },
    validateField(prop, cb) {
      const field = this.fields.filter((fieldItem) => fieldItem.prop === prop)[0];

      if (!field) {
        throw new Error('[iView warn]: must call validateField with valid prop string!');
      }

      field.validate('', cb);
    },
  },
};
</script>
