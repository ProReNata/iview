<template>
  <div>
    <h1>Dismissable</h1>
    <p>prop {boolean} dismissable.</p>
    <p>Shows a button to close the tag, which emits an 'on-close' event when clicked.</p>
    <tag
      v-show="!hideDefault"
      dismissable
      @on-close="hideDefault = true"
    >
      Default
    </tag>
    <tag
      v-show="!hideDanger"
      color="danger"
      border
      dismissable
      @on-close="hideDanger = true"
    >
      Red / Danger
    </tag>
    <tag
      v-show="!hideInfo"
      color="info"
      border
      dismissable
      @on-close="hideInfo = true"
    >
      Blue / Information
    </tag>
    <tag
      v-show="!hideSuccess"
      color="success"
      border
      dismissable
      @on-close="hideSuccess = true"
    >
      Green / Success
    </tag>
    <tag
      v-show="!hideUpdate"
      color="update"
      border
      dismissable
      @on-close="hideUpdate = true"
    >
      Purple / Update
    </tag>
    <tag
      v-show="!hideWarning"
      color="warning"
      border
      dismissable
      @on-close="hideWarning = true"
    >
      Yellow / Warning
    </tag>
    <tag
      v-show="!hidePrimary"
      color="primary"
      dismissable
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
      hideDanger: false,
      hideInfo: false,
      hideSuccess: false,
      hideUpdate: false,
      hideWarning: false,
      hidePrimary: false,
    };
  },
};
</script>

<style scoped>
</style>
