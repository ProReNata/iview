<template>
  <div :class="wrapClasses">
    <div :class="outerClasses">
      <div :class="innerClasses">
        <div
          :class="bgClasses"
          :style="bgStyle"
        >
        </div>
      </div>
    </div>
    <span
      v-if="!hideInfo"
      :class="textClasses"
    >
      <slot>
        <span
          v-if="isStatus"
          :class="textInnerClasses"
        >
          <icon :type="statusIcon">
          </icon>
        </span>
        <span
          v-else
          :class="textInnerClasses"
        >
          {{ percent }}%
        </span>
      </slot>
    </span>
  </div>
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';
import Icon from 'Components/icon';

const prefixCls = 'ivu-progress';

export default {
  components: {Icon},

  props: {
    hideInfo: {
      default: false,
      type: Boolean,
    },
    percent: {
      default: 0,
      type: Number,
    },
    status: {
      default: 'normal',
      validator(value) {
        return isOneOf(value, ['normal', 'active', 'wrong', 'success']);
      },
    },
    strokeWidth: {
      default: 10,
      type: Number,
    },
    vertical: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      currentStatus: this.status,
    };
  },

  computed: {
    bgClasses() {
      return `${prefixCls}-bg`;
    },
    bgStyle() {
      return this.vertical
        ? {
            height: `${this.percent}%`,
            width: `${this.strokeWidth}px`,
          }
        : {
            height: `${this.strokeWidth}px`,
            width: `${this.percent}%`,
          };
    },
    innerClasses() {
      return `${prefixCls}-inner`;
    },
    isStatus() {
      return this.currentStatus === 'wrong' || this.currentStatus === 'success';
    },
    outerClasses() {
      return `${prefixCls}-outer`;
    },
    statusIcon() {
      let type = '';
      switch (this.currentStatus) {
        case 'wrong':
          type = 'ios-close';
          break;

        case 'success':
          type = 'ios-checkmark';
          break;

        default:
      }

      return type;
    },
    textClasses() {
      return `${prefixCls}-text`;
    },
    textInnerClasses() {
      return `${prefixCls}-text-inner`;
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.currentStatus}`,
        {
          [`${prefixCls}-show-info`]: !this.hideInfo,
          [`${prefixCls}-vertical`]: this.vertical,
        },
      ];
    },
  },

  watch: {
    percent(val, oldVal) {
      if (val < oldVal) {
        this.handleStatus(true);
      } else {
        this.handleStatus();
      }
    },
    status(val) {
      this.currentStatus = val;
    },
  },
  created() {
    this.handleStatus();
  },
  methods: {
    handleStatus(isDown) {
      if (isDown) {
        this.currentStatus = 'normal';
        this.$emit('on-status-change', 'normal');
      } else if (parseInt(this.percent, 10) === 100) {
        this.currentStatus = 'success';
        this.$emit('on-status-change', 'success');
      }
    },
  },
};
</script>
