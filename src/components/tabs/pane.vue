<template>
  <div 
    v-show="show" 
    :class="prefixCls"
  >
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = 'ivu-tabs-tabpane';

export default {
  name: 'TabPane',
  props: {
    closable: {
      default: null,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    icon: {
      type: String,
    },
    label: {
      default: '',
      type: [String, Function],
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      currentName: this.name,
      prefixCls,
      show: true,
    };
  },
  watch: {
    disabled() {
      this.updateNav();
    },
    icon() {
      this.updateNav();
    },
    label() {
      this.updateNav();
    },
    name(val) {
      this.currentName = val;
      this.updateNav();
    },
  },
  mounted() {
    this.updateNav();
  },
  destroyed() {
    this.updateNav();
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    },
  },
};
</script>
