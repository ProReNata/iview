<template>
  <div
    v-click-outside="handleClose"
    :class="classes"
  >
    <div
      ref="reference"
      :class="[prefixCls + '-rel']"
      @click="toggleOpen"
    >
      <input
        type="hidden"
        :name="name"
        :value="currentValue"
      >
      <slot>
        <i-input
          ref="input"
          :element-id="elementId"
          :readonly="!filterable"
          :disabled="disabled"
          :value="displayInputRender"
          :size="size"
          :placeholder="inputPlaceholder"
          @on-change="handleInput"
        >
        </i-input>
        <div
          v-show="filterable && query === ''"
          :class="[prefixCls + '-label']"
          @click="handleFocus"
        >
          {{ displayRender }}
        </div>
        <icon
          v-show="showCloseIcon"
          type="ios-close"
          :class="[prefixCls + '-arrow']"
          @click.native.stop="clearSelect"
        >
        </icon>
        <icon
          type="arrow-down"
          :class="[prefixCls + '-arrow']"
        >
        </icon>
      </slot>
    </div>
    <transition name="transition-drop">
      <drop
        v-show="visible"
        ref="drop"
        v-transfer-dom
        :class="{ [prefixCls + '-transfer']: transfer }"
        :data-transfer="transfer"
      >
        <div>
          <caspanel
            v-show="!filterable || (filterable && query === '')"
            ref="caspanel"
            :prefix-cls="prefixCls"
            :data="data"
            :disabled="disabled"
            :change-on-select="changeOnSelect"
            :trigger="trigger"
          >
          </caspanel>
          <div
            v-show="filterable && query !== '' && querySelections.length"
            :class="[prefixCls + '-dropdown']"
          >
            <ul :class="[selectPrefixCls + '-dropdown-list']">
              <!-- eslint-disable vue/no-v-html -->
              <li
                v-for="(item, index) in querySelections"
                :key="index"
                :class="[selectPrefixCls + '-item', {
                  [selectPrefixCls + '-item-disabled']: item.disabled
                }]"
                @click="handleSelectItem(index)"
                v-html="item.display"
              >
              </li>
              <!-- eslint-enable vue/no-v-html -->
            </ul>
          </div>
          <ul
            v-show="filterable && query !== '' && !querySelections.length"
            :class="[prefixCls + '-not-found-tip']"
          >
            <li>{{ localeNotFoundText }}</li>
          </ul>
        </div>
      </drop>
    </transition>
  </div>
</template>

<script>
import stubArray from 'lodash/stubArray';
import {directive as clickOutside} from 'v-click-outside-x';
import iInput from '../input/input.vue';
import Drop from '../select/dropdown.vue';
import Icon from '../icon/icon.vue';
import Caspanel from './caspanel.vue';
import TransferDom from '../../directives/transfer-dom';
import {oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';

const prefixCls = 'ivu-cascader';
const selectPrefixCls = 'ivu-select';

export default {
  name: 'Cascader',

  components: {Caspanel, Drop, Icon, iInput},

  directives: {clickOutside, TransferDom},

  mixins: [Emitter, Locale],

  props: {
    changeOnSelect: {
      default: false,
      type: Boolean,
    },
    clearable: {
      default: true,
      type: Boolean,
    },
    data: {
      default: stubArray,
      type: Array,
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
    loadData: {
      default: undefined,
      type: Function,
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
    renderFormat: {
      default(label) {
        return label.join(' / ');
      },
      type: Function,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large']);
      },
    },
    transfer: {
      default: false,
      type: Boolean,
    },
    trigger: {
      default: 'click',
      type: String,
      validator(value) {
        return oneOf(value, ['click', 'hover']);
      },
    },
    value: {
      default: stubArray,
      type: Array,
    },
  },

  data() {
    return {
      currentValue: this.value,
      // #950
      isLoadedChildren: false,
      prefixCls,
      query: '',
      selected: [],
      selectPrefixCls,
      tmpSelected: [],
      // to fix set value in changeOnSelect type
      updatingValue: false,
      validDataStr: '',
      visible: false,
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show-clear`]: this.showCloseIcon,
          [`${prefixCls}-size-${this.size}`]: !!this.size,
          [`${prefixCls}-visible`]: this.visible,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-not-found`]: this.filterable && this.query !== '' && !this.querySelections.length,
        },
      ];
    },
    displayInputRender() {
      return this.filterable ? '' : this.displayRender;
    },
    displayRender() {
      const label = [];
      for (let i = 0; i < this.selected.length; i += 1) {
        label.push(this.selected[i].label);
      }

      return this.renderFormat(label, this.selected);
    },
    inputPlaceholder() {
      return this.filterable && this.currentValue.length ? null : this.localePlaceholder;
    },
    localeNotFoundText() {
      if (this.notFoundText === undefined) {
        return this.t('i.select.noMatch');
      }

      return this.notFoundText;
    },
    localePlaceholder() {
      if (this.placeholder === undefined) {
        return this.t('i.select.placeholder');
      }

      return this.placeholder;
    },
    querySelections() {
      let selections = [];
      function getSelections(arr, label, value) {
        for (let i = 0; i < arr.length; i += 1) {
          const item = arr[i];
          /* eslint-disable-next-line no-underscore-dangle */
          item.__label = label ? `${label} / ${item.label}` : item.label;
          /* eslint-disable-next-line no-underscore-dangle */
          item.__value = value ? `${value},${item.value}` : item.value;

          if (item.children && item.children.length) {
            /* eslint-disable-next-line no-underscore-dangle */
            getSelections(item.children, item.__label, item.__value);
            /* eslint-disable-next-line no-underscore-dangle */
            delete item.__label;
            /* eslint-disable-next-line no-underscore-dangle */
            delete item.__value;
          } else {
            selections.push({
              disabled: !!item.disabled,
              /* eslint-disable-next-line no-underscore-dangle */
              display: item.__label,
              item,
              /* eslint-disable-next-line no-underscore-dangle */
              label: item.__label,
              /* eslint-disable-next-line no-underscore-dangle */
              value: item.__value,
            });
          }
        }
      }

      getSelections(this.data);
      selections = selections.filter((item) => (item.label ? item.label.indexOf(this.query) > -1 : false)).map((item) => {
        item.display = item.display.replace(new RegExp(this.query, 'g'), `<span>${this.query}</span>`);

        return item;
      });

      return selections;
    },
    showCloseIcon() {
      return this.currentValue && this.currentValue.length && this.clearable && !this.disabled;
    },
  },

  watch: {
    currentValue() {
      this.$emit('input', this.currentValue);

      if (this.updatingValue) {
        this.updatingValue = false;

        return;
      }

      this.updateSelected(true);
    },
    data: {
      deep: true,
      handler() {
        const validDataStr = JSON.stringify(this.getValidData(this.data));

        if (validDataStr !== this.validDataStr) {
          this.validDataStr = validDataStr;

          if (!this.isLoadedChildren) {
            this.$nextTick(() => this.updateSelected(false, this.changeOnSelect));
          }

          this.isLoadedChildren = false;
        }
      },
    },
    value(val) {
      this.currentValue = val;

      if (!val.length) {
        this.selected = [];
      }
    },
    visible(val) {
      if (val) {
        if (this.currentValue.length) {
          this.updateSelected();
        }

        if (this.transfer) {
          this.$refs.drop.update();
        }

        this.broadcast('Drop', 'on-update-popper');
      } else {
        if (this.filterable) {
          this.query = '';
          this.$refs.input.currentValue = '';
        }

        if (this.transfer) {
          this.$refs.drop.destroy();
        }

        this.broadcast('Drop', 'on-destroy-popper');
      }

      this.$emit('on-visible-change', val);
    },
  },

  created() {
    this.validDataStr = JSON.stringify(this.getValidData(this.data));
    this.$on('on-result-change', (params) => {
      // lastValue: is click the final val
      // fromInit: is this emit from update value
      const {lastValue, changeOnSelect, fromInit} = params;

      if (lastValue || changeOnSelect) {
        const oldVal = JSON.stringify(this.currentValue);
        this.selected = this.tmpSelected;

        const newVal = [];
        this.selected.forEach((item) => {
          newVal.push(item.value);
        });

        if (!fromInit) {
          this.updatingValue = true;
          this.currentValue = newVal;
          this.emitValue(this.currentValue, oldVal);
        }
      }

      if (lastValue && !fromInit) {
        this.handleClose();
      }
    });
  },

  mounted() {
    this.updateSelected(true);
  },

  methods: {
    clearSelect() {
      if (this.disabled) {
        return;
      }

      const oldVal = JSON.stringify(this.currentValue);
      this.currentValue = [];
      this.selected = [];
      this.tmpSelected = [];
      this.handleClose();
      this.emitValue(this.currentValue, oldVal);
      // this.$broadcast('on-clear');
      this.broadcast('Caspanel', 'on-clear');
    },
    emitValue(val, oldVal) {
      if (JSON.stringify(val) !== oldVal) {
        this.$emit('on-change', this.currentValue, JSON.parse(JSON.stringify(this.selected)));
        this.$nextTick(() => {
          this.dispatch('FormItem', 'on-form-change', {
            selected: JSON.parse(JSON.stringify(this.selected)),
            value: this.currentValue,
          });
        });
      }
    },
    // 排除 loading 后的 data，避免重复触发 updateSelect
    getValidData(data) {
      function deleteData(item) {
        const newItem = {...item};

        if ('loading' in newItem) {
          delete newItem.loading;
        }

        if ('__value' in newItem) {
          /* eslint-disable-next-line no-underscore-dangle */
          delete newItem.__value;
        }

        if ('__label' in newItem) {
          /* eslint-disable-next-line no-underscore-dangle */
          delete newItem.__label;
        }

        if ('children' in newItem && newItem.children.length) {
          newItem.children = newItem.children.map((i) => deleteData(i));
        }

        return newItem;
      }

      return data.map((item) => deleteData(item));
    },
    handleClose() {
      this.visible = false;
    },
    handleFocus() {
      this.$refs.input.focus();
    },
    handleInput(event) {
      this.query = event.target.value;
    },
    handleSelectItem(index) {
      const item = this.querySelections[index];

      if (item.item.disabled) {
        return;
      }

      this.query = '';
      this.$refs.input.currentValue = '';
      const oldVal = JSON.stringify(this.currentValue);
      this.currentValue = item.value.split(',');
      this.emitValue(this.currentValue, oldVal);
      this.handleClose();
    },
    onFocus() {
      this.visible = true;

      if (!this.currentValue.length) {
        this.broadcast('Caspanel', 'on-clear');
      }
    },
    toggleOpen() {
      if (this.disabled) {
        return;
      }

      if (this.visible) {
        if (!this.filterable) {
          this.handleClose();
        }
      } else {
        this.onFocus();
      }
    },
    updateResult(result) {
      this.tmpSelected = result;
    },
    updateSelected(init = false, changeOnSelectDataChange = false) {
      // #2793 changeOnSelectDataChange used for changeOnSelect when data changed and set value
      if (!this.changeOnSelect || init || changeOnSelectDataChange) {
        this.broadcast('Caspanel', 'on-find-selected', {
          value: this.currentValue,
        });
      }
    },
  },
};
</script>
