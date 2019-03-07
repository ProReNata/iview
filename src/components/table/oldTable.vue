<template>
  <div
    :class="wrapClasses"
    :style="styles"
  >
    <div :class="classes">
      <div
        v-if="showSlotHeader"
        ref="title"
        :class="[prefixCls + '-title']"
      >
        <slot name="header">
        </slot>
      </div>
      <div
        v-if="showHeader"
        ref="header"
        :class="[prefixCls + '-header']"
        @mousewheel="handleMouseWheel"
      >
        <table-head
          :prefix-cls="prefixCls"
          :style-object="tableHeaderStyle"
          :columns="cloneColumns"
          :column-rows="columnRows"
          :obj-data="objData"
          :columns-width="columnsWidth"
          :data="rebuildData"
        >
        </table-head>
      </div>
      <div
        v-show="!((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))"
        ref="body"
        :class="[prefixCls + '-body']"
        :style="bodyStyle"
        @scroll="handleBodyScroll"
      >
        <table-body
          ref="tbody"
          :prefix-cls="prefixCls"
          :style-object="tableStyle"
          :columns="cloneColumns"
          :data="rebuildData"
          :columns-width="columnsWidth"
          :obj-data="objData"
        >
        </table-body>
      </div>
      <div
        v-show="((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))"
        :class="[prefixCls + '-tip']"
        :style="bodyStyle"
        @scroll="handleBodyScroll"
      >
        <table
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody>
            <tr>
              <td :style="{'height':bodyStyle.height,'width':`${headerWidth}px`}">
                <!-- eslint-disable vue/no-v-html -->
                <span
                  v-if="!data || data.length === 0"
                  v-html="localeNoDataText"
                >
                </span>
                <!-- eslint-enable vue/no-v-html -->
                <!-- eslint-disable vue/no-v-html -->
                <span
                  v-else
                  v-html="localeNoFilteredDataText"
                >
                </span>
                <!-- eslint-enable vue/no-v-html -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="isLeftFixed"
        :class="[prefixCls + '-fixed']"
        :style="fixedTableStyle"
      >
        <div
          v-if="showHeader"
          :class="fixedHeaderClasses"
        >
          <table-head
            fixed="left"
            :prefix-cls="prefixCls"
            :style-object="fixedTableStyle"
            :columns="leftFixedColumns"
            :column-rows="columnRows"
            :fixed-column-rows="leftFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="rebuildData"
          >
          </table-head>
        </div>
        <div
          ref="fixedBody"
          :class="[prefixCls + '-fixed-body']"
          :style="fixedBodyStyle"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="left"
            :prefix-cls="prefixCls"
            :style-object="fixedTableStyle"
            :columns="leftFixedColumns"
            :data="rebuildData"
            :columns-width="columnsWidth"
            :obj-data="objData"
          >
          </table-body>
        </div>
      </div>
      <div
        v-if="isRightFixed"
        :class="[prefixCls + '-fixed-right']"
        :style="fixedRightTableStyle"
      >
        <div
          v-if="showHeader"
          :class="fixedHeaderClasses"
        >
          <table-head
            fixed="right"
            :prefix-cls="prefixCls"
            :style-object="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :column-rows="columnRows"
            :fixed-column-rows="rightFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="rebuildData"
          >
          </table-head>
        </div>
        <div
          ref="fixedRightBody"
          :class="[prefixCls + '-fixed-body']"
          :style="fixedBodyStyle"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="right"
            :prefix-cls="prefixCls"
            :style-object="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :data="rebuildData"
            :columns-width="columnsWidth"
            :obj-data="objData"
          >
          </table-body>
        </div>
      </div>
      <div
        v-if="isRightFixed"
        :class="[prefixCls + '-fixed-right-header']"
        :style="fixedRightHeaderStyle"
      >
      </div>
      <div
        v-if="showSlotFooter"
        ref="footer"
        :class="[prefixCls + '-footer']"
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
    <spin
      v-if="loading"
      fix
      size="large"
    >
      <slot name="loading">
      </slot>
    </spin>
  </div>
</template>

<script>
import stubArray from 'lodash/stubArray';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import elementResizeDetectorMaker from 'element-resize-detector';
import isOneOf from 'Global/Assets/isOneOf';
import {getScrollBarSize} from 'Src/utils/assist';
import Spin from 'Components/spin/spin.vue';
import csv from 'Src/utils/csv';
import Locale from 'Src/mixins/locale';
import tableHead from './table-head.vue';
import tableBody from './table-body.vue';
import ExportCsv from './export-csv';
import {getAllColumns, convertToRows, convertColumnOrder, getRandomStr} from './util';

const prefixCls = 'ivu-table';

let rowKey = 1;
let columnKey = 1;

export default {
  name: 'Table',

  components: {Spin, tableBody, tableHead},

  mixins: [Locale],

  props: {
    border: {
      default: false,
      type: Boolean,
    },
    columns: {
      default: stubArray,
      type: Array,
    },
    context: {
      default: undefined,
      type: Object,
    },
    data: {
      default: stubArray,
      type: Array,
    },
    disabledHover: {
      type: Boolean,
    },
    height: {
      default: undefined,
      type: [Number, String],
    },
    highlightRow: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    noDataText: {
      default: undefined,
      type: String,
    },
    noFilteredDataText: {
      default: undefined,
      type: String,
    },
    rowClassName: {
      default() {
        return '';
      },
      type: Function,
    },
    showHeader: {
      default: true,
      type: Boolean,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['small', 'large', 'default']);
      },
    },
    stripe: {
      default: false,
      type: Boolean,
    },
    width: {
      default: undefined,
      type: [Number, String],
    },
  },

  data() {
    const colsWithId = this.makeColumnsId(this.columns);

    return {
      // for multiple table-head, get columns that have no children
      allColumns: getAllColumns(colsWithId),
      bodyHeight: 0,
      cloneColumns: this.makeColumns(colsWithId),
      // when Cell has a button to delete row data, clickCurrentRow will throw an error, so clone a data
      cloneData: cloneDeep(this.data),
      columnRows: this.makeColumnRows(false, colsWithId),
      columnsWidth: {},
      compiledUids: [],
      currentContext: this.context,
      headerHeight: 0,
      headerWidth: 0,
      leftFixedColumnRows: this.makeColumnRows('left', colsWithId),
      objData: this.makeObjData(), // checkbox or highlight-row
      prefixCls,
      ready: false,
      // for sort or filter
      rebuildData: [],
      rightFixedColumnRows: this.makeColumnRows('right', colsWithId),
      scrollBarWidth: getScrollBarSize(),
      showHorizontalScrollBar: false,
      showSlotFooter: true,
      showSlotHeader: true,
      showVerticalScrollBar: false,
      tableWidth: 0,
    };
  },
  computed: {
    bodyStyle() {
      const style = {};

      if (this.bodyHeight !== 0) {
        const height = this.bodyHeight;
        style.height = `${height}px`;
      }

      return style;
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-border`]: this.border,
          [`${prefixCls}-stripe`]: this.stripe,
          [`${prefixCls}-with-fixed-top`]: !!this.height,
        },
      ];
    },
    fixedBodyStyle() {
      const style = {};

      if (this.bodyHeight !== 0) {
        const height = this.bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0);
        style.height = this.showHorizontalScrollBar ? `${height}px` : `${height - 1}px`;
      }

      return style;
    },
    fixedHeaderClasses() {
      return [
        `${prefixCls}-fixed-header`,
        {
          [`${prefixCls}-fixed-header-with-empty`]: !this.rebuildData.length,
        },
      ];
    },
    fixedRightHeaderStyle() {
      const style = {};
      let width = 0;
      const height = this.headerHeight + 1;

      if (this.showVerticalScrollBar) {
        width = this.scrollBarWidth;
      }

      style.width = `${width}px`;
      style.height = `${height}px`;

      return style;
    },
    fixedRightTableStyle() {
      const style = {};
      let width = 0;
      this.rightFixedColumns.forEach((col) => {
        if (col.fixed && col.fixed === 'right') {
          /* eslint-disable-next-line no-underscore-dangle */
          width += col._width;
        }
      });
      // width += this.scrollBarWidth;
      style.width = `${width}px`;
      style.right = `${this.showVerticalScrollBar ? this.scrollBarWidth : 0}px`;

      return style;
    },
    fixedTableStyle() {
      const style = {};
      let width = 0;
      this.leftFixedColumns.forEach((col) => {
        if (col.fixed && col.fixed === 'left') {
          /* eslint-disable-next-line no-underscore-dangle */
          width += col._width;
        }
      });
      style.width = `${width}px`;

      return style;
    },
    isLeftFixed() {
      return this.columns.some((col) => col.fixed && col.fixed === 'left');
    },
    isRightFixed() {
      return this.columns.some((col) => col.fixed && col.fixed === 'right');
    },
    leftFixedColumns() {
      return convertColumnOrder(this.cloneColumns, 'left');
    },
    localeNoDataText() {
      if (this.noDataText === undefined) {
        return this.t('i.table.noDataText');
      }

      return this.noDataText;
    },
    localeNoFilteredDataText() {
      if (this.noFilteredDataText === undefined) {
        return this.t('i.table.noFilteredDataText');
      }

      return this.noFilteredDataText;
    },
    rightFixedColumns() {
      return convertColumnOrder(this.cloneColumns, 'right');
    },
    styles() {
      const style = {};

      if (this.height) {
        const height = parseInt(this.height, 10);
        style.height = `${height}px`;
      }

      if (this.width) {
        style.width = `${this.width}px`;
      }

      return style;
    },
    tableHeaderStyle() {
      const style = {};

      if (this.tableWidth !== 0) {
        let width = '';
        width = this.tableWidth;
        style.width = `${width}px`;
      }

      return style;
    },
    tableStyle() {
      const style = {};

      if (this.tableWidth !== 0) {
        let width = '';

        if (this.bodyHeight === 0) {
          width = this.tableWidth;
        } else {
          width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        }

        //                    const width = this.bodyHeight === 0 ? this.tableWidth : this.tableWidth - this.scrollBarWidth;
        style.width = `${width}px`;
      }

      return style;
    },
    wrapClasses() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-hide`]: !this.ready,
          [`${prefixCls}-with-header`]: this.showSlotHeader,
          [`${prefixCls}-with-footer`]: this.showSlotFooter,
        },
      ];
    },
  },
  watch: {
    columns: {
      deep: true,
      handler() {
        // todo 这里有性能问题，可能是左右固定计算属性影响的
        const colsWithId = this.makeColumnsId(this.columns);
        this.allColumns = getAllColumns(colsWithId);
        this.cloneColumns = this.makeColumns(colsWithId);

        this.columnRows = this.makeColumnRows(false, colsWithId);
        this.leftFixedColumnRows = this.makeColumnRows('left', colsWithId);
        this.rightFixedColumnRows = this.makeColumnRows('right', colsWithId);
        this.rebuildData = this.makeDataWithSortAndFilter();
        this.handleResize();
      },
    },
    data: {
      deep: true,
      handler() {
        const oldDataLen = this.rebuildData.length;
        this.objData = this.makeObjData();
        this.rebuildData = this.makeDataWithSortAndFilter();
        this.handleResize();

        if (!oldDataLen) {
          this.fixedHeader();
        }

        // here will trigger before clickCurrentRow, so use async
        setTimeout(() => {
          this.cloneData = cloneDeep(this.data);
        }, 0);
      },
    },
    height() {
      this.handleResize();
    },
    showHorizontalScrollBar() {
      this.handleResize();
    },
    showVerticalScrollBar() {
      this.handleResize();
    },
  },
  created() {
    if (!this.context) {
      this.currentContext = this.$parent;
    }

    this.showSlotHeader = this.$slots.header !== undefined;
    this.showSlotFooter = this.$slots.footer !== undefined;
    this.rebuildData = this.makeDataWithSortAndFilter();
  },
  mounted() {
    this.handleResize();
    this.$nextTick(() => {
      this.ready = true;
    });

    window.addEventListener('resize', this.handleResize);
    this.observer = elementResizeDetectorMaker();
    this.observer.listenTo(this.$el, this.handleResize);

    this.$on('on-visible-change', (val) => {
      if (val) {
        this.handleResize();
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    this.observer.removeListener(this.$el, this.handleResize);
  },
  methods: {
    clearCurrentRow() {
      if (!this.highlightRow) {
        return;
      }

      this.handleCurrentRow('clear');
    },
    clickCurrentRow(_index) {
      this.highlightCurrentRow(_index);
      /* eslint-disable-next-line no-underscore-dangle */
      this.$emit('on-row-click', JSON.parse(JSON.stringify(this.cloneData[_index])), _index);
    },
    dblclickCurrentRow(_index) {
      this.highlightCurrentRow(_index);
      /* eslint-disable-next-line no-underscore-dangle */
      this.$emit('on-row-dblclick', JSON.parse(JSON.stringify(this.cloneData[_index])), _index);
    },
    exportCsv(params) {
      if (params.filename) {
        if (params.filename.indexOf('.csv') === -1) {
          params.filename += '.csv';
        }
      } else {
        params.filename = 'table.csv';
      }

      let columns = [];
      let datas = [];

      if (params.columns && params.data) {
        columns = get(params, 'columns');
        datas = params.data;
      } else {
        columns = this.allColumns;

        if (!('original' in params)) {
          params.original = true;
        }

        datas = params.original ? this.data : this.rebuildData;
      }

      const noHeader = 'noHeader' in params && params.noHeader;
      const data = csv(columns, datas, params, noHeader);

      if (params.callback) {
        params.callback(data);
      } else {
        ExportCsv.download(params.filename, data);
      }
    },
    filterData(data, column) {
      return data.filter((row) => {
        // 如果定义了远程过滤方法则忽略此方法
        if (typeof column.filterRemote === 'function') {
          return true;
        }

        /* eslint-disable-next-line no-underscore-dangle */
        let status = !column._filterChecked.length;
        /* eslint-disable-next-line no-underscore-dangle */
        for (let i = 0; i < column._filterChecked.length; i += 1) {
          /* eslint-disable-next-line no-underscore-dangle */
          status = column.filterMethod(column._filterChecked[i], row);

          if (status) {
            break;
          }
        }

        return status;
      });
    },
    filterOtherData(otherData, index) {
      let data = otherData;
      const column = this.cloneColumns[index];

      if (typeof column.filterRemote === 'function') {
        /* eslint-disable-next-line no-underscore-dangle */
        column.filterRemote.call(this.$parent, column._filterChecked, column.key, column);
      }

      this.cloneColumns.forEach((col, colIndex) => {
        if (colIndex !== index) {
          data = this.filterData(data, col);
        }
      });

      return data;
    },
    fixedBody() {
      if (this.$refs.header) {
        this.headerWidth = this.$refs.header.children[0].offsetWidth;
        this.headerHeight = this.$refs.header.children[0].offsetHeight;
        // this.showHorizontalScrollBar = this.headerWidth>this.$refs.header.offsetWidth;
      }

      if (!this.$refs.tbody || !this.data || this.data.length === 0) {
        this.showVerticalScrollBar = false;
      } else {
        const bodyContentEl = this.$refs.tbody.$el;
        const bodyEl = bodyContentEl.parentElement;
        const bodyContentHeight = bodyContentEl.offsetHeight;
        const bodyHeight = bodyEl.offsetHeight;

        this.showHorizontalScrollBar =
          bodyEl.offsetWidth < bodyContentEl.offsetWidth + (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        this.showVerticalScrollBar = this.bodyHeight
          ? bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) < bodyContentHeight
          : false;

        if (this.showVerticalScrollBar) {
          bodyEl.classList.add(`${this.prefixCls}-overflowY`);
        } else {
          bodyEl.classList.remove(`${this.prefixCls}-overflowY`);
        }

        if (this.showHorizontalScrollBar) {
          bodyEl.classList.add(`${this.prefixCls}-overflowX`);
        } else {
          bodyEl.classList.remove(`${this.prefixCls}-overflowX`);
        }
      }
    },
    fixedHeader() {
      if (this.height) {
        this.$nextTick(() => {
          const titleHeight = parseInt(window.getComputedStyle(this.$refs.title, 'height'), 10) || 0;
          const headerHeight = parseInt(window.getComputedStyle(this.$refs.header, 'height'), 10) || 0;
          const footerHeight = parseInt(window.getComputedStyle(this.$refs.footer, 'height'), 10) || 0;
          this.bodyHeight = this.height - titleHeight - headerHeight - footerHeight;
          this.$nextTick(() => this.fixedBody());
        });
      } else {
        this.bodyHeight = 0;
        this.$nextTick(() => this.fixedBody());
      }
    },
    /*
     * #2832
     * 应该区分当前表头的 column 是左固定还是右固定
     * 否则执行到 $parent 时，方法的 index 与 cloneColumns 的 index 是不对应的
     * 左固定和右固定，要区分对待
     * 所以，此方法用来获取正确的 index.
     */
    getOriginalIndex(_index) {
      /* eslint-disable-next-line no-underscore-dangle */
      return this.cloneColumns.findIndex((item) => item._index === _index);
    },
    getSelection() {
      const selectionIndexes = [];
      /* eslint-disable-next-line no-restricted-syntax */
      for (const i in this.objData) {
        /* eslint-disable-next-line no-underscore-dangle */
        if (this.objData[i]._isChecked) {
          selectionIndexes.push(parseInt(i, 10));
        }
      }

      return JSON.parse(JSON.stringify(this.data.filter((data, index) => selectionIndexes.indexOf(index) > -1)));
    },
    handleBodyScroll(event) {
      if (this.showHeader) {
        this.$refs.header.scrollLeft = event.target.scrollLeft;
      }

      if (this.isLeftFixed) {
        this.$refs.fixedBody.scrollTop = event.target.scrollTop;
      }

      if (this.isRightFixed) {
        this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
      }

      this.hideColumnFilter();
    },
    // 通用处理 highlightCurrentRow 和 clearCurrentRow
    handleCurrentRow(type, _index) {
      let oldIndex = -1;
      /* eslint-disable-next-line no-restricted-syntax */
      for (const i in this.objData) {
        /* eslint-disable-next-line no-underscore-dangle */
        if (this.objData[i]._isHighlight) {
          oldIndex = parseInt(i, 10);
          /* eslint-disable-next-line no-underscore-dangle */
          this.objData[i]._isHighlight = false;
        }
      }

      if (type === 'highlight') {
        /* eslint-disable-next-line no-underscore-dangle */
        this.objData[_index]._isHighlight = true;
      }

      const oldData = oldIndex < 0 ? null : JSON.parse(JSON.stringify(this.cloneData[oldIndex]));
      /* eslint-disable-next-line no-underscore-dangle */
      const newData = type === 'highlight' ? JSON.parse(JSON.stringify(this.cloneData[_index])) : null;
      this.$emit('on-current-change', newData, oldData);
    },
    handleFilter(index) {
      const column = this.cloneColumns[index];
      let filterData = this.makeDataWithSort();

      // filter others first, after filter this column
      filterData = this.filterOtherData(filterData, index);
      this.rebuildData = this.filterData(filterData, column);
      /* eslint-disable-next-line no-underscore-dangle */
      this.cloneColumns[index]._isFiltered = true;
      /* eslint-disable-next-line no-underscore-dangle */
      this.cloneColumns[index]._filterVisible = false;
      this.$emit('on-filter-change', column);
    },

    handleFilterHide(index) {
      // clear checked that not filter now
      /* eslint-disable-next-line no-underscore-dangle */
      if (!this.cloneColumns[index]._isFiltered) {
        /* eslint-disable-next-line no-underscore-dangle */
        this.cloneColumns[index]._filterChecked = [];
      }
    },
    handleFilterReset(_index) {
      const index = this.getOriginalIndex(_index);
      /* eslint-disable-next-line no-underscore-dangle */
      this.cloneColumns[index]._isFiltered = false;
      /* eslint-disable-next-line no-underscore-dangle */
      this.cloneColumns[index]._filterVisible = false;
      /* eslint-disable-next-line no-underscore-dangle */
      this.cloneColumns[index]._filterChecked = [];

      let filterData = this.makeDataWithSort();
      filterData = this.filterOtherData(filterData, index);
      this.rebuildData = filterData;
      this.$emit('on-filter-change', this.cloneColumns[index]);
    },

    handleFilterSelect(_index, value) {
      const index = this.getOriginalIndex(_index);
      /* eslint-disable-next-line no-underscore-dangle */
      this.cloneColumns[index]._filterChecked = [value];
      this.handleFilter(index);
    },
    handleFixedMousewheel(event) {
      let {deltaY} = event;

      if (!deltaY && event.detail) {
        deltaY = event.detail * 40;
      }

      if (!deltaY && event.wheelDeltaY) {
        deltaY = -event.wheelDeltaY;
      }

      if (!deltaY && event.wheelDelta) {
        deltaY = -event.wheelDelta;
      }

      if (!deltaY) {
        return;
      }

      const {body} = this.$refs;
      const currentScrollTop = body.scrollTop;

      if (deltaY < 0 && currentScrollTop !== 0) {
        event.preventDefault();
      }

      if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
        event.preventDefault();
      }

      // body.scrollTop += deltaY;
      let step = 0;
      const timeId = setInterval(() => {
        step += 5;

        if (deltaY > 0) {
          body.scrollTop += 2;
        } else {
          body.scrollTop -= 2;
        }

        if (step >= Math.abs(deltaY)) {
          clearInterval(timeId);
        }
      }, 5);
    },
    handleMouseIn(_index) {
      if (this.disabledHover) {
        return;
      }

      /* eslint-disable-next-line no-underscore-dangle */
      if (this.objData[_index]._isHover) {
        return;
      }

      /* eslint-disable-next-line no-underscore-dangle */
      this.objData[_index]._isHover = true;
    },
    handleMouseOut(_index) {
      if (this.disabledHover) {
        return;
      }

      /* eslint-disable-next-line no-underscore-dangle */
      this.objData[_index]._isHover = false;
    },
    handleMouseWheel(event) {
      const {deltaX} = event;
      const $body = this.$refs.body;

      if (deltaX > 0) {
        $body.scrollLeft += 10;
      } else {
        $body.scrollLeft -= 10;
      }
    },
    handleResize() {
      // let tableWidth = parseInt(getStyle(this.$el, 'width')) - 1;
      const tableWidth = this.$el.offsetWidth - 1;
      const columnsWidth = {};
      let sumMinWidth = 0;
      const hasWidthColumns = [];
      const noWidthColumns = [];
      const maxWidthColumns = [];
      const noMaxWidthColumns = [];
      this.cloneColumns.forEach((col) => {
        if (col.width) {
          hasWidthColumns.push(col);
        } else {
          noWidthColumns.push(col);

          if (col.minWidth) {
            sumMinWidth += col.minWidth;
          }

          if (col.maxWidth) {
            maxWidthColumns.push(col);
          } else {
            noMaxWidthColumns.push(col);
          }
        }

        /* eslint-disable-next-line no-underscore-dangle */
        col._width = null;
      });

      const unUsableWidth = hasWidthColumns.map((cell) => cell.width).reduce((a, b) => a + b, 0);
      let usableWidth = tableWidth - unUsableWidth - sumMinWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0) - 1;
      let usableLength = noWidthColumns.length;
      let columnWidth = 0;

      if (usableWidth > 0 && usableLength > 0) {
        columnWidth = parseInt(usableWidth / usableLength, 10);
      }

      for (let i = 0; i < this.cloneColumns.length; i += 1) {
        const column = this.cloneColumns[i];
        let width = columnWidth + (column.minWidth ? column.minWidth : 0);

        if (column.width) {
          width = get(column, 'width');
          /* eslint-disable-next-line no-underscore-dangle */
        } else if (column._width) {
          /* eslint-disable-next-line no-underscore-dangle */
          width = column._width;
        } else {
          if (column.minWidth > width) {
            width = column.minWidth;
          } else if (column.maxWidth < width) {
            width = column.maxWidth;
          }

          if (usableWidth > 0) {
            usableWidth -= width - (column.minWidth ? column.minWidth : 0);
            usableLength -= 1;

            if (usableLength > 0) {
              columnWidth = parseInt(usableWidth / usableLength, 10);
            } else {
              columnWidth = 0;
            }
          } else {
            columnWidth = 0;
          }
        }

        /* eslint-disable-next-line no-underscore-dangle */
        column._width = width;
        /* eslint-disable-next-line no-underscore-dangle */
        columnsWidth[column._index] = {
          width,
        };
      }

      if (usableWidth > 0) {
        usableLength = noMaxWidthColumns.length;
        columnWidth = parseInt(usableWidth / usableLength, 10);
        for (let i = 0; i < noMaxWidthColumns.length; i += 1) {
          const column = noMaxWidthColumns[i];
          /* eslint-disable-next-line no-underscore-dangle */
          const width = column._width + columnWidth;

          if (usableLength > 1) {
            usableLength -= 1;
            usableWidth -= columnWidth;
            columnWidth = parseInt(usableWidth / usableLength, 10);
          } else {
            columnWidth = 0;
          }

          /* eslint-disable-next-line no-underscore-dangle */
          column._width = width;
          /* eslint-disable-next-line no-underscore-dangle */
          columnsWidth[column._index] = {
            width,
          };
        }
      }

      this.tableWidth =
        /* eslint-disable-next-line no-underscore-dangle */
        this.cloneColumns.map((cell) => cell._width).reduce((a, b) => a + b, 0) +
        (this.showVerticalScrollBar ? this.scrollBarWidth : 0) +
        1;
      this.columnsWidth = columnsWidth;
      this.fixedHeader();
    },
    handleSort(_index, type) {
      const index = this.getOriginalIndex(_index);
      this.cloneColumns.forEach((col) => {
        /* eslint-disable-next-line no-underscore-dangle */
        col._sortType = 'normal';
      });

      const {key} = this.cloneColumns[index];

      if (this.cloneColumns[index].sortable !== 'custom') {
        // custom is for remote sort
        if (type === 'normal') {
          this.rebuildData = this.makeDataWithFilter();
        } else {
          this.rebuildData = this.sortData(this.rebuildData, type, index);
        }
      }

      /* eslint-disable-next-line no-underscore-dangle */
      this.cloneColumns[index]._sortType = type;

      this.$emit('on-sort-change', {
        /* eslint-disable-next-line no-underscore-dangle */
        column: JSON.parse(JSON.stringify(this.allColumns[this.cloneColumns[index]._index])),
        key,
        order: type,
      });
    },
    hideColumnFilter() {
      this.cloneColumns.forEach((col) => {
        /* eslint-disable-next-line no-underscore-dangle */
        col._filterVisible = false;
      });
    },
    highlightCurrentRow(_index) {
      /* eslint-disable-next-line no-underscore-dangle */
      if (!this.highlightRow || this.objData[_index]._isHighlight) {
        return;
      }

      this.handleCurrentRow('highlight', _index);
    },
    // create a multiple table-head
    makeColumnRows(fixedType, cols) {
      return convertToRows(cols, fixedType);
    },
    makeColumns(cols) {
      // 在 data 时，this.allColumns 暂时为 undefined
      const columns = cloneDeep(getAllColumns(cols));
      const left = [];
      const right = [];
      const center = [];

      columns.forEach((column, index) => {
        /* eslint-disable-next-line no-underscore-dangle */
        column._index = index;
        /* eslint-disable-next-line no-underscore-dangle */
        column._columnKey = columnKey;
        columnKey += 1;
        /* eslint-disable-next-line no-underscore-dangle */
        column._width = column.width ? column.width : ''; // update in handleResize()
        /* eslint-disable-next-line no-underscore-dangle */
        column._sortType = 'normal';
        /* eslint-disable-next-line no-underscore-dangle */
        column._filterVisible = false;
        /* eslint-disable-next-line no-underscore-dangle */
        column._isFiltered = false;
        /* eslint-disable-next-line no-underscore-dangle */
        column._filterChecked = [];

        if ('filterMultiple' in column) {
          /* eslint-disable-next-line no-underscore-dangle */
          column._filterMultiple = column.filterMultiple;
        } else {
          /* eslint-disable-next-line no-underscore-dangle */
          column._filterMultiple = true;
        }

        if ('filteredValue' in column) {
          /* eslint-disable-next-line no-underscore-dangle */
          column._filterChecked = column.filteredValue;
          /* eslint-disable-next-line no-underscore-dangle */
          column._isFiltered = true;
        }

        if ('sortType' in column) {
          /* eslint-disable-next-line no-underscore-dangle */
          column._sortType = column.sortType;
        }

        if (column.fixed && column.fixed === 'left') {
          left.push(column);
        } else if (column.fixed && column.fixed === 'right') {
          right.push(column);
        } else {
          center.push(column);
        }
      });

      return left.concat(center).concat(right);
    },
    // 修改列，设置一个隐藏的 id，便于后面的多级表头寻找对应的列，否则找不到
    makeColumnsId(columns) {
      return columns.map((item) => {
        if ('children' in item) {
          item.children = this.makeColumnsId(item.children);
        }

        /* eslint-disable-next-line no-underscore-dangle */
        item.__id = getRandomStr(6);

        return item;
      });
    },
    makeData() {
      const data = cloneDeep(this.data);
      data.forEach((row, index) => {
        /* eslint-disable-next-line no-underscore-dangle */
        row._index = index;
        /* eslint-disable-next-line no-underscore-dangle */
        row._rowKey = rowKey;
        rowKey += 1;
      });

      return data;
    },
    makeDataWithFilter() {
      let data = this.makeData();
      this.cloneColumns.forEach((col) => {
        data = this.filterData(data, col);
      });

      return data;
    },
    makeDataWithSort() {
      let data = this.makeData();
      let sortType = 'normal';
      let sortIndex = -1;
      let isCustom = false;

      for (let i = 0; i < this.cloneColumns.length; i += 1) {
        /* eslint-disable-next-line no-underscore-dangle */
        if (this.cloneColumns[i]._sortType !== 'normal') {
          /* eslint-disable-next-line no-underscore-dangle */
          sortType = this.cloneColumns[i]._sortType;
          sortIndex = i;
          isCustom = this.cloneColumns[i].sortable === 'custom';
          break;
        }
      }

      if (sortType !== 'normal' && !isCustom) {
        data = this.sortData(data, sortType, sortIndex);
      }

      return data;
    },
    makeDataWithSortAndFilter() {
      let data = this.makeDataWithSort();
      this.cloneColumns.forEach((col) => {
        data = this.filterData(data, col);
      });

      return data;
    },
    makeObjData() {
      const data = {};
      this.data.forEach((row, index) => {
        const newRow = cloneDeep(row); // todo 直接替换
        /* eslint-disable-next-line no-underscore-dangle */
        newRow._isHover = false;

        /* eslint-disable-next-line no-underscore-dangle */
        if (newRow._disabled) {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isDisabled = newRow._disabled;
        } else {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isDisabled = false;
        }

        /* eslint-disable-next-line no-underscore-dangle */
        if (newRow._checked) {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isChecked = newRow._checked;
        } else {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isChecked = false;
        }

        /* eslint-disable-next-line no-underscore-dangle */
        if (newRow._expanded) {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isExpanded = newRow._expanded;
        } else {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isExpanded = false;
        }

        /* eslint-disable-next-line no-underscore-dangle */
        if (newRow._highlight) {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isHighlight = newRow._highlight;
        } else {
          /* eslint-disable-next-line no-underscore-dangle */
          newRow._isHighlight = false;
        }

        data[index] = newRow;
      });

      return data;
    },
    rowClsName(index) {
      return this.rowClassName(this.data[index], index);
    },
    selectAll(status) {
      // this.rebuildData.forEach((data) => {
      //     if(this.objData[data._index]._isDisabled){
      //         this.objData[data._index]._isChecked = false;
      //     }else{
      //         this.objData[data._index]._isChecked = status;
      //     }

      // });
      /* eslint-disable-next-line no-restricted-syntax */
      for (const data of this.rebuildData) {
        /* eslint-disable-next-line no-underscore-dangle */
        if (this.objData[data._index]._isDisabled) {
          /* eslint-disable-next-line no-continue */
          continue;
        }

        /* eslint-disable-next-line no-underscore-dangle */
        this.objData[data._index]._isChecked = status;
      }

      const selection = this.getSelection();

      if (status) {
        this.$emit('on-select-all', selection);
      }

      this.$emit('on-selection-change', selection);
    },
    sortData(data, type, index) {
      const {key} = this.cloneColumns[index];
      data.sort((a, b) => {
        if (this.cloneColumns[index].sortMethod) {
          return this.cloneColumns[index].sortMethod(a[key], b[key], type);
        }

        if (type === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        }

        if (type === 'desc') {
          return a[key] < b[key] ? 1 : -1;
        }

        return undefined;
      });

      return data;
    },
    toggleExpand(_index) {
      let data = {};

      /* eslint-disable-next-line no-restricted-syntax */
      for (const i in this.objData) {
        if (parseInt(i, 10) === _index) {
          data = this.objData[i];
          break;
        }
      }

      /* eslint-disable-next-line no-underscore-dangle */
      const status = !data._isExpanded;
      /* eslint-disable-next-line no-underscore-dangle */
      this.objData[_index]._isExpanded = status;
      /* eslint-disable-next-line no-underscore-dangle */
      this.$emit('on-expand', JSON.parse(JSON.stringify(this.cloneData[_index])), status);
    },
    toggleSelect(_index) {
      let data = {};

      /* eslint-disable-next-line no-restricted-syntax */
      for (const i in this.objData) {
        if (parseInt(i, 10) === _index) {
          data = this.objData[i];
          break;
        }
      }

      /* eslint-disable-next-line no-underscore-dangle */
      const status = !data._isChecked;

      /* eslint-disable-next-line no-underscore-dangle */
      this.objData[_index]._isChecked = status;

      const selection = this.getSelection();
      /* eslint-disable-next-line no-underscore-dangle */
      this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(this.data[_index])));
      this.$emit('on-selection-change', selection);
    },
  },
};
</script>
