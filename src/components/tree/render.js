export default {
  functional: true,

  name: 'RenderCell',

  props: {
    data: {
      default: undefined,
      type: Object,
    },
    node: {
      default: undefined,
      type: Array,
    },
    render: {
      default: undefined,
      type: Function,
    },
  },

  render: (h, ctx) => {
    const params = {
      data: ctx.props.data,
      node: ctx.props.node[1],
      root: ctx.props.node[0],
    };

    return ctx.props.render(h, params);
  },
};
