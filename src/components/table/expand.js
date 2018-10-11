export default {
  functional: true,
  name: 'TableExpand',
  props: {
    column: {
      default: null,
      type: Object,
    },
    index: Number,
    render: Function,
    row: Object,
  },
  render: (h, ctx) => {
    const params = {
      index: ctx.props.index,
      row: ctx.props.row,
    };

    if (ctx.props.column) {
      params.column = ctx.props.column;
    }

    return ctx.props.render(h, params);
  },
};
