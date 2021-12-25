<!--
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-21 11:07:26
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-23 17:01:42
 * @FilePath: /image-tool/src/views/Home.vue
 * @Description: 
-->
<template>
  <v-container class="m-page" grid-list-xs fluid style="height: 100%">
    <v-row class="nav-row" justify="center" align="start">
      <v-btn-toggle v-model="current" rounded mandatory>
        <v-btn depressed small> 图片压缩 </v-btn>
        <v-btn depressed small> 格式转换 </v-btn>
      </v-btn-toggle>
    </v-row>

    <compromise v-show="!current"></compromise>
    <compromise v-show="current"></compromise>
  </v-container>
</template>

<script>
import compromise from '../components/compromise.vue';
export default {
  name: 'home',
  components: { compromise },
  data: () => ({
    current: 0,
  }),
  methods: {},
};
</script>

<style lang="scss">
.v-application {
  .nav-row {
    position: absolute;
    top: -5px;
    width: 100%;
    .v-item-group.v-btn-toggle {
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
  }

  .m-page {
    padding: 0;
    padding-top: 20px;
  }
}
</style>
