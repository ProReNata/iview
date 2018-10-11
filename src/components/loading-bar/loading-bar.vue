<template>
  <transition name="fade">
    <div 
      v-show="show" 
      :class="classes" 
      :style="outerStyles"
    >
      <div 
        :class="innerClasses" 
        :style="styles"
      >
      </div>
    </div>
  </transition>
</template>
<script>
//    import { oneOf } from '../../utils/assist';

const prefixCls = 'ivu-loading-bar';

export default {
  props: {
    //            percent: {
    //                type: Number,
    //                default: 0
    //            },
    color: {
      default: 'primary',
      type: String,
    },
    failedColor: {
      default: 'error',
      type: String,
    },
    height: {
      default: 2,
      type: Number,
    },
    //            status: {
    //                type: String,
    //                validator (value) {
    //                    return oneOf(value, ['success', 'error']);
    //                },
    //                default: 'success'
    //            },
    //            show: {
    //                type: Boolean,
    //                default: false
    //            }
  },
  data() {
    return {
      percent: 0,
      show: false,
      //                color: 'primary',
      //                failedColor: 'error',
      //                height: 2,
      status: 'success',
    };
  },
  computed: {
    classes() {
      return `${prefixCls}`;
    },
    innerClasses() {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-color-primary`]: this.color === 'primary' && this.status === 'success',
          [`${prefixCls}-inner-failed-color-error`]: this.failedColor === 'error' && this.status === 'error',
        },
      ];
    },
    outerStyles() {
      return {
        height: `${this.height}px`,
      };
    },
    styles() {
      const style = {
        height: `${this.height}px`,
        width: `${this.percent}%`,
      };

      if (this.color !== 'primary' && this.status === 'success') {
        style.backgroundColor = this.color;
      }

      if (this.failedColor !== 'error' && this.status === 'error') {
        style.backgroundColor = this.failedColor;
      }

      return style;
    },
  },
};
</script>
