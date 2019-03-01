<template>
  <div>
    <h1>Icons</h1>
    <div>
      <h2>Default Icon</h2>
      <p>Prop {boolean} icon</p>
      <p>Appends the default icon, if it has one.</p>
      <tag
        icon
      >
        Default
      </tag>
      <tag
        variant="danger"
        border
        icon
      >
        Red / Danger
      </tag>
      <tag
        variant="info"
        border
        icon
      >
        Blue / Information
      </tag>
      <tag
        variant="success"
        border
        icon
      >
        Green / Success
      </tag>
      <tag
        variant="update"
        border
        icon
      >
        Purple / Update
      </tag>
      <tag
        variant="warning"
        border
        icon
      >
        Yellow / Warning
      </tag>
      <tag
        variant="primary"
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
          variant="info"
          border
        >
          Blue / Information
          <template #icon-left>
            <icon
              type="star"
              weight="solid"
              fw
            ></icon>
          </template>
        </tag>
        <tag
          variant="success"
          border
        >
          <template #icon-left>
            <icon
              type="hotdog"
              weight="solid"
              fw
            ></icon>
          </template>
          Green / Success
        </tag>
        <tag>
          <template #icon-left>
            <icon
              type="fighter-jet"
              weight="solid"
              fw
            ></icon>
          </template>
          X-wing
        </tag>
      </div>
      <div>
        <h3>icon-right</h3>
        <tag
          variant="info"
          border
        >
          Blue / Information
          <template #icon-right>
            <icon
              type="star"
              weight="light"
              fw
            ></icon>
          </template>
        </tag>
        <tag
          variant="success"
          border
        >
          <template #icon-right>
            <icon
              type="hotdog"
              weight="solid"
              fw
            ></icon>
          </template>
          Green / Success
        </tag>
        <tag>
          <template #icon-right>
            <icon
              type="circle"
              weight="regular"
              fw
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
