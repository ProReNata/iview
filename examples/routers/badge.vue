<style scoped>
.demo-badge {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
</style>
<style>
.demo-badge-alone {
  background: #5cb85c !important;
}
</style>
<template>
  <div>
    <badge
      dot
      :count="count"
    >
      <a
        href="#"
        class="demo-badge"
      >
      </a>
    </badge>
    <i-button @click="setCount">
      set count
    </i-button>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      count: 50,
    };
  },
  methods: {
    setCount() {
      this.count = 10;
    },
  },
};
</script>
