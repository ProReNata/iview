<template xmlns:v-click-outside="http://www.w3.org/1999/xhtml">
  <div
    v-click-outside.capture="handleClose"
    v-click-outside:mousedown.capture="handleClose"
    :class="classes"
  >
    <div
      ref="reference"
      :class="wrapClasses"
      @click="toggleVisible"
    >
      <input
        :name="name"
        :value="currentValue"
        type="hidden"
      >
      <i :class="arrowClasses">
      </i>
      <div
        ref="input"
        :tabindex="disabled ? undefined : 0"
        :class="inputClasses"
        @keydown="onKeydown"
      >
        <div :class="[prefixCls + '-color']">
          <div
            v-show="value === '' && !visible"
            :class="[prefixCls + '-color-empty']"
          >
            <i :class="[iconPrefixCls, iconPrefixCls + '-ios-close-empty']">
            </i>
          </div>
          <div
            v-show="value || visible"
            :style="displayedColorStyle"
          >
          </div>
        </div>
      </div>
    </div>
    <transition name="transition-drop">
      <drop
        v-show="visible"
        ref="drop"
        v-transfer-dom
        :placement="placement"
        :data-transfer="transfer"
        :class="dropClasses"
      >
        <transition name="fade">
          <div
            v-if="visible"
            :class="[prefixCls + '-picker']"
          >
            <div :class="[prefixCls + '-picker-wrapper']">
              <div :class="[prefixCls + '-picker-panel']">
                <saturation
                  ref="saturation"
                  v-model="saturationColors"
                  :focused="visible"
                  @change="childChange"
                  @keydown.native="handleFirstTab"
                >
                </saturation>
              </div>
              <div
                v-if="hue"
                :class="[prefixCls + '-picker-hue-slider']"
              >
                <hue
                  v-model="saturationColors"
                  @change="childChange"
                >
                </hue>
              </div>
              <div
                v-if="alpha"
                :class="[prefixCls + '-picker-alpha-slider']"
              >
                <alpha
                  v-model="saturationColors"
                  @change="childChange"
                >
                </alpha>
              </div>
              <recommend-colors
                v-if="colors.length"
                :list="colors"
                :class="[prefixCls + '-picker-colors']"
                @picker-color="handleSelectColor"
              >
              </recommend-colors>
              <recommend-colors
                v-if="!colors.length && recommend"
                :list="recommendedColor"
                :class="[prefixCls + '-picker-colors']"
                @picker-color="handleSelectColor"
              >
              </recommend-colors>
            </div>
            <div :class="[prefixCls + '-confirm']">
              <span :class="[prefixCls + '-confirm-color']">
                {{ formatColor }}
              </span>
              <i-button
                ref="clear"
                :tabindex="0"
                size="small"
                type="ghost"
                @click.native="handleClear"
                @keydown.exact="onClear"
                @keydown.native="onClearNative"
              >
                {{ t('i.datepicker.clear') }}
              </i-button>
              <i-button
                ref="ok"
                :tabindex="0"
                size="small"
                type="primary"
                @click.native="handleSuccess"
                @keydown.exact="onOk"
                @keydown.native="onOkNative"
              >
                {{ t('i.datepicker.ok') }}
              </i-button>
            </div>
          </div>
        </transition>
      </drop>
    </transition>
  </div>
</template>

<script>
import tinycolor from 'tinycolor2';
import {directive as clickOutside} from 'v-click-outside-x';
import isOneOf from 'Global/Assets/isOneOf';
import TransferDom from 'Src/directives/transfer-dom';
import Drop from 'Components/select/dropdown.vue';
import Locale from 'Src/mixins/locale';
import Emitter from 'Src/mixins/emitter';
import RecommendColors from './recommend-colors.vue';
import Saturation from './saturation.vue';
import Hue from './hue.vue';
import Alpha from './alpha.vue';
import Prefixes from './prefixMixin';
import {changeColor, toRGBAString} from './utils';

export default {
  name: 'ColorPicker',

  components: {Alpha, Drop, Hue, RecommendColors, Saturation},

  directives: {clickOutside, TransferDom},

  mixins: [Emitter, Locale, Prefixes],

  props: {
    alpha: {
      default: false,
      type: Boolean,
    },
    colors: {
      default() {
        return [];
      },
      type: Array,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    format: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['hsl', 'hsv', 'hex', 'rgb']);
      },
    },
    hideDropDown: {
      default: false,
      type: Boolean,
    },
    hue: {
      default: true,
      type: Boolean,
    },
    name: {
      default: undefined,
      type: String,
    },
    placement: {
      default: 'bottom',
      type: String,
      validator(value) {
        return isOneOf(value, [
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
    recommend: {
      default: false,
      type: Boolean,
    },
    size: {
      default: 'default',
      type: String,
      validator(value) {
        return isOneOf(value, ['small', 'large', 'default']);
      },
    },
    transfer: {
      default: false,
      type: Boolean,
    },
    value: {
      default: undefined,
      type: String,
    },
  },

  data() {
    return {
      currentValue: this.value,
      dragging: false,
      recommendedColor: [
        '#2d8cf0',
        '#19be6b',
        '#ff9900',
        '#ed3f14',
        '#00b5ff',
        '#19c919',
        '#f9e31c',
        '#ea1a1a',
        '#9b1dea',
        '#00c2b1',
        '#ac7a33',
        '#1d35ea',
        '#8bc34a',
        '#f16b62',
        '#ea4ca3',
        '#0d94aa',
        '#febd79',
        '#5d4037',
        '#00bcd4',
        '#f06292',
        '#cddc39',
        '#607d8b',
        '#000000',
        '#ffffff',
      ],
      val: changeColor(this.value),
      visible: false,
    };
  },

  computed: {
    arrowClasses() {
      return [
        this.iconPrefixCls,
        `${this.iconPrefixCls}-chevron-down`,
        `${this.inputPrefixCls}-icon`,
        `${this.inputPrefixCls}-icon-normal`,
      ];
    },
    classes() {
      return [
        `${this.prefixCls}`,
        {
          [`${this.prefixCls}-transfer`]: this.transfer,
        },
      ];
    },
    displayedColorStyle() {
      return {backgroundColor: toRGBAString(this.visible ? this.saturationColors.rgba : tinycolor(this.value).toRgb())};
    },
    dropClasses() {
      return [
        `${this.transferPrefixCls}-no-max-height`,
        {
          [`${this.prefixCls}-transfer`]: this.transfer,
          [`${this.prefixCls}-hide-drop`]: this.hideDropDown,
        },
      ];
    },
    formatColor() {
      const {format, saturationColors} = this;

      if (format) {
        if (format === 'hsl') {
          return tinycolor(saturationColors.hsl).toHslString();
        }

        if (format === 'hsv') {
          return tinycolor(saturationColors.hsv).toHsvString();
        }

        if (format === 'hex') {
          return saturationColors.hex;
        }

        if (format === 'rgb') {
          return toRGBAString(saturationColors.rgba);
        }
      } else if (this.alpha) {
        return toRGBAString(saturationColors.rgba);
      }

      return saturationColors.hex;
    },
    inputClasses() {
      return [
        `${this.prefixCls}-input`,
        `${this.inputPrefixCls}`,
        `${this.inputPrefixCls}-${this.size}`,
        {
          [`${this.prefixCls}-focused`]: this.visible,
          [`${this.prefixCls}-disabled`]: this.disabled,
        },
      ];
    },
    saturationColors: {
      get() {
        return this.val;
      },
      set(newVal) {
        this.val = newVal;
        this.$emit('on-active-change', this.formatColor);
      },
    },
    transition() {
      return isOneOf(this.placement, ['bottom-start', 'bottom', 'bottom-end']) ? 'slide-up' : 'fade';
    },
    wrapClasses() {
      return [
        `${this.prefixCls}-rel`,
        `${this.prefixCls}-${this.size}`,
        `${this.inputPrefixCls}-wrapper`,
        `${this.inputPrefixCls}-wrapper-${this.size}`,
        {
          [`${this.prefixCls}-disabled`]: this.disabled,
        },
      ];
    },
  },

  watch: {
    value(newVal) {
      this.val = changeColor(newVal);
    },
    visible(val) {
      this.val = changeColor(this.value);
      this.$refs.drop[val ? 'update' : 'destroy']();
      this.$emit('on-open-change', Boolean(val));
    },
  },

  mounted() {
    this.$on('on-escape-keydown', this.closer);
    this.$on('on-dragging', this.setDragging);
  },

  methods: {
    childChange(data) {
      this.colorChange(data);
    },
    closer(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.visible = false;
      this.$refs.input.focus();
    },
    colorChange(data, oldHue) {
      this.oldHue = this.saturationColors.hsl.h;
      this.saturationColors = changeColor(data, oldHue || this.oldHue);
    },
    handleButtons(event, value) {
      this.currentValue = value;
      this.$emit('input', value);
      this.$emit('on-change', value);
      this.dispatch('FormItem', 'on-form-change', value);
      this.closer(event);
    },
    handleClear(event) {
      this.handleButtons(event, '');
      this.$emit('on-pick-clear');
    },
    handleClose(event) {
      if (this.visible) {
        if (this.dragging || event.type === 'mousedown') {
          event.preventDefault();

          return;
        }

        if (this.transfer) {
          const {$el} = this.$refs.drop;

          if ($el === event.target || $el.contains(event.target)) {
            return;
          }
        }

        this.closer(event);

        return;
      }

      this.visible = false;
    },
    handleFirstTab(event) {
      if (event.key === 'Tab' && event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs.ok.$el.focus();
      }
    },
    handleLastTab(event) {
      if (!event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs.saturation.$el.focus();
      }
    },
    handleSelectColor(color) {
      this.val = changeColor(color);
      this.$emit('on-active-change', this.formatColor);
    },
    handleSuccess(event) {
      this.handleButtons(event, this.formatColor);
      this.$emit('on-pick-success');
    },
    onArrow(event) {
      if (!this.visible) {
        event.preventDefault();
        event.stopPropagation();
        this.visible = true;
      }
    },
    onClear(event) {
      if (event.key === 'Enter') {
        this.handleClear(event);
      }
    },
    onClearNative(event) {
      if (isOneOf(event.key, ['Esc', 'Escape'])) {
        this.closer(event);
      }
    },
    onEscape(event) {
      if (this.visible) {
        this.closer(event);
      }
    },
    onKeydown(event) {
      const {key} = event;

      if (isOneOf(key, ['Esc', 'Escape'])) {
        this.onEscape(event);
      } else if (isOneOf(key, ['Up', 'ArrowUp'])) {
        this.onArrow(event);
      } else if (isOneOf(key, ['Down', 'ArrowDown'])) {
        this.onArrow(event);
      } else if (key === 'Tab') {
        this.onTab(event);
      }
    },
    onOk(event) {
      if (event.key === 'Enter') {
        this.handleSuccess(event);
      }
    },
    onOkNative(event) {
      const {key} = event;

      if (key === 'Tab') {
        this.handleLastTab(event);
      } else if (isOneOf(key, ['Esc', 'Escape'])) {
        this.closer(event);
      }
    },
    onTab(event) {
      if (this.visible) {
        event.preventDefault();
      }
    },
    setDragging(value) {
      this.dragging = value;
    },
    toggleVisible() {
      if (this.disabled) {
        return;
      }

      this.visible = !this.visible;
      this.$refs.input.focus();
    },
  },
};
</script>
