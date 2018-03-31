const electron = require('electron');
const {app, Menu, ipcMain} = electron;
const Config = require('electron-config');
const {assignMenu, swapTheme} = require('./app/MenuHelper');
const EditorWindow = require('./app/EditorWindow');

global.windows = [];
let config = new Config();

/**
 * Initiates Markfast.
 * Loads windows and sets initial configs if need be.
 */
app.on('ready', () => {
    // INITIAL CONFIGURATIONS
    if(config.get('lang') === undefined) {
        config.set('lang', 'enUS');
    }
    if(config.get('theme') === undefined) {
        config.set('theme', 'DARK');
    }
    if(config.get('cmdorctrl') === undefined) {
        let cmdorctrl = process.platform === 'darwin' ? '&#8984;' : 'Ctrl+';
        console.log(cmdorctrl);
            config.set('cmdorctrl', cmdorctrl);
    }
    // config.delete('openfile')

    // INITIALIZE WINDOW
    global.mainWindow = new EditorWindow();
    global.mainWindow.on('close', () => {app.quit();})
    global.windows.push(mainWindow);
    swapTheme(config.get('theme'));
    assignMenu();
});
