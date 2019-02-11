<template>
  <div
    :class="classes"
    @mouseleave="handleMouseleave"
  >
    <input
      type="hidden"
      :name="name"
      :value="currentValue"
    >
    <div
      v-for="item in count"
      :key="item"
      :class="starCls(item)"
      @mousemove="handleMousemove(item, $event)"
      @click="handleClick(item)"
    >
      <span
        :class="[prefixCls + '-star-content']"
        type="half"
      >
      </span>
    </div>
    <div
      v-if="showText"
      v-show="currentValue > 0"
      :class="[prefixCls + '-text']"
    >
      <slot>
        <span>{{ currentValue }}</span> <span v-if="currentValue <= 1">
          {{ t('i.rate.star') }}
        </span><span v-else>
          {{ t('i.rate.stars') }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
import Locale from '../../mixins/locale';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-rate';

export default {
  name: 'Rate',
  mixins: [Locale, Emitter],
  props: {
    allowHalf: {
      default: false,
      type: Boolean,
    },
    clearable: {
      default: false,
      type: Boolean,
    },
    count: {
      default: 5,
      type: Number,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    name: {
      default: undefined,
      type: String,
    },
    showText: {
      default: false,
      type: Boolean,
    },
    value: {
      default: 0,
      type: Number,
    },
  },

  data() {
    return {
      currentValue: this.value,
      hoverIndex: -1,
      isHalf: this.allowHalf && this.value.toString().indexOf('.') >= 0,
      isHover: false,
      prefixCls,
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
        },
      ];
    },
  },

  watch: {
    currentValue(val) {
      this.setHalf(val);
    },
    value(val) {
      this.currentValue = val;
    },
  },

  methods: {
    handleClick(item) {
      if (this.disabled) {
        return;
      }

      let value = item;

      // value++;
      if (this.isHalf) {
        value -= 0.5;
      }

      if (this.clearable && Math.abs(value - this.currentValue) < 0.01) {
        value = 0;
      }

      this.currentValue = value;
      this.$emit('input', value);
      this.$emit('on-change', value);
      this.dispatch('FormItem', 'on-form-change', value);
    },
    handleMouseleave() {
      if (this.disabled) {
        return;
      }

      this.isHover = false;
      this.setHalf(this.currentValue);
      this.hoverIndex = -1;
    },
    handleMousemove(value, event) {
      if (this.disabled) {
        return;
      }

      this.isHover = true;

      if (this.allowHalf) {
        const type = event.target.getAttribute('type') || false;
        this.isHalf = type === 'half';
      } else {
        this.isHalf = false;
      }

      this.hoverIndex = value;
    },
    setHalf(val) {
      this.isHalf = this.allowHalf && val.toString().indexOf('.') >= 0;
    },
    starCls(value) {
      const {hoverIndex} = this;
      const currentIndex = this.isHover ? hoverIndex : this.currentValue;

      let full = false;
      let isLast = false;

      if (currentIndex >= value) {
        full = true;
      }

      if (this.isHover) {
        isLast = currentIndex === value;
      } else {
        isLast = Math.ceil(this.currentValue) === value;
      }

      return [
        `${prefixCls}-star`,
        {
          [`${prefixCls}-star-full`]: (!isLast && full) || (isLast && !this.isHalf),
          [`${prefixCls}-star-half`]: isLast && this.isHalf,
          [`${prefixCls}-star-zero`]: !full,
        },
      ];
    },
  },
};
</script>
