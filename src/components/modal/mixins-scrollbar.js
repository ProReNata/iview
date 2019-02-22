// used for Modal & $Spin
import {getScrollBarSize} from 'Src/utils/assist';

export default {
  methods: {
    addScrollEffect() {
      this.checkScrollBar();
      this.setScrollBar();
      document.body.style.overflow = 'hidden';
    },
    checkMaskInVisible() {
      const masks = document.getElementsByClassName('ivu-modal-mask') || [];

      return Array.from(masks).every((m) => m.style.display === 'none' || m.classList.contains('fade-leave-to'));
    },
    checkScrollBar() {
      let fullWindowWidth = window.innerWidth;

      if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        const documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
      }

      this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;

      if (this.bodyIsOverflowing) {
        this.scrollBarWidth = getScrollBarSize();
      }
    },
    removeScrollEffect() {
      if (this.checkMaskInVisible()) {
        document.body.style.overflow = '';
        this.resetScrollBar();
      }
    },
    resetScrollBar() {
      document.body.style.paddingRight = '';
    },
    setScrollBar() {
      if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
        document.body.style.paddingRight = `${this.scrollBarWidth}px`;
      }
    },
  },
};
