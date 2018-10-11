export default {
  functional: true,
  name: 'RenderCell',
  props: {
    data: Object,
    node: Array,
    render: Function,
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
