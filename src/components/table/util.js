import cloneDeep from 'lodash/cloneDeep';

const convertColumnOrder = (columns, fixedType) => {
  const list = [];
  const other = [];
  columns.forEach((col) => {
    if (col.fixed && col.fixed === fixedType) {
      list.push(col);
    } else {
      other.push(col);
    }
  });

  return list.concat(other);
};

export {convertColumnOrder};

// set forTableHead to true when convertToRows, false in normal cases like table.vue
const getAllColumns = (cols, forTableHead = false) => {
  const columns = cloneDeep(cols);
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      if (forTableHead) {
        result.push(column);
      }

      result.push(...getAllColumns(column.children, forTableHead));
    } else {
      result.push(column);
    }
  });

  return result;
};

export {getAllColumns};

const convertToRows = (columns, fixedType = false) => {
  let originColumns;

  if (fixedType) {
    originColumns =
      fixedType === 'left' ? cloneDeep(convertColumnOrder(columns, 'left')) : cloneDeep(convertColumnOrder(columns, 'right'));
  } else {
    originColumns = cloneDeep(columns);
  }

  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;

      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }

    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  const rows = [];
  for (let i = 0; i < maxLevel; i += 1) {
    rows.push([]);
  }

  const allColumns = getAllColumns(originColumns, true);

  allColumns.forEach((column) => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }

    rows[column.level - 1].push(column);
  });

  return rows;
};

export {convertToRows};

const getRandomStr = function _getRandomStr(len = 32) {
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i += 1) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
};

export {getRandomStr};
