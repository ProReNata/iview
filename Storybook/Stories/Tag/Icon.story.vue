<template>
  <div>
    <h1>Icons</h1>
    <div>
      <h2>Default Icon</h2>
      <p>Prop {boolean} icon to append the default icon, if it has one.</p>
      <tag
        color="danger"
        border
        icon
      >
        Red / Danger
      </tag>
      <tag
        color="info"
        border
        icon
      >
        Blue / Information
      </tag>
      <tag
        color="success"
        border
        icon
      >
        Green / Success
      </tag>
      <tag
        color="update"
        border
        icon
      >
        Purple / Update
      </tag>
      <tag
        color="warning"
        border
        icon
      >
        Yellow / Warning
      </tag>
      <tag
        color="primary"
        icon
      >
        Primary
      </tag>
    </div>
    <div>
      <h2>Custom Icons</h2>
      <p>You can also use the named slots 'icon-left' or 'icon-right' to add a custom icon.</p>
      <div>
        <h3>icon-left</h3>
        <tag
          color="info"
          border
        >
          Blue / Information
          <template #icon-left>
            <icon
              type="star"
              weight="solid"
            ></icon>
          </template>
        </tag>
        <tag
          color="success"
          border
        >
          <template #icon-left>
            <icon
              type="hotdog"
              weight="solid"
            ></icon>
          </template>
          Green / Success
        </tag>
        <tag>
          <template #icon-left>
            <icon
              type="fighter-jet"
              weight="solid"
            ></icon>
          </template>
          X-wing
        </tag>
      </div>
      <div>
        <h3>icon-right</h3>
        <tag
          color="info"
          border
        >
          Blue / Information
          <template #icon-right>
            <icon
              type="star"
              weight="light"
            ></icon>
          </template>
        </tag>
        <tag
          color="success"
          border
        >
          <template #icon-right>
            <icon
              type="hotdog"
              weight="solid"
            ></icon>
          </template>
          Green / Success
        </tag>
        <tag>
          <template #icon-right>
            <icon
              type="circle"
              weight="regular"
            ></icon>
          </template>
          Death Star
        </tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagIcons',
};
</script>

<style scoped>
</style>
