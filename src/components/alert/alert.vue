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
            fw
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
import Icon, {isOneOfIconWeights} from 'Components/icon';
import isOneOf from 'Global/Assets/isOneOf';

const prefixCls = 'byx-alert';
const EMPTY_STRING = '';
const DEFAULT = 'default';
const SUCCESS = 'success';
const INFO = 'info';
const WARNING = 'warning';
const DANGER = 'danger';
const UPDATE = 'update';
const TIP = 'tip';
const TYPES = Object.freeze([DEFAULT, SUCCESS, INFO, WARNING, DANGER, UPDATE, TIP]);
const LARGE = 'large';
const LIGHT = 'light';
const SOLID = 'solid';
const ICON_TYPE_MAP = Object.create(null, {
  [SUCCESS]: {
    enumerable: true,
    value: 'thumbs-up',
  },
  [INFO]: {
    enumerable: true,
    value: 'info-circle',
  },
  [WARNING]: {
    enumerable: true,
    value: 'exclamation-circle',
  },
  [DANGER]: {
    enumerable: true,
    value: 'exclamation-triangle',
  },
  [UPDATE]: {
    enumerable: true,
    value: 'star',
  },
  [TIP]: {
    enumerable: true,
    value: 'lightbulb-exclamation',
  },
});

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
      validator: isOneOfIconWeights,
    },
    showIcon: {
      default: false,
      type: Boolean,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return value === LARGE;
      },
    },
    condensed: {
      default: false,
      type: Boolean,
    },
    type: {
      default: DEFAULT,
      validator(value) {
        return isOneOf(value, TYPES);
      },
    },
  },

  data() {
    return {
      closed: false,
      desc: false,
    };
  },

  computed: {
    baseClasses() {
      const prefix = this.prefixConstructor(EMPTY_STRING);
      const classes = this.classesConstructor(prefix, false);

      classes.push(`${prefix}-${this.type}`);

      return classes;
    },
    iconClasses() {
      const prefix = this.prefixConstructor('icon');
      const classes = this.classesConstructor(prefix, false);

      if (this.size === LARGE) {
        classes.push(`${prefix}-large`);
      }

      return classes;
    },
    messageClasses() {
      return this.classesConstructor('message');
    },
    actionClasses() {
      return this.classesConstructor('action');
    },
    closeClasses() {
      return this.classesConstructor('close');
    },
    hasAction() {
      return Boolean(this.$slots.action);
    },
    hasHeader() {
      return Boolean(this.$slots.header);
    },
    iconType() {
      return ICON_TYPE_MAP[this.type] || EMPTY_STRING;
    },
    iconWeightData() {
      return this.iconWeight || this.standardWeight;
    },
    standardWeight() {
      return this.size === LARGE ? LIGHT : SOLID;
    },
  },

  methods: {
    close(event) {
      this.closed = true;
      this.$emit('on-close', event);
    },

    /**
     * Generates a new prefix based on the component prefix and a suffix.
     *
     * @param {string} suffix - Add this to the prefix.
     *
     * @returns {string} - Prefix based on custom String.
     */
    prefixConstructor(suffix) {
      return suffix === EMPTY_STRING ? prefixCls : `${prefixCls}-${suffix}`;
    },

    /**
     * Generates a classname based on the prefix.
     * Adds any extra classes based on props.
     *
     * @param {string} suffix - Used to generate the prefix.
     * @param {boolean} generatePrefix - Set to false if you pass in the whole prefix as suffix.
     *
     * @returns {Array} - All classes with the prefix.
     */
    classesConstructor(suffix, generatePrefix = true) {
      const prefix = generatePrefix ? this.prefixConstructor(suffix) : suffix;
      const classes = [prefix];

      if (this.condensed) {
        classes.push(`${prefix}-condensed`);
      }

      return classes;
    },
  },
};
</script>
