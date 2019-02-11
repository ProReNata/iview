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
    <div :class="panelBodyClasses">
      <div
        v-show="!isTime"
        :class="[prefixCls + '-content', prefixCls + '-content-left']"
      >
        <div
          v-show="currentView !== 'time'"
          :class="[datePrefixCls + '-header']"
        >
          <span
            :class="iconBtnCls('prev', '-double')"
            @click="prevYear('left')"
          >
            <icon type="ios-arrow-left">
            </icon>
          </span>
          <span
            v-if="leftPickerTable === 'date-table'"
            v-show="currentView === 'date'"
            :class="iconBtnCls('prev')"
            @click="prevMonth('left')"
          >
            <icon type="ios-arrow-left">
            </icon>
          </span>
          <date-panel-label
            :date-panel-label="leftDatePanelLabel"
            :current-view="leftDatePanelView"
            :date-prefix-cls="datePrefixCls"
          >
          </date-panel-label>
          <span
            v-if="splitPanels || leftPickerTable !== 'date-table'"
            :class="iconBtnCls('next', '-double')"
            @click="nextYear('left')"
          >
            <icon type="ios-arrow-right">
            </icon>
          </span>
          <span
            v-if="splitPanels && leftPickerTable === 'date-table'"
            v-show="currentView === 'date'"
            :class="iconBtnCls('next')"
            @click="nextMonth('left')"
          >
            <icon type="ios-arrow-right">
            </icon>
          </span>
        </div>
        <component
          :is="leftPickerTable"
          v-if="currentView !== 'time'"
          ref="leftYearTable"
          :table-date="leftPanelDate"
          selection-mode="range"
          :disabled-date="disabledDate"
          :range-state="rangeState"
          :show-week-numbers="showWeekNumbers"
          :value="preSelecting.left ? [dates[0]] : dates"
          :focused-date="focusedDate"

          @on-change-range="handleChangeRange"
          @on-pick="panelPickerHandlers.left"
          @on-pick-click="handlePickClick"
        >
        </component>
      </div>
      <div
        v-show="!isTime"
        :class="[prefixCls + '-content', prefixCls + '-content-right']"
      >
        <div
          v-show="currentView !== 'time'"
          :class="[datePrefixCls + '-header']"
        >
          <span
            v-if="splitPanels || rightPickerTable !== 'date-table'"
            :class="iconBtnCls('prev', '-double')"
            @click="prevYear('right')"
          >
            <icon type="ios-arrow-left">
            </icon>
          </span>
          <span
            v-if="splitPanels && rightPickerTable === 'date-table'"
            v-show="currentView === 'date'"
            :class="iconBtnCls('prev')"
            @click="prevMonth('right')"
          >
            <icon type="ios-arrow-left">
            </icon>
          </span>
          <date-panel-label
            :date-panel-label="rightDatePanelLabel"
            :current-view="rightDatePanelView"
            :date-prefix-cls="datePrefixCls"
          >
          </date-panel-label>
          <span
            :class="iconBtnCls('next', '-double')"
            @click="nextYear('right')"
          >
            <icon type="ios-arrow-right">
            </icon>
          </span>
          <span
            v-if="rightPickerTable === 'date-table'"
            v-show="currentView === 'date'"
            :class="iconBtnCls('next')"
            @click="nextMonth('right')"
          >
            <icon type="ios-arrow-right">
            </icon>
          </span>
        </div>
        <component
          :is="rightPickerTable"
          v-if="currentView !== 'time'"
          ref="rightYearTable"
          :table-date="rightPanelDate"
          selection-mode="range"
          :range-state="rangeState"
          :disabled-date="disabledDate"
          :show-week-numbers="showWeekNumbers"
          :value="preSelecting.right ? [dates[dates.length - 1]] : dates"
          :focused-date="focusedDate"

          @on-change-range="handleChangeRange"
          @on-pick="panelPickerHandlers.right"
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
          v-bind="timePickerOptions"
          @on-pick="handleRangePick"
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
        :time-disabled="timeDisabled"
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
import TimePicker from '../Time/time-range.vue';
import Confirm from '../../base/confirm.vue';

import {toDate, initTimeDate, formatDateLabels} from '../../util';
import DatePanelLabel from './date-panel-label.vue';

import Mixin from '../panel-mixin';
import DateMixin from './date-panel-mixin';
import Locale from '../../../../mixins/locale';

const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';

const dateSorter = (a, b) => {
  if (!a || !b) {
    return 0;
  }

  return a.getTime() - b.getTime();
};

export default {
  name: 'RangeDatePickerPanel',

  components: {Confirm, DatePanelLabel, DateTable, Icon, MonthTable, TimePicker, YearTable},

  mixins: [Mixin, Locale, DateMixin],

  props: {
    // more props in the mixin
    splitPanels: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    const [minDate, maxDate] = this.value.map((date) => date || initTimeDate());
    const leftPanelDate = this.startDate ? this.startDate : minDate;

    return {
      currentView: this.selectionMode || 'range',
      datePrefixCls,
      dates: this.value,
      leftPanelDate,
      leftPickerTable: `${this.selectionMode}-table`,
      prefixCls,
      rangeState: {from: this.value[0], selecting: minDate && !maxDate, to: this.value[1]},
      rightPanelDate: new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, 1),
      rightPickerTable: `${this.selectionMode}-table`,
    };
  },

  computed: {
    classes() {
      return [
        `${prefixCls}-body-wrapper`,
        `${datePrefixCls}-with-range`,
        {
          [`${prefixCls}-with-sidebar`]: this.shortcuts.length,
          [`${datePrefixCls}-with-week-numbers`]: this.showWeekNumbers,
        },
      ];
    },
    leftDatePanelLabel() {
      return this.panelLabelConfig('left');
    },
    leftDatePanelView() {
      return this.leftPickerTable.split('-').shift();
    },
    panelBodyClasses() {
      return [
        `${prefixCls}-body`,
        {
          [`${prefixCls}-body-time`]: this.showTime,
          [`${prefixCls}-body-date`]: !this.showTime,
        },
      ];
    },
    panelPickerHandlers() {
      return {
        left: this.preSelecting.left ? this.handlePreSelection.bind(this, 'left') : this.handleRangePick,
        right: this.preSelecting.right ? this.handlePreSelection.bind(this, 'right') : this.handleRangePick,
      };
    },
    preSelecting() {
      const tableType = `${this.currentView}-table`;

      return {
        left: this.leftPickerTable !== tableType,
        right: this.rightPickerTable !== tableType,
      };
    },
    rightDatePanelLabel() {
      return this.panelLabelConfig('right');
    },
    rightDatePanelView() {
      return this.rightPickerTable.split('-').shift();
    },
    timeDisabled() {
      return !(this.dates[0] && this.dates[1]);
    },
  },

  watch: {
    currentView(currentView) {
      const leftMonth = this.leftPanelDate.getMonth();
      const rightMonth = this.rightPanelDate.getMonth();
      const isSameYear = this.leftPanelDate.getFullYear() === this.rightPanelDate.getFullYear();

      if (currentView === 'date' && isSameYear && leftMonth === rightMonth) {
        this.changePanelDate('right', 'Month', 1);
      }

      if (currentView === 'month' && isSameYear) {
        this.changePanelDate('right', 'FullYear', 1);
      }

      if (currentView === 'year' && isSameYear) {
        this.changePanelDate('right', 'FullYear', 10);
      }
    },
    focusedDate(date) {
      this.setPanelDates(date || new Date());
    },
    selectionMode(type) {
      this.currentView = type || 'range';
    },
    value(newVal) {
      const minDate = newVal[0] ? toDate(newVal[0]) : null;
      const maxDate = newVal[1] ? toDate(newVal[1]) : null;
      this.dates = [minDate, maxDate].sort(dateSorter);

      this.rangeState = {
        from: this.dates[0],
        selecting: false,
        to: this.dates[1],
      };

      // set panels positioning
      this.setPanelDates(this.startDate || this.dates[0] || new Date());
    },
  },

  methods: {
    changePanelDate(panel, type, increment, updateOtherPanel = true) {
      const current = new Date(this[`${panel}PanelDate`]);
      current[`set${type}`](current[`get${type}`]() + increment);
      this[`${panel}PanelDate`] = current;

      if (!updateOtherPanel) {
        return;
      }

      if (this.splitPanels) {
        // change other panel if dates overlap
        const otherPanel = panel === 'left' ? 'right' : 'left';

        if (panel === 'left' && this.leftPanelDate >= this.rightPanelDate) {
          this.changePanelDate(otherPanel, type, 1);
        }

        if (panel === 'right' && this.rightPanelDate <= this.leftPanelDate) {
          this.changePanelDate(otherPanel, type, -1);
        }
      } else {
        // keep the panels together
        const otherPanel = panel === 'left' ? 'right' : 'left';
        const otherCurrent = new Date(this[`${otherPanel}PanelDate`]);
        otherCurrent[`set${type}`](otherCurrent[`get${type}`]() + increment);
        this[`${otherPanel}PanelDate`] = otherCurrent;
      }
    },
    handleChangeRange(val) {
      this.rangeState.to = val;
    },
    handlePreSelection(panel, value) {
      this[`${panel}PanelDate`] = value;
      const currentViewType = this[`${panel}PickerTable`];

      if (currentViewType === 'year-table') {
        this[`${panel}PickerTable`] = 'month-table';
      } else {
        this[`${panel}PickerTable`] = `${this.currentView}-table`;
      }

      if (!this.splitPanels) {
        const otherPanel = panel === 'left' ? 'right' : 'left';
        this[`${otherPanel}PanelDate`] = value;

        const increment = otherPanel === 'left' ? -1 : 1; // #3973

        this.changePanelDate(otherPanel, 'Month', increment, false);
      }
    },
    handleRangePick(val, type) {
      if (this.rangeState.selecting || this.currentView === 'time') {
        if (this.currentView === 'time') {
          this.dates = val;
        } else {
          const [minDate, maxDate] = [this.rangeState.from, val].sort(dateSorter);
          this.dates = [minDate, maxDate];
          this.rangeState = {
            from: minDate,
            selecting: false,
            to: maxDate,
          };
        }

        this.handleConfirm(false, type || 'date');
      } else {
        this.rangeState = {
          from: val,
          selecting: true,
          to: null,
        };
      }
    },
    nextMonth(panel) {
      this.changePanelDate(panel, 'Month', 1);
    },
    nextYear(panel) {
      const increment = this.currentView === 'year' ? 10 : 1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    panelLabelConfig(direction) {
      const locale = this.t('i.locale');
      const datePanelLabel = this.t('i.datepicker.datePanelLabel');
      const handler = (type) => {
        const fn = type === 'month' ? this.showMonthPicker : this.showYearPicker;

        return () => fn(direction);
      };

      const date = this[`${direction}PanelDate`];
      const {labels, separator} = formatDateLabels(locale, datePanelLabel, date);

      return {
        labels: labels.map((obj) => {
          obj.handler = handler(obj.type);

          return obj;
        }),
        separator,
      };
    },
    prevMonth(panel) {
      this.changePanelDate(panel, 'Month', -1);
    },
    prevYear(panel) {
      const increment = this.currentView === 'year' ? -10 : -1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    reset() {
      this.currentView = this.selectionMode;
      this.leftPickerTable = `${this.currentView}-table`;
      this.rightPickerTable = `${this.currentView}-table`;
    },
    setPanelDates(leftPanelDate) {
      this.leftPanelDate = leftPanelDate;
      const rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, leftPanelDate.getDate());
      this.rightPanelDate = this.splitPanels ? new Date(Math.max(this.dates[1], rightPanelDate)) : rightPanelDate;
    },
    showMonthPicker(panel) {
      this[`${panel}PickerTable`] = 'month-table';
    },
    showYearPicker(panel) {
      this[`${panel}PickerTable`] = 'year-table';
    },
  },
};
</script>
