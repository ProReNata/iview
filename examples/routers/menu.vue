<template>
  <div>
    <menu
      ref="menu"
      active-name="1-2"
      :open-names="openNames"
      theme="dark"
      accordion
      @on-open-change="handleOpenChange"
    >
      <submenu name="1">
        <template slot="title">
          <icon type="ios-analytics">
          </icon>
          Navigation One
        </template>
        <menu-group title="Item 1">
          <menu-item name="1-1">
            Option 1
          </menu-item>
          <menu-item name="1-2">
            Option 2
          </menu-item>
        </menu-group>
        <menu-group title="Item 2">
          <menu-item name="1-3">
            Option 3
          </menu-item>
          <menu-item name="1-4">
            Option 4
          </menu-item>
        </menu-group>
      </submenu>
      <submenu name="2">
        <template slot="title">
          <icon type="ios-filing">
          </icon>
          Navigation Two
        </template>
        <menu-item name="2-1">
          Option 5
        </menu-item>
        <menu-item name="2-2">
          Option 6
        </menu-item>
        <submenu name="3">
          <template slot="title">
            Submenu
          </template>
          <menu-item name="3-1">
            Option 7
          </menu-item>
          <menu-item name="3-2">
            Option 8
          </menu-item>
        </submenu>
        <submenu name="4">
          <template slot="title">
            Submenu
          </template>
          <menu-item name="4-1">
            Option 7
          </menu-item>
          <menu-item name="4-2">
            Option 8
          </menu-item>
        </submenu>
      </submenu>
      <submenu name="5">
        <template slot="title">
          <icon type="ios-gear">
          </icon>
          Navigation Three
        </template>
        <menu-item name="5-1">
          Option 9
        </menu-item>
        <menu-item name="5-2">
          Option 10
        </menu-item>
        <menu-item name="5-3">
          Option 11
        </menu-item>
        <menu-item name="5-4">
          Option 12
        </menu-item>
      </submenu>
    </menu>
    <br>
    <menu
      ref="menu2"
      theme="dark"
      accordion
      :open-names="openNames2"
      @on-open-change="handleOpenChange"
    >
      <template v-for="item in menuList">
        <custem-menu-item
          v-if="item.children"
          :key="`menu-${item.name}`"
          :parent-item="item"
        >
        </custem-menu-item>
        <menu-item
          v-else
          :key="`menu-${item.name}`"
          :name="`${item.name}`"
        >
          {{ item.name }}
        </menu-item>
      </template>
    </menu>
    <i-button @click="addNewItem">
      添加菜单项
    </i-button>
    <i-button @click="changeActive">
      修改激活项
    </i-button>
    <i-button @click="setOpenNames">
      修改展开数组
    </i-button>
    <menu
      mode="horizontal"
      theme="light"
      :active-name="activeName"
      @on-open-change="hc"
    >
      <menu-item name="1">
        <icon type="ios-paper">
        </icon>
        内容管理
      </menu-item>
      <menu-item name="2">
        <icon type="ios-people">
        </icon>
        用户管理
      </menu-item>
      <submenu name="3">
        <template slot="title">
          <icon type="stats-bars">
          </icon>
          统计分析
        </template>
        <menu-group title="使用">
          <menu-item name="3-1">
            新增和启动
          </menu-item>
          <menu-item name="3-2">
            活跃分析
          </menu-item>
          <menu-item name="3-3">
            时段分析
          </menu-item>
        </menu-group>
        <menu-group title="留存">
          <menu-item name="3-4">
            用户留存
          </menu-item>
          <menu-item name="3-5">
            流失用户
          </menu-item>
        </menu-group>
      </submenu>
      <submenu name="4">
        <template slot="title">
          <icon type="stats-bars">
          </icon>
          统计分析2
        </template>
        <menu-group title="使用2">
          <menu-item name="4-1">
            新增和启动2
          </menu-item>
          <menu-item name="4-2">
            活跃分析2
          </menu-item>
          <menu-item name="4-3">
            时段分析2
          </menu-item>
        </menu-group>
        <menu-group title="留存2">
          <menu-item name="4-4">
            用户留存2
          </menu-item>
          <menu-item name="4-5">
            流失用户2
          </menu-item>
        </menu-group>
      </submenu>
      <menu-item name="5">
        <icon type="settings">
        </icon>
        综合设置
      </menu-item>
    </menu>
  </div>
</template>
<script>
import custemMenuItem from './custem-menu-item.vue';

export default {
  components: {
    custemMenuItem,
  },
  data() {
    return {
      activeName: '1',
      menuList: [
        {
          children: [
            {
              name: '111-111',
            },
            {
              name: '111-222',
            },
          ],
          name: '111',
        },
        {
          children: [
            {
              name: '222-111',
            },
            {
              children: [
                {
                  name: '222-222-111',
                },
                {
                  children: [
                    {
                      name: '222-222-222-111',
                    },
                    {
                      name: '222-222-222-222',
                    },
                  ],
                  name: '222-222-222',
                },
              ],
              name: '222-222',
            },
            {
              children: [
                {
                  children: [
                    {
                      name: '222-333-111-111',
                    },
                    {
                      name: '222-333-111-222',
                    },
                  ],
                  name: '222-333-111',
                },
                {
                  children: [
                    {
                      name: '222-333-222-111',
                    },
                    {
                      name: '222-333-222-222',
                    },
                  ],
                  name: '222-333-222',
                },
              ],
              name: '222-333',
            },
          ],
          name: '222',
        },
      ],
      openNames: ['1'],
      openNames2: [],
    };
  },
  methods: {
    addNewItem() {
      this.menuList[1].children[1].children.push({
        children: [
          {
            name: '222-222-333-111',
          },
        ],
        name: '222-222-333',
      });
    },
    changeActive() {
      this.activeName = String(Number(this.activeName) + 1);
    },
    handleOpenChange(name) {
      console.log(name);
    },
    hc(data) {
      console.log(data);
    },
    setOpenNames() {
      this.openNames = ['2', '3'];
      this.openNames2 = ['222', '222-222', '222-222-222', '222-222-222-111'];
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu2.updateOpened();
      });
    },
  },
};
</script>
