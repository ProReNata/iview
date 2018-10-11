import {createVue, destroyVM} from '../util';
import {csvA, csvB} from './assets/table/csvData.js';

const cleanCSV = (str) =>
  str
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .join('\n');

describe('Table.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  describe('CSV export', () => {
    it('should export simple data to CSV - test A', (done) => {
      vm = createVue({
        data() {
          return csvA;
        },
        mounted() {
          this.$refs.tableA.exportCsv({
            callback: (data) => {
              expect(cleanCSV(data)).to.equal(cleanCSV(this.expected));
              expect(cleanCSV(data).length > 0).to.equal(true);
              done();
            },
          });
        },
        template: '<div><Table :columns="columns" :data="data" ref="tableA" /></div>',
      });
    });

    it('should export data with commas and line breaks to CSV - test B', (done) => {
      vm = createVue({
        data() {
          return csvB;
        },
        mounted() {
          this.$refs.tableB.exportCsv({
            callback: (data) => {
              expect(cleanCSV(data)).to.equal(cleanCSV(this.expected));
              expect(cleanCSV(data).length > 0).to.equal(true);
              done();
            },
            quoted: true,
            separator: ';',
          });
        },
        template: '<div><Table :columns="columns" :data="data" ref="tableB" /></div>',
      });
    });
  });
});
