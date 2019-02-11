<script>
import stubObject from 'lodash/stubObject';
import stubArray from 'lodash/stubArray';
import List from './list.vue';
import Operation from './operation.vue';
import Locale from '../../mixins/locale';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-transfer';

export default {
  name: 'Transfer',

  mixins: [Emitter, Locale],

  props: {
    data: {
      default: stubArray,
      type: Array,
    },
    filterable: {
      default: false,
      type: Boolean,
    },
    filterMethod: {
      default(data, query) {
        const type = 'label' in data ? 'label' : 'key';

        return data[type].indexOf(query) > -1;
      },
      type: Function,
    },
    filterPlaceholder: {
      default: undefined,
      type: String,
    },
    listStyle: {
      default: stubObject,
      type: Object,
    },
    notFoundText: {
      default: undefined,
      type: String,
    },
    operations: {
      default: stubArray,
      type: Array,
    },
    renderFormat: {
      default(item) {
        return item.label || item.key;
      },
      type: Function,
    },
    selectedKeys: {
      default: stubArray,
      type: Array,
    },
    targetKeys: {
      default: stubArray,
      type: Array,
    },
    titles: {
      default: undefined,
      type: Array,
    },
  },

  data() {
    return {
      leftCheckedKeys: [],
      leftData: [],
      prefixCls,
      rightCheckedKeys: [],
      rightData: [],
    };
  },

  computed: {
    classes() {
      return [`${prefixCls}`];
    },
    leftValidKeysCount() {
      return this.getValidKeys('left').length;
    },
    localeFilterPlaceholder() {
      if (this.filterPlaceholder === undefined) {
        return this.t('i.transfer.filterPlaceholder');
      }

      return this.filterPlaceholder;
    },
    localeNotFoundText() {
      if (this.notFoundText === undefined) {
        return this.t('i.transfer.notFoundText');
      }

      return this.notFoundText;
    },
    localeTitles() {
      if (Array.isArray(this.titles)) {
        return this.titles;
      }

      return [this.t('i.transfer.titles.source'), this.t('i.transfer.titles.target')];
    },
    rightValidKeysCount() {
      return this.getValidKeys('right').length;
    },
  },

  watch: {
    data() {
      this.splitData(false);
    },
    targetKeys() {
      this.splitData(false);
    },
  },

  mounted() {
    this.splitData(true);
  },

  methods: {
    getValidKeys(direction) {
      return this[`${direction}Data`]
        .filter((data) => !data.disabled && this[`${direction}CheckedKeys`].indexOf(data.key) > -1)
        .map((data) => data.key);
    },
    handleCheckedKeys() {
      const sourceSelectedKeys = this.getValidKeys('left');
      const targetSelectedKeys = this.getValidKeys('right');
      this.$emit('on-selected-change', sourceSelectedKeys, targetSelectedKeys);
    },
    handleLeftCheckedKeysChange(keys) {
      this.leftCheckedKeys = keys;
    },
    handleRightCheckedKeysChange(keys) {
      this.rightCheckedKeys = keys;
    },
    moveTo(direction) {
      const {targetKeys} = this;
      const opposite = direction === 'left' ? 'right' : 'left';
      const moveKeys = this.getValidKeys(opposite);
      const newTargetKeys =
        direction === 'right'
          ? moveKeys.concat(targetKeys)
          : targetKeys.filter((targetKey) => !moveKeys.some((checkedKey) => targetKey === checkedKey));

      this.$refs[opposite].toggleSelectAll(false);
      this.$emit('on-change', newTargetKeys, direction, moveKeys);
      this.dispatch('FormItem', 'on-form-change', {
        direction,
        moveKeys,
        tarketKeys: newTargetKeys,
      });
    },
    splitData(init = false) {
      this.leftData = [...this.data];
      this.rightData = [];

      if (this.targetKeys.length > 0) {
        this.targetKeys.forEach((targetKey) => {
          const filteredData = this.leftData.filter((data, index) => {
            if (data.key === targetKey) {
              this.leftData.splice(index, 1);

              return true;
            }

            return false;
          });

          if (filteredData && filteredData.length > 0) {
            this.rightData.push(filteredData[0]);
          }
        });
      }

      if (init) {
        this.splitSelectedKey();
      }
    },
    splitSelectedKey() {
      const {selectedKeys} = this;

      if (selectedKeys.length > 0) {
        this.leftCheckedKeys = this.leftData.filter((data) => selectedKeys.indexOf(data.key) > -1).map((data) => data.key);
        this.rightCheckedKeys = this.rightData.filter((data) => selectedKeys.indexOf(data.key) > -1).map((data) => data.key);
      }
    },
  },
  render(h) {
    function cloneVNode(vnode) {
      const clonedChildren = vnode.children && vnode.children.map((vNode) => cloneVNode(vNode));
      const cloned = h(vnode.tag, vnode.data, clonedChildren);
      cloned.text = vnode.text;
      cloned.isComment = vnode.isComment;
      cloned.componentOptions = vnode.componentOptions;
      cloned.elm = vnode.elm;
      cloned.context = vnode.context;
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;

      return cloned;
    }

    const vNodes = this.$slots.default === undefined ? [] : this.$slots.default;
    const clonedVNodes = this.$slots.default === undefined ? [] : vNodes.map((vnode) => cloneVNode(vnode));

    return h(
      'div',
      {
        class: this.classes,
      },
      [
        h(
          List,
          {
            on: {
              'on-checked-keys-change': this.handleLeftCheckedKeysChange,
            },
            props: {
              checkedKeys: this.leftCheckedKeys,
              data: this.leftData,
              filterable: this.filterable,
              filterMethod: this.filterMethod,
              filterPlaceholder: this.localeFilterPlaceholder,
              listStyle: this.listStyle,
              notFoundText: this.localeNotFoundText,
              prefixCls: `${this.prefixCls}-list`,
              renderFormat: this.renderFormat,
              title: this.localeTitles[0],
              validKeysCount: this.leftValidKeysCount,
            },
            ref: 'left',
          },
          vNodes,
        ),

        h(Operation, {
          props: {
            leftActive: this.leftValidKeysCount > 0,
            operations: this.operations,
            prefixCls: this.prefixCls,
            rightActive: this.rightValidKeysCount > 0,
          },
        }),

        h(
          List,
          {
            on: {
              'on-checked-keys-change': this.handleRightCheckedKeysChange,
            },
            props: {
              checkedKeys: this.rightCheckedKeys,
              data: this.rightData,
              filterable: this.filterable,
              filterMethod: this.filterMethod,
              filterPlaceholder: this.localeFilterPlaceholder,
              listStyle: this.listStyle,
              notFoundText: this.localeNotFoundText,
              prefixCls: `${this.prefixCls}-list`,
              renderFormat: this.renderFormat,
              title: this.localeTitles[1],
              validKeysCount: this.rightValidKeysCount,
            },
            ref: 'right',
          },
          clonedVNodes,
        ),
      ],
    );
  },
};
</script>
