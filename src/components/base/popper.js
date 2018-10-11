/**
 * https://github.com/freeze-component/vue-popper
 * */
import Vue from 'vue';
import noop from 'lodash/noop';
import has from 'lodash/has';

const isServer = Vue.prototype.$isServer;
const Popper = isServer ? noop : require('popper.js/dist/umd/popper.js');

export default {
  beforeDestroy() {
    if (isServer) {
      return;
    }

    if (this.popperJS) {
      this.popperJS.destroy();
    }
  },
  data() {
    return {
      visible: this.value,
    };
  },
  methods: {
    createPopper() {
      if (isServer) {
        return;
      }

      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
        return;
      }

      const {options} = this;
      const popper = this.popper || this.$refs.popper;
      const reference = this.reference || this.$refs.reference;

      if (!popper || !reference) {
        return;
      }

      if (this.popperJS && has(this.popperJS, 'destroy')) {
        this.popperJS.destroy();
      }

      options.placement = this.placement;

      if (!options.modifiers.offset) {
        options.modifiers.offset = {};
      }

      options.modifiers.offset.offset = this.offset;
      options.onCreate = () => {
        this.$nextTick(this.updatePopper);
        this.$emit('created', this);
      };

      this.popperJS = new Popper(reference, popper, options);
    },
    doDestroy() {
      if (isServer) {
        return;
      }

      if (this.visible) {
        return;
      }

      this.popperJS.destroy();
      this.popperJS = null;
    },
    updatePopper() {
      if (isServer) {
        return;
      }

      this.popperJS ? this.popperJS.update() : this.createPopper();
    },
  },
  props: {
    boundariesPadding: {
      default: 5,
      type: Number,
    },
    offset: {
      default: 0,
    },
    // visible: {
    //     type: Boolean,
    //     default: false
    // }
    options: {
      default() {
        return {
          modifiers: {
            computeStyle: {
              gpuAcceleration: false,
            },
            preventOverflow: {
              boundariesElement: 'window',
            },
          },
        };
      },
      type: Object,
    },
    placement: {
      default: 'bottom',
      type: String,
    },
    popper: Object,
    reference: Object,
    transition: String,
    value: {
      default: false,
      type: Boolean,
    },
  },
  updated() {
    this.$nextTick(() => this.updatePopper());
  },
  watch: {
    value: {
      handler(val) {
        this.visible = val;
        this.$emit('input', val);
      },
      immediate: true,
    },
    visible(val) {
      if (val) {
        this.updatePopper();
        this.$emit('on-popper-show');
      } else {
        this.$emit('on-popper-hide');
      }

      this.$emit('input', val);
    },
  },
};
