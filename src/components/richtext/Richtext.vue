<template>
  <div
    ref="redactor"
    :class="prefixCls"
  >
    {{ value }}
  </div>
</template>

<script>
import Vue from 'vue';
import {getIconAsHTML} from 'Components/icon';
import isProduction from 'Global/Assets/isProduction';
import not from 'Global/Assets/not';
import './redactor-3_1_6/redactor/redactor';
import './redactor-3_1_6/redactor/_langs/sv';

const prefixCls = 'byx-richtext';
const NAME = 'Richtext';
const EMPTY_STRING = '';
const BOLD = 'bold';
const ITALIC = 'italic';
const UNDERLINE = 'underline';
const LINK = 'link';
const HTML = 'html';
const BUTTONS_ICON_MAP = Object.create(null, {
  [BOLD]: {
    enumerable: true,
    value: BOLD,
  },
  [ITALIC]: {
    enumerable: true,
    value: ITALIC,
  },
  [UNDERLINE]: {
    enumerable: true,
    value: UNDERLINE,
  },
  [LINK]: {
    enumerable: true,
    value: LINK,
  },
  [HTML]: {
    enumerable: true,
    value: 'code',
  },
});

const BUTTONS = Object.freeze([BOLD, ITALIC, UNDERLINE, LINK, HTML]);
const buttons = JSON.parse(JSON.stringify($R.buttons));

export default {
  name: NAME,

  redactor: false,

  props: {
    config: {
      default: undefined,
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: undefined,
      type: String,
    },
    value: {
      default: EMPTY_STRING,
      type: String,
    },
  },

  data() {
    return {
      BUTTON_ICON_HTML_MAP: null,
      options: this.config || {
        air: true,
        buttons: BUTTONS,
        lang: 'sv',
        placeholder: this.placeholder,
        styles: false,
        source: not(isProduction),
        tabindex: 0,
        tabKey: false,
      },
      prefixCls,
    };
  },

  computed: {
    editorState() {
      return this.disabled ? 'module.editor.disable' : 'module.editor.enable';
    },
  },

  watch: {
    editorState() {
      this.redactor.api(this.editorState);
    },
    value(newValue) {
      if (not(this.redactor.editor.isFocus())) {
        this.redactor.source.setCode(newValue);
      }
    },
  },

  created() {
    this.BUTTON_ICON_HTML_MAP = BUTTONS.reduce((accumulator, button) => {
      return Object.defineProperty(accumulator, button, {
        enumerable: true,
        value: getIconAsHTML({
          fw: true,
          type: BUTTONS_ICON_MAP[button],
        }),
      });
    }, Object.create(null));
  },

  mounted() {
    this.init();
  },

  methods: {
    handleInput(val) {
      this.$emit('input', val);
    },
    init() {
      const callbacks = {
        changed: (html) => {
          this.handleInput(html);

          return html;
        },
      };

      // extend config
      Vue.set(this.options, 'callbacks', callbacks);

      // call Redactor
      const app = $R(this.$refs.redactor, this.options);

      // set instance
      this.redactor = app;
      this.$parent.redactor = app;
      this.redactor.api(this.editorState);
      BUTTONS.forEach((button) => {
        const reButton = this.redactor.toolbar.getButton(button);

        reButton.setIcon(this.BUTTON_ICON_HTML_MAP[button]);
        const {tooltip, title} = buttons[button];
        reButton.setTooltip(this.redactor.lang.parse(tooltip || title));
      });
    },
  },
};
</script>
