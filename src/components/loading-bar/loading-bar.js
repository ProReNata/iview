import Vue from 'vue';
import LoadingBar from './loading-bar.vue';

LoadingBar.newInstance = (properties) => {
  const props = properties || {};

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(LoadingBar, {
        props,
      });
    },
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const loadingBar = Instance.$children[0];

  return {
    component: loadingBar,
    destroy() {
      document.body.removeChild(document.getElementsByClassName('ivu-loading-bar')[0]);
    },
    update(options) {
      if ('percent' in options) {
        loadingBar.percent = options.percent;
      }

      if (options.status) {
        loadingBar.status = options.status;
      }

      if ('show' in options) {
        loadingBar.show = options.show;
      }
    },
  };
};

export default LoadingBar;
