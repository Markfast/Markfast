const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        darkTheme: true
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
