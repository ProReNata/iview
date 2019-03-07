<template>
  <table
    :class="baseClasses"
  >
    <thead>
      <tr>
        <th
          v-for="col in columns"
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
        :class="rowClasses"
      >
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
const prefixCls = 'byx-table';

export default {
  name: 'Table',
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [
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
      ],
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

  computed: {
    baseClasses() {
      return [`${prefixCls}`, {[`${prefixCls}-striped`]: this.striped}];
    },
    rowClasses() {
      return [];
    },
  },
};
</script>
