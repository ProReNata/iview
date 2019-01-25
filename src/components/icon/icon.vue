<template>
  <i
    :class="classes"
    @click="handleClick"
  >
  </i>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    fw: Boolean,
    size: String,
    spin: Boolean,
    type: String,
    weight: String,
  },
  computed: {
    weightClass() {
      const weightMap = {
        solid: 'fas',
        regular: 'far',
        light: 'fal',
      };

      return weightMap[this.weight || 'regular'];
    },
    classes() {
      let styles = '';

      if (this.size) {
        styles += ` fa-${this.size}`;
      }

      if (this.fw) {
        styles += ' fa-fw';
      }

      if (this.spin) {
        styles += ' fa-spin';
      }

      return `${this.weightClass} fa-${this.type} ${styles}`;
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
