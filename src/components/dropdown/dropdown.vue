<template>
  <div
    v-click-outside="onClickoutside"
    :class="[prefixCls]"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      ref="reference"
      :class="[prefixCls + '-rel']"
      @click="handleClick"
    >
      <slot></slot>
    </div>
    <transition name="transition-drop">
      <drop
        v-show="currentVisible"
        ref="drop"
        v-transfer-dom
        :class="dropdownCls"
        :placement="placement"
        :data-transfer="transfer"
        @mouseenter.native="handleMouseenter"
        @mouseleave.native="handleMouseleave"
      >
        <slot name="list">
        </slot>
      </drop>
    </transition>
  </div>
</template>

<script>
import {directive as clickOutside} from 'v-click-outside-x';
import Drop from '../select/dropdown.vue';
import TransferDom from '../../directives/transfer-dom';
import {oneOf, findComponentUpward} from '../../utils/assist';

const prefixCls = 'ivu-dropdown';

export default {
  name: 'Dropdown',

  directives: {clickOutside, TransferDom},

  components: {Drop},

  props: {
    placement: {
      default: 'bottom',
      type: String,
      validator(value) {
        return oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end',
        ]);
      },
    },
    transfer: {
      default: false,
      type: Boolean,
    },
    trigger: {
      default: 'hover',
      type: String,
      validator(value) {
        return oneOf(value, ['click', 'hover', 'custom']);
      },
    },
    visible: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      currentVisible: this.visible,
      prefixCls,
    };
  },

  computed: {
    dropdownCls() {
      return {
        [`${prefixCls}-transfer`]: this.transfer,
      };
    },
    transition() {
      return ['bottom-start', 'bottom', 'bottom-end'].indexOf(this.placement) > -1 ? 'slide-up' : 'fade';
    },
  },

  watch: {
    currentVisible(val) {
      if (val) {
        this.$refs.drop.update();
      } else {
        this.$refs.drop.destroy();
      }

      this.$emit('on-visible-change', val);
    },
    visible(val) {
      this.currentVisible = val;
    },
  },

  mounted() {
    this.$on('on-click', (key) => {
      const $parent = this.hasParent();

      if ($parent) {
        $parent.$emit('on-click', key);
      }
    });
    this.$on('on-hover-click', () => {
      const $parent = this.hasParent();

      if ($parent) {
        this.$nextTick(() => {
          if (this.trigger === 'custom') {
            return;
          }

          this.currentVisible = false;
        });
        $parent.$emit('on-hover-click');
      } else {
        this.$nextTick(() => {
          if (this.trigger === 'custom') {
            return;
          }

          this.currentVisible = false;
        });
      }
    });
    this.$on('on-haschild-click', () => {
      this.$nextTick(() => {
        if (this.trigger === 'custom') {
          return;
        }

        this.currentVisible = true;
      });
      const $parent = this.hasParent();

      if ($parent) {
        $parent.$emit('on-haschild-click');
      }
    });
  },

  methods: {
    handleClick() {
      if (this.trigger === 'custom') {
        return;
      }

      if (this.trigger !== 'click') {
        return;
      }

      this.currentVisible = !this.currentVisible;
    },
    handleClose() {
      if (this.trigger === 'custom') {
        return;
      }

      if (this.trigger !== 'click') {
        return;
      }

      this.currentVisible = false;
    },
    handleMouseenter() {
      if (this.trigger === 'custom') {
        return;
      }

      if (this.trigger !== 'hover') {
        return;
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.currentVisible = true;
      }, 250);
    },
    handleMouseleave() {
      if (this.trigger === 'custom') {
        return;
      }

      if (this.trigger !== 'hover') {
        return;
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.currentVisible = false;
        }, 150);
      }
    },
    hasParent() {
      //                const $parent = this.$parent.$parent.$parent;
      const $parent = findComponentUpward(this, 'Dropdown');

      if ($parent) {
        return $parent;
      }

      return false;
    },
    onClickoutside(e) {
      this.handleClose();

      if (this.currentVisible) {
        this.$emit('on-clickoutside', e);
      }
    },
  },
};
</script>
