import { BrowserWindow } from 'electron';
import { getAppBundleUrl } from '@/common/utils/window';

export const create = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(getAppBundleUrl('index.html'));
};
