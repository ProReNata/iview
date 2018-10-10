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
    text: {
      default: '',
      type: String,
    },
    active: {
      default: false,
      type: Boolean,
    },
    spinnerHeight: {
      default: null,
      type: [Number, String],
    },
  },
  computed: {
    wrapperClasses() {
      return [
        `${prefixCls}-loader-wrapper`,
        {
          [`${prefixCls}-loader-wrapper-active`]: this.active,
        },
      ];
    },
    spinnerClasses() {
      return `${prefixCls}-spinner`;
    },
    iconClasses() {
      return `${prefixCls}-spinner-icon`;
    },
    textClasses() {
      return `${prefixCls}-loader-text`;
    },
  },
};
</script>
