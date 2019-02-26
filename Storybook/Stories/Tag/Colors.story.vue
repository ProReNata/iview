<template>
  <div>
    <h1>Colors</h1>
    <p>prop {string} color.</p>
    <p>Takes the value of one of these names in all lowercase.</p>
    <tag>Default</tag>
    <tag
      color="danger"
    >
      Red / Danger
    </tag>
    <tag
      color="info"
    >
      Blue / Info / Information
    </tag>
    <tag
      color="success"
    >
      Green / Success
    </tag>
    <tag
      color="update"
    >
      Purple / Update
    </tag>
    <tag
      color="warning"
    >
      Yellow / Warning
    </tag>
    <tag
      color="primary"
    >
      Primary
    </tag>
  </div>
</template>

<script>
export default {
  name: 'TagColors',
};
</script>

<style scoped>
</style>
