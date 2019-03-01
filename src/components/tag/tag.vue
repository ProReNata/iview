<template>
  <transition
    name="fade"
  >
    <div
      :class="baseClasses"
    >
      <div
        v-if="icon && defaultIconProps.type"
        :class="iconLeftClasses"
      >
        <icon
          :type="defaultIconProps.type"
          :weight="defaultIconProps.weight"
          fw
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
import Icon from 'Components/icon';

const prefixCls = 'byx-tag';
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
      validator(value) {
        return ['info', 'success', 'danger', 'warning', 'update', 'default', 'primary'].includes(value);
      },
    },
    icon: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    baseClasses() {
      return [`${prefixCls} ${prefixCls}-${this.variant}`];
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
    defaultIconProps() {
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

      if (this.variant === 'info') {
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
