<template>
  <ul :class="[prefixCls + '-list']">
    <li
      v-for="(file, i) in files"
      :key="i"
      :class="fileCls(file)"
      @click="handleClick(file)"
    >
      <span @click="handlePreview(file)">
        <icon :type="format(file)">
        </icon> {{ file.name }}
      </span>
      <icon
        v-show="file.status === 'finished'"
        type="times"
        weight="regular"
        :class="[prefixCls + '-list-remove']"
        @click.native="handleRemove(file)"
      >
      </icon>
      <transition name="fade">
        <i-progress
          v-if="file.showProgress"
          :stroke-width="2"
          :percent="parsePercentage(file.percentage)"
          :status="file.status === 'finished' && file.showProgress ? 'success' : 'normal'"
        >
        </i-progress>
      </transition>
    </li>
  </ul>
</template>

<script>
import stubArray from 'lodash/stubArray';
import Icon from 'Components/icon';
import iProgress from 'Components/progress/progress.vue';

const prefixCls = 'ivu-upload';

export default {
  name: 'UploadList',

  components: {Icon, iProgress},

  props: {
    files: {
      default: stubArray,
      type: Array,
    },
  },

  data() {
    return {
      prefixCls,
    };
  },
  methods: {
    fileCls(file) {
      return [
        `${prefixCls}-list-file`,
        {
          [`${prefixCls}-list-file-finish`]: file.status === 'finished',
        },
      ];
    },
    format(file) {
      const format =
        file.name
          .split('.')
          .pop()
          .toLocaleLowerCase() || '';
      let type = 'document';

      if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
        type = 'image';
      }

      if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
        type = 'ios-film';
      }

      if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
        type = 'ios-musical-notes';
      }

      if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
        type = 'document-text';
      }

      if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
        type = 'stats-bars';
      }

      if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
        type = 'ios-videocam';
      }

      return type;
    },
    handleClick(file) {
      this.$emit('on-file-click', file);
    },
    handlePreview(file) {
      this.$emit('on-file-preview', file);
    },
    handleRemove(file) {
      this.$emit('on-file-remove', file);
    },
    parsePercentage(val) {
      return parseInt(val, 10);
    },
  },
};
</script>
