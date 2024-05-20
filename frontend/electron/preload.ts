import { ipcRenderer, contextBridge } from 'electron';


contextBridge.exposeInMainWorld("setClickableArea", {
  make : () => {
    const el :HTMLCollectionOf<Element> = document.getElementsByClassName('clickable-area');
    Array.from(el).forEach((e :Element) => {
        e.addEventListener('mouseenter', () => {
          ipcRenderer.send('set-ignore-mouse-events', false);
        });
        e.addEventListener('mouseleave', () => {
          ipcRenderer.send('set-ignore-mouse-events', true, { forward: true });
        });
    });
  }
});


// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },



});


type CallbackType = (data:string)=> void;
contextBridge.exposeInMainWorld('electronAPI', {
  getActiveWindowProcessName: () => ipcRenderer.send('get-active-window-process-name'),
  onActiveWindowProcessName: (callback:CallbackType) => ipcRenderer.on('active-window-process-name', (_, data) => callback(data)),
  fullscreen: () => ipcRenderer.send('fullscreen')
});



