<template>
  <transition name="fade">
    <div
      v-if="!closed"
      :class="wrapClasses"
    >
      <span
        v-if="showIcon"
        :class="iconClasses"
      >
        <slot name="icon">
          <Icon :type="iconType">
          </Icon>
        </slot>
      </span>
      <span :class="messageClasses">
        <slot></slot>
      </span>
      <span :class="descClasses">
        <slot name="desc">
        </slot>
      </span>
      <a
        v-if="closable"
        :class="closeClasses"
        @click="close"
      >
        <slot name="close">
          <Icon type="ios-close-empty">
          </Icon>
        </slot>
      </a>
    </div>
  </transition>
</template>
<script>
import Icon from '../icon';
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-alert';

export default {
  name: 'Alert',
  components: {Icon},
  props: {
    banner: {
      default: false,
      type: Boolean,
    },
    closable: {
      default: false,
      type: Boolean,
    },
    showIcon: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'info',
      validator(value) {
        return oneOf(value, ['success', 'info', 'warning', 'error']);
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
    closeClasses() {
      return `${prefixCls}-close`;
    },
    descClasses() {
      return `${prefixCls}-desc`;
    },
    iconClasses() {
      return `${prefixCls}-icon`;
    },
    iconType() {
      let type = '';

      switch (this.type) {
        case 'success':
          type = 'checkmark-circled';
          break;

        case 'info':
          type = 'information-circled';
          break;

        case 'warning':
          type = 'android-alert';
          break;

        case 'error':
          type = 'close-circled';
          break;

        default:
      }

      return type;
    },
    messageClasses() {
      return `${prefixCls}-message`;
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-with-icon`]: this.showIcon,
          [`${prefixCls}-with-desc`]: this.desc,
          [`${prefixCls}-with-banner`]: this.banner,
        },
      ];
    },
  },
  mounted() {
    this.desc = this.$slots.desc !== undefined;
  },
  methods: {
    close(e) {
      this.closed = true;
      this.$emit('on-close', e);
    },
  },
};
</script>
