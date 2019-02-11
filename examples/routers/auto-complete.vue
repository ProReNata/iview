<template>
  <div style="margin: 100px;width: 200px;">
    <auto-complete
      v-model="value"
      placement="top"
      transfer
      icon="ios-search"
      :data="data"
      :filter-method="fm"
      @on-search="handleSearch"
      @on-change="hc"
    >
      <!--<Option v-for="item in data" :value="item" :label="item" :key="item">-->
      <!--<span style="color: red">{{ item }}</span>-->
      <!--</Option>-->
    </auto-complete>
  </div>
</template>
<script>
import noop from 'lodash/noop';

export default {
  props: {},
  data() {
    return {
      //                data: ['Burns Bay Road', 'Downing Street', 'Wall Street']
      data: [],
      value: '',
    };
  },
  computed: {},
  methods: {
    fm(value, item) {
      return item.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    handleSearch(value) {
      this.data = !value ? [] : [`${value}@qq.com`, `${value}@sina.com`, `${value}@163.com`];
    },
    hc: noop,
    // hc(v) {
    //   console.log(v);
    // },
  },
};
</script>
