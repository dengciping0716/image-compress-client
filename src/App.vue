<!--
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-21 11:07:26
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-23 19:20:49
 * @FilePath: /image-tool/src/App.vue
 * @Description: 
-->
<template>
  <v-app>
    <v-system-bar style="position: fixed; width: 100%">
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-main style="margin-top: 24px">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({}),
};
</script>
