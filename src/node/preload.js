/*
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-22 13:08:53
 * @LastEditors: ciping.deng
 * @LastEditTime: 2022-01-05 17:19:45
 * @FilePath: /image-tool/src/node/preload.js
 * @Description:
 */
import { contextBridge, ipcRenderer, shell } from 'electron';
import { promises as fspromises } from 'fs';
import path from 'path';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
import imageminWebp from 'imagemin-webp';

import * as FileUtils from './file';

// const imagemin = require('imagemin');
// const imageminPngquant = require('imagemin-pngquant');

// const imagemin = import('imagemin');
// const images = require('images');
const sharp = require('sharp');

const MyApi = {
  controleSize: async function (source, targetDir, width) {
    try {
      await fspromises.mkdir(targetDir, { recursive: true });
    } catch (error) {
      return {
        isError: true,
        msg: error,
      };
    }

    let fileName = path.parse(source).base;
    let dist = path.join(targetDir, fileName);

    return sharp(source)
      .resize(width)
      .toFile(dist)
      .then((data) => {
        // console.log(444, data);
        return {
          msg: 'success',
          sPath: source,
          tPath: dist,
          tSize: data.size,
        };
      })
      .catch((err) => ({
        isError: true,
        msg: err,
      }));

    // let error = await new Promise((resolve, reject) => {
    //
    //   images(source)
    //     .resize(width)
    //     .saveAsync(dist, (err) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve();
    //       }
    //     });
    // }).catch((err) => err);
    //
    // if (error) {
    //   return {
    //     isError: true,
    //     msg: error,
    //   };
    // } else {
    //   let file = await fspromises.stat(dist);
    //   return {
    //     msg: 'success',
    //     sPath: source,
    //     tPath: dist,
    //     tSize: file.size,
    //   };
    // }
  },
  // controleSize2: async function (source, targetDir, width) {
  //   try {
  //     await fspromises.mkdir(targetDir, { recursive: true });
  //   } catch (error) {
  //     return {
  //       isError: true,
  //       msg: error,
  //     };
  //   }

  //   let fileName = path.parse(source).base;
  //   let dist = path.join(targetDir, fileName);

  //   let error = await new Promise((resolve, reject) => {
  //     images(source)
  //       .resize(width)
  //       .saveAsync(dist, (err) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve();
  //         }
  //       });
  //   }).catch((err) => err);

  //   if (error) {
  //     return {
  //       isError: true,
  //       msg: error,
  //     };
  //   } else {
  //     let file = await fspromises.stat(dist);
  //     return {
  //       msg: 'success',
  //       sPath: source,
  //       tPath: dist,
  //       tSize: file.size,
  //     };
  //   }
  // },
  controleType: async function (source, targetDir, type, width) {
    try {
      await fspromises.mkdir(targetDir, { recursive: true });
    } catch (error) {
      return {
        isError: true,
        msg: error,
      };
    }

    let fileName = path.parse(source).name + '.' + type;
    let dist = path.join(targetDir, fileName);

    let p = width ? sharp(source).resize(width) : sharp(source);
    return p
      .toFormat(type)
      .toFile(dist)
      .then((data) => {
        // console.log(444, data);
        return {
          msg: 'success',
          sPath: source,
          tPath: dist,
          tSize: data.size,
        };
      })
      .catch((err) => ({
        isError: true,
        msg: err,
      }));

    // let error = await new Promise((resolve, reject) => {
    //   if (width) {
    //     images(source)
    //       .resize(width)
    //       .saveAsync(dist, (err) => {
    //         if (err) {
    //           reject(err);
    //         } else {
    //           resolve();
    //         }
    //       });
    //   } else {
    //     images(source).saveAsync(dist, (err) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve();
    //       }
    //     });
    //   }
    //   images(source)
    //     .resize(width)
    //     .saveAsync(dist, type, (err) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve();
    //       }
    //     });
    // }).catch((err) => err);

    // if (error) {
    //   return {
    //     isError: true,
    //     msg: error,
    //   };
    // } else {
    //   let file = await fspromises.stat(dist);
    //   return {
    //     msg: 'success',
    //     sPath: source,
    //     tPath: dist,
    //     tSize: file.size,
    //   };
    // }
  },
  controleMiny: async function (source, targetDir, quality = 100) {
    try {
      await fspromises.mkdir(targetDir, { recursive: true });
    } catch (error) {
      return {
        isError: true,
        msg: error,
      };
    }

    quality = quality / 100;

    // let fileName = path.parse(source).name;
    // let dist = path.join(targetDir, fileName);

    let [error, tPath] = await imagemin([source], {
      destination: targetDir,
      plugins: [
        imageminJpegtran(),
        imageminWebp({ quality: quality }),
        imageminGifsicle({ optimizationLevel: 3, colors: 128 }),
        imageminPngquant({
          strip: true,
          quality: [0.3, quality], //压缩质量（0,1）
        }),
      ],
    })
      .then((v) => [null, v[0].destinationPath])
      .catch((err) => [err]);

    if (error) {
      return {
        isError: true,
        msg: error,
      };
    } else {
      let file = await fspromises.stat(tPath);

      return {
        msg: 'success',
        sPath: source,
        tPath: tPath,
        tSize: file.size,
      };
    }
  },
};

contextBridge.exposeInMainWorld('myAPI', MyApi);
contextBridge.exposeInMainWorld('FileAPI', FileUtils);
