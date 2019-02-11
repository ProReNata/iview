<template>
  <tr :class="rowClasses(row._index)">
    <slot></slot>
  </tr>
</template>

<script>
import get from 'lodash/get';

export default {
  props: {
    prefixCls: {
      default: undefined,
      type: String,
    },
    row: {
      default: undefined,
      type: Object,
    },
  },

  computed: {
    objData() {
      return this.$parent.objData;
    },
  },

  methods: {
    rowClasses(index) {
      return [
        `${this.prefixCls}-row`,
        this.rowClsName(index),
        {
          [`${this.prefixCls}-row-highlight`]: get(this.objData, `[${index}]._isHighlight`, false),
          [`${this.prefixCls}-row-hover`]: get(this.objData, `[${index}]._isHover`, false),
        },
      ];
    },
    rowClsName(index) {
      return this.$parent.$parent.rowClassName(this.objData[index], index);
    },
  },
};
</script>
