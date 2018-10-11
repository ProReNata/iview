<template>
  <Card style="width:350px">
    <p slot="title">
      <Icon type="ios-film-outline">
      </Icon>
      经典电影
    </p>
    <a
      slot="extra"
      href="#"
      @click.prevent="changeLimit"
    >
      <Icon type="ios-loop-strong">
      </Icon>
      换一换
    </a>
    <ul>
      <li v-for="item in movieList">
        <a
          :href="item.url"
          target="_blank"
        >
          {{ item.name }}
        </a>
        <span>
          {{ item.rate }}
        </span>
      </li>
    </ul>
  </Card>
</template>
<script>
export default {
  data() {
    return {
      limitFrom: 0,
      limitNum: 5,
      movieList: [
        {
          name: '肖申克的救赎',
          rate: 9.6,
          url: 'https://movie.douban.com/subject/1292052/',
        },
        {
          name: '这个杀手不太冷',
          rate: 9.4,
          url: 'https://movie.douban.com/subject/1295644/',
        },
        {
          name: '霸王别姬',
          rate: 9.5,
          url: 'https://movie.douban.com/subject/1291546/',
        },
        {
          name: '阿甘正传',
          rate: 9.4,
          url: 'https://movie.douban.com/subject/1292720/',
        },
        {
          name: '美丽人生',
          rate: 9.5,
          url: 'https://movie.douban.com/subject/1292063/',
        },
        {
          name: '千与千寻',
          rate: 9.2,
          url: 'https://movie.douban.com/subject/1291561/',
        },
        {
          name: '辛德勒的名单',
          rate: 9.4,
          url: 'https://movie.douban.com/subject/1295124/',
        },
        {
          name: '海上钢琴师',
          rate: 9.2,
          url: 'https://movie.douban.com/subject/1292001/',
        },
        {
          name: '机器人总动员',
          rate: 9.3,
          url: 'https://movie.douban.com/subject/2131459/',
        },
        {
          name: '盗梦空间',
          rate: 9.2,
          url: 'https://movie.douban.com/subject/3541415/',
        },
      ],
    };
  },
  methods: {
    changeLimit() {
      this.limitFrom = this.limitFrom === 0 ? 5 : 0;
    },
  },
};
</script>
