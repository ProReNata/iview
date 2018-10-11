<template>
  <Table
    width="550"
    border
    :columns="columns2"
    :data="data3"
  >
  </Table>
</template>
<script>
export default {
  name: 'etable',
  data() {
    return {
      columns2: [
        {
          fixed: 'left',
          key: 'name',
          title: '姓名',
          width: 100,
        },
        {
          key: 'age',
          title: '年龄',
          width: 100,
        },
        {
          key: 'province',
          title: '省份',
          width: 100,
        },
        {
          key: 'city',
          title: '市区',
          width: 100,
        },
        {
          key: 'address',
          title: '地址',
          width: 200,
        },
        {
          key: 'zip',
          title: '邮编',
          width: 100,
        },
        {
          fixed: 'right',
          key: 'action',
          render: (h) =>
            h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'text',
                  },
                },
                '查看',
              ),
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'text',
                  },
                },
                '编辑',
              ),
            ]),
          title: '操作',
          width: 120,
        },
      ],
      data3: [
        {
          address: '北京市朝阳区芍药居',
          age: 18,
          city: '朝阳区',
          name: '王小明',
          province: '北京市',
          zip: 100000,
        },
        {
          address: '北京市海淀区西二旗',
          age: 25,
          city: '海淀区',
          name: '张小刚',
          province: '北京市',
          zip: 100000,
        },
        {
          address: '上海市浦东新区世纪大道',
          age: 30,
          city: '浦东新区',
          name: '李小红',
          province: '上海市',
          zip: 100000,
        },
        {
          address: '深圳市南山区深南大道',
          age: 26,
          city: '南山区',
          name: '周小伟',
          province: '广东',
          zip: 100000,
        },
      ],
    };
  },
  mounted() {
    console.log(1);
  },
};
</script>
