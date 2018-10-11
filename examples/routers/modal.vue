<template>
  <div>
    <Button @click="instance('info')">
      Info
    </Button>
    <Button @click="instance('success')">
      Success
    </Button>
    <Button @click="instance('warning')">
      Warning
    </Button>
    <Button @click="instance('error')">
      Error
    </Button>
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
