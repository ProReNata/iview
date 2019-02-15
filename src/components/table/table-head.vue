<template>
  <table
    cellspacing="0"
    cellpadding="0"
    border="0"
    :style="styles"
  >
    <colgroup>
      <col
        v-for="(column, i) in columns"
        :key="i"
        :width="setCellWidth(column)"
      >
      <col
        v-if="$parent.showVerticalScrollBar"
        :width="$parent.scrollBarWidth"
      >
    </colgroup>
    <thead>
      <tr
        v-for="(cols, rowIndex) in headRows"
        :key="rowIndex"
      >
        <th
          v-for="(column, index) in cols"
          :key="index"
          :colspan="column.colSpan"
          :rowspan="column.rowSpan"
          :class="alignCls(column)"
        >
          <div :class="cellClasses(column)">
            <template v-if="column.type === 'expand'">
              <span v-if="!column.renderHeader">
                {{ column.title || '' }}
              </span>
              <render-header
                v-else
                :render="column.renderHeader"
                :column="column"
                :index="index"
              >
              </render-header>
            </template>
            <template v-else-if="column.type === 'selection'">
              <checkbox
                :value="isSelectAll"
                :disabled="!data.length"
                @on-change="selectAll"
              >
              </checkbox>
            </template>
            <template v-else>
              <span
                v-if="!column.renderHeader"
                :class="{[prefixCls + '-cell-sort']: column.sortable}"
                @click="handleSortByHead(getColumn(rowIndex, index)._index)"
              >
                {{ column.title || '#' }}
              </span>
              <render-header
                v-else
                :render="column.renderHeader"
                :column="column"
                :index="index"
              >
              </render-header>
              <span
                v-if="column.sortable"
                :class="[prefixCls + '-sort']"
              >
                <icon
                  type="arrow-up"
                  weight="solid"
                  :class="{on: getColumn(rowIndex, index)._sortType === 'asc'}"
                  @click="handleSort(getColumn(rowIndex, index)._index, 'asc')"
                >
                </icon>
                <icon
                  type="arrow-down"
                  weight="solid"
                  :class="{on: getColumn(rowIndex, index)._sortType === 'desc'}"
                  @click="handleSort(getColumn(rowIndex, index)._index, 'desc')"
                >
                </icon>
              </span>
              <poptip
                v-if="isPopperShow(column)"
                v-model="getColumn(rowIndex, index)._filterVisible"
                placement="bottom"
                popper-class="ivu-table-popper"
                transfer
                @on-popper-hide="handleFilterHide(getColumn(rowIndex, index)._index)"
              >
                <span :class="[prefixCls + '-filter']">
                  <i
                    class="ivu-icon ivu-icon-funnel"
                    :class="{on: getColumn(rowIndex, index)._isFiltered}"
                  >
                  </i>
                </span>

                <div
                  v-if="getColumn(rowIndex, index)._filterMultiple"
                  slot="content"
                  :class="[prefixCls + '-filter-list']"
                >
                  <div :class="[prefixCls + '-filter-list-item']">
                    <checkbox-group v-model="getColumn(rowIndex, index)._filterChecked">
                      <checkbox
                        v-for="(item, idx) in column.filters"
                        :key="idx"
                        :label="item.value"
                      >
                        {{ item.label }}
                      </checkbox>
                    </checkbox-group>
                  </div>
                  <div :class="[prefixCls + '-filter-footer']">
                    <i-button
                      type="text"
                      size="small"
                      :disabled="!getColumn(rowIndex, index)._filterChecked.length"
                      @click.native="handleFilter(getColumn(rowIndex, index)._index)"
                    >
                      {{ t('i.table.confirmFilter') }}
                    </i-button>
                    <i-button
                      type="text"
                      size="small"
                      @click.native="handleReset(getColumn(rowIndex, index)._index)"
                    >
                      {{ t('i.table.resetFilter') }}
                    </i-button>
                  </div>
                </div>
                <div
                  v-else
                  slot="content"
                  :class="[prefixCls + '-filter-list']"
                >
                  <ul :class="[prefixCls + '-filter-list-single']">
                    <li
                      :class="itemAllClasses(getColumn(rowIndex, index))"
                      @click="handleReset(getColumn(rowIndex, index)._index)"
                    >
                      {{ t('i.table.clearFilter') }}
                    </li>
                    <li
                      v-for="(item, j) in column.filters"
                      :key="j"
                      :class="itemClasses(getColumn(rowIndex, index), item)"
                      @click="handleSelect(getColumn(rowIndex, index)._index, item.value)"
                    >
                      {{ item.label }}
                    </li>
                  </ul>
                </div>
              </poptip>
            </template>
          </div>
        </th>

        <th
          v-if="$parent.showVerticalScrollBar && rowIndex===0"
          :class="scrollBarCellClass()"
          :rowspan="headRows.length"
        >
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import CheckboxGroup from '../checkbox/checkbox-group.vue';
import Checkbox from '../checkbox/checkbox.vue';
import Poptip from '../poptip/poptip.vue';
import iButton from '../button/button.vue';
import renderHeader from './header';
import Mixin from './mixin';
import Locale from '../../mixins/locale';

export default {
  name: 'TableHead',

  components: {Checkbox, CheckboxGroup, iButton, Poptip, renderHeader},

  mixins: [Mixin, Locale],

  props: {
    columnRows: {
      default: undefined,
      type: Array,
    },
    columns: {
      default: undefined,
      type: Array,
    },
    columnsWidth: {
      default: undefined,
      type: Object,
    },
    // rebuildData
    data: {
      default: undefined,
      type: Array,
    },
    fixed: {
      default: false,
      type: [Boolean, String],
    },
    fixedColumnRows: {
      default: undefined,
      type: Array,
    },
    objData: {
      default: undefined,
      type: Object,
    },
    prefixCls: {
      default: undefined,
      type: String,
    },
    styleObject: {
      default: undefined,
      type: Object,
    },
  },

  computed: {
    headRows() {
      const isGroup = this.columnRows.length > 1;

      if (isGroup) {
        return this.fixed ? this.fixedColumnRows : this.columnRows;
      }

      return [this.columns];
    },
    isSelectAll() {
      let isSelectAll = true;

      if (!this.data.length) {
        isSelectAll = false;
      }

      /* eslint-disable-next-line no-underscore-dangle */
      if (!this.data.find((item) => !item._disabled)) {
        isSelectAll = false;
      } // #1751

      for (let i = 0; i < this.data.length; i += 1) {
        /* eslint-disable-next-line no-underscore-dangle */
        if (!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled) {
          isSelectAll = false;
          break;
        }
      }

      return isSelectAll;
    },
    styles() {
      const style = {...this.styleObject};
      const width = parseInt(this.styleObject.width, 10);
      style.width = `${width}px`;

      return style;
    },
  },

  methods: {
    cellClasses(column) {
      return [
        `${this.prefixCls}-cell`,
        {
          [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'),
        },
      ];
    },
    // 因为表头嵌套不是深拷贝，所以没有 _ 开头的方法，在 isGroup 下用此列
    getColumn(rowIndex, index) {
      const isGroup = this.columnRows.length > 1;

      if (isGroup) {
        /* eslint-disable-next-line no-underscore-dangle */
        const id = this.headRows[rowIndex][index].__id;

        /* eslint-disable-next-line no-underscore-dangle */
        return this.columns.filter((item) => item.__id === id)[0];
      }

      return this.headRows[rowIndex][index];
    },
    handleFilter(index) {
      this.$parent.handleFilter(index);
    },
    handleFilterHide(index) {
      this.$parent.handleFilterHide(index);
    },
    handleReset(index) {
      this.$parent.handleFilterReset(index);
    },
    handleSelect(index, value) {
      this.$parent.handleFilterSelect(index, value);
    },
    handleSort(index, sortType) {
      let type = sortType;
      const column = this.columns[index];
      const {_index} = column;

      /* eslint-disable-next-line no-underscore-dangle */
      if (column._sortType === type) {
        type = 'normal';
      }

      this.$parent.handleSort(_index, type);
    },
    handleSortByHead(index) {
      const column = this.columns[index];

      if (column.sortable) {
        /* eslint-disable-next-line no-underscore-dangle */
        const type = column._sortType;

        if (type === 'normal') {
          this.handleSort(index, 'asc');
        } else if (type === 'asc') {
          this.handleSort(index, 'desc');
        } else {
          this.handleSort(index, 'normal');
        }
      }
    },
    itemAllClasses(column) {
      return [
        `${this.prefixCls}-filter-select-item`,
        {
          /* eslint-disable-next-line no-underscore-dangle */
          [`${this.prefixCls}-filter-select-item-selected`]: !column._filterChecked.length,
        },
      ];
    },
    itemClasses(column, item) {
      return [
        `${this.prefixCls}-filter-select-item`,
        {
          /* eslint-disable-next-line no-underscore-dangle */
          [`${this.prefixCls}-filter-select-item-selected`]: column._filterChecked[0] === item.value,
        },
      ];
    },
    scrollBarCellClass() {
      let hasRightFixed = false;
      /* eslint-disable-next-line guard-for-in, no-restricted-syntax */
      for (const i in this.headRows) {
        /* eslint-disable-next-line guard-for-in, no-restricted-syntax */
        for (const j in this.headRows[i]) {
          if (this.headRows[i][j].fixed === 'right') {
            hasRightFixed = true;
            break;
          }

          if (hasRightFixed) {
            break;
          }
        }
      }

      return [
        {
          [`${this.prefixCls}-hidden`]: hasRightFixed,
        },
      ];
    },
    selectAll() {
      const status = !this.isSelectAll;
      this.$parent.selectAll(status);
    },
  },
};
</script>
