import Vue from 'vue';
import Modal from './confirm';

let modalInstance;

function getModalInstance(render = undefined) {
  modalInstance =
    modalInstance ||
    Modal.newInstance({
      closable: false,
      footerHide: true,
      maskClosable: false,
      render,
    });

  return modalInstance;
}

function confirm(options) {
  const render = 'render' in options ? options.render : undefined;
  const instance = getModalInstance(render);

  options.onRemove = function _onRemove() {
    modalInstance = null;
  };

  instance.show(options);
}

Modal.info = function _info(props = {}) {
  props.icon = 'info';
  props.showCancel = false;

  return confirm(props);
};

Modal.success = function _success(props = {}) {
  props.icon = 'success';
  props.showCancel = false;

  return confirm(props);
};

Modal.warning = function _warning(props = {}) {
  props.icon = 'warning';
  props.showCancel = false;

  return confirm(props);
};

Modal.error = function _error(props = {}) {
  props.icon = 'error';
  props.showCancel = false;

  return confirm(props);
};

Modal.confirm = function _confirm(props = {}) {
  props.icon = 'confirm';
  props.showCancel = true;

  return confirm(props);
};

Modal.remove = function _remove() {
  if (!modalInstance) {
    // at loading status, remove after Cancel
    return;
  }

  const instance = getModalInstance();

  instance.remove();
};

Vue.prototype.$Modal = Modal;

export default Modal;
