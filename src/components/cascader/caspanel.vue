<template>
  <span>
    <ul
      v-if="data && data.length"
      :class="[prefixCls + '-menu']"
    >
      <casitem
        v-for="item in data"
        :key="getKey(item)"
        :prefix-cls="prefixCls"
        :data="item"
        :tmp-item="tmpItem"
        @click.native.stop="handleClickItem(item)"
        @mouseenter.native.stop="handleHoverItem(item)"
      >
      </casitem>
    </ul>
    <caspanel
      v-if="sublist && sublist.length"
      :prefix-cls="prefixCls"
      :data="sublist"
      :disabled="disabled"
      :trigger="trigger"
      :change-on-select="changeOnSelect"
    >
    </caspanel>
  </span>
</template>

<script>
import stubArray from 'lodash/stubArray';
import Casitem from './casitem.vue';
import Emitter from '../../mixins/emitter';
import {findComponentUpward, findComponentDownward} from '../../utils/assist';

let key = 1;

export default {
  name: 'Caspanel',

  components: {Casitem},

  mixins: [Emitter],

  props: {
    changeOnSelect: Boolean,
    data: {
      default: stubArray,
      type: Array,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    prefixCls: {
      default: undefined,
      type: String,
    },
    trigger: {
      default: undefined,
      type: String,
    },
  },

  data() {
    return {
      result: [],
      sublist: [],
      tmpItem: {},
    };
  },

  watch: {
    data() {
      this.sublist = [];
    },
  },

  mounted() {
    this.$on('on-find-selected', (params) => {
      const val = params.value;
      const value = [...val];
      for (let i = 0; i < value.length; i += 1) {
        for (let j = 0; j < this.data.length; j += 1) {
          if (value[i] === this.data[j].value) {
            this.handleTriggerItem(this.data[j], true);
            value.splice(0, 1);
            this.$nextTick(() => {
              this.broadcast('Caspanel', 'on-find-selected', {
                value,
              });
            });

            return;
          }
        }
      }
    });
    // deep for #1553
    this.$on('on-clear', (deep = false) => {
      this.sublist = [];
      this.tmpItem = {};

      if (deep) {
        const Caspanel = findComponentDownward(this, 'Caspanel');

        if (Caspanel) {
          Caspanel.$emit('on-clear', true);
        }
      }
    });
  },

  methods: {
    emitUpdate(result) {
      if (this.$parent.$options.name === 'Caspanel') {
        this.$parent.updateResult(result);
      } else {
        this.$parent.$parent.updateResult(result);
      }
    },
    getBaseItem(item) {
      const backItem = {...item};

      if (backItem.children) {
        delete backItem.children;
      }

      return backItem;
    },
    getKey() {
      const value = key;

      key += 1;

      return value;
    },
    handleClickItem(item) {
      if (this.trigger !== 'click' && item.children && item.children.length) {
        return;
      } // #1922

      this.handleTriggerItem(item, false, true);
    },
    handleHoverItem(item) {
      if (this.trigger !== 'hover' || !item.children || !item.children.length) {
        return;
      } // #1922

      this.handleTriggerItem(item, false, true);
    },
    handleTriggerItem(item, fromInit = false, fromUser = false) {
      if (item.disabled) {
        return;
      }

      if (item.loading !== undefined && !item.children.length) {
        const cascader = findComponentUpward(this, 'Cascader');

        if (cascader && cascader.loadData) {
          cascader.loadData(item, () => {
            // todo
            if (fromUser) {
              cascader.isLoadedChildren = true;
            }

            if (item.children.length) {
              this.handleTriggerItem(item);
            }
          });

          return;
        }
      }

      // return value back recursion  // 向上递归，设置临时选中值（并非真实选中）
      const backItem = this.getBaseItem(item);
      this.tmpItem = backItem;
      this.emitUpdate([backItem]);

      if (item.children && item.children.length) {
        this.sublist = item.children;
        this.dispatch('Cascader', 'on-result-change', {
          changeOnSelect: this.changeOnSelect,
          fromInit,
          lastValue: false,
        });

        // #1553
        if (this.changeOnSelect) {
          const Caspanel = findComponentDownward(this, 'Caspanel');

          if (Caspanel) {
            Caspanel.$emit('on-clear', true);
          }
        }
      } else {
        this.sublist = [];
        this.dispatch('Cascader', 'on-result-change', {
          changeOnSelect: this.changeOnSelect,
          fromInit,
          lastValue: true,
        });
      }
    },
    updateResult(item) {
      this.result = [this.tmpItem].concat(item);
      this.emitUpdate(this.result);
    },
  },
};
</script>
