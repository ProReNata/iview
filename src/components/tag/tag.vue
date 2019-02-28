<template>
  <transition
    name="fade"
  >
    <div
      :class="baseClasses"
    >
      <div
        v-if="icon && iconAttributes.type"
        :class="iconLeftClasses"
      >
        <icon
          :type="iconAttributes.type"
          :weight="iconAttributes.weight"
        >
        </icon>
      </div>
      <div
        v-if="$slots['icon-left']"
        :class="iconLeftClasses"
      >
        <slot
          name="icon-left"
        >
        </slot>
      </div>
      <slot></slot>
      <div
        v-if="$slots['icon-right']"
        :class="iconRightClasses"
      >
        <slot
          name="icon-right"
        >
        </slot>
      </div>
      <div
        v-if="dismissable"
        :class="closableClasses"
      >
        <icon
          type="times"
          weight="regular"
          @click.native.stop="close"
        >
        </icon>
      </div>
    </div>
  </transition>
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';
import Icon from 'Components/icon';

const prefixCls = 'byx-tag';
const initColorList = ['info', 'information', 'success', 'danger', 'warning', 'update', 'default', 'primary'];
export default {
  name: 'Tag',

  components: {Icon},

  props: {
    dismissable: {
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
    icon: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    baseClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.color}`]: isOneOf(this.color, initColorList),
        },
      ];
    },
    iconLeftClasses() {
      return `${prefixCls}-icon`;
    },
    iconRightClasses() {
      return `${prefixCls}-icon ${prefixCls}-icon-right`;
    },
    closableClasses() {
      return [this.iconRightClasses, 'cursor-pointer'];
    },
    iconAttributes() {
      let type = '';
      let weight = 'regular';

      if (this.color === 'warning' || this.color === 'yellow') {
        type = 'exclamation-triangle';
      }

      if (this.color === 'success' || this.color === 'green') {
        type = 'thumbs-up';
      }

      if (this.color === 'danger' || this.color === 'red') {
        type = 'skull';
      }

      if (this.color === 'update' || this.color === 'purple') {
        type = 'heart';
      }

      if (this.color === 'info' || this.color === 'information' || this.color === 'blue') {
        type = 'info-circle';
        weight = 'solid';
      }

      return {
        type,
        weight,
      };
    },
  },

  methods: {
    close(event) {
      this.$emit('on-close', event);
    },
  },
};
</script>
