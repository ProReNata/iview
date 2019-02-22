<template>
  <div
    :class="classes"
    :style="styles"
  >
    <slot></slot>
  </div>
</template>

<script>
import isOneOf from 'Global/Assets/isOneOf';
import {findComponentDownward, findBrothersComponents} from 'Src/utils/assist';

const prefixCls = 'ivu-row';

export default {
  name: 'Row',

  props: {
    align: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['top', 'middle', 'bottom']);
      },
    },
    className: {
      default: undefined,
      type: String,
    },
    gutter: {
      default: 0,
      type: Number,
    },
    justify: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
      },
    },
    type: {
      default: undefined,
      type: String,
      validator(value) {
        return isOneOf(value, ['flex']);
      },
    },
  },

  computed: {
    classes() {
      return [
        {
          [`${prefixCls}`]: !this.type,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
          [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
          [`${this.className}`]: !!this.className,
        },
      ];
    },
    styles() {
      let style = {};

      if (this.gutter !== 0) {
        style = {
          marginLeft: `${this.gutter / -2}px`,
          marginRight: `${this.gutter / -2}px`,
        };
      }

      return style;
    },
  },
  watch: {
    gutter(val) {
      this.updateGutter(val);
    },
  },
  methods: {
    updateGutter(val) {
      // 这里会嵌套寻找，把 Col 里的 Row 里的 Col 也找到，所以用 兄弟找
      //                const Cols = findComponentsDownward(this, 'iCol');
      const Col = findComponentDownward(this, 'iCol');
      const Cols = findBrothersComponents(Col, 'iCol', false);

      if (Cols.length) {
        Cols.forEach((child) => {
          if (val !== 0) {
            child.gutter = val;
          }
        });
      }
    },
  },
};
</script>
