import path from 'node:path';
import { app, BrowserWindow } from 'electron';
import { getAppPageUrl } from '@/common/utils/window';

export const create = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), 'dist/preload/index.js'),
    },
  });

  win.loadURL(getAppPageUrl('index.html'));
};
