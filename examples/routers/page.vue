<template>
  <div>
    <page
      :total="total"
      show-sizer
      show-elevator
      show-total
      transfer
      :current.sync="current"
    >
    </page>
    {{ current }}
    <i-button
      type="primary"
      @click="subject"
    >
      - 1
    </i-button>
    <i-button
      type="primary"
      @click="change"
    >
      Change
    </i-button>
    <page
      :current="2"
      :total="50"
      simple
    >
    </page>

    <div style="margin:10px 0">
      <page
        :total="1000"
        show-sizer
        show-elevator
        show-total
        transfer
        :current="12"
      >
      </page>
    </div>
    <div style="margin:10px 0">
      <page
        :total="1000"
        show-sizer
        show-elevator
        show-total
        transfer
        :current="12"
      >
      </page>
    </div>
    <div style="margin:100px 0">
      <page
        :total="500"
        show-sizer
        show-elevator
        show-total
        transfer
      >
      </page>
    </div>
    <div style="margin:100px 0">
      <page
        :total="500"
        show-sizer
        show-elevator
        transfer
      >
      </page>
    </div>
    <div style="margin:100px 0">
      <page
        :total="500"
        show-sizer
        show-elevator
        transfer
      >
      </page>
    </div>
    <div style="margin:10px 0">
      <page
        :total="500"
        show-sizer
        transfer
      >
      </page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 1,
      total: 21,
    };
  },
  methods: {
    change() {
      this.current = 1;
    },
    subject() {
      this.total -= 1;
    },
  },
};
</script>
