<template>
  <div>
    <i-input></i-input>
    <i-button
      slot="extra"
      type="ghost"
      size="small"
      @click="handleTabsAdd"
    >
      增加
    </i-button>

    <hr style="margin: 10px 0;">
    <tabs type="card">
      <tab-pane
        v-for="tab in tabs"
        :key="tab"
        :label="'Tab' + tab"
      >
        <div>
          <h3>Some text...</h3>
          <i-button>Some focusable content...{{ tab }}</i-button>
        </div>
      </tab-pane>
    </tabs>
    <tabs type="card">
      <tab-pane label="标签一">
        标签一的内容
      </tab-pane>
      <tab-pane
        label="标签二"
        disabled
      >
        标签二的内容
      </tab-pane>
      <tab-pane label="标签三">
        标签三的内容
      </tab-pane>
    </tabs>
    <tabs
      v-model="name"
      type="card"
      @on-click="handleClick"
    >
      <tab-pane
        name="a"
        label="标签一"
      >
        <div>1</div>
      </tab-pane>
      <tab-pane
        name="b"
        label="标签二"
      >
        <div>2</div>
      </tab-pane>
      <tab-pane
        name="c"
        label="标签三"
      >
        <div>3</div>
      </tab-pane>
      <tab-pane
        name="d"
        label="标签四"
      >
        <div>4</div>
      </tab-pane>
      <tab-pane
        name="e"
        label="标签五"
      >
        <div>5</div>
      </tab-pane>
    </tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'b',
      tabs: 2,
    };
  },
  methods: {
    handleClick(name) {
      console.log(name);
    },
    handleTabsAdd() {
      this.tabs += 1;
    },
  },
};
</script>
