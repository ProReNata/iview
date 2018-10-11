<template>
  <div>
    <Select
      v-model="model1"
      size="small"
      style="width:200px;"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
    <Select
      v-model="model10"
      size="small"
      multiple
      style="width:260px"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>

    <br><br>

    <Select
      v-model="model1"
      size="large"
      style="width:200px"
      clearable
      @on-clear="onClear"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
    <Select
      v-model="model10"
      size="large"
      multiple
      style="width:260px"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>

    <br><br>

    <Select
      v-model="model1"
      style="width:200px"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
    <Select
      v-model="model11"
      multiple
      style="width:260px"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
    <Select
      v-model="model10"
      multiple
      style="width:260px"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>

    <br><br>

    <br><br>

    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <Select
      v-model="model10"
      multiple
      style="width:260px"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
    <br><br>

    <br><br>

    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <Select
      v-model="model10"
      multiple
      style="width:260px"
    >
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [
        {
          label: 'New York',
          value: 'New York',
        },
        {
          label: '中国',
          value: '中国',
        },
        {
          label: 'Sydney',
          value: 'Sydney',
        },
        {
          label: 'Ottawa',
          value: 'Ottawa',
        },
        {
          label: 'Paris',
          value: 'Paris',
        },
        {
          label: 'Canberra',
          value: 'Canberra',
        },
      ],
      model1: '',
      model10: [],
      model11: [],
    };
  },
  methods: {
    onClear() {
      console.log('onClear');
    },
  },
};
</script>
