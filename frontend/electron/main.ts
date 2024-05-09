import { app, BrowserWindow, screen, ipcMain } from 'electron';
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {exec} from "child_process";
// import { activeWindow} from "active-win";
// import {activeWindow} from "get-windows";

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow|null;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 540;
  const windowHeight = 600;
  const windowPosX = width - windowWidth;
  const windowPosY = height - windowHeight;
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: windowWidth,
    height: windowHeight,
    x: windowPosX,
    y: windowPosY,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },

    // 배경 투명
    transparent: true,

    //프레임
    frame: false,
  });

  // 항상 상위에 위치
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true);

  // 마우스 클릭 무시
  // win.setIgnoreMouseEvents(true);

  // 실행시 개발자 도구를 같이 실행(마우스 클릭 무시를 적용한 개발용)
  win.webContents.openDevTools();

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  //
  // setInterval(async () => {
  //   console.log(await activeWindow());
  //   console.log('hello');
  // }, 1000); // 1초마다 현재 활성화된 창의 정보를 콘솔에 출력


  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }



  });
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
      win = null;
    }
  });
});

ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setIgnoreMouseEvents(ignore, options);
  } else {
    console.error('win is null');
  }
});

// PowerShell 스크립트 실행 함수
function getActiveWindowProcessName() {
  const psScript = `
   Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  public class User32 {
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();
    [DllImport("user32.dll")]
    public static extern int GetWindowThreadProcessId(IntPtr hWnd, out int lpdwProcessId);
  }
"@

$foregroundWindowHandle = [User32]::GetForegroundWindow()
$processId = 0
[User32]::GetWindowThreadProcessId($foregroundWindowHandle, [ref]$processId)
$process = Get-Process | Where-Object { $_.Id -eq $processId }
$process.Name
  `;

  exec(psScript, (error, stdout:string, stderr:string) => {
  // exec(`powershell -Command "${psScript}"`, (error, stdout:string, stderr:string) => {
    if (error) {
      console.error(`exec error: ${error}`);
      console.log(stderr);
      return;
    }
    console.log("stdout >>>>>>>>>>>>>>>>>>> " + stdout);
    win!.webContents.send('active-window-process-name', stdout.trim());
  });
}

// 렌더러 프로세스에서 메시지 수신
ipcMain.on('get-active-window-process-name', getActiveWindowProcessName);



// ipcMain.handle('get-active-window', async () => {
//   try {
//     const windowInfo = await activeWindow();
//     return windowInfo;
//   } catch (error) {
//     console.error('Failed to get active window information:', error);
//     return null;
//   }
// });

// ipcMain.handle('get-active-window', async () => {
//   try {
//     const windowInfo = await activeWindow();
//     return windowInfo;
//   } catch (error) {
//     console.error('Failed to get active window information:', error);
//     return null;
//   }
// });