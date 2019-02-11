<template>
  <div
    v-click-outside="handleClose"
    :class="classes"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      ref="reference"
      :class="[prefixCls + '-rel']"
      @click="handleClick"
      @mousedown="handleFocus(false)"
      @mouseup="handleBlur(false)"
    >
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        v-show="visible"
        ref="popper"
        v-transfer-dom
        :class="popperClasses"
        :style="styles"
        :data-transfer="transfer"
        @click="handleTransferClick"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <div :class="[prefixCls + '-content']">
          <div :class="[prefixCls + '-arrow']">
          </div>
          <div
            v-if="confirm"
            :class="[prefixCls + '-inner']"
          >
            <div :class="[prefixCls + '-body']">
              <i class="ivu-icon ivu-icon-help-circled">
              </i>
              <div :class="[prefixCls + '-body-message']">
                <slot name="title">
                  {{ title }}
                </slot>
              </div>
            </div>
            <div :class="[prefixCls + '-footer']">
              <i-button
                type="text"
                size="small"
                @click.native="cancel"
              >
                {{ localeCancelText }}
              </i-button>
              <i-button
                type="primary"
                size="small"
                @click.native="ok"
              >
                {{ localeOkText }}
              </i-button>
            </div>
          </div>
          <div
            v-if="!confirm"
            :class="[prefixCls + '-inner']"
          >
            <div
              v-if="showTitle"
              ref="title"
              :class="[prefixCls + '-title']"
            >
              <slot name="title">
                <div :class="[prefixCls + '-title-inner']">
                  {{ title }}
                </div>
              </slot>
            </div>
            <div :class="[prefixCls + '-body']">
              <div :class="[prefixCls + '-body-content']">
                <slot name="content">
                  <div :class="[prefixCls + '-body-content-inner']">
                    {{ content }}
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import head from 'lodash/head';
import {directive as clickOutside} from 'v-click-outside-x';
import Popper from '../base/popper';
import iButton from '../button/button.vue';
import TransferDom from '../../directives/transfer-dom';
import {oneOf} from '../../utils/assist';
import Locale from '../../mixins/locale';

const prefixCls = 'ivu-poptip';

export default {
  name: 'Poptip',

  directives: {clickOutside, TransferDom},

  components: {iButton},

  mixins: [Popper, Locale],

  props: {
    cancelText: {
      default: undefined,
      type: String,
    },
    confirm: {
      default: false,
      type: Boolean,
    },
    content: {
      default: '',
      type: [String, Number],
    },
    okText: {
      default: undefined,
      type: String,
    },
    placement: {
      default: 'top',
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
    popperClass: {
      default: undefined,
      type: String,
    },
    title: {
      default: undefined,
      type: [String, Number],
    },
    transfer: {
      default: false,
      type: Boolean,
    },
    trigger: {
      default: 'click',
      validator(value) {
        return oneOf(value, ['click', 'focus', 'hover']);
      },
    },
    width: {
      default: undefined,
      type: [String, Number],
    },
  },

  data() {
    return {
      // transfer 模式下，点击 slot 也会触发关闭
      disableCloseUnderTransfer: false,
      isInput: false,
      prefixCls,
      showTitle: true,
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-confirm`]: this.confirm,
        },
      ];
    },
    localeCancelText() {
      if (this.cancelText === undefined) {
        return this.t('i.poptip.cancelText');
      }

      return this.cancelText;
    },
    localeOkText() {
      if (this.okText === undefined) {
        return this.t('i.poptip.okText');
      }

      return this.okText;
    },
    popperClasses() {
      return [
        `${prefixCls}-popper`,
        {
          [`${prefixCls}-confirm`]: this.transfer && this.confirm,
          [`${this.popperClass}`]: !!this.popperClass,
        },
      ];
    },
    styles() {
      const style = {};

      if (this.width) {
        style.width = `${this.width}px`;
      }

      return style;
    },
  },

  mounted() {
    if (!this.confirm) {
      //                this.showTitle = this.$refs.title.innerHTML != `<div class="${prefixCls}-title-inner"></div>`;
      this.showTitle = this.$slots.title !== undefined || this.title;
    }

    // if trigger and children is input or textarea,listen focus & blur event
    if (this.trigger === 'focus') {
      this.$nextTick(() => {
        const $children = this.getInputChildren();

        if ($children) {
          this.isInput = true;
          $children.addEventListener('focus', this.handleFocus, false);
          $children.addEventListener('blur', this.handleBlur, false);
        }
      });
    }
  },
  beforeDestroy() {
    const $children = this.getInputChildren();

    if ($children) {
      $children.removeEventListener('focus', this.handleFocus, false);
      $children.removeEventListener('blur', this.handleBlur, false);
    }
  },

  methods: {
    cancel() {
      this.visible = false;
      this.$emit('on-cancel');
    },
    getInputChildren() {
      const $input = this.$refs.reference.querySelectorAll('input');
      const $textarea = this.$refs.reference.querySelectorAll('textarea');
      let $children = null;

      if ($input.length) {
        $children = head($input);
      } else if ($textarea.length) {
        $children = head($textarea);
      }

      return $children;
    },
    handleBlur(fromInput = true) {
      if (this.trigger !== 'focus' || this.confirm || (this.isInput && !fromInput)) {
        return;
      }

      this.visible = false;
    },
    handleClick() {
      if (this.confirm) {
        this.visible = !this.visible;

        return true;
      }

      if (this.trigger !== 'click') {
        return false;
      }

      this.visible = !this.visible;

      return false;
    },
    handleClose() {
      if (this.disableCloseUnderTransfer) {
        this.disableCloseUnderTransfer = false;

        return false;
      }

      if (this.confirm) {
        this.visible = false;

        return true;
      }

      if (this.trigger !== 'click') {
        return false;
      }

      this.visible = false;

      return false;
    },
    handleFocus(fromInput = true) {
      if (this.trigger !== 'focus' || this.confirm || (this.isInput && !fromInput)) {
        return;
      }

      this.visible = true;
    },
    handleMouseenter() {
      if (this.trigger !== 'hover' || this.confirm) {
        return;
      }

      if (this.enterTimer) {
        clearTimeout(this.enterTimer);
      }

      this.enterTimer = setTimeout(() => {
        this.visible = true;
      }, 100);
    },
    handleMouseleave() {
      if (this.trigger !== 'hover' || this.confirm) {
        return;
      }

      if (this.enterTimer) {
        clearTimeout(this.enterTimer);
        this.enterTimer = setTimeout(() => {
          this.visible = false;
        }, 100);
      }
    },
    handleTransferClick() {
      if (this.transfer) {
        this.disableCloseUnderTransfer = true;
      }
    },
    ok() {
      this.visible = false;
      this.$emit('on-ok');
    },
  },
};
</script>
