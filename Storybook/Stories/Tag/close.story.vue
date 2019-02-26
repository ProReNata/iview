<template>
  <div>
    <h1>Closable</h1>
    <p>prop {boolean} closable.</p>
    <p>prop {boolean=true} fade. Shows a fade effect. Is enabled on default.</p>
    <p>Shows a button to close the tag, which emits an 'on-close' event when clicked.</p>
    <tag
      v-show="!hideDefault"
      closable
      @on-close="hideDefault = true"
    >
      Default
    </tag>
    <tag
      v-show="!hideRed"
      color="danger"
      border
      closable
      @on-close="hideRed = true"
    >
      Red / Danger
    </tag>
    <tag
      v-show="!hideBlue"
      color="info"
      border
      closable
      @on-close="hideBlue = true"
    >
      Blue / Information
    </tag>
    <tag
      v-show="!hideGreen"
      color="success"
      border
      closable
      @on-close="hideGreen = true"
    >
      Green / Success
    </tag>
    <tag
      v-show="!hidePurple"
      color="update"
      border
      closable
      @on-close="hidePurple = true"
    >
      Purple / Update
    </tag>
    <tag
      v-show="!hideYellow"
      color="warning"
      border
      closable
      @on-close="hideYellow = true"
    >
      Yellow / Warning
    </tag>
    <tag
      v-show="!hidePrimary"
      color="primary"
      closable
      @on-close="hidePrimary = true"
    >
      Primary
    </tag>
  </div>
</template>

<script>
export default {
  name: 'TagClosable',
  data() {
    return {
      hideDefault: false,
      hideRed: false,
      hideBlue: false,
      hideGreen: false,
      hidePurple: false,
      hideYellow: false,
      hidePrimary: false,
    };
  },
};
</script>

<style scoped>
</style>
