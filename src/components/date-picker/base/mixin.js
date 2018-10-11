import {clearHours} from '../util';

export default {
  computed: {
    dates() {
      const {selectionMode, value, rangeState} = this;
      const rangeSelecting = selectionMode === 'range' && rangeState.selecting;

      return rangeSelecting ? [rangeState.from] : value;
    },
  },
  methods: {
    handleClick(cell) {
      if (cell.disabled || cell.type === 'weekLabel') {
        return;
      }

      const newDate = new Date(clearHours(cell.date));

      this.$emit('on-pick', newDate);
      this.$emit('on-pick-click');
    },
    handleMouseMove(cell) {
      if (!this.rangeState.selecting) {
        return;
      }

      if (cell.disabled) {
        return;
      }

      const newDate = cell.date;
      this.$emit('on-change-range', newDate);
    },
  },
  name: 'PanelTable',
  props: {
    disabledDate: {
      type: Function,
    },
    focusedDate: {
      required: true,
      type: Date,
    },
    rangeState: {
      default: () => ({
        from: null,
        selecting: false,
        to: null,
      }),
      type: Object,
    },
    selectionMode: {
      required: true,
      type: String,
    },
    tableDate: {
      required: true,
      type: Date,
    },
    value: {
      required: true,
      type: Array,
    },
  },
};
