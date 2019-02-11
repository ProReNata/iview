<template>
  <div>
    <input-number
      v-model="valueNull"
      style="width: 200px"
      :min="0"
      :max="10000"
      :precision="2"
    >
    </input-number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      formatter2: (value) => `${value}%`,
      parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
      parser2: (value) => value.replace('%', ''),
      value1: 1800000,
      value2: 55,
      value3: 100,
      valueNull: null,
    };
  },
  methods: {
    change(v) {
      console.log(v);
    },
    focus(e) {
      e.target.select();
    },
  },
};
</script>
