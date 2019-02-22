<template>
  <ul
    :class="classes"
    :style="styles"
  >
    <slot></slot>
  </ul>
</template>

<script>
import stubArray from 'lodash/stubArray';
import isOneOf from 'Global/Assets/isOneOf';
import {findComponentsDownward, findComponentsUpward} from 'Src/utils/assist';
import Emitter from 'Src/mixins/emitter';

const prefixCls = 'ivu-menu';

export default {
  name: 'Menu',

  mixins: [Emitter],

  props: {
    accordion: {
      default: false,
      type: Boolean,
    },
    activeName: {
      default: undefined,
      type: [String, Number],
    },
    mode: {
      default: 'vertical',
      type: String,
      validator(value) {
        return isOneOf(value, ['horizontal', 'vertical']);
      },
    },
    openNames: {
      default: stubArray,
      type: Array,
    },
    theme: {
      default: 'light',
      type: String,
      validator(value) {
        return isOneOf(value, ['light', 'dark', 'primary']);
      },
    },
    width: {
      default: '240px',
      type: String,
    },
  },
  data() {
    return {
      currentActiveName: this.activeName,
      openedNames: [],
    };
  },
  computed: {
    classes() {
      let {theme} = this;

      if (this.mode === 'vertical' && this.theme === 'primary') {
        theme = 'light';
      }

      return [
        `${prefixCls}`,
        `${prefixCls}-${theme}`,
        {
          [`${prefixCls}-${this.mode}`]: this.mode,
        },
      ];
    },
    styles() {
      const style = {};

      if (this.mode === 'vertical') {
        style.width = this.width;
      }

      return style;
    },
  },
  watch: {
    activeName(val) {
      this.currentActiveName = val;
    },
    currentActiveName() {
      this.updateActiveName();
    },
    openNames(names) {
      this.openedNames = names;
    },
  },
  mounted() {
    this.updateActiveName();
    this.openedNames = [...this.openNames];
    this.updateOpened();
    this.$on('on-menu-item-select', (name) => {
      this.currentActiveName = name;
      this.$emit('on-select', name);
    });
  },
  methods: {
    updateActiveName() {
      if (this.currentActiveName === undefined) {
        this.currentActiveName = -1;
      }

      this.broadcast('Submenu', 'on-update-active-name', false);
      this.broadcast('MenuItem', 'on-update-active-name', this.currentActiveName);
    },
    updateOpened() {
      const items = findComponentsDownward(this, 'Submenu');

      if (items.length) {
        items.forEach((item) => {
          item.opened = this.openedNames.indexOf(item.name) > -1;
        });
      }
    },
    updateOpenKeys(name) {
      const names = [...this.openedNames];
      const index = names.indexOf(name);

      if (this.accordion) {
        findComponentsDownward(this, 'Submenu').forEach((item) => {
          item.opened = false;
        });
      }

      if (index >= 0) {
        let currentSubmenu = null;
        findComponentsDownward(this, 'Submenu').forEach((item) => {
          if (item.name === name) {
            currentSubmenu = item;
            item.opened = false;
          }
        });
        findComponentsUpward(currentSubmenu, 'Submenu').forEach((item) => {
          item.opened = true;
        });
        findComponentsDownward(currentSubmenu, 'Submenu').forEach((item) => {
          item.opened = false;
        });
      } else if (this.accordion) {
        let currentSubmenu = null;
        findComponentsDownward(this, 'Submenu').forEach((item) => {
          if (item.name === name) {
            currentSubmenu = item;
            item.opened = true;
          }
        });
        findComponentsUpward(currentSubmenu, 'Submenu').forEach((item) => {
          item.opened = true;
        });
      } else {
        findComponentsDownward(this, 'Submenu').forEach((item) => {
          if (item.name === name) {
            item.opened = true;
          }
        });
      }

      const openedNames = findComponentsDownward(this, 'Submenu')
        .filter((item) => item.opened)
        .map((item) => item.name);
      this.openedNames = [...openedNames];
      this.$emit('on-open-change', openedNames);
    },
  },
};
</script>
