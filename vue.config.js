/*
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-21 20:42:03
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-22 15:32:29
 * @FilePath: /image-tool/vue.config.js
 * @Description:
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  //   publicPath: "./",
  lintOnSave: process.env.NODE_ENV !== 'production',

  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080,
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
  },

  pluginOptions: {
    electronBuilder: {
      preload: 'src/node/preload.js',
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        productName: 'image-tool',
        appId: 'org.simulatedgreg.electron-vue',
        directories: {
          output: 'dist',
        },
        files: ['dist_electron/**/*'],
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications',
            },
            {
              x: 130,
              y: 150,
              type: 'file',
            },
          ],
        },
        mac: {
          icon: 'build/icons/icon.icns',
        },
        win: {
          icon: 'build/icons/icon.ico',
        },
        linux: {
          icon: 'build/icons',
        },
      },
    },
  },

  transpileDependencies: ['vuetify'],
};
