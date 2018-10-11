<template>
  <div 
    :class="[prefixCls]" 
    @mouseenter="handleShowPopper" 
    @mouseleave="handleClosePopper"
  >
    <div 
      ref="reference" 
      :class="[prefixCls + '-rel']"
    >
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        v-show="!disabled && (visible || always)"
        ref="popper"
        v-transfer-dom
        :class="[prefixCls + '-popper']"
        :data-transfer="transfer"
        @mouseenter="handleShowPopper"
        @mouseleave="handleClosePopper"
      >
        <div :class="[prefixCls + '-content']">
          <div :class="[prefixCls + '-arrow']">
          </div>
          <div :class="[prefixCls + '-inner']">
            <slot name="content">
              {{ content }}
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Popper from '../base/popper';
import TransferDom from '../../directives/transfer-dom';
import {oneOf} from '../../utils/assist';

const prefixCls = 'ivu-tooltip';

export default {
  name: 'Tooltip',
  directives: {TransferDom},
  mixins: [Popper],
  props: {
    always: {
      default: false,
      type: Boolean,
    },
    content: {
      default: '',
      type: [String, Number],
    },
    controlled: {
      default: false,
      // under this prop,Tooltip will not close when mouseleave
      type: Boolean,
    },
    delay: {
      default: 100,
      type: Number,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    placement: {
      default: 'bottom',
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
  },
  data() {
    return {
      prefixCls,
    };
  },
  watch: {
    content() {
      this.updatePopper();
    },
  },
  mounted() {
    if (this.always) {
      this.updatePopper();
    }
  },
  methods: {
    handleClosePopper() {
      if (this.timeout) {
        clearTimeout(this.timeout);

        if (!this.controlled) {
          this.timeout = setTimeout(() => {
            this.visible = false;
          }, 100);
        }
      }
    },
    handleShowPopper() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.visible = true;
      }, this.delay);
    },
  },
};
</script>
