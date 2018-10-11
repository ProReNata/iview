<template>
  <transition 
    v-if="fade" 
    name="fade"
  >
    <div 
      :class="classes" 
      :style="wraperStyles" 
      @click.stop="check"
    >
      <span 
        v-if="showDot" 
        :class="dotClasses" 
        :style="bgColorStyle"
      >
      </span>
      <span 
        :class="textClasses" 
        :style="textColorStyle"
      >
        <slot></slot>
      </span>
      <Icon 
        v-if="closable" 
        :class="iconClass" 
        :color="lineColor" 
        type="ios-close-empty" 
        @click.native.stop="close"
      >
      </Icon>
    </div>
  </transition>
  <div 
    v-else 
    :class="classes" 
    :style="wraperStyles" 
    @click.stop="check"
  >
    <span 
      v-if="showDot" 
      :class="dotClasses" 
      :style="bgColorStyle"
    >
    </span>
    <span 
      :class="textClasses" 
      :style="textColorStyle"
    >
      <slot></slot>
    </span>
    <Icon 
      v-if="closable" 
      :class="iconClass" 
      :color="lineColor" 
      type="ios-close-empty" 
      @click.native.stop="close"
    >
    </Icon>
  </div>
</template>
<script>
import Icon from '../icon';
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-tag';
const initColorList = ['blue', 'green', 'red', 'yellow', 'default'];
export default {
  name: 'Tag',
  components: {Icon},
  props: {
    checkable: {
      default: false,
      type: Boolean,
    },
    checked: {
      default: true,
      type: Boolean,
    },
    closable: {
      default: false,
      type: Boolean,
    },
    color: {
      default: 'default',
      type: String,
    },
    fade: {
      default: true,
      type: Boolean,
    },
    name: {
      type: [String, Number],
    },
    type: {
      validator(value) {
        return oneOf(value, ['border', 'dot']);
      },
    },
  },
  data() {
    return {
      isChecked: this.checked,
    };
  },
  computed: {
    bgColorStyle() {
      return oneOf(this.color, initColorList) ? {} : {background: this.dotColor};
    },
    borderColor() {
      return this.color !== undefined ? (this.color === 'default' ? '' : this.color) : '';
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.color}`]: !!this.color && oneOf(this.color, initColorList),
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-closable`]: this.closable,
          [`${prefixCls}-checked`]: this.isChecked,
        },
      ];
    },
    defaultTypeColor() {
      return this.type !== 'dot' && this.type !== 'border'
        ? this.color !== undefined
          ? oneOf(this.color, initColorList)
            ? ''
            : this.color
          : ''
        : '';
    },
    dotClasses() {
      return `${prefixCls}-dot-inner`;
    },
    dotColor() {
      return this.color !== undefined ? (oneOf(this.color, initColorList) ? '' : this.color) : '';
    },
    iconClass() {
      if (this.type === 'dot') {
        return '';
      }

      if (this.type === 'border') {
        return oneOf(this.color, initColorList) ? `${prefixCls}-color-${this.color}` : '';
      }

      return this.color !== undefined ? (this.color === 'default' ? '' : 'rgb(255, 255, 255)') : '';
    },
    lineColor() {
      if (this.type === 'dot') {
        return '';
      }

      if (this.type === 'border') {
        return this.color !== undefined ? (oneOf(this.color, initColorList) ? '' : this.color) : '';
      }

      return this.color !== undefined ? (this.color === 'default' ? '' : 'rgb(255, 255, 255)') : '';
    },
    showDot() {
      return !!this.type && this.type === 'dot';
    },
    textClasses() {
      return [
        `${prefixCls}-text`,
        this.type === 'border' ? (oneOf(this.color, initColorList) ? `${prefixCls}-color-${this.color}` : '') : '',
        this.type !== 'dot' && this.type !== 'border' && this.color !== 'default'
          ? this.isChecked
            ? `${prefixCls}-color-white`
            : ''
          : '',
      ];
    },
    textColorStyle() {
      return oneOf(this.color, initColorList)
        ? {}
        : this.type !== 'dot' && this.type !== 'border'
          ? this.isChecked
            ? {color: this.lineColor}
            : {}
          : {color: this.lineColor};
    },
    wraperStyles() {
      return oneOf(this.color, initColorList)
        ? {}
        : {
            background: this.isChecked ? this.defaultTypeColor : 'transparent',
            borderColor: this.type !== 'dot' && this.type !== 'border' && this.isChecked ? this.borderColor : this.lineColor,
            borderStyle: 'solid',
            borderWidth: '1px',
            color: this.lineColor,
          };
    },
  },
  methods: {
    check() {
      if (!this.checkable) {
        return;
      }

      const checked = !this.isChecked;
      this.isChecked = checked;

      if (this.name === undefined) {
        this.$emit('on-change', checked);
      } else {
        this.$emit('on-change', checked, this.name);
      }
    },
    close(event) {
      if (this.name === undefined) {
        this.$emit('on-close', event);
      } else {
        this.$emit('on-close', event, this.name);
      }
    },
  },
};
</script>
