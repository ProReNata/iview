export default {
  functional: true,
  name: 'RenderCell',
  props: {
    render: Function,
  },
  render: (h, ctx) => ctx.props.render(h),
};
