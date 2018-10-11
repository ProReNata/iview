<template>
  <div
    :class="wrapClasses"
    :style="styles"
  >
    <div :class="[prefixCls + '-tail']">
      <i></i>
    </div>
    <div :class="[prefixCls + '-head']">
      <div :class="[prefixCls + '-head-inner']">
        <span v-if="!icon && currentStatus !== 'finish' && currentStatus !== 'error'">
          {{ stepNumber }}
        </span>
        <span
          v-else
          :class="iconClasses"
        >
        </span>
      </div>
    </div>
    <div :class="[prefixCls + '-main']">
      <div :class="[prefixCls + '-title']">
        {{ title }}
      </div>
      <slot>
        <div
          v-if="content"
          :class="[prefixCls + '-content']"
        >
          {{ content }}
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter';
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-steps';
const iconPrefixCls = 'ivu-icon';

export default {
  name: 'Step',
  mixins: [Emitter],
  props: {
    content: {
      type: String,
    },
    icon: {
      type: String,
    },
    status: {
      validator(value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error']);
      },
    },
    title: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      currentStatus: '',
      nextError: false,
      prefixCls,
      stepNumber: '',
      total: 1,
    };
  },
  computed: {
    iconClasses() {
      let icon = '';

      if (this.icon) {
        icon = this.icon;
      } else if (this.currentStatus === 'finish') {
        icon = 'ios-checkmark-empty';
      } else if (this.currentStatus === 'error') {
        icon = 'ios-close-empty';
      }

      return [
        `${prefixCls}-icon`,
        `${iconPrefixCls}`,
        {
          [`${iconPrefixCls}-${icon}`]: icon !== '',
        },
      ];
    },
    styles() {
      return {
        width: `${(1 / this.total) * 100}%`,
      };
    },
    wrapClasses() {
      return [
        `${prefixCls}-item`,
        `${prefixCls}-status-${this.currentStatus}`,
        {
          [`${prefixCls}-custom`]: !!this.icon,
          [`${prefixCls}-next-error`]: this.nextError,
        },
      ];
    },
  },
  watch: {
    status(val) {
      this.currentStatus = val;

      if (this.currentStatus === 'error') {
        this.$parent.setNextError();
      }
    },
  },
  created() {
    this.currentStatus = this.status;
  },
  mounted() {
    this.dispatch('Steps', 'append');
  },
  beforeDestroy() {
    this.dispatch('Steps', 'remove');
  },
};
</script>
