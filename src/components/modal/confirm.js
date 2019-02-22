import Vue from 'vue';
import noop from 'lodash/noop';
import Button from 'Components/button';
import Locale from 'Src/mixins/locale';
import Modal from './modal.vue';

const prefixCls = 'ivu-modal-confirm';

Modal.newInstance = (properties) => {
  const props = properties || {};

  const Instance = new Vue({
    mixins: [Locale],

    data: {
      ...props,
      ...{
        body: '',
        buttonLoading: false,
        cancelText: undefined,
        closable: false,
        iconName: '',
        iconType: '',
        loading: false,
        okText: undefined,
        scrollable: false,
        showCancel: false,
        title: '',
        visible: false,
        width: 416,
      },
    },

    computed: {
      iconNameCls() {
        return ['ivu-icon', `ivu-icon-${this.iconName}`];
      },
      iconTypeCls() {
        return [`${prefixCls}-body-icon`, `${prefixCls}-body-icon-${this.iconType}`];
      },
      localeCancelText() {
        if (this.cancelText) {
          return this.cancelText;
        }

        return this.t('i.modal.cancelText');
      },
      localeOkText() {
        if (this.okText) {
          return this.okText;
        }

        return this.t('i.modal.okText');
      },
    },

    methods: {
      cancel() {
        this.$children[0].visible = false;
        this.buttonLoading = false;
        this.onCancel();
        this.remove();
      },
      destroy() {
        this.$destroy();
        document.body.removeChild(this.$el);
        this.onRemove();
      },
      ok() {
        if (this.loading) {
          this.buttonLoading = true;
        } else {
          this.$children[0].visible = false;
          this.remove();
        }

        this.onOk();
      },
      onCancel: noop,
      onOk: noop,
      onRemove: noop,
      remove() {
        setTimeout(() => {
          this.destroy();
        }, 300);
      },
    },

    render(h) {
      const footerVNodes = [];

      if (this.showCancel) {
        footerVNodes.push(
          h(
            Button,
            {
              on: {
                click: this.cancel,
              },
              props: {
                size: 'large',
                type: 'text',
              },
            },
            this.localeCancelText,
          ),
        );
      }

      footerVNodes.push(
        h(
          Button,
          {
            on: {
              click: this.ok,
            },
            props: {
              loading: this.buttonLoading,
              size: 'large',
              type: 'primary',
            },
          },
          this.localeOkText,
        ),
      );

      // render content
      let bodyRender;

      if (this.render) {
        bodyRender = h(
          'div',
          {
            attrs: {
              class: `${prefixCls}-body ${prefixCls}-body-render`,
            },
          },
          [this.render(h)],
        );
      } else {
        bodyRender = h(
          'div',
          {
            attrs: {
              class: `${prefixCls}-body`,
            },
          },
          [
            h(
              'div',
              {
                class: this.iconTypeCls,
              },
              [
                h('i', {
                  class: this.iconNameCls,
                }),
              ],
            ),
            h('div', {
              domProps: {
                innerHTML: this.body,
              },
            }),
          ],
        );
      }

      return h(
        Modal,
        {
          domProps: {
            value: this.visible,
          },
          on: {
            input: (status) => {
              this.visible = status;
            },
          },
          props: {
            ...props,
            ...{
              closable: this.closable,
              scrollable: this.scrollable,
              width: this.width,
            },
          },
        },
        [
          h(
            'div',
            {
              attrs: {
                class: prefixCls,
              },
            },
            [
              h(
                'div',
                {
                  attrs: {
                    class: `${prefixCls}-head`,
                  },
                },
                [
                  h('div', {
                    attrs: {
                      class: `${prefixCls}-head-title`,
                    },
                    domProps: {
                      innerHTML: this.title,
                    },
                  }),
                ],
              ),
              bodyRender,
              h(
                'div',
                {
                  attrs: {
                    class: `${prefixCls}-footer`,
                  },
                },
                footerVNodes,
              ),
            ],
          ),
        ],
      );
    },
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const modal = Instance.$children[0];

  return {
    component: modal,

    remove() {
      modal.visible = false;
      modal.$parent.buttonLoading = false;
      modal.$parent.remove();
    },

    show(showProps) {
      modal.$parent.showCancel = showProps.showCancel;
      modal.$parent.iconType = showProps.icon;

      switch (showProps.icon) {
        case 'info':
          modal.$parent.iconName = 'information-circled';
          break;

        case 'success':
          modal.$parent.iconName = 'checkmark-circled';
          break;

        case 'warning':
          modal.$parent.iconName = 'android-alert';
          break;

        case 'error':
          modal.$parent.iconName = 'close-circled';
          break;

        case 'confirm':
          modal.$parent.iconName = 'help-circled';
          break;

        default:
      }

      if ('width' in showProps) {
        modal.$parent.width = showProps.width;
      }

      if ('closable' in showProps) {
        modal.$parent.closable = showProps.closable;
      }

      if ('title' in showProps) {
        modal.$parent.title = showProps.title;
      }

      if ('content' in showProps) {
        modal.$parent.body = showProps.content;
      }

      if ('okText' in showProps) {
        modal.$parent.okText = showProps.okText;
      }

      if ('cancelText' in showProps) {
        modal.$parent.cancelText = showProps.cancelText;
      }

      if ('onCancel' in showProps) {
        modal.$parent.onCancel = showProps.onCancel;
      }

      if ('onOk' in showProps) {
        modal.$parent.onOk = showProps.onOk;
      }

      // async for ok
      if ('loading' in showProps) {
        modal.$parent.loading = showProps.loading;
      }

      if ('scrollable' in showProps) {
        modal.$parent.scrollable = showProps.scrollable;
      }

      // notice when component destroy
      modal.$parent.onRemove = showProps.onRemove;

      modal.visible = true;
    },
  };
};

export default Modal;
