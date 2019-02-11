/**
 * Created by aresn on 16/6/20.
 */
import '@babel/polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import iView from '../src/index';
import locale from '../src/locale/lang/en-US';
// import locale from '../src/locale/lang/zh-CN';

Vue.use(VueRouter);
Vue.use(iView, {locale});

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
  esModule: false,
  routes: [
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/layout.vue'], resolve),
      path: '/layout',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/affix.vue'], resolve),
      path: '/affix',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/grid.vue'], resolve),
      path: '/grid',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/button.vue'], resolve),
      path: '/button',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/input.vue'], resolve),
      path: '/input',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/radio.vue'], resolve),
      path: '/radio',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/checkbox.vue'], resolve),
      path: '/checkbox',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/steps.vue'], resolve),
      path: '/steps',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/timeline.vue'], resolve),
      path: '/timeline',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/switch.vue'], resolve),
      path: '/switch',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/alert.vue'], resolve),
      path: '/alert',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/badge.vue'], resolve),
      path: '/badge',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/tag.vue'], resolve),
      path: '/tag',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/input-number.vue'], resolve),
      path: '/input-number',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/upload.vue'], resolve),
      path: '/upload',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/progress.vue'], resolve),
      path: '/progress',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/collapse.vue'], resolve),
      path: '/collapse',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/carousel.vue'], resolve),
      path: '/carousel',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/card.vue'], resolve),
      path: '/card',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/tree.vue'], resolve),
      path: '/tree',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/rate.vue'], resolve),
      path: '/rate',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/circle.vue'], resolve),
      path: '/circle',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/tabs.vue'], resolve),
      path: '/tabs',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/tooltip.vue'], resolve),
      path: '/tooltip',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/poptip.vue'], resolve),
      path: '/poptip',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/slider.vue'], resolve),
      path: '/slider',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/dropdown.vue'], resolve),
      path: '/dropdown',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/breadcrumb.vue'], resolve),
      path: '/breadcrumb',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/menu.vue'], resolve),
      path: '/menu',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/spin.vue'], resolve),
      path: '/spin',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/cascader.vue'], resolve),
      path: '/cascader',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/select.vue'], resolve),
      path: '/select',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/back-top.vue'], resolve),
      path: '/backtop',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/page.vue'], resolve),
      path: '/page',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/transfer.vue'], resolve),
      path: '/transfer',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/date.vue'], resolve),
      path: '/date',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/form.vue'], resolve),
      path: '/form',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/table.vue'], resolve),
      path: '/table',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/loading-bar.vue'], resolve),
      path: '/loading-bar',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/modal.vue'], resolve),
      path: '/modal',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/message.vue'], resolve),
      path: '/message',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/notice.vue'], resolve),
      path: '/notice',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/avatar.vue'], resolve),
      path: '/avatar',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/color-picker.vue'], resolve),
      path: '/color-picker',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/auto-complete.vue'], resolve),
      path: '/auto-complete',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/scroll.vue'], resolve),
      path: '/scroll',
    },
    {
      /* eslint-disable-next-line import/no-dynamic-require,global-require */
      component: (resolve) => require(['./routers/richtext.vue'], resolve),
      path: '/richtext',
    },
  ],
});

export default new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
