import Vue from 'vue';
import Spin from './spin.vue';

Spin.newInstance = (properties) => {
  const props = properties || {};

  const Instance = new Vue({
    data: {...props},
    render(h) {
      let vnode = '';

      if (this.render) {
        vnode = h(
          Spin,
          {
            props: {
              fix: {
                default: true,
                type: Boolean,
              },
              fullscreen: {
                default: true,
                type: Boolean,
              },
            },
          },
          [this.render(h)],
        );
      } else {
        vnode = h(Spin, {
          props: {
            fix: {
              default: true,
              type: Boolean,
            },
            fullscreen: {
              default: true,
              type: Boolean,
            },
            size: {
              default: 'large',
              type: String,
            },
          },
        });
      }

      return h(
        'div',
        {
          class: 'ivu-spin-fullscreen ivu-spin-fullscreen-wrapper',
        },
        [vnode],
      );
    },
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const spin = Instance.$children[0];

  return {
    component: spin,
    remove(cb) {
      spin.visible = false;
      setTimeout(() => {
        spin.$parent.$destroy();

        if (document.getElementsByClassName('ivu-spin-fullscreen')[0] !== undefined) {
          document.body.removeChild(document.getElementsByClassName('ivu-spin-fullscreen')[0]);
        }

        cb();
      }, 500);
    },
    show() {
      spin.visible = true;
    },
  };
};

export default Spin;
