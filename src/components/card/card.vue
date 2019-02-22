<template>
  <div :class="classes">
    <div
      v-if="showHead"
      :class="headClasses"
    >
      <slot name="title">
        <p v-if="title">
          <icon
            v-if="icon"
            :type="icon"
          >
          </icon>
          {{ title }}
        </p>
      </slot>
    </div>
    <div
      v-if="showExtra"
      :class="extraClasses"
    >
      <slot name="extra">
      </slot>
    </div>
    <div
      :class="bodyClasses"
      :style="bodyStyles"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Icon from 'Components/icon';

const prefixCls = 'ivu-card';
const defaultPadding = 16;

export default {
  name: 'Card',

  components: {Icon},

  props: {
    bordered: {
      default: true,
      type: Boolean,
    },
    disHover: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: undefined,
      type: String,
    },
    padding: {
      default: defaultPadding,
      type: Number,
    },
    shadow: {
      default: false,
      type: Boolean,
    },
    title: {
      default: undefined,
      type: String,
    },
  },

  data() {
    return {
      showExtra: true,
      showHead: true,
    };
  },

  computed: {
    bodyClasses() {
      return `${prefixCls}-body`;
    },
    bodyStyles() {
      if (this.padding !== defaultPadding) {
        return {
          padding: `${this.padding}px`,
        };
      }

      return '';
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-bordered`]: this.bordered && !this.shadow,
          [`${prefixCls}-dis-hover`]: this.disHover || this.shadow,
          [`${prefixCls}-shadow`]: this.shadow,
        },
      ];
    },
    extraClasses() {
      return `${prefixCls}-extra`;
    },
    headClasses() {
      return `${prefixCls}-head`;
    },
  },

  mounted() {
    this.showHead = this.title || typeof this.$slots.title !== 'undefined';
    this.showExtra = typeof this.$slots.extra !== 'undefined';
  },
};
</script>
