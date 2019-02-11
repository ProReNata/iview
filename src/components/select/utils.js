export default function debounce(fn) {
  let waiting;

  return function _debounced(...args) {
    if (waiting) {
      return;
    }

    waiting = true;
    /* eslint-disable-next-line babel/no-invalid-this */
    const context = this;
    const later = function _later() {
      waiting = false;
      fn.apply(context, args);
    };

    /* eslint-disable-next-line babel/no-invalid-this */
    this.$nextTick(later);
  };
}
