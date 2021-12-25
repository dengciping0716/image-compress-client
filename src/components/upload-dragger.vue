<!--
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-21 11:07:26
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-23 20:02:31
 * @FilePath: /image-tool/src/components/upload-dragger.vue
 * @Description: 
-->
<template>
  <div class="upload-dragger" :class="{ 'is-dragover': dragover }" @drop.prevent="onDrop" @dragover.prevent="onDragover" @dragleave.prevent="dragover = false">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UploadDragger',
  props: {
    disabled: Boolean,
    accept: String,
  },
  data: () => ({
    dragover: false,
  }),
  methods: {
    onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop(e) {
      if (this.disabled) return;
      const accept = this.accept;
      this.dragover = false;
      if (!accept) {
        this.$emit('file', e.dataTransfer.files);
        return;
      }
      this.$emit(
        'file',
        [].slice.call(e.dataTransfer.files).filter((file) => {
          const { type, name } = file;
          const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : '';
          const baseType = type.replace(/\/.*$/, '');
          return accept
            .split(',')
            .map((type) => type.trim())
            .filter((type) => type)
            .some((acceptedType) => {
              if (/\..+$/.test(acceptedType)) {
                return extension === acceptedType;
              }
              if (/\/\*$/.test(acceptedType)) {
                return baseType === acceptedType.replace(/\/\*$/, '');
              }
              if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                return type === acceptedType;
              }
              return false;
            });
        })
      );
    },
  },
};
</script>
