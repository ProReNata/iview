<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>

<template>
  <div>
    <div class="layout-demo-con">
      <i-button @click="change">
        修改Sider绑定的变量来控制收缩
      </i-button>
      <layout :style="{minHeight: '80vh'}">
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
            <!-- <Table border  :columns="columns1" height="500" :data="data1"></Table> -->
            <!-- <br> -->
            <!-- <Table border :columns="columns5" :data="data5"></Table> -->
            <table
              border
              :columns="columns8"
              height="240"
              :data="data7"
            >
            </table>
          </content>
          <footer>sdfsdsdfsdfs</footer>
        </layout>
      </layout>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          align: 'center',
          filterMethod(value, row) {
            if (value === 1) {
              return row.name === 'Joe';
            }

            if (value === 2) {
              return row.name === 'John Brown';
            }

            return undefined;
          },
          filterMultiple: false,
          filters: [
            {
              label: 'Joe',
              value: 1,
            },
            {
              label: 'John',
              value: 2,
            },
          ],
          fixed: 'left',
          key: 'name',
          maxWidth: 200,
          minWidth: 100,
          title: 'Name',
        },
        {
          align: 'center',
          children: [
            {
              align: 'center',
              key: 'age',
              maxWidth: 200,
              minWidth: 100,
              sortable: true,
              title: 'Age',
            },
            {
              align: 'center',
              children: [
                {
                  align: 'center',
                  key: 'street',
                  maxWidth: 200,
                  minWidth: 100,
                  title: 'Street',
                },
                {
                  align: 'center',
                  children: [
                    {
                      align: 'center',
                      key: 'building',
                      maxWidth: 200,
                      minWidth: 100,
                      sortable: true,
                      title: 'Building',
                    },
                    {
                      align: 'center',
                      key: 'door',
                      maxWidth: 200,
                      minWidth: 100,
                      title: 'Door No.',
                    },
                  ],
                  title: 'Block',
                },
              ],
              title: 'Address',
            },
          ],
          title: 'Other',
        },
        {
          align: 'center',
          children: [
            {
              align: 'center',
              key: 'caddress',
              maxWidth: 200,
              minWidth: 100,
              title: 'Company Address',
            },
            {
              align: 'center',
              key: 'cname',
              maxWidth: 200,
              minWidth: 100,
              title: 'Company Name',
            },
          ],
          title: 'Company',
        },
        // {
        //     title: 'Gender',
        //     key: 'gender',
        //     align: 'center',
        //     width: 200,
        //     fixed: 'right'
        // },
        {
          align: 'center',
          fixed: 'right',
          key: 'gender',
          maxWidth: 200,
          minWidth: 100,
          title: 'Gender',
        },
      ],
      columns2: [
        {
          fixed: 'left',
          key: 'name',
          title: 'Name',
          width: 100,
        },
        {
          fixed: 'right',
          key: 'age',
          sortable: true,
          title: 'Age',
          width: 100,
        },
        {
          key: 'province',
          title: 'Province',
          width: 100,
        },
        {
          key: 'city',
          title: 'City',
          width: 100,
        },
        {
          key: 'address',
          title: 'Address',
          width: 200,
        },
        {
          key: 'zip',
          title: 'Postcode',
          width: 100,
        },
        {
          fixed: 'right',
          key: 'action',
          render: (h) =>
            h('div', [
              h(
                'i-button',
                {
                  props: {
                    size: 'small',
                    type: 'text',
                  },
                },
                'View',
              ),
              h(
                'i-button',
                {
                  props: {
                    size: 'small',
                    type: 'text',
                  },
                },
                'Edit',
              ),
            ]),
          title: 'Action',
          width: 120,
        },
      ],
      columns5: [
        {
          key: 'date',
          sortable: true,
          title: 'Date',
        },
        {
          key: 'name',
          title: 'Name',
        },
        {
          key: 'age',
          sortable: true,
          title: 'Age',
        },
        {
          key: 'address',
          title: 'Address',
        },
      ],
      columns6: [
        {
          key: 'date',
          title: 'Date',
        },
        {
          key: 'name',
          title: 'Name',
        },
        {
          filterMethod(value, row) {
            if (value === 1) {
              return row.age > 25;
            }

            if (value === 2) {
              return row.age < 25;
            }

            return undefined;
          },
          filterMultiple: false,
          filters: [
            {
              label: 'Greater than 25',
              value: 1,
            },
            {
              label: 'Less than 25',
              value: 2,
            },
          ],
          key: 'age',
          title: 'Age',
        },
        {
          filterMethod(value, row) {
            return row.address.indexOf(value) > -1;
          },
          filters: [
            {
              label: 'New York',
              value: 'New York',
            },
            {
              label: 'London',
              value: 'London',
            },
            {
              label: 'Sydney',
              value: 'Sydney',
            },
          ],
          fixed: 'right',
          key: 'address',
          title: 'Address',
        },
      ],
      columns7: [
        {
          key: 'date',
          sortable: true,
          title: 'Date',
          width: 200,
        },
        {
          key: 'name',
          title: 'Name',
          width: 200,
        },
        {
          key: 'age',
          title: 'Age',
          width: 200,
        },
        {
          key: 'address',
          title: 'Address',
          width: 200,
        },
      ],
      columns8: [
        {
          key: 'address',
          // maxWidth:300,
          minWidth: 200,
          title: 'Address',
        },
        {
          key: 'date',
          maxWidth: 150,
          minWidth: 100,
          sortable: true,
          title: 'Date',
        },
        {
          key: 'name',
          maxWidth: 200,
          minWidth: 100,
          title: 'Name',
        },
        {
          key: 'age',
          maxWidth: 100,
          minWidth: 60,
          title: 'Age',
        },
      ],
      data1: [],
      data4: [
        {
          address: 'New York No. 1 Lake Park',
          age: 18,
          city: 'New York',
          name: 'John Brown',
          province: 'America',
          zip: 100000,
        },
        {
          address: 'Washington, D.C. No. 1 Lake Park',
          age: 24,
          city: 'Washington, D.C.',
          name: 'Jim Green',
          province: 'America',
          zip: 100000,
        },
        {
          address: 'Sydney No. 1 Lake Park',
          age: 30,
          city: 'Sydney',
          name: 'Joe Black',
          province: 'Australian',
          zip: 100000,
        },
        {
          address: 'Ottawa No. 2 Lake Park',
          age: 26,
          city: 'Ottawa',
          name: 'Jon Snow',
          province: 'Canada',
          zip: 100000,
        },
        {
          address: 'New York No. 1 Lake Park',
          age: 18,
          city: 'New York',
          name: 'John Brown',
          province: 'America',
          zip: 100000,
        },
        {
          address: 'Washington, D.C. No. 1 Lake Park',
          age: 24,
          city: 'Washington, D.C.',
          name: 'Jim Green',
          province: 'America',
          zip: 100000,
        },
        {
          address: 'Sydney No. 1 Lake Park',
          age: 30,
          city: 'Sydney',
          name: 'Joe Black',
          province: 'Australian',
          zip: 100000,
        },
        {
          address: 'Ottawa No. 2 Lake Park',
          age: 26,
          city: 'Ottawa',
          name: 'Jon Snow',
          province: 'Canada',
          zip: 100000,
        },
      ],

      data5: [
        {
          address: 'New York No. 1 Lake Park',
          age: 18,
          date: '2016-10-03',
          name: 'John Brown',
        },
        {
          address: 'London No. 1 Lake Park',
          age: 24,
          date: '2016-10-01',
          name: 'Jim Green',
        },
        {
          address: 'Sydney No. 1 Lake Park',
          age: 30,
          date: '2016-10-02',
          name: 'Joe Black',
        },
        {
          address: 'Ottawa No. 2 Lake Park',
          age: 26,
          date: '2016-10-04',
          name: 'Jon Snow',
        },
      ],
      data7: [
        {
          address: 'New York No. 1 Lake Park',
          age: 18,
          date: '2016-10-03',
          name: 'John Brown',
        },
        {
          address: 'London No. 1 Lake Park',
          age: 24,
          date: '2016-10-01',
          name: 'Jim Green',
        },
        {
          address: 'Sydney No. 1 Lake Park Sydney No. 1 Lake Park',
          age: 30,
          date: '2016-10-02',
          name: 'Joe Black',
        },
        {
          address: 'Ottawa No. 2 Lake Park Ottawa No. 2 Lake Park Ottawa No. 2 Lake Park',
          age: 26,
          date: '2016-10-04',
          name: 'Jon Snow',
        },
      ],

      isCollapsed: false,
    };
  },
  watch: {
    // isCollapsed(val) {
    //   console.log(val)
    // },
  },
  mounted() {
    const data = [];
    for (let i = 0; i < 20; i += 1) {
      data.push({
        age: i + 1,
        building: 'C',
        caddress: 'Lake Street 42',
        cname: 'SoftLake Co',
        door: 2035,
        gender: 'M',
        key: i,
        name: 'John Brown',
        street: 'Lake Park',
      });
    }

    this.data1 = data;
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
