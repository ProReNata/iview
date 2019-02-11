<template>
  <div
    class="ivu-select-dropdown"
    :class="className"
    :style="styles"
  >
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import noop from 'lodash/noop';
import {getStyle} from '../../utils/assist';

const isServer = Vue.prototype.$isServer;

const Popper = isServer ? noop : require('popper.js/dist/umd/popper.js');

export default {
  name: 'Drop',

  props: {
    className: {
      default: undefined,
      type: String,
    },
    placement: {
      default: 'bottom-start',
      type: String,
    },
  },

  data() {
    return {
      popper: null,
      popperStatus: false,
      width: '',
    };
  },

  computed: {
    styles() {
      const style = {};

      if (this.width) {
        style.width = `${this.width}px`;
      }

      return style;
    },
  },

  created() {
    this.$on('on-update-popper', this.update);
    this.$on('on-destroy-popper', this.destroy);
  },

  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
    }
  },

  methods: {
    destroy() {
      if (this.popper) {
        setTimeout(() => {
          if (this.popper && !this.popperStatus) {
            this.popper.destroy();
            this.popper = null;
          }

          this.popperStatus = false;
        }, 300);
      }
    },
    resetTransformOrigin() {
      // 不判断，Select 会报错，不知道为什么
      if (!this.popper) {
        return;
      }

      const xPlacement = this.popper.popper.getAttribute('x-placement');
      const placementStart = xPlacement.split('-')[0];
      const placementEnd = xPlacement.split('-')[1];
      const leftOrRight = xPlacement === 'left' || xPlacement === 'right';

      if (!leftOrRight) {
        this.popper.popper.style.transformOrigin =
          placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom';
      }
    },
    update() {
      if (isServer) {
        return;
      }

      if (this.popper) {
        this.$nextTick(() => {
          this.popper.update();
          this.popperStatus = true;
        });
      } else {
        this.$nextTick(() => {
          this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
            modifiers: {
              computeStyle: {
                gpuAcceleration: false,
              },
              preventOverflow: {
                boundariesElement: 'window',
              },
            },
            onCreate: () => {
              this.resetTransformOrigin();
              this.$nextTick(this.popper.update());
            },
            onUpdate: () => {
              this.resetTransformOrigin();
            },
            placement: this.placement,
          });
        });
      }

      // set a height for parent is Modal and Select's width is 100%
      if (this.$parent.$options.name === 'iSelect') {
        this.width = parseInt(getStyle(this.$parent.$el, 'width'), 10);
      }
    },
  },
};
</script>
