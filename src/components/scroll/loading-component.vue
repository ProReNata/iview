<template lang="html">
  <div :class="wrapperClasses">
    <div :class="spinnerClasses">
      <Spin fix>
        <Icon
          type="load-c"
          size="18"
          :class="iconClasses"
        >
        </Icon>
        <div
          v-if="text"
          :class="textClasses"
        >
          {{ text }}
        </div>
      </Spin>
    </div>
  </div>
</template>

<script>
const prefixCls = 'ivu-scroll';

export default {
  props: {
    active: {
      default: false,
      type: Boolean,
    },
    spinnerHeight: {
      default: null,
      type: [Number, String],
    },
    text: {
      default: '',
      type: String,
    },
  },
  computed: {
    iconClasses() {
      return `${prefixCls}-spinner-icon`;
    },
    spinnerClasses() {
      return `${prefixCls}-spinner`;
    },
    textClasses() {
      return `${prefixCls}-loader-text`;
    },
    wrapperClasses() {
      return [
        `${prefixCls}-loader-wrapper`,
        {
          [`${prefixCls}-loader-wrapper-active`]: this.active,
        },
      ];
    },
  },
};
</script>
