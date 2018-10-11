
<script>
import noop from 'lodash/noop';
import stubArray from 'lodash/stubArray';

export default {
  functional: true,
  props: {
    options: {
      default: stubArray,
      type: Array,
    },
    slotOptions: {
      default: stubArray,
      type: Array,
    },
    slotUpdateHook: {
      default: noop,
      type: Function,
    },
  },
  render(h, {props, parent}) {
    // to detect changes in the $slot children/options we do this hack
    // so we can trigger the parents computed properties and have everything reactive
    // although $slot.default is not
    if (props.slotOptions !== parent.$slots.default) {
      props.slotUpdateHook();
    }

    return props.options;
  },
};
</script>
