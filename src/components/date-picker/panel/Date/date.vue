<template>
  <div
    :class="classes"
    @mousedown.prevent
  >
    <div
      v-if="shortcuts.length"
      :class="[prefixCls + '-sidebar']"
    >
      <div
        v-for="(shortcut, i) in shortcuts"
        :key="i"
        :class="[prefixCls + '-shortcut']"
        @click="handleShortcutClick(shortcut)"
      >
        {{ shortcut.text }}
      </div>
    </div>
    <div :class="[prefixCls + '-body']">
      <div
        v-show="currentView !== 'time'"
        :class="[datePrefixCls + '-header']"
      >
        <span
          :class="iconBtnCls('prev', '-double')"
          @click="changeYear(-1)"
        >
          <icon type="ios-arrow-left">
          </icon>
        </span>
        <span
          v-if="pickerTable === 'date-table'"
          v-show="currentView === 'date'"
          :class="iconBtnCls('prev')"
          @click="changeMonth(-1)"
        >
          <icon type="ios-arrow-left">
          </icon>
        </span>
        <date-panel-label
          :date-panel-label="datePanelLabel"
          :current-view="pickerTable.split('-').shift()"
          :date-prefix-cls="datePrefixCls"
        >
        </date-panel-label>
        <span
          :class="iconBtnCls('next', '-double')"
          @click="changeYear(+1)"
        >
          <icon type="ios-arrow-right">
          </icon>
        </span>
        <span
          v-if="pickerTable === 'date-table'"
          v-show="currentView === 'date'"
          :class="iconBtnCls('next')"
          @click="changeMonth(+1)"
        >
          <icon type="ios-arrow-right">
          </icon>
        </span>
      </div>
      <div :class="[prefixCls + '-content']">
        <component
          :is="pickerTable"
          v-if="currentView !== 'time'"
          ref="pickerTable"
          :table-date="panelDate"
          :show-week-numbers="showWeekNumbers"
          :value="dates"
          :selection-mode="selectionMode"
          :disabled-date="disabledDate"
          :focused-date="focusedDate"

          @on-pick="panelPickerHandlers"
          @on-pick-click="handlePickClick"
        >
        </component>
      </div>
      <div
        v-show="isTime"
        :class="[prefixCls + '-content']"
      >
        <time-picker
          v-if="currentView === 'time'"
          ref="timePicker"
          :value="dates"
          :format="format"
          :time-disabled="timeDisabled"
          :disabled-date="disabledDate"
          :focused-date="focusedDate"

          v-bind="timePickerOptions"
          @on-pick="handlePick"
          @on-pick-click="handlePickClick"
          @on-pick-clear="handlePickClear"
          @on-pick-success="handlePickSuccess"
          @on-pick-toggle-time="handleToggleTime"
        >
        </time-picker>
      </div>
      <confirm
        v-if="confirm"
        :show-time="showTime"
        :is-time="isTime"
        @on-pick-toggle-time="handleToggleTime"
        @on-pick-clear="handlePickClear"
        @on-pick-success="handlePickSuccess"
      >
      </confirm>
    </div>
  </div>
</template>

<script>
import Icon from '../../../icon/icon.vue';
import DateTable from '../../base/date-table.vue';
import YearTable from '../../base/year-table.vue';
import MonthTable from '../../base/month-table.vue';
import TimePicker from '../Time/time.vue';
import Confirm from '../../base/confirm.vue';
import DatePanelLabel from './date-panel-label.vue';
import Mixin from '../panel-mixin';
import DateMixin from './date-panel-mixin';
import Locale from '../../../../mixins/locale';
import {siblingMonth, formatDateLabels} from '../../util';

const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';

export default {
  name: 'DatePickerPanel',

  components: {Confirm, DatePanelLabel, DateTable, Icon, MonthTable, TimePicker, YearTable},

  mixins: [Mixin, Locale, DateMixin],

  props: {
    // more props in the mixin
    multiple: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    const {selectionMode, value} = this;

    const dates = value.slice().sort();

    return {
      currentView: selectionMode || 'date',
      datePrefixCls,
      dates,
      panelDate: this.startDate || dates[0] || new Date(),
      pickerTable: this.getTableType(selectionMode),
      prefixCls,
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}-body-wrapper`,
        {
          [`${prefixCls}-with-sidebar`]: this.shortcuts.length,
        },
      ];
    },
    datePanelLabel() {
      const locale = this.t('i.locale');
      const datePanelLabel = this.t('i.datepicker.datePanelLabel');
      const date = this.panelDate;
      const {labels, separator} = formatDateLabels(locale, datePanelLabel, date);
      const handler = (type) => () => {
        /* eslint-disable-next-line vue/no-side-effects-in-computed-properties */
        this.pickerTable = this.getTableType(type);

        return this.pickerTable;
      };

      return {
        labels: labels.map((obj) => {
          obj.handler = handler(obj.type);

          return obj;
        }),
        separator,
      };
    },
    panelPickerHandlers() {
      return this.pickerTable === `${this.currentView}-table` ? this.handlePick : this.handlePreSelection;
    },
    timeDisabled() {
      return !this.dates[0];
    },
  },

  watch: {
    currentView(currentView) {
      this.$emit('on-selection-mode-change', currentView);

      if (this.currentView === 'time') {
        this.$nextTick(() => {
          const spinner = this.$refs.timePicker.$refs.timeSpinner;
          spinner.updateScroll();
        });
      }
    },
    focusedDate(date) {
      const isDifferentYear = date.getFullYear() !== this.panelDate.getFullYear();
      const isDifferentMonth = isDifferentYear || date.getMonth() !== this.panelDate.getMonth();

      if (isDifferentYear || isDifferentMonth) {
        if (!this.multiple) {
          this.panelDate = date;
        }
      }
    },
    selectionMode(type) {
      this.currentView = type;
      this.pickerTable = this.getTableType(type);
    },
    value(newVal) {
      this.dates = newVal;
      const panelDate = this.multiple ? this.dates[this.dates.length - 1] : this.startDate || this.dates[0];
      this.panelDate = panelDate || new Date();
    },
  },

  methods: {
    changeMonth(dir) {
      this.panelDate = siblingMonth(this.panelDate, dir);
    },
    changeYear(dir) {
      if (this.selectionMode === 'year' || this.pickerTable === 'year-table') {
        this.panelDate = new Date(this.panelDate.getFullYear() + dir * 10, 0, 1);
      } else {
        this.panelDate = siblingMonth(this.panelDate, dir * 12);
      }
    },
    getTableType(currentView) {
      return currentView.match(/^time/) ? 'time-picker' : `${currentView}-table`;
    },
    handlePick(val, type) {
      let value = val;
      const {selectionMode, panelDate} = this;

      if (selectionMode === 'year') {
        value = new Date(value.getFullYear(), 0, 1);
      } else if (selectionMode === 'month') {
        value = new Date(panelDate.getFullYear(), value.getMonth(), 1);
      } else {
        value = new Date(value);
      }

      this.dates = [value];
      this.$emit('on-pick', value, false, type || selectionMode);
    },
    handlePreSelection(value) {
      this.panelDate = value;

      if (this.pickerTable === 'year-table') {
        this.pickerTable = 'month-table';
      } else {
        this.pickerTable = this.getTableType(this.currentView);
      }
    },
    reset() {
      this.currentView = this.selectionMode;
      this.pickerTable = this.getTableType(this.currentView);
    },
  },
};
</script>
