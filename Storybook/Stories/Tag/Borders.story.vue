<template>
  <div>
    <h1>Border</h1>
    <p>prop {boolean} border.</p>
    <p>Shows a border or not.</p>
    <tag border>
      Default
    </tag>
    <tag
      color="danger"
      border
    >
      Red / Danger
    </tag>
    <tag
      color="info"
      border
    >
      Blue / Information
    </tag>
    <tag
      color="success"
      border
    >
      Green / Success
    </tag>
    <tag
      color="update"
      border
    >
      Purple / Update
    </tag>
    <tag
      color="warning"
      border
    >
      Yellow / Warning
    </tag>
    <tag
      color="primary"
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
