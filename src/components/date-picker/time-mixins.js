export default {
  props: {
    disabledHours: {
      default() {
        return [];
      },
      type: Array,
    },
    disabledMinutes: {
      default() {
        return [];
      },
      type: Array,
    },
    disabledSeconds: {
      default() {
        return [];
      },
      type: Array,
    },
    hideDisabledOptions: {
      default: false,
      type: Boolean,
    },
  },
};
