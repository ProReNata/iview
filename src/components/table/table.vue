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
            @click="selectAllRows()"
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
                @click="bulkAction.handler(selectedRows)"
              >
                {{ bulkAction.label }}
              </i-button>
            </button-group>
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
            @click="selectRow(row.id)"
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
      v-if="amountOfPages > 1"
      :class="paginationClasses"
    >
      <div>Visar <i-button>{{ rowsPaginated.length }}</i-button> per sida</div>
      <nav
        v-if="amountOfPages < 15"
        aria-label="pagination"
      >
        <!--Previous Page-->
        <i-button
          icon="arrow-left"
          :aria-label="`Goto Page ${previousPage}`"
          @click="setPreviousPage()"
        ></i-button>

        <!--First Page-->
        <i-button
          v-if="page > 1"
          aria-label="Goto Page 1"
          @click="setFirstPage()"
        >
          1
        </i-button>

        <!--Page Placeholder-->
        <i-button
          v-if="previousPreviousPage > 1"
          icon="ellipsis-h"
          :class="paginationEllipsisClasses"
          disabled
        >
        </i-button>

        <!--PreviousPrevious Page-->
        <i-button
          v-if="previousPreviousPage > 1 && page === amountOfPages"
          :aria-label="`Goto Page ${previousPreviousPage}`"
          @click="setPreviousPage(2)"
        >
          {{ previousPreviousPage }}
        </i-button>

        <!--Previous Page-->
        <i-button
          v-if="previousPage > 1"
          :aria-label="`Goto Page ${previousPage}`"
          @click="setPreviousPage()"
        >
          {{ previousPage }}
        </i-button>

        <!--Current Page-->
        <i-button
          :class="paginationCurrentClasses"
          aria-current="page"
        >
          {{ page }}
        </i-button>

        <!--Next Page-->
        <i-button
          v-if="nextPage < amountOfPages"
          :aria-label="`Goto Page ${nextPage}`"
          @click="setNextPage()"
        >
          {{ nextPage }}
        </i-button>


        <!--NextNext Page-->
        <i-button
          v-if="nextNextPage < amountOfPages && page === 1"
          :aria-label="`Goto Page ${nextNextPage}`"
          @click="setNextPage(2)"
        >
          {{ nextNextPage }}
        </i-button>

        <!--Page Placeholder-->
        <i-button
          v-if="nextNextPage < amountOfPages"
          icon="ellipsis-h"
          :class="paginationEllipsisClasses"
          disabled
        >
        </i-button>

        <!--Last Page-->
        <i-button
          v-if="page !== amountOfPages"
          :aria-label="`Goto Page ${amountOfPages}`"
          @click="setLastPage()"
        >
          {{ amountOfPages }}
        </i-button>

        <!--Next Page-->
        <i-button
          icon="arrow-right"
          :aria-label="`Goto Page ${nextPage}`"
          @click="setNextPage()"
        ></i-button>
      </nav>
      <nav v-if="amountOfPages >= 15">
        <!--Previous Page-->
        <i-button
          icon="arrow-left"
          :aria-label="`Goto Page ${previousPage}`"
          @click="setPreviousPage()"
        ></i-button>

        <i-select
          v-model="page"
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
          @click="setNextPage()"
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

const prefixCls = 'byx-table';

const prefixConstructor = (suffix) => {
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
      page: 1,
      paginationRowsPerPage: this.pagination.rowsPerPage || 25,
      paginationThreshold: this.pagination.threshold || this.pagination.rowsPerPage || 25,
    };
  },

  computed: {
    baseClasses() {
      return [`${prefixCls}`, {[`${prefixCls}-paginated`]: this.pagination || typeof this.pagination === 'object'}];
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
        return this.rows.slice(this.previousPage * this.paginationRowsPerPage, this.page * this.paginationRowsPerPage);
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

    previousPage() {
      return this.page - 1;
    },

    nextPage() {
      return this.page + 1;
    },

    previousPreviousPage() {
      return this.page - 2;
    },

    nextNextPage() {
      return this.page + 2;
    },
  },

  methods: {
    bodyRowClasses(rowId) {
      const prefix = prefixConstructor('table-body-row');

      return [prefix, {[`${prefix}-striped`]: this.striped}, {[`${prefix}-selected`]: this.selectedRows.includes(rowId)}];
    },
    selectRow(rowId) {
      const {selectedRows} = this;
      this.selectedRows = selectedRows.includes(rowId) ? selectedRows.filter((id) => id !== rowId) : [...selectedRows, rowId];
    },
    selectAllRows() {
      if (this.selectedRows.length > 0) {
        this.selectedRows = [];
      } else {
        this.selectedRows = this.rowsPaginated.map(({id}) => id);
      }
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
      if (this.page > 1) {
        this.page -= amount;
      }
    },

    setNextPage(amount = 1) {
      if (this.page < this.amountOfPages) {
        this.page += amount;
      }
    },

    setFirstPage() {
      this.page = 1;
    },

    setLastPage() {
      this.page = this.amountOfPages;
    },
  },
};
</script>
