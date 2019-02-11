<template>
  <div>
    <tooltip
      always
      placement="top"
      transfer
      :content="text"
      :delay="1000"
    >
      <button @click="disabled = true">
        延时1秒显示
      </button>
    </tooltip>
    <tooltip
      placement="top"
      transfer
      :content="text"
    >
      <button @click="handleChange">
        change
      </button>
    </tooltip>
    <button @click="handleChange">
      change
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Tooltip 文字提示',
    };
  },

  methods: {
    handleChange() {
      this.text = '提示';
    },
  },
};
</script>
