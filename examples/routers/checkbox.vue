<template>
  <div>
    <checkbox
      :indeterminate="true"
      :value="false"
      size="large"
    >
      全选
    </checkbox>
    <checkbox
      :indeterminate="true"
      :value="false"
      size="default"
    >
      全选
    </checkbox>
    <checkbox
      :indeterminate="true"
      :value="false"
      size="small"
    >
      全选
    </checkbox>
    <div>
      <checkbox
        v-model="testValue1"
        size="large"
        true-value="true"
        false-value="false"
      >
        Apple
      </checkbox>
      <checkbox
        v-model="testValue1"
        true-value="true"
        false-value="false"
        disabled
      >
        Apple
      </checkbox>
      <checkbox
        v-model="testValue1"
        size="small"
        true-value="true"
        false-value="false"
      >
        Apple
      </checkbox>
      {{ testValue1 }}
    </div>
    <div>
      <checkbox
        v-model="testValue2"
        :true-value="0"
        :false-value="1"
      >
        test number
      </checkbox>
      {{ testValue2 }}
    </div>
    <checkbox-group
      v-model="fruit"
      size="large"
    >
      <checkbox
        v-for="item in tags"
        :key="item.label"
        :label="item.label"
        true-value="true"
      >
      </checkbox>
    </checkbox-group>
    <div>{{ fruit }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fruit: ['苹果'],
      social: ['facebook', 'github'],
      tags: [],
      testValue1: null,
      testValue2: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.tags = [
        {
          label: '香蕉',
        },
        {
          label: '苹果',
        },
        {
          label: '西瓜',
        },
      ];
    }, 1000);
  },
};
</script>
