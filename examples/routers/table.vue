<template>
  <div>
    <h1>Table</h1>
    <h2>Default</h2>
    <p>Prop _columns_ Array of objects. <br> Each Object has a name: String, sortable: Boolean, a label: String and a type: String.</p>
    <p>Prop _rows_ Array of objects. <br> Each Object has an id: Number, and a key - value pair for each column, with the key being the column name.</p>
    <i-table
      :columns="table1.columns"
      :rows="table1.rows"
    ></i-table>
    <h2>Striped</h2>
    <p>Prop _striped_ Boolean: false.</p>
    <i-table
      :columns="table1.columns"
      :rows="table1.rows"
      striped
    ></i-table>
    <h2>Bulk Actions</h2>
    <p>Prop _bulkActions_ Array of objects. <br> Each Object adds a bulk action button and has a label: String, icon: String (Optional), a handler: Function.</p>
    <i-table
      :columns="table1.columns"
      :rows="table1.rows"
      :bulk-actions="table1.bulkActions"
    ></i-table>
    <h2>Pagination</h2>
    <p>Prop _bulkActions_ Object with optional properties: <br> rowsPerPage: Number (Default: 25), <br> threshold: Number (Default: rowsPerPage || 25).</p>
    <h3>rowsPerPage: 5, Threshold: 10, rows: 8</h3>
    <i-table
      :columns="table1.columns"
      :rows="table1.rows"
      :bulk-actions="table1.bulkActions"
      :pagination="table1.pagination"
    ></i-table>
    <h3>rowsPerPage: 5, rows: 8</h3>
    <i-table
      :columns="table1.columns"
      :rows="table1.rows"
      :bulk-actions="table1.bulkActions"
      :pagination="{ rowsPerPage: 5 }"
    ></i-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table1: {
        columns: [
          {
            name: 'name',
            sortable: false,
            label: 'Name',
            type: 'String',
          },
          {
            name: 'hair-color',
            sortable: false,
            label: 'Hair Color',
            type: 'Number',
          },
          {
            name: 'planet',
            sortable: false,
            label: 'Planet',
            type: 'String',
          },
        ],
        rows: [
          {
            id: 1,
            name: 'Luke Skywalker',
            'hair-color': 'Blond',
            planet: 'Tatooine',
          },
          {
            id: 2,
            name: 'C-3PO',
            'hair-color': 'n/a',
            planet: 'Tatooine',
          },
          {
            id: 3,
            name: 'R2D2',
            'hair-color': 'n/a',
            planet: 'Naboo',
          },
          {
            id: 25,
            name: 'Lando Calrissian',
            'hair-color': 'Black',
            planet: 'Socorro',
          },
          {
            id: 44,
            name: 'Darth Maul',
            'hair-color': 'none',
            planet: 'Dathomir',
          },
          {
            id: 4,
            name: 'Darth Vader',
            'hair-color': 'none',
            planet: 'Tatooine',
          },
          {
            id: 5,
            name: 'Leia Organa',
            'hair-color': 'brown',
            planet: 'Alderaan',
          },
          {
            id: 10,
            name: 'Obi-Wan Kenobi',
            'hair-color': 'auburn, white',
            planet: 'Stewjon',
          },
        ],
        bulkActions: [
          {
            label: 'Spara',
            icon: 'save',
            handler: this.saveRows,
          },
          {
            label: 'Duplicera',
            icon: 'copy',
            handler: this.saveRows,
          },
          {
            label: 'Skriva',
            handler: this.saveRows,
          },
          {
            label: 'Skriva1',
            handler: this.saveRows,
          },
          {
            label: 'Skriva2',
            handler: this.saveRows,
          },
        ],
        pagination: {
          rowsPerPage: 5,
          threshold: 10,
        },
      },
    };
  },

  methods: {
    saveRows(data) {
      console.log(data);
    },
  },
};
</script>
