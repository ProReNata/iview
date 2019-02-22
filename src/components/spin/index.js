import Vue from 'vue';
import Spin from './spin';

let spinInstance;

function getSpinInstance(render = undefined) {
  spinInstance =
    spinInstance ||
    Spin.newInstance({
      render,
    });

  return spinInstance;
}

function loading(options) {
  const render = 'render' in options ? options.render : undefined;
  const instance = getSpinInstance(render);

  instance.show(options);
}

Spin.show = function _show(props = {}) {
  return loading(props);
};

Spin.hide = function _hide() {
  if (!spinInstance) {
    return;
  }

  const instance = getSpinInstance();

  instance.remove(() => {
    spinInstance = null;
  });
};

Vue.prototype.$Spin = Spin;

export default Spin;
