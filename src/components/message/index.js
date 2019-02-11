import noop from 'lodash/noop';
import Notification from '../base/notification';

const prefixCls = 'ivu-message';
const iconPrefixCls = 'ivu-icon';
const prefixKey = 'ivu_message_key_';

const defaults = {
  duration: 1.5,
  top: 24,
};

let messageInstance;
let name = 1;

const iconTypes = {
  error: 'close-circled',
  info: 'information-circled',
  loading: 'load-c',
  success: 'checkmark-circled',
  warning: 'android-alert',
};

function getMessageInstance() {
  messageInstance =
    messageInstance ||
    Notification.newInstance({
      prefixCls,
      styles: {
        top: `${defaults.top}px`,
      },
    });

  return messageInstance;
}

function notice(content = '', duration = defaults.duration, type, onClose = noop, closable = false, render = noop) {
  const iconType = iconTypes[type];

  // if loading
  const loadCls = type === 'loading' ? ' ivu-load-loop' : '';

  const instance = getMessageInstance();

  instance.notice({
    closable,
    content: `
            <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
                <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType}${loadCls}"></i>
                <span>${content}</span>
            </div>
        `,
    duration,
    name: `${prefixKey}${name}`,
    onClose,
    render,
    styles: {},
    transitionName: 'move-up',
    type: 'message',
  });

  // 用于手动消除
  return (function iife() {
    const target = name;

    name += 1;

    return function _notice() {
      instance.remove(`${prefixKey}${target}`);
    };
  })();
}

export default {
  config(options) {
    if (options.top || options.top === 0) {
      defaults.top = options.top;
    }

    if (options.duration || options.duration === 0) {
      defaults.duration = options.duration;
    }
  },

  destroy() {
    const instance = getMessageInstance();
    messageInstance = null;
    instance.destroy('ivu-message');
  },
  error(options) {
    return this.message('error', options);
  },
  info(options) {
    return this.message('info', options);
  },
  loading(options) {
    return this.message('loading', options);
  },
  message(type, opts) {
    let options = opts;

    if (typeof options === 'string') {
      options = {
        content: options,
      };
    }

    return notice(options.content, options.duration, type, options.onClose, options.closable, options.render);
  },
  name: 'Message',
  success(options) {
    return this.message('success', options);
  },
  warning(options) {
    return this.message('warning', options);
  },
};
