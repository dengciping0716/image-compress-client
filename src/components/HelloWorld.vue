<!--
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-21 11:07:26
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-22 16:00:12
 * @FilePath: /image-tool/src/components/HelloWorld.vue
 * @Description: 
-->
<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-file-input v-model="files" chips accept="image/*" multiple truncate-length="15" @change="onSelectFile"></v-file-input>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    files: [],
  }),
  methods: {
    onSelectFile(files) {
      if (!files.length) return;
      let src = files[0];
      window.myAPI.controleSize(src.path, '/Users/ciping/Desktop/1.png');
      window.myAPI.controleMiny(src.path, '/Users/ciping/Desktop/2/');
    },
  },
};
</script>
