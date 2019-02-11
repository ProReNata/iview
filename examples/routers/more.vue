<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.placeholder {
  min-height: 2000px;
  width: 1px;
}
</style>
<template>
  <div>
    <i-button @click="modal9 = true">
      距离顶部 20px
    </i-button>
    <modal
      title="对话框标题"
      :visible.sync="modal9"
      :style="{top: '20px'}"
    >
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </modal>
    <i-button @click="modal10 = true">
      垂直居中
    </i-button>
    <modal
      title="对话框标题"
      :visible.sync="modal10"
      class-name="vertical-center-modal"
    >
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </modal>
    <i-button @click="instance(true)">
      Create Instance Scrollable
    </i-button>
    <i-button @click="instance(false)">
      Create Instance Non-scrollable
    </i-button>
    <div class="placeholder">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      modal10: false,
      modal9: false,
      scrollable: false,
    };
  },
  methods: {
    cancel() {
      this.$Message.info('点击了取消');
    },
    instance(scrollable) {
      this.$Modal.info({
        content: 'test',
        scrollable,
        title: 'test',
      });
    },
    ok() {
      this.$nextTick(() => {
        this.modal1 = true;
      });
      this.$Message.info('点击了确定');
    },
  },
};
</script>
