import { app, BrowserWindow, ipcMain } from 'electron';
import { Socket } from 'net';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url); // TypeScript Error: 'require' is declared but its value is never read
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.webContents.on('did-finish-load', () => {
    console.log('Content loaded successfully.');
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Supressão de variáveis não utilizadas
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  win.webContents.on('did-fail-load', (_event, _errorCode, errorDescription, validatedURL) => {
    console.error(`Failed to load URL: ${validatedURL} with error: ${errorDescription}`);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Supressão de variáveis não utilizadas
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ipcMain.handle('send-message', async (_event, message) => {
  return new Promise((resolve, reject) => {
    const client = new Socket();

    client.connect(3000, '127.0.0.1', () => {
      console.log('Conectado ao servidor');
      client.write(message);
    });

    client.on('data', (data) => {
      console.log(`Resposta recebida: ${data}`);
      resolve(data.toString());
      client.end();
    });

    client.on('error', (err) => {
      console.error(`Erro na conexão: ${err.message}`);
      reject(err);
    });

    client.on('close', () => {
      console.log('Conexão encerrada');
    });
  });
});
