<template>
  <div :class="prefixCls + '-operation'">
    <i-button
      type="primary"
      size="small"
      :disabled="!rightActive"
      @click.native="moveToLeft"
    >
      <icon type="ios-arrow-left">
      </icon> {{ operations[0] }}
    </i-button>
    <i-button
      type="primary"
      size="small"
      :disabled="!leftActive"
      @click.native="moveToRight"
    >
      {{ operations[1] }} <icon type="ios-arrow-right">
      </icon>
    </i-button>
  </div>
</template>

<script>
import iButton from 'Components/button/button.vue';
import Icon from 'Components/icon';

export default {
  name: 'Operation',

  components: {iButton, Icon},

  props: {
    leftActive: {
      default: false,
      type: Boolean,
    },
    operations: {
      default: undefined,
      type: Array,
    },
    prefixCls: {
      default: undefined,
      type: String,
    },
    rightActive: {
      default: false,
      type: Boolean,
    },
  },

  methods: {
    moveToLeft() {
      this.$parent.moveTo('left');
    },
    moveToRight() {
      this.$parent.moveTo('right');
    },
  },
};
</script>
