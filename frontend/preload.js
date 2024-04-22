const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('clickable-area')
    el.addEventListener('mouseenter', () => {
        ipcRenderer.send('set-ignore-mouse-events', false)
    })
    el.addEventListener('mouseleave', () => {
      ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    })
  })