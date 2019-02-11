<template>
  <div
    :class="classes"
    :style="styles"
  >
    <notice
      v-for="notice in notices"
      :key="notice.name"
      :prefix-cls="prefixCls"
      :styles="notice.styles"
      :type="notice.type"
      :content="notice.content"
      :duration="notice.duration"
      :render="notice.render"
      :has-title="notice.hasTitle"
      :with-icon="notice.withIcon"
      :closable="notice.closable"
      :name="notice.name"
      :transition-name="notice.transitionName"
      :on-close="notice.onClose"
    >
    </notice>
  </div>
</template>
<script>
import Notice from './notice.vue';

const prefixCls = 'ivu-notification';
let seed = 0;
const now = Date.now();

function getUuid() {
  const value = `ivuNotification_${now}_${seed}`;

  seed += 1;

  return value;
}

export default {
  components: {Notice},
  props: {
    className: {
      default: undefined,
      type: String,
    },
    content: {
      default: undefined,
      type: String,
    },
    prefixCls: {
      default: prefixCls,
      type: String,
    },
    styles: {
      default() {
        return {
          left: '50%',
          top: '65px',
        };
      },
      type: Object,
    },
  },

  data() {
    return {
      notices: [],
    };
  },

  computed: {
    classes() {
      return [
        `${this.prefixCls}`,
        {
          [`${this.className}`]: !!this.className,
        },
      ];
    },
  },

  methods: {
    add(notice) {
      const name = notice.name || getUuid();

      const noticeObj = {
        ...{
          closable: false,
          content: '',
          duration: 1.5,
          name,
          styles: {
            right: '50%',
          },
        },
        ...notice,
      };

      this.notices.push(noticeObj);
    },
    close(name) {
      const {notices} = this;
      for (let i = 0; i < notices.length; i += 1) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    },
    closeAll() {
      this.notices = [];
    },
  },
};
</script>
