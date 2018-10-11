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
  components: {iButton, Icon},
  directives: {TransferDom},
  mixins: [Locale, Emitter, ScrollbarMixins],
  props: {
    cancelText: {
      type: String,
    },
    className: {
      type: String,
    },
    closable: {
      default: true,
      type: Boolean,
    },
    // for instance
    footerHide: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    maskClosable: {
      default: true,
      type: Boolean,
    },
    okText: {
      type: String,
    },
    scrollable: {
      default: false,
      type: Boolean,
    },
    styles: {
      type: Object,
    },
    title: {
      type: String,
    },
    transfer: {
      default: true,
      type: Boolean,
    },
    transitionNames: {
      default() {
        return ['ease', 'fade'];
      },
      type: Array,
    },
    value: {
      default: false,
      type: Boolean,
    },
    width: {
      default: 520,
      type: [Number, String],
    },
  },
  data() {
    return {
      buttonLoading: false,
      prefixCls,
      showHead: true,
      visible: this.value,
      wrapShow: false,
    };
  },
  computed: {
    classes() {
      return `${prefixCls}`;
    },
    localeCancelText() {
      if (this.cancelText === undefined) {
        return this.t('i.modal.cancelText');
      }

      return this.cancelText;
    },
    localeOkText() {
      if (this.okText === undefined) {
        return this.t('i.modal.okText');
      }

      return this.okText;
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
    maskClasses() {
      return `${prefixCls}-mask`;
    },
    wrapClasses() {
      return [
        `${prefixCls}-wrap`,
        {
          [`${prefixCls}-hidden`]: !this.wrapShow,
          [`${this.className}`]: !!this.className,
        },
      ];
    },
  },
  watch: {
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
    animationFinish() {
      this.$emit('on-hidden');
    },
    cancel() {
      this.close();
    },
    close() {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('on-cancel');
    },
    EscClose(e) {
      if (this.visible && this.closable) {
        if (e.keyCode === 27) {
          this.close();
        }
      }
    },
    handleWrapClick(event) {
      // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
      const className = event.target.getAttribute('class');

      if (className && className.indexOf(`${prefixCls}-wrap`) > -1) {
        this.mask();
      }
    },
    mask() {
      if (this.maskClosable) {
        this.close();
      }
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
  },
};
</script>
