<template>
  <div>
    <richtext
      v-model="model"
      name="my-redactor"
      placeholder="Enter text..."
      :disabled="disabled"
    >
    </richtext>
    <br>
    <div>{{ model }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      model: '',
    };
  },
};
</script>
