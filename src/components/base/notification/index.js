import Vue from 'vue';
import Notification from './notification.vue';

Notification.newInstance = (properties) => {
  const props = properties || {};

  const Instance = new Vue({
    render(h) {
      return h(Notification, {
        props,
      });
    },
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const notification = Instance.$children[0];

  return {
    component: notification,
    destroy(element) {
      notification.closeAll();
      setTimeout(() => {
        document.body.removeChild(document.getElementsByClassName(element)[0]);
      }, 500);
    },
    notice(noticeProps) {
      notification.add(noticeProps);
    },
    remove(name) {
      notification.close(name);
    },
  };
};

export default Notification;
