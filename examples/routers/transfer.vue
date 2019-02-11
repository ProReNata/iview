<template>
  <transfer
    :data="data1"
    :target-keys="targetKeys1"
    :render-format="render1"
    @on-change="handleChange1"
  >
  </transfer>
</template>

<script>
export default {
  data() {
    return {
      data1: this.getMockData(),
      targetKeys1: this.getTargetKeys(),
    };
  },

  methods: {
    getMockData() {
      const mockData = [];
      for (let i = 1; i <= 20; i += 1) {
        mockData.push({
          description: `内容${i}的描述信息`,
          disabled: Math.random() * 3 < 1,
          key: i.toString(),
          label: `内容${i}`,
        });
      }

      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map((item) => item.key);
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);
      this.targetKeys1 = newTargetKeys;
    },
    render1(item) {
      return item.label;
    },
  },
};
</script>
