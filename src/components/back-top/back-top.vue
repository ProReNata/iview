<template>
  <div 
    :class="classes" 
    :style="styles" 
    @click="back"
  >
    <slot>
      <div :class="innerClasses">
        <i class="ivu-icon ivu-icon-chevron-up">
        </i>
      </div>
    </slot>
  </div>
</template>
<script>
import {scrollTop} from '../../utils/assist';
import {on, off} from '../../utils/dom';

const prefixCls = 'ivu-back-top';

export default {
  props: {
    bottom: {
      default: 30,
      type: Number,
    },
    duration: {
      default: 1000,
      type: Number,
    },
    height: {
      default: 400,
      type: Number,
    },
    right: {
      default: 30,
      type: Number,
    },
  },
  data() {
    return {
      backTop: false,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop,
        },
      ];
    },
    innerClasses() {
      return `${prefixCls}-inner`;
    },
    styles() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`,
      };
    },
  },
  mounted() {
    //            window.addEventListener('scroll', this.handleScroll, false);
    //            window.addEventListener('resize', this.handleScroll, false);
    on(window, 'scroll', this.handleScroll);
    on(window, 'resize', this.handleScroll);
  },
  beforeDestroy() {
    //            window.removeEventListener('scroll', this.handleScroll, false);
    //            window.removeEventListener('resize', this.handleScroll, false);
    off(window, 'scroll', this.handleScroll);
    off(window, 'resize', this.handleScroll);
  },
  methods: {
    back() {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop(window, sTop, 0, this.duration);
      this.$emit('on-click');
    },
    handleScroll() {
      this.backTop = window.pageYOffset >= this.height;
    },
  },
};
</script>
