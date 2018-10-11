import Emitter from '../../mixins/emitter';
import handleEscapeMixin from './handleEscapeMixin';
import {getTouches} from './utils';
import {on, off} from '../../utils/dom';

export default {
  beforeDestroy() {
    this.unbindEventListeners();
  },

  created() {
    if (this.focused) {
      setTimeout(() => this.$el.focus(), 1);
    }
  },

  methods: {
    getLeft(e) {
      const {container} = this.$refs;
      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const pageX = e.pageX || getTouches(e, 'PageX');

      return pageX - xOffset;
    },
    getTop(e) {
      const {container} = this.$refs;
      const yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      const pageY = e.pageY || getTouches(e, 'PageY');

      return pageY - yOffset;
    },
    handleDown(e) {
      this.handleSlide(e, this.down, 'down');
    },
    handleLeft(e) {
      this.handleSlide(e, this.left, 'left');
    },
    handleMouseDown(e) {
      this.dispatch('ColorPicker', 'on-dragging', true);
      this.handleChange(e, true);
      // window.addEventListener('mousemove', this.handleChange, false);
      // window.addEventListener('mouseup', this.handleMouseUp, false);
      on(window, 'mousemove', this.handleChange);
      on(window, 'mouseup', this.handleMouseUp);
    },
    handleMouseUp() {
      this.unbindEventListeners();
    },
    handleRight(e) {
      this.handleSlide(e, this.right, 'right');
    },
    handleUp(e) {
      this.handleSlide(e, this.up, 'up');
    },
    unbindEventListeners() {
      // window.removeEventListener('mousemove', this.handleChange);
      // window.removeEventListener('mouseup', this.handleMouseUp);
      off(window, 'mousemove', this.handleChange);
      off(window, 'mouseup', this.handleMouseUp);
      // This timeout is required so that the click handler for click-outside
      // has the chance to run before the mouseup removes the dragging flag.
      setTimeout(() => this.dispatch('ColorPicker', 'on-dragging', false), 1);
    },
  },

  mixins: [Emitter, handleEscapeMixin],

  props: {
    focused: {
      default: false,
      type: Boolean,
    },
    value: {
      default: undefined,
      type: Object,
    },
  },
};
