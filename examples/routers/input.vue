<template>
  <div style="width: 200px;margin: 100px;">
    {{ value6 }}
    <i-input
      v-model="value5"
      type="textarea"
      placeholder="Enter something..."
    ></i-input>
    <i-input
      v-model="value6"
      type="textarea"
      :rows="4"
      placeholder="Enter something..."
    ></i-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value5: '',
      value6: '',
    };
  },
};
</script>
