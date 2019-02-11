<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'ivu-collapse';

export default {
  name: 'Collapse',

  props: {
    accordion: {
      default: false,
      type: Boolean,
    },
    value: {
      default: undefined,
      type: [Array, String],
    },
  },

  data() {
    return {
      currentValue: this.value,
    };
  },

  computed: {
    classes() {
      return `${prefixCls}`;
    },
  },

  watch: {
    currentValue() {
      this.setActive();
    },
    value(val) {
      this.currentValue = val;
    },
  },

  mounted() {
    this.setActive();
  },

  methods: {
    getActiveKey() {
      let activeKey = this.currentValue || [];
      const {accordion} = this;

      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey];
      }

      if (accordion && activeKey.length > 1) {
        activeKey = [activeKey[0]];
      }

      for (let i = 0; i < activeKey.length; i += 1) {
        activeKey[i] = activeKey[i].toString();
      }

      return activeKey;
    },
    setActive() {
      const activeKey = this.getActiveKey();

      this.$children.forEach((child, index) => {
        const name = child.name || index.toString();

        child.isActive = activeKey.indexOf(name) > -1;
        child.index = index;
      });
    },
    toggle(data) {
      const name = data.name.toString();
      let newActiveKey = [];

      if (this.accordion) {
        if (!data.isActive) {
          newActiveKey.push(name);
        }
      } else {
        const activeKey = this.getActiveKey();
        const nameIndex = activeKey.indexOf(name);

        if (data.isActive) {
          if (nameIndex > -1) {
            activeKey.splice(nameIndex, 1);
          }
        } else if (nameIndex < 0) {
          activeKey.push(name);
        }

        newActiveKey = activeKey;
      }

      this.currentValue = newActiveKey;
      this.$emit('input', newActiveKey);
      this.$emit('on-change', newActiveKey);
    },
  },
};
</script>
