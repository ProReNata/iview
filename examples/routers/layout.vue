<template>
  <div class="layout-demo-con">
    <i-button @click="change">
      修改Sider绑定的变量来控制收缩
    </i-button>
    <layout :style="{minHeight: '100vh'}">
      <sider
        ref="side"
        v-model="isCollapsed"
        collapsed-width="0"
        hide-trigger
        breakpoint="sm"
        collapsible
        width="200"
        @on-collapse="changed"
      >
        <menu
          width="auto"
          theme="dark"
          active-name="1"
        >
          <menu-group title="内容管理">
            <menu-item name="1">
              <icon type="document-text">
              </icon>
              文章管理
            </menu-item>
            <menu-item name="2">
              <icon type="chatbubbles">
              </icon>
              评论管理
            </menu-item>
          </menu-group>
          <menu-group title="统计分析">
            <menu-item name="3">
              <icon type="heart">
              </icon>
              用户留存
            </menu-item>
            <menu-item name="4">
              <icon type="heart-broken">
              </icon>
              流失用户
            </menu-item>
          </menu-group>
        </menu>
        <!-- <div slot="trigger"><Icon type="document-text"></Icon></div> -->
      </sider>
      <layout class-name="test-class">
        <header :style="{background: '#eee'}">
          <i-button @click="toggleCollapse">
            菜单
          </i-button>
        </header>
        <content :style="{background:'#FFCF9E'}">
          <p
            v-for="i in 100"
            :key="i"
          >
            {{ i }}
          </p>
        </content>
        <footer>sdfsdsdfsdfs</footer>
      </layout>
    </layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  watch: {
    // isCollapsed(val) {
    //   console.log(val);
    // },
  },
  methods: {
    change() {
      this.isCollapsed = !this.isCollapsed;
    },
    changed(res) {
      console.log(res);
    },
    toggleCollapse() {
      this.$refs.side.toggleCollapse();
    },
  },
};
</script>
<style lang="less" scoped>
.layout-demo-con {
  height: 100%;
}
</style>
