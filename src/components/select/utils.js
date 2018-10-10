export default function debounce(fn) {
  let waiting;

  return function(...args) {
    if (waiting) {
      return;
    }

    waiting = true;
    const context = this;
    const later = function() {
      waiting = false;
      fn.apply(context, args);
    };

    this.$nextTick(later);
  };
}
