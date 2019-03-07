<template>
  <table
    :class="baseClasses"
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
          :key="col.name"
        >
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rows"
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
</template>

<script>
// import IButton from '../button/button';
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
    // IButton,
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
      type: Object,
      default: () => {
        return {};
      },
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
    };
  },

  computed: {
    baseClasses() {
      return [`${prefixCls}`];
    },
    headerRowClasses() {
      return [`${prefixCls}-header-row`];
    },
    selectBoxClasses() {
      return [`${prefixCls}-select-box`];
    },

    loadingColumns() {
      return this.loading ? loadingColumnsData : this.columns;
    },
  },

  methods: {
    bodyRowClasses(rowId) {
      const prefix = prefixConstructor('body-row');

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
        this.selectedRows = this.rows.map(({id}) => id);
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
