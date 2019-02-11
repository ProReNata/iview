<template>
  <div style="margin: 200px">
    <tabs value="name1">
      <tab-pane
        label="标签一"
        name="name1"
      >
        <div>
          <poptip
            title="提示标题"
            content="标签一的内容"
            transfer
          >
            <i-button id="aaa">
              点击显示
            </i-button>
            <div slot="content">
              <i-button @click="loadData(15)">
                15条数据
              </i-button>
              <i-button @click="loadData(10)">
                10条数据
              </i-button>
              <i-button @click="loadData(5)">
                5条数据
              </i-button>
              <i-button @click="loadData(3)">
                3条数据
              </i-button>
              <table
                :columns="columns1"
                :data="data1"
              >
              </table>
            </div>
          </poptip>
        </div>
      </tab-pane>
      <tab-pane
        label="标签二"
        name="name2"
      >
        标签二的内容
      </tab-pane>
    </tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          key: 'data1',
          title: 'Data1',
          width: 100,
        },
        {
          key: 'data2',
          title: 'Data2',
          width: 100,
        },
        {
          key: 'data3',
          title: 'Data3',
          width: 100,
        },
        {
          key: 'data4',
          title: 'Data4',
          width: 100,
        },
      ],
      data1: [],
      options: {},
    };
  },
  created() {
    this.loadData(5);
  },
  methods: {
    loadData(num) {
      const data = [];
      for (let i = 0; i < num; i += 1) {
        data.push({
          data1: Math.random() * 1000000,
          data2: Math.random() * 100000000,
          data3: Math.random() * 10000000000,
          data4: Math.random() * 1000000000000,
        });
      }

      this.data1 = data;
    },
  },
};
</script>
