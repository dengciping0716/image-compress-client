<!--
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-21 11:07:26
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-22 17:32:19
 * @FilePath: /image-tool/src/App.vue
 * @Description: 
-->
<template>
  <v-app>
    <v-system-bar>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-container grid-list-xs>
      <v-row class="nav-row" align="center" justify="center">
        <v-btn-toggle v-model="current" rounded mandatory>
          <v-btn depressed small> 图片压缩 </v-btn>
          <v-btn depressed small> 格式转换 </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    current: 0,
  }),
};
</script>

<style lang="scss">
.v-system-bar {
  -webkit-app-region: drag;
  background-color: transparent !important;
}
.v-application .nav-row .v-item-group.v-btn-toggle {
  .v-btn {
    width: 160px;
    background-color: #8b4c39;
    color: #fff;
  }
  .v-btn.v-item--active {
    background-color: #fff !important;
    color: black;
    &::before {
      opacity: 0;
    }
  }
}
</style>
