<template xmlns:v-click-outside="http://www.w3.org/1999/xhtml">
  <div
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
    :class="classes"
  >
    <div
      ref="reference"

      :class="selectionCls"
      :tabindex="selectTabindex"

      @blur="toggleHeaderFocus"
      @focus="toggleHeaderFocus"

      @click="toggleMenu"
      @keydown="onKeydown"

      @mouseenter="hasMouseHoverHead = true"
      @mouseleave="hasMouseHoverHead = false"
    >
      <slot name="input">
        <input
          type="hidden"
          :name="name"
          :value="publicValue"
        >
        <select-head
          :filterable="filterable"
          :multiple="multiple"
          :values="values"
          :clearable="canBeCleared"
          :disabled="disabled"
          :remote="remote"
          :input-element-id="elementId"
          :initial-label="initialLabel"
          :placeholder="placeholder"
          :query-prop="query"

          @on-query-change="onQueryChange"
          @on-input-focus="isFocused = true"
          @on-input-blur="isFocused = false"
          @on-clear="clearSingleSelect"
        >
        </select-head>
      </slot>
    </div>
    <transition name="transition-drop">
      <drop
        v-show="dropVisible"
        ref="dropdown"
        v-transfer-dom
        :class="dropdownCls"
        :placement="placement"
        :data-transfer="transfer"
      >
        <ul
          v-show="showNotFoundLabel"
          :class="[prefixCls + '-not-found']"
        >
          <li>{{ localeNotFoundText }}</li>
        </ul>
        <ul :class="prefixCls + '-dropdown-list'">
          <functional-options
            v-if="(!remote) || (remote && !loading)"
            :options="selectOptions"
            :slot-update-hook="updateSlotOptions"
            :slot-options="slotOptions"
          >
          </functional-options>
        </ul>
        <ul
          v-show="loading"
          :class="[prefixCls + '-loading']"
        >
          {{ localeLoadingText }}
        </ul>
      </drop>
    </transition>
  </div>
</template>

<script>
import {directive as clickOutside} from 'v-click-outside-x';
import Drop from './dropdown.vue';
import TransferDom from '../../directives/transfer-dom';
import {oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';
import SelectHead from './select-head.vue';
import FunctionalOptions from './functional-options.vue';

const prefixCls = 'ivu-select';
const optionRegexp = /^i-option$|^Option$/i;
const optionGroupRegexp = /option-?group/i;

const findChild = (instance, checkFn) => {
  let match = checkFn(instance);

  if (match) {
    return instance;
  }

  for (let i = 0, l = instance.$children.length; i < l; i += 1) {
    const child = instance.$children[i];
    match = findChild(child, checkFn);

    if (match) {
      return match;
    }
  }

  return undefined;
};

const findOptionsInVNode = (node) => {
  const opts = node.componentOptions;

  if (opts && opts.tag.match(optionRegexp)) {
    return [node];
  }

  if (!node.children && (!opts || !opts.children)) {
    return [];
  }

  const children = [...(node.children || []), ...((opts && opts.children) || [])];
  const options = children.reduce((arr, el) => [...arr, ...findOptionsInVNode(el)], []).filter(Boolean);

  return options.length > 0 ? options : [];
};

const extractOptions = (options) => options.reduce((opts, slotEntry) => opts.concat(findOptionsInVNode(slotEntry)), []);

const applyProp = (node, propName, value) => ({
  ...node,
  componentOptions: {
    ...node.componentOptions,
    propsData: {
      ...node.componentOptions.propsData,
      [propName]: value,
    },
  },
});

const getNestedProperty = (obj, path) => {
  const keys = path.split('.');

  return keys.reduce((o, key) => (o && o[key]) || null, obj);
};

const getOptionLabel = (option) => {
  if (option.componentOptions.propsData.label) {
    return option.componentOptions.propsData.label;
  }

  const textContent = (option.componentOptions.children || []).reduce((str, child) => str + (child.text || ''), '');
  const innerHTML = getNestedProperty(option, 'data.domProps.innerHTML');

  return textContent || (typeof innerHTML === 'string' ? innerHTML : '');
};

const ANIMATION_TIMEOUT = 300;

export default {
  name: 'ISelect',

  components: {Drop, FunctionalOptions, SelectHead},

  directives: {clickOutside, TransferDom},

  mixins: [Emitter, Locale],

  props: {
    // Use for AutoComplete
    autoComplete: {
      default: false,
      type: Boolean,
    },
    clearable: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    elementId: {
      default: undefined,
      type: String,
    },
    filterable: {
      default: false,
      type: Boolean,
    },
    filterMethod: {
      default: undefined,
      type: Function,
    },
    // 使用时，也得设置 value 才行
    label: {
      default: '',
      type: [String, Number, Array],
    },
    labelInValue: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    loadingText: {
      default: undefined,
      type: String,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
    name: {
      default: undefined,
      type: String,
    },
    notFoundText: {
      default: undefined,
      type: String,
    },
    placeholder: {
      default: undefined,
      type: String,
    },
    placement: {
      default: 'bottom',
      type: String,
      validator(value) {
        return oneOf(value, ['top', 'bottom']);
      },
    },
    remoteMethod: {
      default: undefined,
      type: Function,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
    },
    transfer: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: [String, Number, Array],
    },
  },

  data() {
    return {
      caretPosition: -1,
      dropDownWidth: 0,
      focusIndex: -1,
      hasExpectedValue: false,
      hasMouseHoverHead: false,
      initialLabel: this.label,
      isFocused: false,
      lastRemoteQuery: '',
      prefixCls,
      preventRemoteCall: false,
      query: '',
      slotOptions: this.$slots.default,
      unchangedQuery: true,
      values: [],
      visible: false,
    };
  },

  computed: {
    canBeCleared() {
      const uiStateMatch = this.hasMouseHoverHead || this.active;
      const qualifiesForClear = !this.multiple && this.clearable;

      return uiStateMatch && qualifiesForClear && this.reset; // we return a function
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-visible`]: this.visible,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-multiple`]: this.multiple,
          [`${prefixCls}-single`]: !this.multiple,
          [`${prefixCls}-show-clear`]: this.showCloseIcon,
          [`${prefixCls}-${this.size}`]: !!this.size,
        },
      ];
    },
    dropdownCls() {
      return {
        [`${prefixCls}-dropdown-transfer`]: this.transfer,
        [`${prefixCls}-multiple`]: this.multiple && this.transfer,
        'ivu-auto-complete': this.autoComplete,
      };
    },
    dropVisible() {
      let status = true;
      const noOptions = !this.selectOptions || this.selectOptions.length === 0;

      if (!this.loading && this.remote && this.query === '' && noOptions) {
        status = false;
      }

      if (this.autoComplete && noOptions) {
        status = false;
      }

      return this.visible && status;
    },
    flatOptions() {
      return extractOptions(this.selectOptions);
    },
    localeLoadingText() {
      if (typeof this.loadingText === 'undefined') {
        return this.t('i.select.loading');
      }

      return this.loadingText;
    },
    localeNotFoundText() {
      if (typeof this.notFoundText === 'undefined') {
        return this.t('i.select.noMatch');
      }

      return this.notFoundText;
    },
    publicValue() {
      if (this.labelInValue) {
        return this.multiple ? this.values : this.values[0];
      }

      return this.multiple ? this.values.map((option) => option.value) : (this.values[0] || {}).value;
    },
    queryStringMatchesSelectedOption() {
      const selectedOptions = this.values[0];

      if (!selectedOptions) {
        return false;
      }

      const [query, label] = [this.query, selectedOptions.label].map((str) => (str || '').trim());

      return !this.multiple && this.unchangedQuery && query === label;
    },
    remote() {
      return typeof this.remoteMethod === 'function';
    },
    selectionCls() {
      return {
        [`${prefixCls}-selection`]: !this.autoComplete,
        [`${prefixCls}-selection-focused`]: this.isFocused,
      };
    },
    selectOptions() {
      const selectOptions = [];
      const slotOptions = this.slotOptions || [];
      let optionCounter = -1;
      const currentIndex = this.focusIndex;
      const selectedValues = this.values.filter(Boolean).map(({value}) => value);

      if (this.autoComplete) {
        const copyChildren = (node, fn) => ({
          ...node,
          children: (node.children || []).map(fn).map((child) => copyChildren(child, fn)),
        });

        const autoCompleteOptions = extractOptions(slotOptions);
        const selectedSlotOption = autoCompleteOptions[currentIndex];

        return slotOptions.map((node) => {
          if (node === selectedSlotOption || getNestedProperty(node, 'componentOptions.propsData.value') === this.value) {
            return applyProp(node, 'isFocused', true);
          }

          return copyChildren(node, (child) => {
            if (child !== selectedSlotOption) {
              return child;
            }

            return applyProp(child, 'isFocused', true);
          });
        });
      }

      const hasDefaultSelected = slotOptions.some((option) => this.query === option.key);
      /* eslint-disable-next-line no-restricted-syntax */
      for (const option of slotOptions) {
        const cOptions = option.componentOptions;

        if (!cOptions) {
          /* eslint-disable-next-line no-continue */
          continue;
        }

        if (cOptions.tag.match(optionGroupRegexp)) {
          let {children} = cOptions;

          // remove filtered children
          if (this.filterable) {
            children = children.filter(({componentOptions}) => this.validateOption(componentOptions));
          }

          /* eslint-disable-next-line no-loop-func */
          cOptions.children = children.map((opt) => {
            optionCounter += 1;

            return this.processOption(opt, selectedValues, optionCounter === currentIndex);
          });

          // keep the group if it still has children
          if (cOptions.children.length > 0) {
            selectOptions.push({...option});
          }
        } else {
          // ignore option if not passing filter
          if (!hasDefaultSelected) {
            const optionPassesFilter = this.filterable ? this.validateOption(cOptions) : option;

            if (!optionPassesFilter) {
              /* eslint-disable-next-line no-continue */
              continue;
            }
          }

          optionCounter += 1;
          selectOptions.push(this.processOption(option, selectedValues, optionCounter === currentIndex));
        }
      }

      return selectOptions;
    },
    selectTabindex() {
      return this.disabled || this.filterable ? -1 : 0;
    },
    showNotFoundLabel() {
      const {loading, remote, selectOptions} = this;

      return selectOptions && selectOptions.length === 0 && (!remote || (remote && !loading));
    },
    transitionName() {
      return this.placement === 'bottom' ? 'slide-up' : 'slide-down';
    },
  },

  watch: {
    dropVisible(open) {
      this.broadcast('Drop', open ? 'on-update-popper' : 'on-destroy-popper');
    },
    focusIndex(index) {
      if (index < 0 || this.autoComplete) {
        return;
      }

      // update scroll
      const optionValue = this.flatOptions[index].componentOptions.propsData.value;
      const optionInstance = findChild(
        this,
        ({$options}) => $options.componentName === 'select-item' && $options.propsData.value === optionValue,
      );

      const bottomOverflowDistance =
        optionInstance.$el.getBoundingClientRect().bottom - this.$refs.dropdown.$el.getBoundingClientRect().bottom;
      const topOverflowDistance =
        optionInstance.$el.getBoundingClientRect().top - this.$refs.dropdown.$el.getBoundingClientRect().top;

      if (bottomOverflowDistance > 0) {
        this.$refs.dropdown.$el.scrollTop += bottomOverflowDistance;
      }

      if (topOverflowDistance < 0) {
        this.$refs.dropdown.$el.scrollTop += topOverflowDistance;
      }
    },
    isFocused(focused) {
      const el = this.filterable ? this.$el.querySelector('input[type="text"]') : this.$el;
      el[this.isFocused ? 'focus' : 'blur']();

      // restore query value in filterable single selects
      const [selectedOption] = this.values;

      if (selectedOption && this.filterable && !this.multiple && !focused) {
        const selectedLabel = String(selectedOption.label || selectedOption.value).trim();

        if (selectedLabel && this.query !== selectedLabel) {
          this.preventRemoteCall = true;
          this.query = selectedLabel;
        }
      }
    },
    loading(state) {
      if (state === false) {
        this.updateSlotOptions();
      }
    },
    query(query) {
      this.$emit('on-query-change', query);
      const {remoteMethod, lastRemoteQuery} = this;
      const hasValidQuery = query !== '' && (query !== lastRemoteQuery || !lastRemoteQuery);
      const shouldCallRemoteMethod = remoteMethod && hasValidQuery && !this.preventRemoteCall;
      this.preventRemoteCall = false; // remove the flag

      if (shouldCallRemoteMethod) {
        this.focusIndex = -1;
        const promise = this.remoteMethod(query);
        this.initialLabel = '';

        if (promise && promise.then) {
          promise
            .then((options) => {
              if (options) {
                this.options = options;
              }

              return null;
            })
            .catch((error) => {
              throw error;
            });
        }
      }

      if (query !== '' && this.remote) {
        this.lastRemoteQuery = query;
      }
    },
    selectOptions() {
      if (this.hasExpectedValue && this.selectOptions.length > 0) {
        if (this.values.length === 0) {
          this.values = this.getInitialValue();
        }

        this.values = this.values.map(this.getOptionData).filter(Boolean);
        this.hasExpectedValue = false;
      }

      if (this.slotOptions && this.slotOptions.length === 0) {
        this.query = '';
      }
    },
    value(value) {
      const {getInitialValue, getOptionData, publicValue} = this;

      this.checkUpdateStatus();

      if (value === '') {
        this.values = [];
      } else if (JSON.stringify(value) !== JSON.stringify(publicValue)) {
        this.$nextTick(() => {
          this.values = getInitialValue()
            .map(getOptionData)
            .filter(Boolean);
        });
      }
    },
    values(now, before) {
      const newValue = JSON.stringify(now);
      const oldValue = JSON.stringify(before);
      let vModelValue;

      // v-model is always just the value, event with labelInValue === true
      if (this.publicValue && this.labelInValue) {
        vModelValue = this.multiple ? this.publicValue.map(({value}) => value) : this.publicValue.value;
      } else {
        vModelValue = this.publicValue;
      }

      const shouldEmitInput = newValue !== oldValue && vModelValue !== this.value;

      if (shouldEmitInput) {
        this.$emit('input', vModelValue); // to update v-model
        this.$emit('on-change', this.publicValue);
        this.dispatch('FormItem', 'on-form-change', this.publicValue);
      }
    },
    visible(state) {
      this.$emit('on-open-change', state);
    },
  },

  mounted() {
    this.$on('on-select-selected', this.onOptionClick);

    // set the initial values if there are any
    if (!this.remote && this.selectOptions.length > 0) {
      this.values = this.getInitialValue()
        .map((value) => {
          if (typeof value !== 'number' && !value) {
            return null;
          }

          return this.getOptionData(value);
        })
        .filter(Boolean);
    }

    this.checkUpdateStatus();
  },

  methods: {
    checkUpdateStatus() {
      if (this.getInitialValue().length > 0 && this.selectOptions.length === 0) {
        this.hasExpectedValue = true;
      }
    },
    clearSingleSelect() {
      // PUBLIC API
      this.$emit('on-clear');
      this.hideMenu();

      if (this.clearable) {
        this.reset();
      }
    },
    getInitialValue() {
      const {multiple, remote, value} = this;
      let initialValue = Array.isArray(value) ? value : [value];

      if (
        !multiple &&
        (typeof initialValue[0] === 'undefined' || (String(initialValue[0]).trim() === '' && !Number.isFinite(initialValue[0])))
      ) {
        initialValue = [];
      }

      if (remote && !multiple && value) {
        const data = this.getOptionData(value);
        this.query = data ? data.label : String(value);
      }

      return initialValue.filter((item) => Boolean(item) || item === 0);
    },
    getOptionData(value) {
      const option = this.flatOptions.find(({componentOptions}) => componentOptions.propsData.value === value);

      if (!option) {
        return null;
      }

      const label = getOptionLabel(option);

      return {
        label,
        value,
      };
    },
    handleKeydown(e) {
      const {key} = e;

      if (oneOf(key, ['Backspace', 'Delete'])) {
        return; // so we don't call preventDefault
      }

      if (this.visible) {
        e.preventDefault();

        if (key === 'Tab') {
          e.stopPropagation();
        }

        // Esc slide-up
        if (oneOf(key, ['Esc', 'Escape'])) {
          e.stopPropagation();
          this.hideMenu();
        }

        // next
        if (oneOf(key, ['Up', 'ArrowUp'])) {
          this.navigateOptions(-1);
        }

        // prev
        if (oneOf(key, ['Down', 'ArrowDown'])) {
          this.navigateOptions(1);
        }

        // enter
        if (key === 'Enter') {
          if (this.focusIndex === -1) {
            this.hideMenu();

            return;
          }

          const optionComponent = this.flatOptions[this.focusIndex];
          const option = this.getOptionData(optionComponent.componentOptions.propsData.value);
          this.onOptionClick(option);
        }
      } else {
        const keysThatCanOpenSelect = ['Up', 'ArrowUp', 'Down', 'ArrowDown'];

        if (keysThatCanOpenSelect.includes(key)) {
          this.toggleMenu(null, true);
        }
      }
    },
    hideMenu() {
      this.toggleMenu(null, false);
      setTimeout(() => {
        this.unchangedQuery = true;
      }, ANIMATION_TIMEOUT);
    },
    navigateOptions(direction) {
      const optionsLength = this.flatOptions.length - 1;

      let index = this.focusIndex + direction;

      if (index < 0) {
        index = optionsLength;
      }

      if (index > optionsLength) {
        index = 0;
      }

      // find nearest option in case of disabled options in between
      if (direction > 0) {
        let nearestActiveOption = -1;
        for (let i = 0; i < this.flatOptions.length; i += 1) {
          const optionIsActive = !this.flatOptions[i].componentOptions.propsData.disabled;

          if (optionIsActive) {
            nearestActiveOption = i;
          }

          if (nearestActiveOption >= index) {
            break;
          }
        }

        index = nearestActiveOption;
      } else {
        let nearestActiveOption = this.flatOptions.length;
        for (let i = optionsLength; i >= 0; i -= 1) {
          const optionIsActive = !this.flatOptions[i].componentOptions.propsData.disabled;

          if (optionIsActive) {
            nearestActiveOption = i;
          }

          if (nearestActiveOption <= index) {
            break;
          }
        }

        index = nearestActiveOption;
      }

      this.focusIndex = index;
    },
    onClickOutside(event) {
      if (this.visible) {
        if (event.type === 'mousedown') {
          event.preventDefault();

          return;
        }

        if (this.transfer) {
          const {$el} = this.$refs.dropdown;

          if ($el === event.target || $el.contains(event.target)) {
            return;
          }
        }

        if (this.filterable) {
          const input = this.$el.querySelector('input[type="text"]');
          this.caretPosition = input.selectionStart;
          this.$nextTick(() => {
            const caretPosition = this.caretPosition === -1 ? input.value.length : this.caretPosition;
            input.setSelectionRange(caretPosition, caretPosition);
          });
        }

        if (!this.autoComplete) {
          event.stopPropagation();
        }

        event.preventDefault();
        this.hideMenu();
        this.isFocused = true;
      } else {
        this.caretPosition = -1;
        this.isFocused = false;
      }
    },
    onKeydown(event) {
      const {key} = event;

      if (oneOf(key, ['Esc', 'Escape'])) {
        this.handleKeydown(event);
      } else if (key === 'Enter') {
        this.handleKeydown(event);
      } else if (oneOf(key, ['Up', 'ArrowUp'])) {
        event.preventDefault();
        this.handleKeydown(event);
      } else if (oneOf(key, ['Down', 'ArrowDown'])) {
        event.preventDefault();
        this.handleKeydown(event);
      } else if (key === 'Tab') {
        this.handleKeydown(event);
      } else if (oneOf(key, ['Backspace', 'Delete'])) {
        this.handleKeydown(event);
      }
    },
    onOptionClick(option) {
      if (this.multiple) {
        // keep the query for remote select
        if (this.remote) {
          this.lastRemoteQuery = this.lastRemoteQuery || this.query;
        } else {
          this.lastRemoteQuery = '';
        }

        const valueIsSelected = this.values.find(({value}) => value === option.value);

        if (valueIsSelected) {
          this.values = this.values.filter(({value}) => value !== option.value);
        } else {
          this.values = this.values.concat(option);
        }

        this.isFocused = true; // so we put back focus after clicking with mouse on option elements
      } else {
        this.query = String(option.label).trim();
        this.values = [option];
        this.lastRemoteQuery = '';
        this.hideMenu();
      }

      this.focusIndex = this.flatOptions.findIndex((opt) => {
        if (!opt || !opt.componentOptions) {
          return false;
        }

        return opt.componentOptions.propsData.value === option.value;
      });

      if (this.filterable) {
        const inputField = this.$el.querySelector('input[type="text"]');

        if (!this.autoComplete) {
          this.$nextTick(() => inputField.focus());
        }
      }

      this.broadcast('Drop', 'on-update-popper');
    },
    onQueryChange(query) {
      if (query.length > 0 && query !== this.query) {
        this.visible = true;
      }

      this.query = query;
      this.unchangedQuery = this.visible;
    },
    processOption(option, values, isFocused) {
      if (!option.componentOptions) {
        return option;
      }

      const optionValue = option.componentOptions.propsData.value;
      const {disabled} = option.componentOptions.propsData;
      const isSelected = values.includes(optionValue);

      const propsData = {
        ...option.componentOptions.propsData,
        disabled: typeof disabled === 'undefined' ? false : disabled !== false,
        isFocused,
        selected: isSelected,
      };

      return {
        ...option,
        componentOptions: {
          ...option.componentOptions,
          propsData,
        },
      };
    },
    reset() {
      this.query = '';
      this.focusIndex = -1;
      this.unchangedQuery = true;
      this.values = [];
    },
    setQuery(query) {
      // PUBLIC API
      if (query) {
        this.onQueryChange(query);

        return;
      }

      if (query === null) {
        this.onQueryChange('');
        this.values = [];
      }
    },
    toggleHeaderFocus({type}) {
      if (this.disabled) {
        return;
      }

      this.isFocused = type === 'focus';
    },
    toggleMenu(e, force) {
      if (this.disabled) {
        return;
      }

      this.visible = typeof force !== 'undefined' ? force : !this.visible;

      if (this.visible) {
        this.dropDownWidth = this.$el.getBoundingClientRect().width;
        this.broadcast('Drop', 'on-update-popper');
      }
    },
    updateSlotOptions() {
      this.slotOptions = this.$slots.default;
    },
    validateOption({children, elm, propsData}) {
      if (this.queryStringMatchesSelectedOption) {
        return true;
      }

      const {value} = propsData;
      const label = propsData.label || '';
      const textContent =
        (elm && elm.textContent.trim()) ||
        (children || []).reduce((str, node) => {
          const nodeText = node.elm ? node.elm.textContent.trim() : node.text;

          return `${str} ${nodeText}`;
        }, '') ||
        '';
      const stringValues = JSON.stringify([value, label, textContent.trim()]);
      const query = this.query.toLowerCase().trim();

      return stringValues.toLowerCase().includes(query);
    },
  },
};
</script>
