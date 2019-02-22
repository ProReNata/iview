<template>
  <div :class="prefixCls">
    <tree-node
      v-for="(item, i) in stateTree"
      :key="i"
      :data="item"
      visible
      :multiple="multiple"
      :show-checkbox="showCheckbox"
      :children-key="childrenKey"
    >
    </tree-node>
    <div
      v-if="!stateTree.length"
      :class="[prefixCls + '-empty']"
    >
      {{ localeEmptyText }}
    </div>
  </div>
</template>

<script>
import stubArray from 'lodash/stubArray';
import Emitter from 'Src/mixins/emitter';
import Locale from 'Src/mixins/locale';
import TreeNode from './node.vue';

const prefixCls = 'ivu-tree';

export default {
  name: 'Tree',

  components: {TreeNode},

  mixins: [Emitter, Locale],

  props: {
    childrenKey: {
      default: 'children',
      type: String,
    },
    data: {
      default: stubArray,
      type: Array,
    },
    emptyText: {
      default: undefined,
      type: String,
    },
    loadData: {
      default: undefined,
      type: Function,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
    render: {
      default: undefined,
      type: Function,
    },
    showCheckbox: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      flatState: [],
      prefixCls,
      stateTree: this.data,
    };
  },

  computed: {
    localeEmptyText() {
      if (typeof this.emptyText === 'undefined') {
        return this.t('i.tree.emptyText');
      }

      return this.emptyText;
    },
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.stateTree = this.data;
        this.flatState = this.compileFlatState();
        this.rebuildTree();
      },
    },
  },

  created() {
    this.flatState = this.compileFlatState();
    this.rebuildTree();
  },

  mounted() {
    this.$on('on-check', this.handleCheck);
    this.$on('on-selected', this.handleSelect);
    this.$on('toggle-expand', (node) => this.$emit('on-toggle-expand', node));
  },

  methods: {
    compileFlatState() {
      // so we have always a relation parent/children of each node
      let keyCounter = 0;
      const {childrenKey} = this;
      const flatTree = [];
      function flattenChildren(node, parent) {
        node.nodeKey = keyCounter;
        keyCounter += 1;
        flatTree[node.nodeKey] = {node, nodeKey: node.nodeKey};

        if (typeof parent !== 'undefined') {
          flatTree[node.nodeKey].parent = parent.nodeKey;
          flatTree[parent.nodeKey][childrenKey].push(node.nodeKey);
        }

        if (node[childrenKey]) {
          flatTree[node.nodeKey][childrenKey] = [];
          node[childrenKey].forEach((child) => flattenChildren(child, node));
        }
      }

      this.stateTree.forEach((rootNode) => {
        flattenChildren(rootNode);
      });

      return flatTree;
    },
    getCheckedNodes() {
      /* public API */
      return this.flatState.filter((obj) => obj.node.checked).map((obj) => obj.node);
    },
    getSelectedNodes() {
      /* public API */
      return this.flatState.filter((obj) => obj.node.selected).map((obj) => obj.node);
    },

    handleCheck({checked, nodeKey}) {
      const {node} = this.flatState[nodeKey];
      this.$set(node, 'checked', checked);
      this.$set(node, 'indeterminate', false);

      this.updateTreeUp(nodeKey); // propagate up
      this.updateTreeDown(node, {checked, indeterminate: false}); // reset `indeterminate` when going down

      this.$emit('on-check-change', this.getCheckedNodes());
    },
    handleSelect(nodeKey) {
      const {node} = this.flatState[nodeKey];

      if (!this.multiple) {
        // reset previously selected node
        const currentSelectedKey = this.flatState.findIndex((obj) => obj.node.selected);

        if (currentSelectedKey >= 0 && currentSelectedKey !== nodeKey) {
          this.$set(this.flatState[currentSelectedKey].node, 'selected', false);
        }
      }

      this.$set(node, 'selected', !node.selected);

      this.$emit('on-select-change', this.getSelectedNodes());
    },
    rebuildTree() {
      // only called when `data` prop changes
      const checkedNodes = this.getCheckedNodes();
      checkedNodes.forEach((node) => {
        this.updateTreeDown(node, {checked: true});
        // propagate upwards
        const parentKey = this.flatState[node.nodeKey].parent;

        if (!parentKey && parentKey !== 0) {
          return;
        }

        const parent = this.flatState[parentKey].node;
        const childHasCheckSetter = typeof node.checked !== 'undefined' && node.checked;

        if (childHasCheckSetter && parent.checked !== node.checked) {
          this.updateTreeUp(node.nodeKey); // update tree upwards
        }
      });
    },
    updateTreeDown(node, changes = {}) {
      Object.keys(changes).forEach((key) => {
        this.$set(node, key, changes[key]);
      });

      if (node[this.childrenKey]) {
        node[this.childrenKey].forEach((child) => {
          this.updateTreeDown(child, changes);
        });
      }
    },
    updateTreeUp(nodeKey) {
      const parentKey = this.flatState[nodeKey].parent;

      if (typeof parentKey === 'undefined') {
        return;
      }

      const {node} = this.flatState[nodeKey];
      const parent = this.flatState[parentKey].node;

      if (node.checked === parent.checked && node.indeterminate === parent.indeterminate) {
        return;
      } // no need to update upwards

      if (node.checked === true) {
        this.$set(parent, 'checked', parent[this.childrenKey].every((childNode) => childNode.checked));
        this.$set(parent, 'indeterminate', !parent.checked);
      } else {
        this.$set(parent, 'checked', false);
        this.$set(
          parent,
          'indeterminate',
          parent[this.childrenKey].some((childNode) => childNode.checked || childNode.indeterminate),
        );
      }

      this.updateTreeUp(parentKey);
    },
  },
};
</script>
