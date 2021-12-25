<!--
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-23 14:26:33
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-25 18:06:47
 * @FilePath: /image-tool/src/components/changeFormat.vue
 * @Description: 
-->

<template>
  <v-container class="m-page-2" grid-list-xs fill-height>
    <upload-dragger class="m-content overflow-y-auto" @file="onSelectFile">
      <div v-if="!listData.length" class="upload-panel" @click.stop="handleClick">
        <v-row class="text-center">
          <v-img :src="require('../assets/icon-file-change.svg')" class="my-3" contain height="160" />
        </v-row>
        <v-row justify="center"><span class="text-h6">拖拽图片或文件夹到这里！</span></v-row>
        <v-row justify="center">
          <span class="text-caption">支持：{{ fileTypeStr }}</span>
        </v-row>
        <v-file-input ref="input" chips accept="image/*" multiple truncate-length="15" @change="onSelectFile"></v-file-input>
      </div>

      <v-list v-else dense>
        <template v-for="(item, index) in listData">
          <v-list-item :key="index">
            <template>
              <v-list-item-avatar>
                <v-img :src="item.url" class="my-3" contain width="50" />
              </v-list-item-avatar>
              <v-list-item-content style="padding: 0">
                <v-row no-gutters align="center" class="" height="50">
                  <v-col :cols="8">
                    <div class="text-body-1 white--text">{{ item.name }}</div>
                    <div class="text-body-2 teal--text text--accent-3">{{ item.statusName }}</div>
                  </v-col>
                  <v-col :cols="4">
                    <v-row justify="end" no-gutters>
                      <v-icon v-if="item.status == 3" size="20px" color="white" class="ma-2" @click="openPath(item.tPath)">mdi-magnify</v-icon>
                      <v-icon v-if="item.status == 3" size="20px" color="green" class="ma-2">mdi-checkbox-marked-circle</v-icon>
                      <v-icon v-if="item.status == 2" size="20px" color="red" class="ma-2">mdi-close-circle</v-icon>
                    </v-row>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </template>
          </v-list-item>
        </template>

        <v-btn class="px-2 btn-start" fab linghte md color="pink lighten-1" @click.stop="handleStart">
          <v-img :src="require('../assets/Launch.svg')" contain />
        </v-btn>
      </v-list>
    </upload-dragger>

    <v-footer fixed>
      <v-row no-gutters justify="space-between">
        <div>
          <span class="text-h6">格式转化为：</span>
          <v-select hide-details size="mini" class="my-0 py-0" dense :items="fileType" v-model="targetType" solo style="width: 120px; display: inline-block"></v-select>
          <!-- <span class="text-caption">{{ listData.length }} 个任务</span> -->
        </div>
        <div>
          <v-btn v-for="(icon, index) in icons" :key="icon" class="mx-2" icon @click.stop="handleMenu(index)">
            <v-icon size="24px" color="white">{{ icon }}</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-footer>

    <!--  -->

    <v-navigation-drawer v-model="drawer" fixed right temporary width="400px">
      <v-form>
        <v-card style="height: 100vh">
          <v-toolbar class="primary elevation-1" dark>
            <v-toolbar-title> 设置 </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="" outlined @click="saveConfig">保存 </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-subheader>输出路径 </v-subheader>
          <v-card-text class="py-0">
            <v-text-field @click="handleOutPath" readonly outlined hide-details="auto" dense v-model="config.dirname"></v-text-field>
          </v-card-text>

          <v-card-title primary-title class="py-0">
            <v-switch hide-details v-model="config.withScale" label="分辨率修改" dense></v-switch>
          </v-card-title>
          <v-card-text v-if="config.withScale">
            <v-text-field class="my-4" outlined hide-details="auto" type="number" dense label="宽" placeholder="自适应" v-model="config.width"></v-text-field>
          </v-card-text>
        </v-card>
      </v-form>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import uploadDragger from './upload-dragger.vue';
import _ from 'lodash';

const fileType = ['png', 'jpeg', 'webp'];
const fileTypeStr = fileType.map((v) => v.toUpperCase()).join('、');
export default {
  name: '',
  components: { uploadDragger },
  data: () => ({
    fileType,
    fileTypeStr,
    config: {
      dirname: '',
      quality: 80,
      withScale: false,
      width: '',
      height: '',
    },
    targetType: 'png',
    drawer: false,
    listData: [],
    icons: ['mdi-delete-outline', 'mdi-refresh', 'mdi-folder-open-outline', 'mdi-cog'],
  }),
  async mounted() {
    let configStr = localStorage.getItem('key_change_config');
    if (configStr) {
      this.config = JSON.parse(configStr);
    } else {
      this.config.dirname = await window.FileAPI.getSystemPath();
    }
  },
  methods: {
    openPath(tPath) {
      window.FileAPI.openPath(tPath);
    },
    saveConfig() {
      localStorage.setItem('key_change_config', JSON.stringify(this.config));
      this.drawer = false;
    },
    handleMenu(index) {
      switch (index) {
        case 0:
          this.listData = [];
          break;
        case 1:
          this.handleRefresh();
          break;
        case 2:
          this.openPath(this.config.dirname);
          break;
        case 3:
          this.drawer = true;
          break;
      }
    },
    handleClick() {
      this.$refs.input.$refs.input.internalValue = null;
      this.$refs.input.$refs.input.click();
    },
    async onSelectFile(files) {
      if (!files.length) return;

      let result = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.type) {
          result.push({
            name: file.name,
            path: file.path,
            size: file.size,
            type: file.type,
          });
        } else {
          let files = await window.FileAPI.getDirFiles(file.path);
          result = result.concat(files);
        }
      }

      let list = result.map((v) => Object.assign(v, { status: '0', statusName: '准备', url: `file://${v.path}` }));
      this.listData = _.uniqBy(this.listData.concat(...list), 'path');
    },
    computerSize(size) {
      let kb = size / 1024;
      if (-kb > 10240) {
        let mb = kb / 1024;
        return mb.toFixed(0) + 'MB';
      } else {
        return kb.toFixed(0) + 'KB';
      }
    },
    async handleStart() {
      let list = this.listData.filter((v) => v.status == 0);
      list.forEach((v) => {
        this.start(v);
      });
    },
    async handleRefresh() {
      let list = this.listData; //.filter((v) => v.status == 0 || v.status == 2);
      list.forEach((v) => {
        this.start(v);
      });
    },
    async handleOutPath(v) {
      let path = await window.FileAPI.selectDir()
        .then((v) => v.filePaths[0])
        .catch(() => false);

      if (path) {
        this.config.dirname = path;
      }
    },
    async start(file) {
      let config = this.config;

      file.status = '1'; //'压缩中'
      file.statusName = `转化中`;

      let sPath = file.path;
      let tPath = config.dirname;
      let res = {};
      res = await window.myAPI.controleType(sPath, tPath, this.targetType, config.withScale ? Number(config.width) : 0);
      if (res.isError) {
        file.isError = true;
        file.status = '2'; //'压缩失败'
        file.statusName = `${res.msg}`;
        return;
      }

      let sSize = file.size;
      let tSize = res.tSize;
      let subSize = tSize - sSize;
      let subPrecent = Number((subSize / sSize) * 100).toFixed(1);

      let sizeStr = this.computerSize(subSize);
      file.status = '3'; //成功
      file.statusName = `${sizeStr} (${subPrecent}%)`;
      file.tPath = res.tPath;
    },
  },
};
</script>

<style lang="scss">
.m-page-2.container {
  height: 100%;
  padding-top: 0;
  .m-content {
    color: #fff;
    width: 100%;
    height: calc(100vh - 100px);
    margin-bottom: 40px;

    .upload-panel {
      width: 50%;
      margin: auto;
      margin-top: 100px;
      .v-file-input {
        position: absolute;
        left: -10000px;
      }
    }

    .btn-start {
      position: fixed;
      right: 20px;
      bottom: 80px;
    }
  }
  .v-footer {
    color: #fff;
    background-color: transparent;
  }

  .v-list {
    background-color: transparent;
  }
}
</style>
