<template>
  <transition name="fade">
    <div
      v-if="!closed"
      :class="wrapClasses"
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

      <a
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
      </a>
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
    type: {
      default: 'default',
      validator(value) {
        return Boolean(oneOf(value, ['default', 'success', 'info', 'warning', 'danger', 'update', 'tip']));
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
    actionClasses() {
      return `${prefixCls}-action`;
    },
    closeClasses() {
      return `${prefixCls}-close`;
    },
    hasAction() {
      return this.$slots.action !== undefined;
    },
    hasHeader() {
      return this.$slots.header !== undefined;
    },
    iconClasses() {
      let iconClasses = `${prefixCls}-icon`;

      if (this.size === 'large') {
        iconClasses += ` ${prefixCls}-icon-large`;
      }

      return iconClasses;
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
    messageClasses() {
      return `${prefixCls}-message`;
    },
    wrapClasses() {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`];
    },
  },

  mounted() {
    this.header = this.$slots.header !== undefined;
    const standardWeight = this.size === 'large' ? 'light' : 'solid';
    this.iconWeightData = this.iconWeight || standardWeight;
  },

  methods: {
    close(e) {
      this.closed = true;
      this.$emit('on-close', e);
    },
  },
};
</script>
