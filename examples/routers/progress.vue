<template>
  <div>
    <i-progress :percent="percent">
    </i-progress>
    <i-button-group size="large">
      <i-button
        icon="ios-plus-empty"
        @click.native="add"
      >
      </i-button>
      <i-button
        icon="ios-minus-empty"
        @click.native="minus"
      >
      </i-button>
    </i-button-group>
    <i-progress
      :percent="25"
      :stroke-width="5"
    >
    </i-progress>
    <i-progress :percent="100">
      <icon type="checkmark-circled">
      </icon>
      <span>成功</span>
    </i-progress>
    <i-progress :percent="percent">
    </i-progress>
    <div style="height: 150px">
      <i-progress
        vertical
        :percent="percent"
        :stroke-width="20"
        hide-info
      >
      </i-progress>
      <i-progress
        vertical
        :percent="percent"
      >
      </i-progress>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      percent: 0,
    };
  },
  methods: {
    add() {
      if (this.percent >= 100) {
        return;
      }

      this.percent += 10;
    },
    minus() {
      if (this.percent <= 0) {
        return;
      }

      this.percent -= 10;
    },
  },
};
</script>
