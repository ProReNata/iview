<template>
  <transition
    v-if="fade"
    name="fade"
  >
    <div
      :class="baseClasses"
      @click.stop="check"
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
        v-if="closable"
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
  <div
    v-else
    :class="baseClasses"
    @click.stop="check"
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
      v-if="closable"
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
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';
import Icon from 'Components/icon';

const prefixCls = 'byx-tag';
const initColorList = [
  'blue',
  'info',
  'information',
  'green',
  'success',
  'red',
  'danger',
  'yellow',
  'warning',
  'purple',
  'update',
  'default',
  'primary',
];
export default {
  name: 'Tag',

  components: {Icon},

  props: {
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
    border: {
      default: false,
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
          [`${prefixCls}-border`]: this.border,
          [`${prefixCls}-closable`]: this.closable,
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
