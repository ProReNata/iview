<template>
  <div
    ref="cell"
    :class="classes"
  >
    <template v-if="renderType === 'index'">
      <span>{{ naturalIndex + 1 }}</span>
    </template>
    <template v-if="renderType === 'selection'">
      <checkbox
        :value="checked"
        :disabled="disabled"
        @click.native.stop="handleClick"
        @on-change="toggleSelect"
      >
      </checkbox>
    </template>
    <template v-if="renderType === 'html'">
      <!-- eslint-disable vue/no-v-html -->
      <span v-html="row[column.key]">
      </span>
      <!-- eslint-enable vue/no-v-html -->
    </template>
    <template v-if="renderType === 'normal'">
      <span>{{ row[column.key] }}</span>
    </template>
    <template v-if="renderType === 'expand' && !row._disableExpand">
      <div
        :class="expandCls"
        @click="toggleExpand"
      >
        <icon type="ios-arrow-right">
        </icon>
      </div>
    </template>
    <cell
      v-if="renderType === 'render'"
      :row="row"
      :column="column"
      :index="index"
      :render="column.render"
    >
    </cell>
  </div>
</template>

<script>
import noop from 'lodash/noop';
import Cell from './expand';
import Icon from '../icon/icon.vue';
import Checkbox from '../checkbox/checkbox.vue';

export default {
  name: 'TableCell',

  components: {Cell, Checkbox, Icon},

  props: {
    checked: {
      default: false,
      type: Boolean,
    },
    column: {
      default: undefined,
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    expanded: {
      default: false,
      type: Boolean,
    },
    fixed: {
      default: false,
      type: [Boolean, String],
    },
    // _index of data
    index: {
      default: undefined,
      type: Number,
    },
    // index of rebuildData
    naturalIndex: {
      default: undefined,
      type: Number,
    },
    prefixCls: {
      default: undefined,
      type: String,
    },
    row: {
      default: undefined,
      type: Object,
    },
  },

  data() {
    return {
      context: this.$parent.$parent.$parent.currentContext,
      renderType: '',
      uid: -1,
    };
  },

  computed: {
    classes() {
      return [
        `${this.prefixCls}-cell`,
        {
          [`${this.prefixCls}-hidden`]:
            !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
          [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis || false,
          [`${this.prefixCls}-cell-with-expand`]: this.renderType === 'expand',
        },
      ];
    },
    expandCls() {
      return [
        `${this.prefixCls}-cell-expand`,
        {
          [`${this.prefixCls}-cell-expand-expanded`]: this.expanded,
        },
      ];
    },
  },

  created() {
    if (this.column.type === 'index') {
      this.renderType = 'index';
    } else if (this.column.type === 'selection') {
      this.renderType = 'selection';
    } else if (this.column.type === 'html') {
      this.renderType = 'html';
    } else if (this.column.type === 'expand') {
      this.renderType = 'expand';
    } else if (this.column.render) {
      this.renderType = 'render';
    } else {
      this.renderType = 'normal';
    }
  },

  methods: {
    handleClick: noop,
    // handleClick() {
    //   // 放置 Checkbox 冒泡
    // },
    toggleExpand() {
      this.$parent.$parent.$parent.toggleExpand(this.index);
    },
    toggleSelect() {
      this.$parent.$parent.$parent.toggleSelect(this.index);
    },
  },
};
</script>
