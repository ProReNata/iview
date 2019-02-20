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
import deepFreeze from 'Global/Assets/deepFreeze';
import './redactor-3_1_6/redactor/redactor';
import './redactor-3_1_6/redactor/_langs/sv';

const prefixCls = 'byx-richtext';
const NAME = 'Richtext';
const DEFAULT_LANG = 'sv';
const INPUT = 'input';
const CALLBACKS = 'callbacks';
const EMPTY_STRING = '';
const BOLD = 'bold';
const ITALIC = 'italic';
const UNDERLINE = 'underline';
const LINK = 'link';
const HTML = 'html';
const CODE = 'code';
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
    value: CODE,
  },
});

const BUTTONS = Object.freeze([BOLD, ITALIC, UNDERLINE, LINK, HTML]);
const buttons = deepFreeze(JSON.parse(JSON.stringify($R.buttons)));

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
      buttonIconHtmlMap: null,
      options: this.config || {
        air: true,
        buttons: BUTTONS,
        lang: DEFAULT_LANG,
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
    this.buttonIconHtmlMap = this.getButtonHTMLMap();
  },

  mounted() {
    this.init();
  },

  methods: {
    getButtonHTMLMap() {
      return BUTTONS.reduce((accumulator, button) => {
        return Object.defineProperty(accumulator, button, {
          enumerable: true,
          value: getIconAsHTML({
            fw: true,
            type: BUTTONS_ICON_MAP[button],
          }),
        });
      }, Object.create(null));
    },
    getCallbacks() {
      return {
        changed: (html) => {
          this.handleInput(html);

          return html;
        },
      };
    },
    handleInput(val) {
      this.$emit(INPUT, val);
    },
    init() {
      // extend config
      Vue.set(this.options, CALLBACKS, this.getCallbacks());

      // call Redactor
      const app = $R(this.$refs.redactor, this.options);

      // set instance
      this.redactor = app;
      this.$parent.redactor = app;
      this.redactor.api(this.editorState);
      this.setButtonIcons();
    },
    setButtonIcons() {
      BUTTONS.forEach((button) => {
        const reButton = this.redactor.toolbar.getButton(button);

        reButton.setIcon(this.buttonIconHtmlMap[button]);
        const {tooltip, title} = buttons[button];
        reButton.setTooltip(this.redactor.lang.parse(tooltip || title));
      });
    },
  },
};
</script>
