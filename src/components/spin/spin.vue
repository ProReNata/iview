<template>
  <transition name="fade">
    <div 
      v-if="fullscreenVisible" 
      :class="classes"
    >
      <div :class="mainClasses">
        <span :class="dotClasses">
        </span>
        <div :class="textClasses">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {oneOf} from '../../utils/assist';
import ScrollbarMixins from '../modal/mixins-scrollbar';

const prefixCls = 'ivu-spin';

export default {
  name: 'Spin',
  mixins: [ScrollbarMixins],
  props: {
    fix: {
      default: false,
      type: Boolean,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large']);
      },
    },
  },
  data() {
    return {
      showText: false,
      // used for $Spin
      visible: false,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-fix`]: this.fix,
          [`${prefixCls}-show-text`]: this.showText,
          [`${prefixCls}-fullscreen`]: this.fullscreen,
        },
      ];
    },
    dotClasses() {
      return `${prefixCls}-dot`;
    },
    fullscreenVisible() {
      if (this.fullscreen) {
        return this.visible;
      }

      return true;
    },
    mainClasses() {
      return `${prefixCls}-main`;
    },
    textClasses() {
      return `${prefixCls}-text`;
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.addScrollEffect();
      } else {
        this.removeScrollEffect();
      }
    },
  },
  mounted() {
    this.showText = this.$slots.default !== undefined;
  },
};
</script>
