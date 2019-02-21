<template>
  <div>
    <h2>Fixed Width</h2>
    <icon
      type="times"
      fw
    >
    </icon>
    <icon
      type="arrow-left"
      weight="solid"
      :fw="true"
    ></icon>
    <icon
      type="chevron-down"
      weight="light"
      fw
    >
    </icon>
  </div>
</template>

<script>
export default {
  name: 'IconFixedWidth',
};
</script>

<style scoped>
</style>
