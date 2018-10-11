<template>
  <div>
    <Cascader 
      v-model="value3" 
      :data="data" 
      filterable 
      style="width: 400px"
    >
    </Cascader>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <Cascader 
      v-model="value3" 
      :data="data" 
      filterable 
      style="width: 400px"
    >
    </Cascader>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <Cascader 
      v-model="value3" 
      :data="data" 
      filterable 
      style="width: 400px"
    >
    </Cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          children: [
            {
              label: '故宫',
              value: 11,
            },
            {
              label: '天坛',
              value: 12,
            },
            {
              label: '王府井',
              value: 13,
            },
          ],
          label: '北京',
          value: 1,
        },
        {
          children: [
            {
              children: [
                {
                  label: '夫子庙',
                  value: 211,
                },
              ],
              label: '南京',
              value: 21,
            },
            {
              children: [
                {
                  label: '拙政园',
                  value: 221,
                },
                {
                  label: '狮子林',
                  value: 222,
                },
              ],
              label: '苏州',
              value: 22,
            },
          ],
          label: '江苏',
          value: 2,
        },
      ],
      value3: [],
    };
  },
};
</script>
