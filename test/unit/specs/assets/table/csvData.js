export const csvA = {
  columns: [
    {
      fixed: 'left',
      key: 'name',
      title: '名称',
      width: 200,
    },
    {
      key: 'show',
      sortable: true,
      title: '展示',
      width: 150,
    },
    {
      key: 'weak',
      sortable: true,
      title: '唤醒',
      width: 150,
    },
    {
      key: 'signin',
      sortable: true,
      title: '登录',
      width: 150,
    },
    {
      key: 'click',
      sortable: true,
      title: '点击',
      width: 150,
    },
    {
      key: 'active',
      sortable: true,
      title: '激活',
      width: 150,
    },
    {
      key: 'day7',
      sortable: true,
      title: '7日留存',
      width: 150,
    },
    {
      key: 'day30',
      sortable: true,
      title: '30日留存',
      width: 150,
    },
    {
      key: 'tomorrow',
      sortable: true,
      title: '次日留存',
      width: 150,
    },
    {
      key: 'day',
      sortable: true,
      title: '日活跃',
      width: 150,
    },
    {
      key: 'week',
      sortable: true,
      title: '周活跃',
      width: 150,
    },
    {
      key: 'month',
      sortable: true,
      title: '月活跃',
      width: 150,
    },
  ],
  data: [
    {
      active: 1438,
      click: 4254,
      day: 558,
      day30: 285,
      day7: 274,
      fav: 0,
      month: 5610,
      name: '推广名称1',
      show: 7302,
      signin: 1563,
      tomorrow: 1727,
      weak: 5627,
      week: 4440,
    },
    {
      active: 8470,
      click: 8690,
      day: 2593,
      day30: 5197,
      day7: 8172,
      fav: 0,
      month: 1537,
      name: '推广名称2',
      show: 4720,
      signin: 3792,
      tomorrow: 1684,
      weak: 4086,
      week: 2507,
    },
    {
      active: 16,
      click: 1879,
      day: 1561,
      day30: 3450,
      day7: 2249,
      fav: 0,
      month: 1588,
      name: '推广名称3',
      show: 7181,
      signin: 8477,
      tomorrow: 377,
      weak: 8007,
      week: 3219,
    },
    {
      active: 7668,
      click: 8050,
      day: 5309,
      day30: 2357,
      day7: 1547,
      fav: 0,
      month: 9043,
      name: '推广名称4',
      show: 9911,
      signin: 8807,
      tomorrow: 7278,
      weak: 8976,
      week: 1655,
    },
    {
      active: 9256,
      click: 5278,
      day: 1230,
      day30: 3563,
      day7: 209,
      fav: 0,
      month: 9908,
      name: '推广名称5',
      show: 934,
      signin: 6463,
      tomorrow: 8285,
      weak: 1394,
      week: 4840,
    },
    {
      active: 2909,
      click: 4949,
      day: 1966,
      day30: 6171,
      day7: 4525,
      fav: 0,
      month: 6851,
      name: '推广名称6',
      show: 6856,
      signin: 457,
      tomorrow: 1920,
      weak: 1608,
      week: 904,
    },
    {
      active: 1002,
      click: 7970,
      day: 4061,
      day30: 9040,
      day7: 8701,
      fav: 0,
      month: 3676,
      name: '推广名称7',
      show: 5107,
      signin: 4166,
      tomorrow: 7632,
      weak: 6407,
      week: 4359,
    },
    {
      active: 6801,
      click: 3209,
      day: 2481,
      day30: 6850,
      day7: 6364,
      fav: 0,
      month: 2346,
      name: '推广名称8',
      show: 862,
      signin: 6696,
      tomorrow: 9408,
      weak: 6520,
      week: 1479,
    },
    {
      active: 1971,
      click: 6593,
      day: 1611,
      day30: 3546,
      day7: 7596,
      fav: 0,
      month: 3190,
      name: '推广名称9',
      show: 567,
      signin: 128,
      tomorrow: 6641,
      weak: 5859,
      week: 5534,
    },
    {
      active: 7405,
      click: 7499,
      day: 9768,
      day30: 5518,
      day7: 8710,
      fav: 0,
      month: 5811,
      name: '推广名称10',
      show: 3651,
      signin: 4595,
      tomorrow: 428,
      weak: 1819,
      week: 2864,
    },
  ],
  expected: `
      名称,展示,唤醒,登录,点击,激活,7日留存,30日留存,次日留存,日活跃,周活跃,月活跃
      推广名称1,7302,5627,1563,4254,1438,274,285,1727,558,4440,5610
      推广名称2,4720,4086,3792,8690,8470,8172,5197,1684,2593,2507,1537
      推广名称3,7181,8007,8477,1879,16,2249,3450,377,1561,3219,1588
      推广名称4,9911,8976,8807,8050,7668,1547,2357,7278,5309,1655,9043
      推广名称5,934,1394,6463,5278,9256,209,3563,8285,1230,4840,9908
      推广名称6,6856,1608,457,4949,2909,4525,6171,1920,1966,904,6851
      推广名称7,5107,6407,4166,7970,1002,8701,9040,7632,4061,4359,3676
      推广名称8,862,6520,6696,3209,6801,6364,6850,9408,2481,1479,2346
      推广名称9,567,5859,128,6593,1971,7596,3546,6641,1611,5534,3190
      推广名称10,3651,1819,4595,7499,7405,8710,5518,428,9768,2864,5811
  `,
};

export const csvB = {
  columns: [
    {
      key: 'name',
      title: '姓名',
    },
    {
      key: 'age',
      title: '年龄',
    },
    {
      key: 'address',
      title: '地址',
    },
  ],
  data: [
    {
      address: '北京市朝\n阳区芍药居',
      age: 18,
      name: '王小明',
    },
    {
      address: '北京市海,淀区西二旗',
      age: 25,
      name: '张小刚',
    },
    {
      address: '上海市浦东\r新区世纪大道',
      age: 30,
      name: '李小红',
    },
    {
      address: '深圳市南山区深南大道',
      age: 26,
      name: '周小伟',
    },
  ],
  expected: `
    "姓名";"年龄";"地址"
    "王小明";"18";"北京市朝\n阳区芍药居"
    "张小刚";"25";"北京市海,淀区西二旗"
    "李小红";"30";"上海市浦东\r新区世纪大道"
    "周小伟";"26";"深圳市南山区深南大道"
  `,
};
