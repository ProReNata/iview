<template>
  <div
    :class="baseClasses"
  >
    <table
      :class="tableClasses"
    >
      <thead>
        <tr :class="headerRowClasses">
          <th
            v-if="bulkActions.length > 0"
            :class="selectBoxClasses"
            @click.left="toggleAllPaginatedRows()"
          >
            <icon
              v-bind="selectAllBoxAttributes"
            ></icon>
          </th>
          <th
            v-for="col in loadingColumns"
            v-show="selectedRows.length === 0"
            :key="col.name"
          >
            {{ col.label }}
          </th>
          <th
            v-show="selectedRows.length > 0"
            :colspan="columns.length"
          >
            <span :class="selectedFieldsLabelClasses">{{ selectedRows.length }} valda:</span>
            <button-group>
              <i-button
                v-for="bulkAction in bulkActions"
                :key="bulkAction.label"
                :icon="bulkAction.icon"
                :class="selectedFieldsButtonClasses"
                @click.left="bulkAction.handler(selectedRows)"
              >
                {{ bulkAction.label }}
              </i-button>
            </button-group>
          </th>
        </tr>
        <tr v-if="showSelectedWarning">
          <th
            :colspan="columns.length + 1"
            :class="selectedWarningClasses"
          >
            Alla <strong>{{ selectedRows.length }}</strong> rader på denna sida är markerade. <span @click.left="selectAllRows()">Markera samtliga <strong>{{ rows.length }}</strong> rader i tabellen.</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rowsPaginated"
          :key="row.id"
          :class="bodyRowClasses(row.id)"
        >
          <td
            v-if="bulkActions.length > 0"
            :class="selectBoxClasses"
            @click.left="toggleRow(row.id)"
          >
            <icon
              v-bind="selectBoxAttributes(row.id)"
            ></icon>
          </td>
          <td
            v-for="col in columns"
            :key="col.name"
          >
            {{ row[col.name] }}
          </td>
        </tr>
      </tbody>
    </table>
    <section
      v-if="pagination"
      :class="paginationClasses"
    >
      <div>
        <span>Visar</span>
        <i-select
          v-model="paginationRowsPerPage"
        >
          <i-option
            v-for="item in paginationRowsPerPageOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </i-option>
        </i-select>
        <span>per sida</span>
      </div>
      <nav
        v-if="amountOfPages < 15"
        aria-label="pagination"
      >
        <!--Previous Page-->
        <i-button
          icon="arrow-left"
          :aria-label="`Goto Page ${previousPage}`"
          @click.left="setPreviousPage()"
        ></i-button>

        <!--First Page-->
        <i-button
          v-if="currentPage > 1"
          aria-label="Goto Page 1"
          @click.left="setFirstPage()"
        >
          1
        </i-button>

        <!--Page Placeholder-->
        <i-button
          v-if="twoPagesBeforeCurrent > 1"
          icon="ellipsis-h"
          :class="paginationEllipsisClasses"
          disabled
        >
        </i-button>

        <!--PreviousPrevious Page-->
        <i-button
          v-if="twoPagesBeforeCurrent > 1 && currentPage === amountOfPages"
          :aria-label="`Goto Page ${twoPagesBeforeCurrent}`"
          @click.left="setPreviousPage(2)"
        >
          {{ twoPagesBeforeCurrent }}
        </i-button>

        <!--Previous Page-->
        <i-button
          v-if="previousPage > 1"
          :aria-label="`Goto Page ${previousPage}`"
          @click.left="setPreviousPage()"
        >
          {{ previousPage }}
        </i-button>

        <!--Current Page-->
        <i-button
          :class="paginationCurrentClasses"
          aria-current="page"
        >
          {{ currentPage }}
        </i-button>

        <!--Next Page-->
        <i-button
          v-if="nextPage < amountOfPages"
          :aria-label="`Goto Page ${nextPage}`"
          @click.left="setNextPage()"
        >
          {{ nextPage }}
        </i-button>


        <!--NextNext Page-->
        <i-button
          v-if="twoPagesAfterCurrent < amountOfPages && currentPage === 1"
          :aria-label="`Goto Page ${twoPagesAfterCurrent}`"
          @click.left="setNextPage(2)"
        >
          {{ twoPagesAfterCurrent }}
        </i-button>

        <!--Page Placeholder-->
        <i-button
          v-if="twoPagesAfterCurrent < amountOfPages"
          icon="ellipsis-h"
          :class="paginationEllipsisClasses"
          disabled
        >
        </i-button>

        <!--Last Page-->
        <i-button
          v-if="currentPage !== amountOfPages"
          :aria-label="`Goto Page ${amountOfPages}`"
          @click.left="setLastPage()"
        >
          {{ amountOfPages }}
        </i-button>

        <!--Next Page-->
        <i-button
          icon="arrow-right"
          :aria-label="`Goto Page ${nextPage}`"
          @click.left="setNextPage()"
        ></i-button>
      </nav>
      <nav v-if="amountOfPages >= paginationSelectBoxThreshold">
        <!--Previous Page-->
        <i-button
          icon="arrow-left"
          :aria-label="`Goto Page ${previousPage}`"
          @click.left="setPreviousPage()"
        ></i-button>

        <i-select
          v-model="currentPage"
        >
          <i-option
            v-for="item in amountOfPages"
            :key="item"
            :value="item"
          >
            {{ 'Sidan ' + item }}
          </i-option>
        </i-select>

        <!--Next Page-->
        <i-button
          icon="arrow-right"
          :aria-label="`Goto Page ${nextPage}`"
          @click.left="setNextPage()"
        ></i-button>
      </nav>
    </section>
  </div>
</template>

<script>
import IButton from '../button/button';
import ButtonGroup from '../button/button-group';
import Icon from '../icon/icon';
import ISelect from '../select/select';
import IOption from '../select/option';

const globalPrefix = 'byx';
const PAGINATION_SELECT_BOX_THRESHOLD = 15;
const PAGINATION_DEFAULT_ROWSPERPAGE = 25;
const PAGINATION_DEFAULT_THRESHOLD = 25;

const prefixConstructor = (suffix) => {
  const prefixCls = `${globalPrefix}-table`;

  return suffix === '' ? prefixCls : `${prefixCls}-${suffix}`;
};

const loadingColumnsData = [
  {
    name: 'loading1',
    sortable: false,
    label: 'Loading...',
    type: 'String',
  },
  {
    name: 'loading2',
    sortable: false,
    label: 'Loading...',
    type: 'String',
  },
  {
    name: 'loading3',
    sortable: false,
    label: 'Loading...',
    type: 'String',
  },
];

export default {
  name: 'Table',

  components: {
    IButton,
    ButtonGroup,
    Icon,
    ISelect,
    IOption,
  },
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => loadingColumnsData,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: [Object, Boolean],
      default: false,
    },
    errorMessage: {
      type: Object,
      default: () => {
        return {
          title: 'Error',
          description: 'Error Description',
        };
      },
    },
    bulkActions: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data() {
    return {
      selectedRows: [],
      currentPage: 1,
      paginationRowsPerPage: this.pagination.rowsPerPage || PAGINATION_DEFAULT_ROWSPERPAGE,
      paginationThreshold: this.pagination.threshold || this.pagination.rowsPerPage || PAGINATION_DEFAULT_THRESHOLD,
      paginationSelectBoxThreshold: PAGINATION_SELECT_BOX_THRESHOLD,
      showSelectedWarning: false,
    };
  },

  computed: {
    baseClasses() {
      const prefix = prefixConstructor('');

      return [`${prefix}`, {[`${prefix}-paginated`]: this.pagination || typeof this.pagination === 'object'}];
    },
    tableClasses() {
      const prefix = prefixConstructor('table');

      return [prefix];
    },
    headerRowClasses() {
      const prefix = prefixConstructor('table-header-row');

      return [prefix];
    },
    selectBoxClasses() {
      const prefix = prefixConstructor('table-select-box');

      return [prefix];
    },
    selectedFieldsLabelClasses() {
      const prefix = prefixConstructor('table-select-field-label');

      return [prefix];
    },
    selectedWarningClasses() {
      const prefix = prefixConstructor('table-select-warning');

      return [prefix];
    },
    selectedFieldsButtonClasses() {
      const prefix = prefixConstructor('table-select-field-button');

      return [prefix];
    },
    paginationClasses() {
      const prefix = prefixConstructor('pagination-row');

      return [prefix];
    },
    paginationEllipsisClasses() {
      const prefix = prefixConstructor('pagination-row-ellipsis');

      return [prefix];
    },
    paginationCurrentClasses() {
      const prefix = prefixConstructor('pagination-row-current');

      return [prefix];
    },

    selectAllBoxAttributes() {
      if (this.selectedRows.length === this.rows.length) {
        return {
          type: 'check-square',
          weight: 'solid',
        };
      }

      if (this.selectedRows.length > 0) {
        return {
          type: 'minus-square',
          weight: 'solid',
        };
      }

      return {
        type: 'square',
        weight: 'regular',
      };
    },

    loadingColumns() {
      return this.loading ? loadingColumnsData : this.columns;
    },

    rowsPaginated() {
      if (this.amountOfPages > 1) {
        return this.rows.slice(this.previousPage * this.paginationRowsPerPage, this.currentPage * this.paginationRowsPerPage);
      }

      return this.rows;
    },

    amountOfPages() {
      if (!this.pagination && typeof this.pagination !== 'object') {
        return 1;
      }

      if (this.rows.length < this.paginationThreshold) {
        return 1;
      }

      return Math.ceil(this.rows.length / this.paginationRowsPerPage);
    },

    paginationRowsPerPageOptions() {
      const options = [{label: '25', value: 25}, {label: '50', value: 50}, {label: '100', value: 100}];

      if (this.rows.length > 500) {
        options.push({label: `All ${this.rows.length}`, value: this.rows.length});
      }

      return options;
    },

    previousPage() {
      return this.currentPage - 1;
    },

    nextPage() {
      return this.currentPage + 1;
    },

    twoPagesBeforeCurrent() {
      return this.currentPage - 2;
    },

    twoPagesAfterCurrent() {
      return this.currentPage + 2;
    },
  },

  methods: {
    bodyRowClasses(rowId) {
      const prefix = prefixConstructor('table-body-row');

      return [prefix, {[`${prefix}-striped`]: this.striped}, {[`${prefix}-selected`]: this.selectedRows.includes(rowId)}];
    },
    toggleRow(rowId) {
      const {selectedRows} = this;
      this.selectedRows = selectedRows.includes(rowId) ? selectedRows.filter((id) => id !== rowId) : [...selectedRows, rowId];
    },
    toggleAllPaginatedRows() {
      if (this.selectedRows.length > 0) {
        this.selectedRows = [];
        this.showSelectedWarning = false;
      } else {
        this.showSelectedWarning = this.rowsPaginated.length !== this.rows.length;
        this.selectedRows = this.rowsPaginated.map(({id}) => id);
      }
    },
    selectAllRows() {
      this.showSelectedWarning = false;
      this.selectedRows = this.rows.map(({id}) => id);
    },
    selectBoxAttributes(rowId) {
      if (this.selectedRows.includes(rowId)) {
        return {
          type: 'check-square',
          weight: 'solid',
        };
      }

      return {
        type: 'square',
        weight: 'regular',
      };
    },

    setPreviousPage(amount = 1) {
      if (this.currentPage > 1) {
        this.setCurrentPage(this.currentPage - amount);
      }
    },

    setNextPage(amount = 1) {
      if (this.currentPage < this.amountOfPages) {
        this.setCurrentPage(this.currentPage + amount);
      }
    },

    setFirstPage() {
      this.setCurrentPage(1);
    },

    setLastPage() {
      this.setCurrentPage(this.amountOfPages);
    },

    setCurrentPage(newPage) {
      this.currentPage = newPage;
      this.$emit('set-current-page', newPage);
    },
  },
};
</script>
