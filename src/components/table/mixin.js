import get from 'lodash/get';

export default {
  methods: {
    alignCls(column, row = {}) {
      let cellClassName = '';

      if (row.cellClassName && column.key && row.cellClassName[column.key]) {
        cellClassName = row.cellClassName[column.key];
      }

      return [
        {
          [`${cellClassName}`]: cellClassName, // cell className
          [`${column.className}`]: column.className, // column className
          [`${this.prefixCls}-column-${column.align}`]: column.align,
          [`${this.prefixCls}-hidden`]:
            (this.fixed === 'left' && column.fixed !== 'left') ||
            (this.fixed === 'right' && column.fixed !== 'right') ||
            (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')),
        },
      ];
    },
    isPopperShow(column) {
      return (
        column.filters &&
        ((!this.fixed && !column.fixed) ||
          (this.fixed === 'left' && column.fixed === 'left') ||
          (this.fixed === 'right' && column.fixed === 'right'))
      );
    },
    setCellWidth(column) {
      let width = '';

      if (column.width) {
        width = get(column, 'width');
        /* eslint-disable-next-line no-underscore-dangle */
      } else if (this.columnsWidth[column._index]) {
        /* eslint-disable-next-line no-underscore-dangle */
        width = get(this.columnsWidth[column._index], 'width');
      }

      if (width === '0') {
        width = '';
      }

      return width;
    },
  },
};
