<style scoped>
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
</style>
<template>
  <div>
    <timeline>
      <timeline-item>
        <p class="time">
          1976年
        </p>
        <p class="content">
          Apple I 问世
        </p>
      </timeline-item>
      <timeline-item>
        <p class="time">
          1984年
        </p>
        <p class="content">
          发布 Macintosh
        </p>
      </timeline-item>
      <timeline-item>
        <p class="time">
          2007年
        </p>
        <p class="content">
          发布 iPhone
        </p>
      </timeline-item>
      <timeline-item>
        <p class="time">
          2010年
        </p>
        <p class="content">
          发布 iPad
        </p>
      </timeline-item>
      <timeline-item>
        <p class="time">
          2011年10月5日
        </p>
        <p class="content">
          史蒂夫·乔布斯去世
        </p>
      </timeline-item>
    </timeline>
    <timeline>
      <timeline-item color="green">
        发布1.0版本
      </timeline-item>
      <timeline-item color="green">
        发布2.0版本
      </timeline-item>
      <timeline-item color="red">
        严重故障
      </timeline-item>
      <timeline-item color="blue">
        发布3.0版本
      </timeline-item>
    </timeline>
    <timeline pending>
      <timeline-item>发布1.0版本</timeline-item>
      <timeline-item>发布2.0版本</timeline-item>
      <timeline-item>发布3.0版本</timeline-item>
      <timeline-item>
        <a href="#">
          查看更多
        </a>
      </timeline-item>
    </timeline>
    <timeline>
      <timeline-item color="green">
        <icon
          slot="dot"
          type="trophy"
        >
        </icon>
        <span>发布里程碑版本</span>
      </timeline-item>
      <timeline-item>发布1.0版本</timeline-item>
      <timeline-item>发布2.0版本</timeline-item>
      <timeline-item>发布3.0版本</timeline-item>
    </timeline>
  </div>
</template>

<script>
export default {};
</script>
