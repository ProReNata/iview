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
              v-bind="selectAllBoxAttributes()"
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
    <div
      v-if="pagination"
      :class="paginationClasses"
    >
      <div>Visar <i-button>{{ rowsPaginated.length }}</i-button> per sida</div>
      <div><i-button icon="arrow-left"></i-button> {{ page }} <i-button icon="arrow-right"></i-button></div>
    </div>
  </div>
</template>

<script>
import IButton from '../button/button';
import ButtonGroup from '../button/button-group';
import Icon from '../icon/icon';

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
      page: 0,
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

    loadingColumns() {
      return this.loading ? loadingColumnsData : this.columns;
    },

    rowsPaginated() {
      if (!this.pagination && typeof this.pagination !== 'object') {
        return this.rows;
      }

      if (this.rows.length < this.paginationThreshold) {
        return this.rows;
      }

      return this.rows.slice(this.page * this.paginationRowsPerPage, (this.page + 1) * this.paginationRowsPerPage);
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
  },
};
</script>
