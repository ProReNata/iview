<template>
  <div class="container">
    <h1>Use cases</h1>
    <h2>Default</h2>
    <i-table
      :columns="table1.columns"
      :rows="table1.rows"
      striped
    ></i-table>
  </div>
</template>

<script>
export default {
  name: 'TableUseCases',
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
            id: 24,
            name: 'Lando Calrissian',
            'hair-color': 'Black',
            planet: 'Socorro',
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
</style>
