<template>
  <richtext
    v-model="model"
    :placeholder="placeholder"
    :name="name"
    :config="config"
  ></richtext>
</template>

<script>
export default {
  data() {
    return {
      model: '',
      placeholder: 'Edit stuff here',
      name: 'my-redactor',
      config: {},
    };
  },

  methods: {},
};
</script>
