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
import stubArray from 'lodash/stubArray';
import stubObject from 'lodash/stubObject';
import noop from 'lodash/noop';
import isOneOf from 'Global/Assets/isOneOf';
import Emitter from 'Src/mixins/emitter';
import UploadList from './upload-list.vue';
import ajax from './ajax';

const prefixCls = 'ivu-upload';

export default {
  name: 'Upload',

  components: {UploadList},

  mixins: [Emitter],

  props: {
    accept: {
      default: undefined,
      type: String,
    },
    action: {
      required: true,
      type: String,
    },
    beforeUpload: {
      default: undefined,
      type: Function,
    },
    data: {
      default: undefined,
      type: Object,
    },
    defaultFileList: {
      default: stubArray,
      type: Array,
    },
    format: {
      default: stubArray,
      type: Array,
    },
    headers: {
      default: stubObject,
      type: Object,
    },
    maxSize: {
      default: undefined,
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
      default: stubObject,
      type: Function,
    },
    onExceededSize: {
      default: stubObject,
      type: Function,
    },
    onFormatError: {
      default: stubObject,
      type: Function,
    },
    onPreview: {
      default: stubObject,
      type: Function,
    },
    onProgress: {
      default: stubObject,
      type: Function,
    },
    onRemove: {
      default: stubObject,
      type: Function,
    },
    onSuccess: {
      default: stubObject,
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
        return isOneOf(value, ['select', 'drag']);
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
          item.uid = Date.now() + this.tempIndex;
          this.tempIndex += 1;

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
      const item = this.getFile(file);
      const {fileList} = this;

      item.status = 'fail';

      fileList.splice(fileList.indexOf(item), 1);

      this.onError(err, response, file);
    },
    handlePreview(file) {
      if (file.status === 'finished') {
        this.onPreview(file);
      }
    },
    handleProgress(e, file) {
      const item = this.getFile(file);
      this.onProgress(e, item, this.fileList);
      item.percentage = e.percent || 0;
    },
    handleRemove(file) {
      const {fileList} = this;
      fileList.splice(fileList.indexOf(file), 1);
      this.onRemove(file, fileList);
    },
    handleStart(file) {
      file.uid = Date.now() + this.tempIndex;
      this.tempIndex += 1;
      const item = {
        name: file.name,
        percentage: 0,
        showProgress: true,
        size: file.size,
        status: 'uploading',
        uid: file.uid,
      };

      this.fileList.push(item);
    },
    handleSuccess(res, file) {
      const item = this.getFile(file);

      if (item) {
        item.status = 'finished';
        item.response = res;

        this.dispatch('FormItem', 'on-form-change', item);
        this.onSuccess(res, item, this.fileList);

        setTimeout(() => {
          item.showProgress = false;
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
        const fileFormat = file.name
          .split('.')
          .pop()
          .toLocaleLowerCase();
        const checked = this.format.some((item) => item.toLocaleLowerCase() === fileFormat);

        if (!checked) {
          this.onFormatError(file, this.fileList);

          return;
        }
      }

      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file, this.fileList);

          return;
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
        this.post(file);

        return;
      }

      const before = this.beforeUpload(file);

      if (before && before.then) {
        before
          .then(
            (processedFile) => {
              if (Object.prototype.toString.call(processedFile) === '[object File]') {
                this.post(processedFile);
              } else {
                this.post(file);
              }

              return null;
            },
            noop,
            // () => {
            //   this.$emit('cancel', file);
            // },
          )
          .catch((error) => {
            throw error;
          });
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
