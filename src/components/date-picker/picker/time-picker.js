import isOneOf from 'Global/Assets/isOneOf';
import {findComponentsDownward} from 'Src/utils/assist';
import Picker from '../picker.vue';
import TimePickerPanel from '../panel/Time/time.vue';
import RangeTimePickerPanel from '../panel/Time/time-range.vue';
import Options from '../time-mixins';

export default {
  components: {RangeTimePickerPanel, TimePickerPanel},
  computed: {
    ownPickerProps() {
      return {
        disabledHours: this.disabledHours,
        disabledMinutes: this.disabledMinutes,
        disabledSeconds: this.disabledSeconds,
        hideDisabledOptions: this.hideDisabledOptions,
      };
    },
    panel() {
      const isRange = this.type === 'timerange';

      return isRange ? 'RangeTimePickerPanel' : 'TimePickerPanel';
    },
  },
  mixins: [Picker, Options],
  props: {
    type: {
      default: 'time',
      validator(value) {
        return isOneOf(value, ['time', 'timerange']);
      },
    },
  },
  watch: {
    visible(visible) {
      if (visible) {
        this.$nextTick(() => {
          const spinners = findComponentsDownward(this, 'TimeSpinner');
          spinners.forEach((instance) => instance.updateScroll());
        });
      }
    },
  },
};
