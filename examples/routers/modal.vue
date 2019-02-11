<template>
  <div>
    <i-button @click="instance('info')">
      Info
    </i-button>
    <i-button @click="instance('success')">
      Success
    </i-button>
    <i-button @click="instance('warning')">
      Warning
    </i-button>
    <i-button @click="instance('error')">
      Error
    </i-button>
  </div>
</template>
<script>
export default {
  methods: {
    instance(type) {
      const title = 'Title';
      const content = '<p>Content of dialog</p><p>Content of dialog</p>';
      switch (type) {
        case 'info':
          this.$Modal.info({
            closable: true,
            content,
            title,
          });
          break;

        case 'success':
          this.$Modal.success({
            content,
            title,
          });
          break;

        case 'warning':
          this.$Modal.warning({
            content,
            title,
          });
          break;

        case 'error':
          this.$Modal.error({
            content,
            title,
          });
          break;

        default:
      }
    },
  },
};
</script>
