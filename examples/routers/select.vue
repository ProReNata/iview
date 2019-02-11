<template>
  <div>
    <select
      v-model="model1"
      size="small"
      style="width:200px;"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <select
      v-model="model10"
      size="small"
      multiple
      style="width:260px"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>

    <br><br>

    <select
      v-model="model1"
      size="large"
      style="width:200px"
      clearable
      @on-clear="onClear"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <select
      v-model="model10"
      size="large"
      multiple
      style="width:260px"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>

    <br><br>

    <select
      v-model="model1"
      style="width:200px"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <select
      v-model="model11"
      multiple
      style="width:260px"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <select
      v-model="model10"
      multiple
      style="width:260px"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>

    <br><br>

    <br><br>

    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <select
      v-model="model10"
      multiple
      style="width:260px"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <br><br>

    <br><br>

    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <select
      v-model="model10"
      multiple
      style="width:260px"
    >
      <option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
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
