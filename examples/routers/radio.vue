<template>
  <div>
    <radio
      v-model="single"
      size="large"
    >
      Radio
    </radio>
    <radio
      v-model="single"
      size="default"
    >
      Radio
    </radio>
    <radio
      v-model="single"
      size="small"
    >
      Radio
    </radio>
    <br><br>
    <radio-group v-model="phone">
      <radio label="apple">
        <icon type="social-apple">
        </icon>
        <span>Apple</span>
      </radio>
      <radio label="android">
        <icon type="social-android">
        </icon>
        <span>Android</span>
      </radio>
      <radio label="windows">
        <icon type="social-windows">
        </icon>
        <span>Windows</span>
      </radio>
    </radio-group>
    <radio-group
      v-model="button2"
      type="button"
      size="large"
    >
      <radio label="北京">
      </radio>
      <radio
        label="上海"
        disabled
      >
      </radio>
      <radio label="深圳">
      </radio>
      <radio label="杭州">
      </radio>
    </radio-group>
    <radio-group
      v-model="button2"
      type="button"
      size="default"
    >
      <radio label="北京">
      </radio>
      <radio
        label="上海"
        disabled
      >
      </radio>
      <radio label="深圳">
      </radio>
      <radio label="杭州">
      </radio>
    </radio-group>
    <radio-group
      v-model="button2"
      type="button"
      size="small"
    >
      <radio label="北京">
      </radio>
      <radio
        label="上海"
        disabled
      >
      </radio>
      <radio label="深圳">
      </radio>
      <radio label="杭州">
      </radio>
    </radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      button2: '北京',
      phone: '',
      single: true,
    };
  },
  methods: {},
};
</script>
