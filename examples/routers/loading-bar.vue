<template>
  <div>
    <i-button @click.native="start">
      Start
    </i-button>
    <i-button @click.native="finish">
      Finish
    </i-button>
    <i-button @click.native="error">
      Error
    </i-button>
  </div>
</template>
<script>
export default {
  created() {
    this.$Loading.config({
      color: '#5cb85c',
      failedColor: '#f0ad4e',
      height: 5,
    });
  },
  methods: {
    error() {
      this.$Loading.error();
    },
    finish() {
      this.$Loading.finish();
    },
    start() {
      this.$Loading.start();
    },
  },
};
</script>
