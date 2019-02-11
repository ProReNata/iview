<template>
  <div>
    <p>带描述信息</p>
    <i-button @click="normal(false)">
      普通
    </i-button>
    <i-button @click="info(false)">
      消息
    </i-button>
    <i-button @click="success(false)">
      成功
    </i-button>
    <i-button @click="warning(false)">
      警告
    </i-button>
    <i-button @click="error(false)">
      错误
    </i-button>
    <i-button @click="testRender()">
      render
    </i-button>
    <p>仅标题</p>
    <i-button @click="info(true)">
      消息
    </i-button>
    <i-button @click="success(true)">
      成功
    </i-button>
    <i-button @click="warning(true)">
      警告
    </i-button>
    <i-button @click="error(true)">
      错误
    </i-button>
    <i-button @click="destroy()">
      销毁
    </i-button>
  </div>
</template>
<script>
export default {
  methods: {
    destroy() {
      this.$Notice.destroy();
    },
    error(nodesc) {
      this.$Notice.error({
        desc: nodesc
          ? ''
          : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述',
        title: '这是通知标题',
      });
    },
    info(nodesc) {
      this.$Notice.info({
        desc: nodesc
          ? ''
          : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述',
        // title: '这是通知标题',
        duration: 0,
        render(h) {
          return h('span', {}, 'sdsdfsdf');
        },
      });
    },
    normal(nodesc) {
      this.$Notice.open({
        desc: nodesc
          ? ''
          : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述',
        duration: 0,
        render(h) {
          return h('span', {}, 'sdsdfsdf');
        },
        title: 'google',
      });
    },
    success() {
      this.$Notice.success({
        desc: '当你定义了render之后，这个描述会被覆盖',
        duration: 0,
        render: (h) => h('span', {}, ['这是', h('i-button', {props: {type: 'text'}}, 'render'), '函数渲染的']),
        title: '这是通知标题',
      });
    },
    testRender() {
      this.$Notice.info({
        duration: 0,
        // desc: '当你定义了render之后，这个描述会被覆盖',
        render: (h) => h('span', {}, ['这是', h('i-button', {props: {type: 'text'}}, 'render'), '函数渲染的']),
        title: '这是通知标题',
      });
    },
    warning(nodesc) {
      this.$Notice.warning({
        desc: nodesc
          ? ''
          : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述',
        title: '这是通知标题',
      });
    },
  },
};
</script>
