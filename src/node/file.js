/*
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-24 17:45:48
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-25 14:46:21
 * @FilePath: /image-tool/src/node/file.js
 * @Description:
 */

import { shell, ipcRenderer } from 'electron';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export const selectDir = async function (fullPath) {
  return ipcRenderer.invoke('select-dir', fullPath);
};
export const getSystemPath = async function (type) {
  return ipcRenderer.invoke('get-system-path', type);
};

export const openPath = function (fullPath) {
  shell.openPath(fullPath);
};

export const getDirFiles = async function (fullPath) {
  let result = [];

  try {
    const files = await readdir(fullPath);
    for (const name of files) {
      let full = path.join(fullPath, name);
      let file = await stat(full);
      if (file.isFile()) {
        result.push({
          name: name,
          path: full,
          size: file.size,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }

  return result;
};
