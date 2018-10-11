<template>
  <div :class="[prefixCls]">
    <div
      :class="classes"
      @click="handleClick"
      @drop.prevent="onDrop"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
    >
      <input
        ref="input"
        type="file"
        :class="[prefixCls + '-input']"
        :multiple="multiple"
        :accept="accept"
        @change="handleChange"
      >
      <slot></slot>
    </div>
    <slot name="tip">
    </slot>
    <upload-list
      v-if="showUploadList"
      :files="fileList"
      @on-file-remove="handleRemove"
      @on-file-preview="handlePreview"
    >
    </upload-list>
  </div>
</template>
<script>
import noop from 'lodash/noop';
import UploadList from './upload-list.vue';
import ajax from './ajax';
import {oneOf} from '../../utils/assist';
import Emitter from '../../mixins/emitter';

const prefixCls = 'ivu-upload';

export default {
  name: 'Upload',
  components: {UploadList},
  mixins: [Emitter],
  props: {
    accept: {
      type: String,
    },
    action: {
      required: true,
      type: String,
    },
    beforeUpload: Function,
    data: {
      type: Object,
    },
    defaultFileList: {
      default() {
        return [];
      },
      type: Array,
    },
    format: {
      default() {
        return [];
      },
      type: Array,
    },
    headers: {
      default() {
        return {};
      },
      type: Object,
    },
    maxSize: {
      type: Number,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
    name: {
      default: 'file',
      type: String,
    },
    onError: {
      default() {
        return {};
      },
      type: Function,
    },
    onExceededSize: {
      default() {
        return {};
      },
      type: Function,
    },
    onFormatError: {
      default() {
        return {};
      },
      type: Function,
    },
    onPreview: {
      default() {
        return {};
      },
      type: Function,
    },
    onProgress: {
      default() {
        return {};
      },
      type: Function,
    },
    onRemove: {
      default() {
        return {};
      },
      type: Function,
    },
    onSuccess: {
      default() {
        return {};
      },
      type: Function,
    },
    showUploadList: {
      default: true,
      type: Boolean,
    },
    type: {
      default: 'select',
      type: String,
      validator(value) {
        return oneOf(value, ['select', 'drag']);
      },
    },
    withCredentials: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      dragOver: false,
      fileList: [],
      prefixCls,
      tempIndex: 1,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-select`]: this.type === 'select',
          [`${prefixCls}-drag`]: this.type === 'drag',
          [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver,
        },
      ];
    },
  },
  watch: {
    defaultFileList: {
      handler(fileList) {
        this.fileList = fileList.map((item) => {
          item.status = 'finished';
          item.percentage = 100;
          item.uid = Date.now() + this.tempIndex++;

          return item;
        });
      },
      immediate: true,
    },
  },
  methods: {
    clearFiles() {
      this.fileList = [];
    },
    getFile(file) {
      const {fileList} = this;
      let target;
      fileList.every((item) => {
        target = file.uid === item.uid ? item : null;

        return !target;
      });

      return target;
    },
    handleChange(e) {
      const {files} = e.target;

      if (!files) {
        return;
      }

      this.uploadFiles(files);
      this.$refs.input.value = null;
    },
    handleClick() {
      this.$refs.input.click();
    },
    handleError(err, response, file) {
      const _file = this.getFile(file);
      const {fileList} = this;

      _file.status = 'fail';

      fileList.splice(fileList.indexOf(_file), 1);

      this.onError(err, response, file);
    },
    handlePreview(file) {
      if (file.status === 'finished') {
        this.onPreview(file);
      }
    },
    handleProgress(e, file) {
      const _file = this.getFile(file);
      this.onProgress(e, _file, this.fileList);
      _file.percentage = e.percent || 0;
    },
    handleRemove(file) {
      const {fileList} = this;
      fileList.splice(fileList.indexOf(file), 1);
      this.onRemove(file, fileList);
    },
    handleStart(file) {
      file.uid = Date.now() + this.tempIndex++;
      const _file = {
        name: file.name,
        percentage: 0,
        showProgress: true,
        size: file.size,
        status: 'uploading',
        uid: file.uid,
      };

      this.fileList.push(_file);
    },
    handleSuccess(res, file) {
      const _file = this.getFile(file);

      if (_file) {
        _file.status = 'finished';
        _file.response = res;

        this.dispatch('FormItem', 'on-form-change', _file);
        this.onSuccess(res, _file, this.fileList);

        setTimeout(() => {
          _file.showProgress = false;
        }, 1000);
      }
    },
    onDrop(e) {
      this.dragOver = false;
      this.uploadFiles(e.dataTransfer.files);
    },
    post(file) {
      // check format
      if (this.format.length) {
        const _file_format = file.name
          .split('.')
          .pop()
          .toLocaleLowerCase();
        const checked = this.format.some((item) => item.toLocaleLowerCase() === _file_format);

        if (!checked) {
          this.onFormatError(file, this.fileList);

          return false;
        }
      }

      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file, this.fileList);

          return false;
        }
      }

      this.handleStart(file);
      const formData = new FormData();
      formData.append(this.name, file);

      ajax({
        action: this.action,
        data: this.data,
        file,
        filename: this.name,
        headers: this.headers,
        onError: (err, response) => {
          this.handleError(err, response, file);
        },
        onProgress: (e) => {
          this.handleProgress(e, file);
        },
        onSuccess: (res) => {
          this.handleSuccess(res, file);
        },
        withCredentials: this.withCredentials,
      });
    },
    upload(file) {
      if (!this.beforeUpload) {
        return this.post(file);
      }

      const before = this.beforeUpload(file);

      if (before && before.then) {
        before.then(
          (processedFile) => {
            if (Object.prototype.toString.call(processedFile) === '[object File]') {
              this.post(processedFile);
            } else {
              this.post(file);
            }
          },
          noop,
          // () => {
          //   this.$emit('cancel', file);
          // },
        );
      } else if (before !== false) {
        this.post(file);
      } else {
        // this.$emit('cancel', file);
      }
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files);

      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      postFiles.forEach((file) => {
        this.upload(file);
      });
    },
  },
};
</script>
