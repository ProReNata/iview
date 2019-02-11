<template>
  <div>
    <rate v-model="value">
    </rate>
    <rate
      v-model="valueHalf"
      allow-half
    >
    </rate>
    <rate
      v-model="valueClear"
      clearable
    >
    </rate>
    <rate
      v-model="valueClearHalf"
      clearable
      allow-half
    >
    </rate>
    <!--<Rate show-text v-model="valueText"></Rate>-->
    <!--<Rate show-text allow-half v-model="valueCustomText">-->
    <!--<span style="color: #f5a623">{{ valueCustomText }}</span>-->
    <!--</Rate>-->
    <!--<Rate disabled  allow-half v-model="valueDisabled"></Rate>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      valueClear: 1,
      valueClearHalf: 1.5,
      valueCustomText: 4.0,
      valueDisabled: 2.4,
      valueHalf: 2.5,
      valueText: 3,
    };
  },
};
</script>
