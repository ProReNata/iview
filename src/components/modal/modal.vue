<template>
  <div
    v-transfer-dom
    :data-transfer="transfer"
  >
    <transition :name="transitionNames[1]">
      <div
        v-show="visible"
        :class="maskClasses"
        @click="mask"
      >
      </div>
    </transition>
    <div
      :class="wrapClasses"
      @click="handleWrapClick"
    >
      <transition
        :name="transitionNames[0]"
        @after-leave="animationFinish"
      >
        <div
          v-show="visible"
          :class="classes"
          :style="mainStyles"
        >
          <div :class="[prefixCls + '-content']">
            <a
              v-if="closable"
              :class="[prefixCls + '-close']"
              @click="close"
            >
              <slot name="close">
                <Icon type="ios-close-empty">
                </Icon>
              </slot>
            </a>
            <div
              v-if="showHead"
              :class="[prefixCls + '-header']"
            >
              <slot name="header">
                <div :class="[prefixCls + '-header-inner']">
                  {{ title }}
                </div>
              </slot>
            </div>
            <div :class="[prefixCls + '-body']">
              <slot></slot>
            </div>
            <div
              v-if="!footerHide"
              :class="[prefixCls + '-footer']"
            >
              <slot name="footer">
                <i-button
                  type="text"
                  size="large"
                  @click.native="cancel"
                >
                  {{ localeCancelText }}
                </i-button>
                <i-button
                  type="primary"
                  size="large"
                  :loading="buttonLoading"
                  @click.native="ok"
                >
                  {{ localeOkText }}
                </i-button>
              </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Icon from '../icon';
import iButton from '../button/button.vue';
import TransferDom from '../../directives/transfer-dom';
import Locale from '../../mixins/locale';
import Emitter from '../../mixins/emitter';
import ScrollbarMixins from './mixins-scrollbar';

const prefixCls = 'ivu-modal';

export default {
  name: 'Modal',
  components: {Icon, iButton},
  directives: {TransferDom},
  mixins: [Locale, Emitter, ScrollbarMixins],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 520,
    },
    okText: {
      type: String,
    },
    cancelText: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    styles: {
      type: Object,
    },
    className: {
      type: String,
    },
    // for instance
    footerHide: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    transitionNames: {
      type: Array,
      default() {
        return ['ease', 'fade'];
      },
    },
    transfer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      prefixCls,
      wrapShow: false,
      showHead: true,
      buttonLoading: false,
      visible: this.value,
    };
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}-wrap`,
        {
          [`${prefixCls}-hidden`]: !this.wrapShow,
          [`${this.className}`]: !!this.className,
        },
      ];
    },
    maskClasses() {
      return `${prefixCls}-mask`;
    },
    classes() {
      return `${prefixCls}`;
    },
    mainStyles() {
      const style = {};

      const width = parseInt(this.width, 10);
      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`,
      };

      const customStyle = this.styles ? this.styles : {};

      Object.assign(style, styleWidth, customStyle);

      return style;
    },
    localeOkText() {
      if (this.okText === undefined) {
        return this.t('i.modal.okText');
      }

      return this.okText;
    },
    localeCancelText() {
      if (this.cancelText === undefined) {
        return this.t('i.modal.cancelText');
      }

      return this.cancelText;
    },
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      if (val === false) {
        this.buttonLoading = false;
        this.timer = setTimeout(() => {
          this.wrapShow = false;
          this.removeScrollEffect();
        }, 300);
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.wrapShow = true;

        if (!this.scrollable) {
          this.addScrollEffect();
        }
      }

      this.broadcast('Table', 'on-visible-change', val);
      this.broadcast('Slider', 'on-visible-change', val); // #2852
      this.$emit('on-visible-change', val);
    },
    loading(val) {
      if (!val) {
        this.buttonLoading = false;
      }
    },
    scrollable(val) {
      if (!val) {
        this.addScrollEffect();
      } else {
        this.removeScrollEffect();
      }
    },
    title(val) {
      if (this.$slots.header === undefined) {
        this.showHead = !!val;
      }
    },
  },
  mounted() {
    if (this.visible) {
      this.wrapShow = true;
    }

    let showHead = true;

    if (this.$slots.header === undefined && !this.title) {
      showHead = false;
    }

    this.showHead = showHead;

    // ESC close
    document.addEventListener('keydown', this.EscClose);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.EscClose);
    this.removeScrollEffect();
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('on-cancel');
    },
    mask() {
      if (this.maskClosable) {
        this.close();
      }
    },
    handleWrapClick(event) {
      // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
      const className = event.target.getAttribute('class');

      if (className && className.indexOf(`${prefixCls}-wrap`) > -1) {
        this.mask();
      }
    },
    cancel() {
      this.close();
    },
    ok() {
      if (this.loading) {
        this.buttonLoading = true;
      } else {
        this.visible = false;
        this.$emit('input', false);
      }

      this.$emit('on-ok');
    },
    EscClose(e) {
      if (this.visible && this.closable) {
        if (e.keyCode === 27) {
          this.close();
        }
      }
    },
    animationFinish() {
      this.$emit('on-hidden');
    },
  },
};
</script>
