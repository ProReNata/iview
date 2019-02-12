const easeInOutQuart = function _easeInOutQuart(t) {
  if (t < 0.5) {
    return 8 * t ** 4;
  }

  const u = t - 1;

  return 1 - 8 * u ** 4;
};

export default function scroll(el, container, diff, duration, done) {
  const start = Date.now();
  const startingY = container.scrollTop;
  let stopScroll = false;
  const stop = function _stop() {
    stopScroll = true;
  };

  const step = function _step() {
    if (stopScroll) {
      return;
    }

    const now = Date.now();
    const elapsed = now - start;
    const percent = easeInOutQuart(Math.min(elapsed / duration, 1));
    const newScrollTop = startingY + diff * percent;

    if (elapsed <= duration && newScrollTop !== startingY) {
      container.scrollTop = newScrollTop;
      window.requestAnimationFrame(step);
    } else if (done) {
      if (container.scrollTop > el.offsetTop) {
        container.scrollTop = el.offsetTop;
      }

      done(diff);
    }
  };

  window.requestAnimationFrame(step);

  return {stop};
}
