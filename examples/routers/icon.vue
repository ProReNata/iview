<template>
  <div>
    <h1>Icons</h1>
    <p>
      Check <a href="https://fontawesome.com/icons">
        Fontawesome
      </a> for all the icon names
    </p>
    <p class="text-muted">
      @PARAM {string} weight - default: regular - The weight of the icon. Available weights: regular, solid or light
    </p>
    <p class="text-muted">
      @PARAM {string} type - required - Name of the icon
    </p>
    <p class="text-muted">
      @PARAM {boolean} fw - default: false - Full width icon if true
    </p>
    <h2>Regular</h2>
    <icon
      type="times"
      fw
    >
    </icon>
    <icon
      type="arrow-left"
    ></icon>
    <icon
      type="chevron-down"
    >
    </icon>
    <h2>Solid</h2>
    <icon
      type="arrow-left"
      weight="solid"
    ></icon>
    <icon
      type="chevron-down"
      weight="solid"
    >
    </icon>
    <h2>Light</h2>
    <icon
      type="arrow-left"
      weight="light"
    ></icon>
    <icon
      type="chevron-down"
      weight="light"
    >
    </icon>
  </div>
</template>

<script>
export default {
  name: 'IconVue',
};
</script>

<style scoped>
</style>
