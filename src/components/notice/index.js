import noop from 'lodash/noop';
import Notification from '../base/notification';

const prefixCls = 'ivu-notice';
const iconPrefixCls = 'ivu-icon';
const prefixKey = 'ivu_notice_key_';

let top = 24;
let defaultDuration = 4.5;
let noticeInstance;
let name = 1;

const iconTypes = {
  error: 'close-circled',
  info: 'information-circled',
  success: 'checkmark-circled',
  warning: 'android-alert',
};

function getNoticeInstance() {
  noticeInstance =
    noticeInstance ||
    Notification.newInstance({
      prefixCls,
      styles: {
        right: 0,
        top: `${top}px`,
      },
    });

  return noticeInstance;
}

function notice(type, options) {
  const title = options.title || '';
  const desc = options.desc || '';
  const noticeKey = options.name || `${prefixKey}${name}`;
  const onClose = options.onClose || noop;

  const render = options.render;
  // todo const btn = options.btn || null;
  const duration = options.duration === 0 ? 0 : options.duration || defaultDuration;

  name++;

  const instance = getNoticeInstance();

  let content;

  let withIcon;

  const with_desc = options.render && !title ? '' : desc || options.render ? ` ${prefixCls}-with-desc` : '';

  if (type === 'normal') {
    withIcon = false;
    content = `
            <div class="${prefixCls}-custom-content ${prefixCls}-with-normal ${with_desc}">
                <div class="${prefixCls}-title">${title}</div>
                <div class="${prefixCls}-desc">${desc}</div>
            </div>
        `;
  } else {
    const iconType = iconTypes[type];
    withIcon = true;
    content = `
            <div class="${prefixCls}-custom-content ${prefixCls}-with-icon ${prefixCls}-with-${type} ${with_desc}">
                <span class="${prefixCls}-icon ${prefixCls}-icon-${type}">
                    <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType}"></i>
                </span>
                <div class="${prefixCls}-title">${title}</div>
                <div class="${prefixCls}-desc">${desc}</div>
            </div>
        `;
  }

  instance.notice({
    closable: true,
    content,
    duration,
    hasTitle: !!title,
    name: noticeKey.toString(),
    onClose,
    render,
    styles: {},
    transitionName: 'move-notice',
    type: 'notice',
    withIcon,
  });
}

export default {
  close(name) {
    if (name) {
      name = name.toString();

      if (noticeInstance) {
        noticeInstance.remove(name);
      }
    } else {
      return false;
    }
  },
  config(options) {
    if (options.top) {
      top = options.top;
    }

    if (options.duration || options.duration === 0) {
      defaultDuration = options.duration;
    }
  },
  destroy() {
    const instance = getNoticeInstance();
    noticeInstance = null;
    instance.destroy('ivu-notice');
  },
  error(options) {
    return notice('error', options);
  },
  info(options) {
    return notice('info', options);
  },
  open(options) {
    return notice('normal', options);
  },
  success(options) {
    return notice('success', options);
  },
  warning(options) {
    return notice('warning', options);
  },
};
