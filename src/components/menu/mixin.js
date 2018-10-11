import {findComponentUpward, findComponentsUpward} from '../../utils/assist';

export default {
  computed: {
    hasParentSubmenu() {
      return !!findComponentUpward(this, 'Submenu');
    },
    mode() {
      return this.menu.mode;
    },
    parentSubmenuNum() {
      return findComponentsUpward(this, 'Submenu').length;
    },
  },
  data() {
    return {
      menu: findComponentUpward(this, 'Menu'),
    };
  },
};
