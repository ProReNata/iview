<template>
  <div
    v-if="showSizer || showElevator"
    :class="optsClasses"
  >
    <div
      v-if="showSizer"
      :class="sizerClasses"
    >
      <i-select
        v-model="currentPageSize"
        :size="size"
        :placement="placement"
        :transfer="transfer"
        @on-change="changeSize"
      >
        <i-option
          v-for="item in pageSizeOpts"
          :key="item"
          :value="item"
          style="text-align:center;"
        >
          {{ item }} {{ t('i.page.page') }}
        </i-option>
      </i-select>
    </div>
    <div
      v-if="showElevator"
      :class="ElevatorClasses"
    >
      {{ t('i.page.goto') }}
      <label>
        <input
          type="text"
          :value="scoreCurrent"
          autocomplete="off"
          spellcheck="false"
          @keyup="onKeyup"
        >
      </label>
      {{ t('i.page.p') }}
    </div>
  </div>
</template>

<script>
import iSelect from 'Components/select/select.vue';
import iOption from 'Components/select/option.vue';
import Locale from 'Src/mixins/locale';

const prefixCls = 'ivu-page';

function isValueNumber(value) {
  return /^[1-9][0-9]*$/.test(`${value}`);
}

export default {
  name: 'PageOption',

  components: {iOption, iSelect},

  mixins: [Locale],

  props: {
    allPages: {
      default: undefined,
      type: Number,
    },
    current: {
      default: undefined,
      type: Number,
    },
    isSmall: {
      default: undefined,
      type: Boolean,
    },
    pageSize: {
      default: undefined,
      type: Number,
    },
    pageSizeOpts: {
      default: undefined,
      type: Array,
    },
    placement: {
      default: undefined,
      type: String,
    },
    scoreCurrent: {
      default: undefined,
      type: Number,
    },
    showElevator: {
      default: undefined,
      type: Boolean,
    },
    showSizer: {
      default: undefined,
      type: Boolean,
    },
    transfer: {
      default: undefined,
      type: Boolean,
    },
  },

  data() {
    return {
      currentPageSize: this.pageSize,
    };
  },

  computed: {
    ElevatorClasses() {
      return [`${prefixCls}-options-elevator`];
    },
    optsClasses() {
      return [`${prefixCls}-options`];
    },
    size() {
      return this.isSmall ? 'small' : 'default';
    },
    sizerClasses() {
      return [`${prefixCls}-options-sizer`];
    },
  },

  watch: {
    pageSize(val) {
      this.currentPageSize = val;
    },
  },

  methods: {
    changePage(event) {
      let val = event.target.value.trim();
      let page = 0;

      if (isValueNumber(val)) {
        val = Number(val);

        if (val !== this.current) {
          const {allPages} = this;

          if (val > allPages) {
            page = allPages;
          } else {
            page = val;
          }
        }
      } else {
        page = 1;
      }

      if (page) {
        this.$emit('on-page', page);
        event.target.value = page;
      }
    },
    changeSize() {
      this.$emit('on-size', this.currentPageSize);
    },
    onKeyup(event) {
      if (event.key === 'Enter') {
        this.changePage(event);
      }
    },
  },
};
</script>
