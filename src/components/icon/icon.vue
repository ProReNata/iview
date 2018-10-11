<template>
  <i 
    :class="classes" 
    :style="styles" 
    @click="handleClick"
  >
  </i>
</template>
<script>
const prefixCls = 'ivu-icon';

export default {
  name: 'Icon',
  props: {
    color: String,
    size: [Number, String],
    type: String,
  },
  computed: {
    classes() {
      return `${prefixCls} ${prefixCls}-${this.type}`;
    },
    styles() {
      const style = {};

      if (this.size) {
        style['font-size'] = `${this.size}px`;
      }

      if (this.color) {
        style.color = this.color;
      }

      return style;
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
