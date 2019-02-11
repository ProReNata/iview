<template>
  <div>
    <carousel
      v-model="v1"
      dots="outside"
      :autoplay="false"
      @on-change="hc"
    >
      <carousel-item>
        <div class="demo-case-img">
          <img src="https://file.iviewui.com/dist/84b3cded4163febf9dae090e76129322.png">
        </div>
      </carousel-item>
      <carousel-item>
        <div class="demo-case-img">
          <img src="https://file.iviewui.com/dist/84b3cded4163febf9dae090e76129322.png">
        </div>
      </carousel-item>
      <carousel-item>
        <div class="demo-case-img">
          <img src="https://file.iviewui.com/dist/84b3cded4163febf9dae090e76129322.png">
        </div>
      </carousel-item>
    </carousel>
    <i-button @click="v1 = 2">
      change
    </i-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      v1: 0,
    };
  },
  methods: {
    hc(...args) {
      console.log(args);
    },
  },
};
</script>
<style lang="less">
.demo-case-img {
  img {
    width: 500px;
  }
}
</style>
