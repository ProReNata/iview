const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';

export default {
  methods: {
    handleClear() {
      this.dates = this.dates.map(() => null);
      this.rangeState = {};
      this.$emit('on-pick', this.dates);
      this.handleConfirm();
      //  if (this.showTime) this.$refs.timePicker.handleClear();
    },
    handleConfirm(visible, type) {
      this.$emit('on-pick', this.dates, visible, type || this.type);
    },
    handlePickClear() {
      this.resetView();
      this.$emit('on-pick-clear');
    },
    handlePickClick() {
      this.$emit('on-pick-click');
    },
    handlePickSuccess() {
      this.resetView();
      this.$emit('on-pick-success');
    },
    handleShortcutClick(shortcut) {
      if (shortcut.value) {
        this.$emit('on-pick', shortcut.value());
      }

      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },
    iconBtnCls(direction, type = '') {
      return [`${prefixCls}-icon-btn`, `${datePrefixCls}-${direction}-btn`, `${datePrefixCls}-${direction}-btn-arrow${type}`];
    },
    onToggleVisibility(open) {
      const {timeSpinner, timeSpinnerEnd} = this.$refs;

      if (open && timeSpinner) {
        timeSpinner.updateScroll();
      }

      if (open && timeSpinnerEnd) {
        timeSpinnerEnd.updateScroll();
      }
    },
    resetView() {
      setTimeout(
        () => {
          this.currentView = this.selectionMode;
        },
        500, // 500ms so the dropdown can close before changing
      );
    },
  },
  props: {
    confirm: {
      default: false,
      type: Boolean,
    },
  },
};
