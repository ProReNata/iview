<template>
  <transition
    :name="transitionName"
    @enter="handleEnter"
    @leave="handleLeave"
  >
    <div
      :class="classes"
      :style="styles"
    >
      <template v-if="type === 'notice'">
        <!-- eslint-disable vue/no-v-html -->
        <div
          ref="content"
          :class="contentClasses"
          v-html="content"
        >
        </div>
        <!-- eslint-enable vue/no-v-html -->
        <div :class="contentWithIcon">
          <render-cell
            :render="renderFunc"
          >
          </render-cell>
        </div>
        <a
          v-if="closable"
          :class="[baseClass + '-close']"
          @click="close"
        >
          <i class="ivu-icon ivu-icon-ios-close-empty">
          </i>
        </a>
      </template>
      <template v-if="type === 'message'">
        <div
          ref="content"
          :class="[baseClass + '-content']"
        >
          <!-- eslint-disable vue/no-v-html -->
          <div
            :class="[baseClass + '-content-text']"
            v-html="content"
          >
          </div>
          <!-- eslint-enable vue/no-v-html -->
          <div :class="[baseClass + '-content-text']">
            <render-cell
              :render="renderFunc"
            >
            </render-cell>
          </div>
          <a
            v-if="closable"
            :class="[baseClass + '-close']"
            @click="close"
          >
            <i class="ivu-icon ivu-icon-ios-close-empty">
            </i>
          </a>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
import noop from 'lodash/noop';
import RenderCell from '../render';

export default {
  components: {RenderCell},

  props: {
    className: {
      default: undefined,
      type: String,
    },
    closable: {
      default: false,
      type: Boolean,
    },
    content: {
      default: '',
      type: String,
    },
    duration: {
      default: 1.5,
      type: Number,
    },
    hasTitle: {
      default: false,
      type: Boolean,
    },
    name: {
      required: true,
      type: String,
    },
    onClose: {
      default: undefined,
      type: Function,
    },
    prefixCls: {
      default: '',
      type: String,
    },
    render: {
      default: undefined,
      type: Function,
    },
    styles: {
      default() {
        return {
          right: '50%',
        };
      },
      type: Object,
    },
    transitionName: {
      default: undefined,
      type: String,
    },
    type: {
      default: undefined,
      type: String,
    },
    withIcon: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      withDesc: false,
    };
  },

  computed: {
    baseClass() {
      return `${this.prefixCls}-notice`;
    },
    classes() {
      return [
        this.baseClass,
        {
          [`${this.className}`]: !!this.className,
          [`${this.baseClass}-closable`]: this.closable,
          [`${this.baseClass}-with-desc`]: this.withDesc,
        },
      ];
    },
    contentClasses() {
      return [`${this.baseClass}-content`, this.render !== undefined ? `${this.baseClass}-content-with-render` : ''];
    },
    contentWithIcon() {
      return [
        this.withIcon ? `${this.prefixCls}-content-with-icon` : '',
        !this.hasTitle && this.withIcon ? `${this.prefixCls}-content-with-render-notitle` : '',
      ];
    },
    messageClasses() {
      return [`${this.baseClass}-content`, this.render !== undefined ? `${this.baseClass}-content-with-render` : ''];
    },
    renderFunc() {
      return this.render || noop;
    },
  },

  mounted() {
    this.clearCloseTimer();

    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.duration * 1000);
    }

    // check if with desc in Notice component
    if (this.prefixCls === 'ivu-notice') {
      const desc = this.$refs.content.querySelectorAll(`.${this.prefixCls}-desc`)[0];

      if (this.render) {
        this.withDesc = true;
      } else {
        this.withDesc = desc ? desc.innerHTML !== '' : false;
      }
    }
  },

  beforeDestroy() {
    this.clearCloseTimer();
  },

  methods: {
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    close() {
      this.clearCloseTimer();
      this.onClose();
      this.$parent.close(this.name);
    },
    handleEnter(el) {
      if (this.type === 'message') {
        el.style.height = `${el.scrollHeight}px`;
      }
    },
    handleLeave(el) {
      if (this.type === 'message') {
        // 优化一下，如果当前只有一个 Message，则不使用 js 过渡动画，这样更优美
        if (document.getElementsByClassName('ivu-message-notice').length !== 1) {
          el.style.height = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      }
    },
  },
};
</script>
