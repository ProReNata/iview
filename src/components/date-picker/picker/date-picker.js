import Picker from '../picker.vue';
import DatePickerPanel from '../panel/Date/date.vue';
import RangeDatePickerPanel from '../panel/Date/date-range.vue';

import {oneOf} from '../../../utils/assist';

export default {
  components: {DatePickerPanel, RangeDatePickerPanel},
  computed: {
    ownPickerProps() {
      return this.options;
    },
    panel() {
      const isRange = this.type === 'daterange' || this.type === 'datetimerange';

      return isRange ? 'RangeDatePickerPanel' : 'DatePickerPanel';
    },
  },
  mixins: [Picker],
  name: 'CalendarPicker',
  props: {
    type: {
      default: 'date',
      validator(value) {
        return oneOf(value, ['year', 'month', 'date', 'daterange', 'datetime', 'datetimerange']);
      },
    },
  },
};
