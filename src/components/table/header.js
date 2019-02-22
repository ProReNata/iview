export default {
  functional: true,

  name: 'TableRenderHeader',

  props: {
    column: {
      default: undefined,
      type: Object,
    },
    index: {
      default: undefined,
      type: Number,
    },
    render: {
      default: undefined,
      type: Function,
    },
  },

  render: (h, ctx) => {
    const params = {
      column: ctx.props.column,
      index: ctx.props.index,
    };

    return ctx.props.render(h, params);
  },
};
