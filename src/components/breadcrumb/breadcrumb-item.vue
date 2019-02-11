<template>
  <span>
    <a
      v-if="to || href"
      :class="linkClasses"
      @click="handleClick"
    >
      <slot></slot>
    </a>
    <span
      v-else
      :class="linkClasses"
    >
      <slot></slot>
    </span>
    <!-- eslint-disable vue/no-v-html -->
    <span
      v-if="!showSeparator"
      :class="separatorClasses"
      v-html="separator"
    >
    </span>
    <!-- eslint-enable vue/no-v-html -->
    <span
      v-else
      :class="separatorClasses"
    >
      <slot name="separator">
      </slot>
    </span>
  </span>
</template>

<script>
// todo 3.0 时废弃 href
const prefixCls = 'ivu-breadcrumb-item';

export default {
  name: 'BreadcrumbItem',

  props: {
    href: {
      default: undefined,
      type: [Object, String],
    },
    replace: {
      default: false,
      type: Boolean,
    },
    to: {
      default: undefined,
      type: [Object, String],
    },
  },

  data() {
    return {
      separator: '',
      showSeparator: false,
    };
  },

  computed: {
    linkClasses() {
      return `${prefixCls}-link`;
    },
    separatorClasses() {
      return `${prefixCls}-separator`;
    },
  },

  mounted() {
    this.showSeparator = typeof this.$slots.separator !== 'undefined';
  },

  methods: {
    handleClick() {
      // const isRoute = this.$router;

      if (this.replace) {
        if (this.replace) {
          this.$router.replace(this.to || this.href);
        } else {
          this.$router.push(this.to || this.href);
        }
      } else {
        window.location.href = this.to || this.href;
      }
    },
  },
};
</script>
