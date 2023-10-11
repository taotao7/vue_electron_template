import {ipcMain} from 'electron';

const listenCheck = () => {
  ipcMain.handle('check_connect', async (_, args) => {
    console.log(args);
    return {msg: '连接成功'};
  });
};

export default function(){
  listenCheck();
}
