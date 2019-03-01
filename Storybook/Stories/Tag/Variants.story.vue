<template>
  <div>
    <h1>Variants</h1>
    <p>prop {string} variant.</p>
    <p>Takes the value of one of these names in all lowercase.</p>
    <tag>Default</tag>
    <tag
      variant="danger"
    >
      Danger
    </tag>
    <tag
      variant="info"
    >
      Info / Information
    </tag>
    <tag
      variant="success"
    >
      Success
    </tag>
    <tag
      variant="update"
    >
      Update
    </tag>
    <tag
      variant="warning"
    >
      Warning
    </tag>
    <tag
      variant="primary"
    >
      Primary
    </tag>
  </div>
</template>

<script>
export default {
  name: 'TagVariants',
};
</script>

<style scoped>
</style>
