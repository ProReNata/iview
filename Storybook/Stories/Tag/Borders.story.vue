<template>
  <div>
    <h1>Border</h1>
    <p>prop {boolean} border.</p>
    <p>Shows a border or not.</p>
    <tag border>
      Default
    </tag>
    <tag
      variant="danger"
      border
    >
      Red / Danger
    </tag>
    <tag
      variant="info"
      border
    >
      Blue / Information
    </tag>
    <tag
      variant="success"
      border
    >
      Green / Success
    </tag>
    <tag
      variant="update"
      border
    >
      Purple / Update
    </tag>
    <tag
      variant="warning"
      border
    >
      Yellow / Warning
    </tag>
    <tag
      variant="primary"
      border
    >
      Primary
    </tag>
  </div>
</template>

<script>
export default {
  name: 'TagBorders',
};
</script>

<style scoped>
</style>
