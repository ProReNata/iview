<template>
  <transition name="fade">
    <div
      v-if="!closed"
      :class="baseClasses"
    >
      <div
        v-if="showIcon"
        :class="iconClasses"
      >
        <slot name="icon">
          <icon
            :type="iconType"
            :fw="true"
            :weight="iconWeightData"
          >
          </icon>
        </slot>
      </div>

      <div :class="messageClasses">
        <h4 v-if="hasHeader">
          <slot name="header"></slot>
        </h4>

        <slot>
        </slot>
      </div>

      <div
        v-if="hasAction"
        :class="actionClasses"
      >
        <slot name="action"></slot>
      </div>

      <div
        v-if="closable"
        :class="closeClasses"
        @click="close"
      >
        <slot name="close">
          <icon
            type="times"
            fw
          >
          </icon>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from '../icon';
import {oneOf} from '../../utils/assist';

const prefixCls = 'byx-alert';

export default {
  name: 'Alert',

  components: {Icon},

  props: {
    closable: {
      default: false,
      type: Boolean,
    },
    iconWeight: {
      default: undefined,
      type: String,
    },
    showIcon: {
      default: false,
      type: Boolean,
    },
    size: {
      default: undefined,
      type: String,
    },
    condensed: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'default',
      validator(value) {
        return oneOf(value, ['default', 'success', 'info', 'warning', 'danger', 'update', 'tip']);
      },
    },
  },

  data() {
    return {
      closed: false,
      desc: false,
      iconWeightData: this.iconWeight,
    };
  },

  computed: {
    baseClasses() {
      const prefix = this.prefixConstructor('');
      const classes = this.classesConstructor(prefix, false);

      classes.push(`${prefix}-${this.type}`);

      return classes;
    },
    iconClasses() {
      const prefix = this.prefixConstructor('icon');
      const classes = this.classesConstructor(prefix, false);

      if (this.size === 'large') {
        classes.push(`${prefix}-large`);
      }

      return classes;
    },
    messageClasses() {
      const classes = this.classesConstructor('message');

      return classes;
    },
    actionClasses() {
      const classes = this.classesConstructor('action');

      return classes;
    },
    closeClasses() {
      const classes = this.classesConstructor('close');

      return classes;
    },

    hasAction() {
      return this.$slots.action !== undefined;
    },
    hasHeader() {
      return this.$slots.header !== undefined;
    },

    iconType() {
      let type = '';

      switch (this.type) {
        case 'success':
          type = 'thumbs-up';
          break;

        case 'info':
          type = 'info-circle';
          break;

        case 'warning':
          type = 'exclamation-circle';
          break;

        case 'danger':
          type = 'exclamation-triangle';
          break;

        case 'update':
          type = 'star';
          break;

        case 'tip':
          type = 'lightbulb-exclamation';
          break;

        default:
      }

      return type;
    },
  },

  mounted() {
    const standardWeight = this.size === 'large' ? 'light' : 'solid';
    this.iconWeightData = this.iconWeight || standardWeight;
  },

  methods: {
    close(e) {
      this.closed = true;
      this.$emit('on-close', e);
    },

    /**
     * Generates a new prefix based on the component prefix and a suffix.
     *
     * @param {string} suffix
     *
     * @returns {string}
     */
    prefixConstructor(suffix) {
      return suffix === '' ? prefixCls : `${prefixCls}-${suffix}`;
    },

    /**
     * Generates a classname based on the prefix.
     * Adds any extra classes based on props.
     *
     * @param {string} suffix
     * @param {boolean} generatePrefix - Takes the suffix to generate a new prefix.
     *
     * @returns {Array}
     */
    classesConstructor(suffix, generatePrefix = true) {
      let prefix;

      if (generatePrefix) {
        prefix = this.prefixConstructor(prefix);
      } else {
        prefix = suffix;
      }

      const classes = [prefix];

      if (this.condensed) {
        classes.push(`${prefix}-condensed`);
      }

      return classes;
    },
  },
};
</script>
