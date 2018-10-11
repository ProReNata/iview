<template>
  <div 
    :class="classes" 
    :style="listStyle"
  >
    <div :class="prefixCls + '-header'">
      <Checkbox 
        :value="checkedAll" 
        :disabled="checkedAllDisabled" 
        @on-change="toggleSelectAll"
      >
      </Checkbox>
      <span 
        :class="prefixCls + '-header-title'" 
        @click="toggleSelectAll(!checkedAll)"
      >
        {{ title }}
      </span>
      <span :class="prefixCls + '-header-count'">
        {{ count }}
      </span>
    </div>
    <div :class="bodyClasses">
      <div 
        v-if="filterable" 
        :class="prefixCls + '-body-search-wrapper'"
      >
        <Search
          :prefix-cls="prefixCls + '-search'"
          :query="query"
          :placeholder="filterPlaceholder"
          @on-query-clear="handleQueryClear"
          @on-query-change="handleQueryChange"
        >
        </Search>
      </div>
      <ul :class="prefixCls + '-content'">
        <li
          v-for="item in filterData"
          :class="itemClasses(item)"
          @click.prevent="select(item)"
        >
          <Checkbox 
            :value="isCheck(item)" 
            :disabled="item.disabled"
          >
          </Checkbox>
          <span v-html="showLabel(item)">
          </span>
        </li>
        <li :class="prefixCls + '-content-not-found'">
          {{ notFoundText }}
        </li>
      </ul>
    </div>
    <div 
      v-if="showFooter" 
      :class="prefixCls + '-footer'"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Search from './search.vue';
import Checkbox from '../checkbox/checkbox.vue';

export default {
  name: 'TransferList',
  components: {Checkbox, Search},
  props: {
    checkedKeys: Array,
    data: Array,
    filterable: Boolean,
    filterMethod: Function,
    filterPlaceholder: String,
    listStyle: Object,
    notFoundText: String,
    prefixCls: String,
    renderFormat: Function,
    title: [String, Number],
    validKeysCount: Number,
  },
  data() {
    return {
      query: '',
      showFooter: true,
      showItems: [],
    };
  },
  computed: {
    bodyClasses() {
      return [
        `${this.prefixCls}-body`,
        {
          [`${this.prefixCls}-body-with-search`]: this.filterable,
          [`${this.prefixCls}-body-with-footer`]: this.showFooter,
        },
      ];
    },
    checkedAll() {
      return this.data.filter((data) => !data.disabled).length === this.validKeysCount && this.validKeysCount !== 0;
    },
    checkedAllDisabled() {
      return this.data.filter((data) => !data.disabled).length <= 0;
    },
    classes() {
      return [
        `${this.prefixCls}`,
        {
          [`${this.prefixCls}-with-footer`]: this.showFooter,
        },
      ];
    },
    count() {
      const validKeysCount = this.validKeysCount;

      return `${validKeysCount > 0 ? `${validKeysCount}/` : ''}${this.data.length}`;
    },
    filterData() {
      return this.showItems.filter((item) => this.filterMethod(item, this.query));
    },
  },
  watch: {
    data() {
      this.updateFilteredData();
    },
  },
  created() {
    this.updateFilteredData();
  },
  mounted() {
    this.showFooter = this.$slots.default !== undefined;
  },
  methods: {
    handleQueryChange(val) {
      this.query = val;
    },
    handleQueryClear() {
      this.query = '';
    },
    isCheck(item) {
      return this.checkedKeys.some((key) => key === item.key);
    },
    itemClasses(item) {
      return [
        `${this.prefixCls}-content-item`,
        {
          [`${this.prefixCls}-content-item-disabled`]: item.disabled,
        },
      ];
    },
    select(item) {
      if (item.disabled) {
        return;
      }

      const index = this.checkedKeys.indexOf(item.key);
      index > -1 ? this.checkedKeys.splice(index, 1) : this.checkedKeys.push(item.key);
      this.$parent.handleCheckedKeys();
    },
    showLabel(item) {
      return this.renderFormat(item);
    },
    toggleSelectAll(status) {
      const keys = status
        ? this.data.filter((data) => !data.disabled || this.checkedKeys.indexOf(data.key) > -1).map((data) => data.key)
        : this.data.filter((data) => data.disabled && this.checkedKeys.indexOf(data.key) > -1).map((data) => data.key);
      this.$emit('on-checked-keys-change', keys);
    },
    updateFilteredData() {
      this.showItems = this.data;
    },
  },
};
</script>
