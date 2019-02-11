<template>
  <div :class="prefixCls">
    <i-input
      v-model="currentQuery"
      size="small"
      :icon="icon"
      :placeholder="placeholder"
      @on-click="handleClick"
    >
    </i-input>
  </div>
</template>

<script>
import iInput from '../input/input.vue';

export default {
  name: 'Search',

  components: {iInput},

  props: {
    placeholder: {
      default: undefined,
      type: String,
    },
    prefixCls: {
      default: undefined,
      type: String,
    },
    query: {
      default: undefined,
      type: String,
    },
  },

  data() {
    return {
      currentQuery: this.query,
    };
  },

  computed: {
    icon() {
      return this.query === '' ? 'ios-search' : 'ios-close';
    },
  },

  watch: {
    currentQuery(val) {
      this.$emit('on-query-change', val);
    },
    query(val) {
      this.currentQuery = val;
    },
  },

  methods: {
    handleClick() {
      if (this.currentQuery === '') {
        return;
      }

      this.currentQuery = '';
      this.$emit('on-query-clear');
    },
  },
};
</script>
