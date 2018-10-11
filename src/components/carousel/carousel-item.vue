<template>
  <div 
    :class="prefixCls" 
    :style="styles"
  >
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = 'ivu-carousel-item';

export default {
  componentName: 'carousel-item',
  name: 'CarouselItem',
  data() {
    return {
      height: 'auto',
      left: 0,
      prefixCls,
      width: 0,
    };
  },
  computed: {
    styles() {
      return {
        height: `${this.height}`,
        left: `${this.left}px`,
        width: `${this.width}px`,
      };
    },
  },
  watch: {
    width(val) {
      if (val && this.$parent.loop) {
        this.$nextTick(() => {
          this.$parent.initCopyTrackDom();
        });
      }
    },
  },
  mounted() {
    this.$parent.slotChange();
  },
  beforeDestroy() {
    this.$parent.slotChange();
  },
};
</script>
