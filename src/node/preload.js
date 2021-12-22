/*
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-22 13:08:53
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-22 15:58:13
 * @FilePath: /image-tool/src/node/preload.js
 * @Description:
 */
const { contextBridge } = require('electron');

import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

// const imagemin = require('imagemin');
// const imageminPngquant = require('imagemin-pngquant');

// const imagemin = import('imagemin');
const images = require('images');

const controleSize = function (source, target) {
  try {
    console.log(444, source, target);
    //压缩jpg  此API为同步方法，可以遍历执行
    images(source).resize(400).save(target);
  } catch (error) {
    console.log(333, error);
  }
};

const controleMiny = function (source, target) {
  try {
    imagemin([source], {
      destination: target,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.7], //压缩质量（0,1）
        }),
      ],
    })
      .then(() => {
        console.log('压缩成功');
      })
      .catch((err) => {
        console.log('压缩失败：' + err);
      });
  } catch (error) {
    console.log(333, error);
  }
};

contextBridge.exposeInMainWorld('myAPI', {
  controleSize,
  controleMiny,
});
