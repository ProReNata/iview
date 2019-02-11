<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-steps';

function debounce(fn) {
  let waiting;

  return function _debounced(...args) {
    if (waiting) {
      return;
    }

    waiting = true;
    /* eslint-disable-next-line babel/no-invalid-this */
    const context = this;
    const later = function _later() {
      waiting = false;
      fn.apply(context, args);
    };

    /* eslint-disable-next-line babel/no-invalid-this */
    this.$nextTick(later);
  };
}

export default {
  name: 'Steps',

  props: {
    current: {
      default: 0,
      type: Number,
    },
    direction: {
      default: 'horizontal',
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical']);
      },
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['small']);
      },
    },
    status: {
      default: 'process',
      type: String,
      validator(value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error']);
      },
    },
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.direction}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
        },
      ];
    },
  },

  watch: {
    current() {
      this.updateChildProps();
    },
    status() {
      this.updateCurrent();
    },
  },

  mounted() {
    this.updateSteps();
    this.$on('append', this.debouncedAppendRemove());
    this.$on('remove', this.debouncedAppendRemove());
  },

  methods: {
    debouncedAppendRemove() {
      return debounce(function _debounced() {
        /* eslint-disable-next-line babel/no-invalid-this */
        this.updateSteps();
      });
    },
    setNextError() {
      this.$children.forEach((child, index) => {
        if (child.currentStatus === 'error' && index !== 0) {
          this.$children[index - 1].nextError = true;
        }
      });
    },
    updateChildProps(isInit) {
      const total = this.$children.length;
      this.$children.forEach((child, index) => {
        child.stepNumber = index + 1;

        if (this.direction === 'horizontal') {
          child.total = total;
        }

        // 如果已存在status,且在初始化时,则略过
        // todo 如果当前是error,在current改变时需要处理
        if (!(isInit && child.currentStatus)) {
          if (index === this.current) {
            if (this.status !== 'error') {
              child.currentStatus = 'process';
            }
          } else if (index < this.current) {
            child.currentStatus = 'finish';
          } else {
            child.currentStatus = 'wait';
          }
        }

        if (child.currentStatus !== 'error' && index !== 0) {
          this.$children[index - 1].nextError = false;
        }
      });
    },
    updateCurrent(isInit) {
      // 防止溢出边界
      if (this.current < 0 || this.current >= this.$children.length) {
        return;
      }

      if (isInit) {
        const {currentStatus} = this.$children[this.current];

        if (!currentStatus) {
          this.$children[this.current].currentStatus = this.status;
        }
      } else {
        this.$children[this.current].currentStatus = this.status;
      }
    },
    updateSteps() {
      this.updateChildProps(true);
      this.setNextError();
      this.updateCurrent(true);
    },
  },
};
</script>
