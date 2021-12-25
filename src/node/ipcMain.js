/*
 * @Author: ciping.deng
 * @Email: dengciping0716@gmail.com
 * @Date: 2021-12-25 10:08:37
 * @LastEditors: ciping.deng
 * @LastEditTime: 2021-12-25 14:52:09
 * @FilePath: /image-tool/src/node/ipcMain.js
 * @Description:
 */

// 在主进程中.
const { ipcMain, dialog, app } = require('electron');

ipcMain.handle('select-dir', async (event, arg) => {
  return dialog.showOpenDialog({ defaultPath: arg, properties: ['openDirectory', 'createDirectory'] });
});

ipcMain.handle('get-system-path', async (event, type = 'documents') => {
  return app.getPath(type);
});
