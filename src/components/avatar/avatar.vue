<template>
  <span :class="classes">
    <img
      v-if="src"
      :src="src"
      alt=""
    >
    <icon
      v-else-if="icon"
      :type="icon"
    >
    </icon>
    <span
      v-else
      ref="children"
      :class="[prefixCls + '-string']"
      :style="childrenStyle"
    >
      <slot></slot>
    </span>
  </span>
</template>

<script>
import Icon from '../icon';
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-avatar';

export default {
  name: 'Avatar',

  components: {Icon},

  props: {
    icon: {
      default: undefined,
      type: String,
    },
    shape: {
      default: 'circle',
      validator(value) {
        return oneOf(value, ['circle', 'square']);
      },
    },
    size: {
      default: 'default',
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    src: {
      default: undefined,
      type: String,
    },
  },

  data() {
    return {
      childrenWidth: 0,
      isSlotShow: false,
      prefixCls,
      scale: 1,
    };
  },

  computed: {
    childrenStyle() {
      let style = {};

      if (this.isSlotShow) {
        style = {
          display: 'inline-block',
          left: `calc(50% - ${Math.round(this.childrenWidth / 2)}px)`,
          msTransform: `scale(${this.scale})`,
          position: 'absolute',
          transform: `scale(${this.scale})`,
          WebkitTransform: `scale(${this.scale})`,
        };
      }

      return style;
    },
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.shape}`,
        `${prefixCls}-${this.size}`,
        {
          [`${prefixCls}-image`]: !!this.src,
          [`${prefixCls}-icon`]: !!this.icon,
        },
      ];
    },
  },

  mounted() {
    this.setScale();
  },

  updated() {
    this.setScale();
  },

  methods: {
    setScale() {
      this.isSlotShow = !this.src && !this.icon;

      if (this.$refs.children) {
        // set children width again to make slot centered
        this.childrenWidth = this.$refs.children.offsetWidth;
        const avatarWidth = this.$el.getBoundingClientRect().width;

        // add 4px gap for each side to get better performance
        if (avatarWidth - 8 < this.childrenWidth) {
          this.scale = (avatarWidth - 8) / this.childrenWidth;
        } else {
          this.scale = 1;
        }
      }
    },
  },
};
</script>
