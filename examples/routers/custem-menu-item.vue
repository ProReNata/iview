<template>
  <submenu :name="`${parentName}`">
    <template slot="title">
      <span>{{ parentItem.name }}</span>
    </template>
    <template v-for="item in children">
      <custom-menu-item
        v-if="item.children && item.children.length !== 0"
        :key="`menu-${item.name}`"
        :parent-item="item"
      >
      </custom-menu-item>
      <menu-item
        v-else
        :key="`menu-${item.name}`"
        :name="`${item.name}`"
      >
        {{ item.name }}
      </menu-item>
    </template>
  </submenu>
</template>

<script>
import stubObject from 'lodash/stubObject';

export default {
  name: 'CustomMenuItem',

  props: {
    iconSize: {
      default: undefined,
      type: Number,
    },
    parentItem: {
      default: stubObject,
      type: Object,
    },
    theme: {
      default: undefined,
      type: String,
    },
  },

  computed: {
    children() {
      return this.parentItem.children;
    },
    parentName() {
      return this.parentItem.name;
    },
  },
};
</script>
