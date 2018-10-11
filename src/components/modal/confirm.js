import Vue from 'vue';
import noop from 'lodash/noop';
import Modal from './modal.vue';
import Button from '../button/button.vue';
import Locale from '../../mixins/locale';

const prefixCls = 'ivu-modal-confirm';

Modal.newInstance = (properties) => {
  const _props = properties || {};

  const Instance = new Vue({
    mixins: [Locale],
    data: {
      ..._props,
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
      let body_render;

      if (this.render) {
        body_render = h(
          'div',
          {
            attrs: {
              class: `${prefixCls}-body ${prefixCls}-body-render`,
            },
          },
          [this.render(h)],
        );
      } else {
        body_render = h(
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
            ..._props,
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
              body_render,
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
    show(props) {
      modal.$parent.showCancel = props.showCancel;
      modal.$parent.iconType = props.icon;

      switch (props.icon) {
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

      if ('width' in props) {
        modal.$parent.width = props.width;
      }

      if ('closable' in props) {
        modal.$parent.closable = props.closable;
      }

      if ('title' in props) {
        modal.$parent.title = props.title;
      }

      if ('content' in props) {
        modal.$parent.body = props.content;
      }

      if ('okText' in props) {
        modal.$parent.okText = props.okText;
      }

      if ('cancelText' in props) {
        modal.$parent.cancelText = props.cancelText;
      }

      if ('onCancel' in props) {
        modal.$parent.onCancel = props.onCancel;
      }

      if ('onOk' in props) {
        modal.$parent.onOk = props.onOk;
      }

      // async for ok
      if ('loading' in props) {
        modal.$parent.loading = props.loading;
      }

      if ('scrollable' in props) {
        modal.$parent.scrollable = props.scrollable;
      }

      // notice when component destroy
      modal.$parent.onRemove = props.onRemove;

      modal.visible = true;
    },
  };
};

export default Modal;
