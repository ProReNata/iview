import {oneOf} from '../../../../utils/assist';
import {initTimeDate} from '../../util';

export default {
  computed: {
    isTime() {
      return this.currentView === 'time';
    },
  },
  methods: {
    handleToggleTime() {
      this.currentView = this.currentView === 'time' ? 'date' : 'time';
    },
  },
  props: {
    disabledDate: {
      default: () => false,
      type: Function,
    },
    focusedDate: {
      required: true,
      type: Date,
    },
    format: {
      default: 'yyyy-MM-dd',
      type: String,
    },
    pickerType: {
      require: true,
      type: String,
    },
    selectionMode: {
      default: 'date',
      type: String,
      validator(value) {
        return oneOf(value, ['year', 'month', 'date', 'time']);
      },
    },
    shortcuts: {
      default: () => [],
      type: Array,
    },
    showTime: {
      default: false,
      type: Boolean,
    },
    showWeekNumbers: {
      default: false,
      type: Boolean,
    },
    startDate: {
      type: Date,
    },
    timePickerOptions: {
      default: () => ({}),
      type: Object,
    },
    value: {
      default: () => [initTimeDate(), initTimeDate()],
      type: Array,
    },
  },
};
