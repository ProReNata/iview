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
    variant: {
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
          [`${prefixCls}-${this.variant}`]: isOneOf(this.variant, initColorList),
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

      if (this.variant === 'warning') {
        type = 'exclamation-triangle';
      }

      if (this.variant === 'success') {
        type = 'thumbs-up';
      }

      if (this.variant === 'danger') {
        type = 'skull';
      }

      if (this.variant === 'update') {
        type = 'heart';
      }

      if (this.variant === 'info' || this.variant === 'information') {
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
