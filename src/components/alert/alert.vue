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
          <Icon
            :type="iconType"
            fw="true"
            weight="light"
          >
          </Icon>
        </slot>
      </div>

      <div :class="messageClasses">
        <h4 v-if="hasHeader">
          <slot name="header"></slot>
        </h4>
        <slot>
        </slot>
      </div>
      <a
        v-if="closable"
        :class="closeClasses"
        @click="close"
      >
        <slot name="close">
          <Icon
            type="times"
            fw
          >
          </Icon>
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
    showIcon: {
      default: false,
      type: Boolean,
    },
    size: String,
    type: {
      default: 'info',
      validator(value) {
        return oneOf(value, ['success', 'info', 'warning', 'danger']);
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
    hasHeader() {
      return this.$slots.header !== undefined;
    },
    closeClasses() {
      return `${prefixCls}-close`;
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
          type = 'exclamation';
          break;

        case 'update':
          type = 'star';
          break;

        case 'tip':
          type = 'lightbulb-exclamation';
          break;

        default:
          type = 'info';
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
  },
  methods: {
    close(e) {
      this.closed = true;
      this.$emit('on-close', e);
    },
  },
};
</script>
