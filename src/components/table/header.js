export default {
  functional: true,
  name: 'TableRenderHeader',
  props: {
    column: Object,
    index: Number,
    render: Function,
  },
  render: (h, ctx) => {
    const params = {
      column: ctx.props.column,
      index: ctx.props.index,
    };

    return ctx.props.render(h, params);
  },
};
