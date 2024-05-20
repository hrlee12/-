import { app, BrowserWindow, screen, ipcMain } from 'electron';

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawn } from 'child_process';

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

let win: BrowserWindow | null;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = width;
  const windowHeight = height;
  const windowPosX = width - windowWidth;
  const windowPosY = height - windowHeight;
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, 'electron-vite.svg'),
    width: width,
    height: height,
    x: windowPosX,
    y: windowPosY,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
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
  win.setIgnoreMouseEvents(true, { forward: true });
  // win.setIgnoreMouseEvents(false);

  // 실행시 개발자 도구를 같이 실행(마우스 클릭 무시를 적용한 개발용) - 개발할 때는 주석 풀던지
  // win.webContents.openDevTools();

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

  ipcMain.on('fullscreen', () => {
    win?.setFullScreen(true);
  });
}

app.whenReady().then(() => {
  createWindow();
});
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

ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win!.setIgnoreMouseEvents(ignore, options);
});

// PowerShell 스크립트 실행 함수
function getActiveWindowProcessName() {
  const psScript = `Add-Type @"\nusing System;\nusing System.Runtime.InteropServices;\npublic class User32 {\n[DllImport("user32.dll")]\npublic static extern IntPtr GetForegroundWindow();\n[DllImport("user32.dll")]\npublic static extern int GetWindowThreadProcessId(IntPtr hWnd, out int lpdwProcessId);\n}\n"@\n$foregroundWindowHandle = [User32]::GetForegroundWindow()\n$processId = 0\n[User32]::GetWindowThreadProcessId($foregroundWindowHandle, [ref]$processId)\n$process = Get-Process | Where-Object { $_.Id -eq $processId }\n$process.Name`;

  const ps = spawn('powershell.exe', ['-Command', psScript]);

  ps.stdout.on('data', (data) => {
    // console.log(`stdout: ${data}`);
    win!.webContents.send('active-window-process-name', data);
  });

  ps.stderr.on('data', (data) => {
    console.log('stderr : ' + data);
  });

  ps.on('close', (code) => {
    console.log('child process exited with code : ' + code);
  });
}

// 렌더러 프로세스에서 메시지 수신
ipcMain.on('get-active-window-process-name', getActiveWindowProcessName);
