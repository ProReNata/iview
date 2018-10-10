<template>
  <span :class="classes">
    <img 
      v-if="src" 
      :src="src"
    >
    <Icon 
      v-else-if="icon" 
      :type="icon"
    >
    </Icon>
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
    shape: {
      validator(value) {
        return oneOf(value, ['circle', 'square']);
      },
      default: 'circle',
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default: 'default',
    },
    src: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {
      prefixCls,
      scale: 1,
      childrenWidth: 0,
      isSlotShow: false,
    };
  },
  computed: {
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
    childrenStyle() {
      let style = {};

      if (this.isSlotShow) {
        style = {
          msTransform: `scale(${this.scale})`,
          WebkitTransform: `scale(${this.scale})`,
          transform: `scale(${this.scale})`,
          position: 'absolute',
          display: 'inline-block',
          left: `calc(50% - ${Math.round(this.childrenWidth / 2)}px)`,
        };
      }

      return style;
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
