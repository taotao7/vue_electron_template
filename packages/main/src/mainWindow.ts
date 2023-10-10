import {app, BrowserWindow, nativeImage, Menu, Tray} from 'electron';
import {join, resolve} from 'node:path';
import listenAction from '/@/action';

import trayIcon from '/@/assets/tray.png';
import icon from '/@/assets/logo.png';

async function createWindow() {
  const browserWindow = new BrowserWindow({
    icon: nativeImage.createFromDataURL(icon),
    width: 1280,
    height: 800,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webviewTag: false,
      preload: join(app.getAppPath(), 'packages/preload/dist/index.cjs'),
    },
  });

  // add listen event
  listenAction();

  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();
    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  // prevent close window
  browserWindow.on('close', e => {
    browserWindow.hide();
    e.preventDefault();
  });

  // close application menu
  Menu.setApplicationMenu(null);

  // vire tray content and icon
  const tray = new Tray(nativeImage.createFromDataURL(trayIcon));
  tray.setToolTip('vire k8s mpi dashboard');
  tray.on('double-click', () => {
    browserWindow?.show();
  });
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      type: 'normal',
      click: () => browserWindow?.show(),
    },
    {label: '退出', type: 'normal', click: () => app.exit()},
  ]);
  tray.setContextMenu(contextMenu);

  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined) {
    await browserWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
  } else {
    await browserWindow.loadFile(resolve(__dirname, '../../renderer/dist/index.html'));
  }

  return browserWindow;
}

export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
