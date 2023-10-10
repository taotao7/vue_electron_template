import {ipcRenderer} from 'electron';

/**
 * @module preload
 */

export const checkConnect = () => {
  return ipcRenderer.invoke('check_connect', {msg: '测试成功'});
};
