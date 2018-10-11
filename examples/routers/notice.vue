<template>
  <div>
    <p>带描述信息</p>
    <Button @click="normal(false)">
      普通
    </Button>
    <Button @click="info(false)">
      消息
    </Button>
    <Button @click="success(false)">
      成功
    </Button>
    <Button @click="warning(false)">
      警告
    </Button>
    <Button @click="error(false)">
      错误
    </Button>
    <Button @click="testRender()">
      render
    </Button>
    <p>仅标题</p>
    <Button @click="info(true)">
      消息
    </Button>
    <Button @click="success(true)">
      成功
    </Button>
    <Button @click="warning(true)">
      警告
    </Button>
    <Button @click="error(true)">
      错误
    </Button>
    <Button @click="destroy()">
      销毁
    </Button>
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
        render: (h) => h('span', {}, ['这是', h('Button', {props: {type: 'text'}}, 'render'), '函数渲染的']),
        title: '这是通知标题',
      });
    },
    testRender() {
      this.$Notice.info({
        duration: 0,
        // desc: '当你定义了render之后，这个描述会被覆盖',
        render: (h) => h('span', {}, ['这是', h('Button', {props: {type: 'text'}}, 'render'), '函数渲染的']),
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
