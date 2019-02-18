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
      <icon
        v-if="closable"
        :class="iconClass"
        :color="lineColor"
        type="times"
        weight="regular"
        @click.native.stop="close"
      >
      </icon>
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
    <icon
      v-if="closable"
      :class="iconClass"
      :color="lineColor"
      type="times"
      weight="regular"
      @click.native.stop="close"
    >
    </icon>
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
      default: undefined,
      type: [String, Number],
    },
    type: {
      default: undefined,
      type: String,
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
      if (typeof this.color === 'undefined') {
        return '';
      }

      return this.color === 'default' ? '' : this.color;
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
      if (this.type !== 'dot' && this.type !== 'border') {
        if (typeof this.color !== 'undefined') {
          return oneOf(this.color, initColorList) ? '' : this.color;
        }
      }

      return '';
    },
    dotClasses() {
      return `${prefixCls}-dot-inner`;
    },
    dotColor() {
      if (typeof this.color === 'undefined') {
        return '';
      }

      return oneOf(this.color, initColorList) ? '' : this.color;
    },
    iconClass() {
      if (this.type === 'dot') {
        return '';
      }

      if (this.type === 'border') {
        return oneOf(this.color, initColorList) ? `${prefixCls}-color-${this.color}` : '';
      }

      if (typeof this.color === 'undefined') {
        return '';
      }

      return this.color === 'default' ? '' : 'rgb(255, 255, 255)';
    },
    lineColor() {
      if (this.type === 'dot') {
        return '';
      }

      if (this.type === 'border') {
        if (typeof this.color === 'undefined') {
          return '';
        }

        return oneOf(this.color, initColorList) ? '' : this.color;
      }

      if (typeof this.color === 'undefined') {
        return '';
      }

      return this.color === 'default' ? '' : 'rgb(255, 255, 255)';
    },
    showDot() {
      return !!this.type && this.type === 'dot';
    },
    textClasses() {
      let type1 = '';
      let type2 = '';

      if (this.type === 'border') {
        type1 = oneOf(this.color, initColorList) ? `${prefixCls}-color-${this.color}` : '';
      }

      if (this.type !== 'dot' && this.type !== 'border' && this.color !== 'default') {
        type2 = this.isChecked ? `${prefixCls}-color-white` : '';
      }

      return [`${prefixCls}-text`, type1, type2];
    },
    textColorStyle() {
      if (oneOf(this.color, initColorList)) {
        return {};
      }

      if (this.type !== 'dot' && this.type !== 'border') {
        return this.isChecked ? {color: this.lineColor} : {};
      }

      return {color: this.lineColor};
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
