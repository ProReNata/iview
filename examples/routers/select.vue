<template>
  <div>
    <h1>Selects</h1>
    <p class="text-muted">
      @PARAM {string} size - [small, large]
    </p>
    <p class="text-muted">
      @PARAM {string} placeholder - undefined
    </p>
    <p class="text-muted">
      @PARAM {boolean} multiple - default: false - Big box
    </p>

    <h2>Default</h2>
    <i-select
      v-model="model1"
      placeholder="Placeholder"
      style="width:296px"
    >
      <i-option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </i-option>
    </i-select>
    <h3>Multiple</h3>
    <i-select
      v-model="model11"
      multiple
      style="width:260px"
    >
      <i-option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </i-option>
    </i-select>
    <h2>Small</h2>
    <i-select
      v-model="model1"
      size="small"
      style="width:200px;"
    >
      <i-option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </i-option>
    </i-select>
    <h3>Multiple</h3>
    <i-select
      v-model="model10"
      size="small"
      multiple
      style="width:260px"
    >
      <i-option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </i-option>
    </i-select>

    <br><br>

    <h2>Large</h2>
    <i-select
      v-model="model1"
      size="large"
      style="width:200px"
      @on-clear="onClear"
    >
      <i-option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </i-option>
    </i-select>
    <h3>Clearable</h3>
    <i-select
      v-model="model1"
      size="large"
      style="width:200px"
      clearable
      @on-clear="onClear"
    >
      <i-option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </i-option>
    </i-select>

    <h3>Multiple</h3>
    <i-select
      v-model="model10"
      size="large"
      multiple
      style="width:260px"
    >
      <i-option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </i-option>
    </i-select>
  </div>
</template>
<script>
export default {
  name: 'ExampleSelects',

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
