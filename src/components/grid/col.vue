<template>
  <div
    :class="classes"
    :style="styles"
  >
    <slot></slot>
  </div>
</template>
<script>
import {findComponentUpward} from '../../utils/assist';

const prefixCls = 'ivu-col';

export default {
  name: 'ICol',

  props: {
    className: {
      default: undefined,
      type: String,
    },
    lg: {
      default: undefined,
      type: [Number, Object],
    },
    md: {
      default: undefined,
      type: [Number, Object],
    },
    offset: {
      default: undefined,
      type: [Number, String],
    },
    order: {
      default: undefined,
      type: [Number, String],
    },
    pull: {
      default: undefined,
      type: [Number, String],
    },
    push: {
      default: undefined,
      type: [Number, String],
    },
    sm: {
      default: undefined,
      type: [Number, Object],
    },
    span: {
      default: undefined,
      type: [Number, String],
    },
    xs: {
      default: undefined,
      type: [Number, Object],
    },
  },

  data() {
    return {
      gutter: 0,
    };
  },

  computed: {
    classes() {
      const classList = [
        `${prefixCls}`,
        {
          [`${prefixCls}-span-${this.span}`]: this.span,
          [`${prefixCls}-order-${this.order}`]: this.order,
          [`${prefixCls}-offset-${this.offset}`]: this.offset,
          [`${prefixCls}-push-${this.push}`]: this.push,
          [`${prefixCls}-pull-${this.pull}`]: this.pull,
          [`${this.className}`]: !!this.className,
        },
      ];

      ['xs', 'sm', 'md', 'lg'].forEach((size) => {
        if (typeof this[size] === 'number') {
          classList.push(`${prefixCls}-span-${size}-${this[size]}`);
        } else if (typeof this[size] === 'object') {
          const props = this[size];
          Object.keys(props).forEach((prop) => {
            classList.push(
              prop !== 'span' ? `${prefixCls}-${size}-${prop}-${props[prop]}` : `${prefixCls}-span-${size}-${props[prop]}`,
            );
          });
        }
      });

      return classList;
    },
    styles() {
      let style = {};

      if (this.gutter !== 0) {
        style = {
          paddingLeft: `${this.gutter / 2}px`,
          paddingRight: `${this.gutter / 2}px`,
        };
      }

      return style;
    },
  },

  mounted() {
    this.updateGutter();
  },

  beforeDestroy() {
    this.updateGutter();
  },

  methods: {
    updateGutter() {
      const Row = findComponentUpward(this, 'Row');

      if (Row) {
        Row.updateGutter(Row.gutter);
      }
    },
  },
};
</script>
