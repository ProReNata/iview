<template>
  <ul
    v-if="simple"
    :class="simpleWrapClasses"
    :style="styles"
  >
    <li
      :title="t('i.page.prev')"
      :class="prevClasses"
      @click="prev"
    >
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-left">
        </i>
      </a>
    </li>
    <div
      :class="simplePagerClasses"
      :title="currentPage + '/' + allPages"
    >
      <label>
        <input
          type="text"
          :value="currentPage"
          autocomplete="off"
          spellcheck="false"
          @keydown="keyDown"
          @keyup="keyUp"
          @change="keyUp"
        >
      </label>
      <span>/</span>
      {{ allPages }}
    </div>
    <li
      :title="t('i.page.next')"
      :class="nextClasses"
      @click="next"
    >
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-right">
        </i>
      </a>
    </li>
  </ul>
  <ul
    v-else
    :class="wrapClasses"
    :style="styles"
  >
    <span
      v-if="showTotal"
      :class="[prefixCls + '-total']"
    >
      <slot>
        {{ t('i.page.total') }} {{ total }} <template v-if="total <= 1">
          {{ t('i.page.item') }}
        </template><template v-else>
          {{ t('i.page.items') }}
        </template>
      </slot>
    </span>
    <li
      :title="t('i.page.prev')"
      :class="prevClasses"
      @click="prev"
    >
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-left">
        </i>
      </a>
    </li>
    <li
      title="1"
      :class="firstPageClasses"
      @click="changePage(1)"
    >
      <a>1</a>
    </li>
    <li
      v-if="currentPage - 3 > 1"
      :title="t('i.page.prev5')"
      :class="[prefixCls + '-item-jump-prev']"
      @click="fastPrev"
    >
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-left">
        </i>
      </a>
    </li>
    <li
      v-if="currentPage - 2 > 1"
      :title="currentPage - 2"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 2)"
    >
      <a>{{ currentPage - 2 }}</a>
    </li>
    <li
      v-if="currentPage - 1 > 1"
      :title="currentPage - 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 1)"
    >
      <a>{{ currentPage - 1 }}</a>
    </li>
    <li
      v-if="currentPage !== 1 && currentPage !== allPages"
      :title="currentPage"
      :class="[prefixCls + '-item',prefixCls + '-item-active']"
    >
      <a>{{ currentPage }}</a>
    </li>
    <li
      v-if="currentPage + 1 < allPages"
      :title="currentPage + 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 1)"
    >
      <a>{{ currentPage + 1 }}</a>
    </li>
    <li
      v-if="currentPage + 2 < allPages"
      :title="currentPage + 2"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 2)"
    >
      <a>{{ currentPage + 2 }}</a>
    </li>
    <li
      v-if="currentPage + 3 < allPages"
      :title="t('i.page.next5')"
      :class="[prefixCls + '-item-jump-next']"
      @click="fastNext"
    >
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-right">
        </i>
      </a>
    </li>
    <li
      v-if="allPages > 1"
      :title="allPages"
      :class="lastPageClasses"
      @click="changePage(allPages)"
    >
      <a>{{ allPages }}</a>
    </li>
    <li
      :title="t('i.page.next')"
      :class="nextClasses"
      @click="next"
    >
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-right">
        </i>
      </a>
    </li>
    <options
      :show-sizer="showSizer"
      :page-size="currentPageSize"
      :page-size-opts="pageSizeOpts"
      :placement="placement"
      :transfer="transfer"
      :show-elevator="showElevator"
      :score-current="currentPage"
      :current="currentPage"
      :all-pages="allPages"
      :is-small="isSmall"
      @on-size="onSize"
      @on-page="onPage"
    >
    </options>
  </ul>
</template>

<script>
import {oneOf} from '../../utils/assist';
import Options from './options.vue';
import Locale from '../../mixins/locale';

const prefixCls = 'ivu-page';

export default {
  name: 'Page',

  components: {Options},

  mixins: [Locale],

  props: {
    className: {
      default: undefined,
      type: String,
    },
    current: {
      default: 1,
      type: Number,
    },
    pageSize: {
      default: 10,
      type: Number,
    },
    pageSizeOpts: {
      default() {
        return [10, 20, 30, 40];
      },
      type: Array,
    },
    placement: {
      default: 'bottom',
      type: String,
      validator(value) {
        return oneOf(value, ['top', 'bottom']);
      },
    },
    showElevator: {
      default: false,
      type: Boolean,
    },
    showSizer: {
      default: false,
      type: Boolean,
    },
    showTotal: {
      default: false,
      type: Boolean,
    },
    simple: {
      default: false,
      type: Boolean,
    },
    size: {
      default: undefined,
      type: String,
      validator(value) {
        return oneOf(value, ['small']);
      },
    },
    styles: {
      default: undefined,
      type: Object,
    },
    total: {
      default: 0,
      type: Number,
    },
    transfer: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      currentPage: this.current,
      currentPageSize: this.pageSize,
      prefixCls,
    };
  },

  computed: {
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize);

      return allPage === 0 ? 1 : allPage;
    },
    firstPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === 1,
        },
      ];
    },
    isSmall() {
      return !!this.size;
    },
    lastPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === this.allPages,
        },
      ];
    },
    nextClasses() {
      return [
        `${prefixCls}-next`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === this.allPages,
        },
      ];
    },
    prevClasses() {
      return [
        `${prefixCls}-prev`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === 1,
        },
      ];
    },
    simplePagerClasses() {
      return `${prefixCls}-simple-pager`;
    },
    simpleWrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-simple`,
        {
          [`${this.className}`]: !!this.className,
        },
      ];
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${this.className}`]: !!this.className,
          mini: !!this.size,
        },
      ];
    },
  },

  watch: {
    current(val) {
      this.currentPage = val;
    },
    pageSize(val) {
      this.currentPageSize = val;
    },
    total(val) {
      const maxPage = Math.ceil(val / this.currentPageSize);

      if (maxPage < this.currentPage && maxPage > 0) {
        this.currentPage = maxPage;
      }
    },
  },

  methods: {
    changePage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        this.$emit('update:current', page);
        this.$emit('on-change', page);
      }
    },
    fastNext() {
      const page = this.currentPage + 5;

      if (page > this.allPages) {
        this.changePage(this.allPages);
      } else {
        this.changePage(page);
      }
    },
    fastPrev() {
      const page = this.currentPage - 5;

      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1);
      }
    },
    keyDown(e) {
      const key = e.keyCode;
      const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39;

      if (!condition) {
        e.preventDefault();
      }
    },
    keyUp(e) {
      const key = e.keyCode;
      const val = parseInt(e.target.value, 10);

      if (key === 38) {
        this.prev();
      } else if (key === 40) {
        this.next();
      } else if (key === 13) {
        let page = 1;

        if (val > this.allPages) {
          page = this.allPages;
        } else if (val <= 0 || !val) {
          page = 1;
        } else {
          page = val;
        }

        e.target.value = page;
        this.changePage(page);
      }
    },
    next() {
      const current = this.currentPage;

      if (current >= this.allPages) {
        return;
      }

      this.changePage(current + 1);
    },
    onPage(page) {
      this.changePage(page);
    },
    onSize(pageSize) {
      this.currentPageSize = pageSize;
      this.$emit('on-page-size-change', pageSize);
      this.changePage(1);
    },
    prev() {
      const current = this.currentPage;

      if (current <= 1) {
        return;
      }

      this.changePage(current - 1);
    },
  },
};
</script>
