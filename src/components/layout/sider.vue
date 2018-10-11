<template>
  <div
    :class="wrapClasses"
    :style="wrapStyles"
  >
    <span
      v-show="showZeroTrigger"
      :class="zeroWidthTriggerClasses"
      @click="toggleCollapse"
    >
      <i class="ivu-icon ivu-icon-navicon-round">
      </i>
    </span>
    <div :class="childClasses">
      <slot></slot>
    </div>
    <slot name="trigger">
      <div
        v-show="showBottomTrigger"
        :class="triggerClasses"
        :style="{width: siderWidth + 'px'}"
        @click="toggleCollapse"
      >
        <i :class="triggerIconClasses">
        </i>
      </div>
    </slot>
  </div>
</template>
<script>
import {on, off} from '../../utils/dom';
import {oneOf, dimensionMap, setMatchMedia} from '../../utils/assist';

const prefixCls = 'ivu-layout-sider';
setMatchMedia();
export default {
  name: 'Sider',
  props: {
    breakpoint: {
      type: String,
      validator(val) {
        return oneOf(val, ['xs', 'sm', 'md', 'lg', 'xl']);
      },
    },
    collapsedWidth: {
      default: 64,
      type: [Number, String],
    },
    collapsible: {
      default: false,
      type: Boolean,
    },
    defaultCollapsed: {
      default: false,
      type: Boolean,
    },
    hideTrigger: {
      default: false,
      type: Boolean,
    },
    reverseArrow: {
      default: false,
      type: Boolean,
    },
    value: {
      default: false,
      // if it's collpased now
      type: Boolean,
    },
    width: {
      default: 200,
      type: [Number, String],
    },
  },
  data() {
    return {
      mediaMatched: false,
      prefixCls,
    };
  },
  computed: {
    childClasses() {
      return `${this.prefixCls}-children`;
    },
    showBottomTrigger() {
      return this.collapsible ? !this.mediaMatched && !this.hideTrigger : false;
    },
    showZeroTrigger() {
      return this.collapsible
        ? (this.mediaMatched && !this.hideTrigger) || (parseInt(this.collapsedWidth, 10) === 0 && this.value && !this.hideTrigger)
        : false;
    },
    siderWidth() {
      return this.collapsible
        ? this.value
          ? this.mediaMatched
            ? 0
            : parseInt(this.collapsedWidth, 10)
          : parseInt(this.width, 10)
        : this.width;
    },
    triggerClasses() {
      return [`${prefixCls}-trigger`, this.value ? `${prefixCls}-trigger-collapsed` : ''];
    },
    triggerIconClasses() {
      return ['ivu-icon', `ivu-icon-chevron-${this.reverseArrow ? 'right' : 'left'}`, `${prefixCls}-trigger-icon`];
    },
    wrapClasses() {
      return [`${prefixCls}`, this.siderWidth ? '' : `${prefixCls}-zero-width`, this.value ? `${prefixCls}-collapsed` : ''];
    },
    wrapStyles() {
      return {
        flex: `0 0 ${this.siderWidth}px`,
        maxWidth: `${this.siderWidth}px`,
        minWidth: `${this.siderWidth}px`,
        width: `${this.siderWidth}px`,
      };
    },
    zeroWidthTriggerClasses() {
      return [`${prefixCls}-zero-width-trigger`, this.reverseArrow ? `${prefixCls}-zero-width-trigger-left` : ''];
    },
  },
  watch: {
    value(stat) {
      this.$emit('on-collapse', stat);
    },
  },
  mounted() {
    if (this.defaultCollapsed) {
      this.$emit('input', this.defaultCollapsed);
    }

    if (this.breakpoint !== undefined) {
      on(window, 'resize', this.onWindowResize);
      this.matchMedia();
    }
  },
  beforeDestroy() {
    if (this.breakpoint !== undefined) {
      off(window, 'resize', this.onWindowResize);
    }
  },
  methods: {
    matchMedia() {
      let matchMedia;

      if (window.matchMedia) {
        matchMedia = window.matchMedia;
      }

      const {mediaMatched} = this;
      this.mediaMatched = matchMedia(`(max-width: ${dimensionMap[this.breakpoint]})`).matches;

      if (this.mediaMatched !== mediaMatched) {
        this.$emit('input', this.mediaMatched);
      }
    },
    onWindowResize() {
      this.matchMedia();
    },
    toggleCollapse() {
      const value = this.collapsible ? !this.value : false;
      this.$emit('input', value);
    },
  },
};
</script>
