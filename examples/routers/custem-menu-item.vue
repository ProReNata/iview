<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <span>{{ parentItem.name }}</span>
    </template>
    <template v-for="item in children">
      <custem-menu-item
        v-if="item.children && item.children.length !== 0"
        :key="`menu-${item.name}`"
        :parent-item="item"
      >
      </custem-menu-item>
      <menu-item
        v-else
        :key="`menu-${item.name}`"
        :name="`${item.name}`"
      >
        {{ item.name }}
      </menu-item>
    </template>
  </Submenu>
</template>
<script>
import stubObject from 'lodash/stubObject';

export default {
  name: 'custemMenuItem',
  props: {
    iconSize: Number,
    parentItem: {
      default: stubObject,
      type: Object,
    },
    theme: String,
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
