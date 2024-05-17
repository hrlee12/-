import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
