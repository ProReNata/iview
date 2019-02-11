<template>
  <div>
    <row class="expand-row">
      <i-col span="8">
        <span class="expand-key">
          职业：
        </span>
        <span class="expand-value">
          {{ row.job }}
        </span>
      </i-col>
      <i-col span="8">
        <span class="expand-key">
          兴趣：
        </span>
        <span class="expand-value">
          {{ row.interest }}
        </span>
      </i-col>
      <i-col span="8">
        <span class="expand-key">
          生日：
        </span>
        <span class="expand-value">
          {{ row.birthday }}
        </span>
      </i-col>
    </row>
    <row>
      <i-col span="8">
        <span class="expand-key">
          最喜欢的书：
        </span>
        <span class="expand-value">
          《{{ row.book }}》
        </span>
      </i-col>
      <i-col span="8">
        <span class="expand-key">
          最喜欢的电影：
        </span>
        <span class="expand-value">
          {{ row.movie }}
        </span>
      </i-col>
      <i-col span="8">
        <span class="expand-key">
          最喜欢的音乐：
        </span>
        <span class="expand-value">
          {{ row.music }}
        </span>
      </i-col>
    </row>
  </div>
</template>
<script>
export default {
  props: {
    row: {
      default: undefined,
      type: Object,
    },
  },
};
</script>
