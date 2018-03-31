const electron = require('electron');
const {app, Menu, dialog, ipcMain} = electron;
const Config = require('electron-config');
const fs = require('fs');
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

    // INITIALIZE WINDOW
    global.mainWindow = new EditorWindow();
    global.mainWindow.on('close', () => {app.quit();})
    global.windows.push(mainWindow);
    swapTheme(config.get('theme'));
    assignMenu();
});

/**
 * Sets the editor to a new, empty file.
 * Clears editor and removes current file from config.
 */
function newFile() {
    global.mainWindow.webContents.send('SET_EDITOR_CONTENTS', '');
    config.delete('openfile')
}

/**
 * Opens a file using the open dialog.
 * Expected behavior of the "Open" menu item / Ctrl+O accelerator.
 */
function openFile() {
    dialog.showOpenDialog({
        filters: [
            {name: 'Markdown', extensions: ['md', 'markdown', 'markdn', 'mdown']},
            {name: 'Text', extensions: ['txt']},
            {name: 'All Files', extensions: ['*']}
        ]
    }, filenames => {
        if(filenames === undefined) return;
        config.set('openfile', filenames[0]);
        let content = fs.readFile(filenames[0], 'utf-8', (err, data) => {
            global.mainWindow.webContents.send('SET_EDITOR_CONTENTS', data);
            loadDirectory(path.join(filenames[0], '..'));
        })
    });
}

/**
 * Saves a file without the dialog if it has a filename, with the dialog otherwise.
 * Expected behavior of the "Save" menu item / Ctrl+S accelerator.
 */
function save() {
    if(config.get('openfile') === undefined) {
        saveAs();
    }
    else {
        global.mainWindow.webContents.send('GET_EDITOR_CONTENTS');
        ipcMain.once('GET_EDITOR_CONTENTS2', (event, con) => {
            fs.writeFile(config.get('openfile'), con, (error) => {console.log(error)});
        });
    }
}

/**
 * Saves a file using the save dialog.
 * Expected behavior of the "Save As" menu item / Ctrl+Shift+S accelerator.
 */
function saveAs() {
    dialog.showSaveDialog({
        filters: [
            {name: 'Markdown', extensions: ['md', 'markdown', 'markdn', 'mdown']},
            {name: 'Text', extensions: ['txt']},
            {name: 'All Files', extensions: ['*']}
        ]
    }, filename => {
        if(filename === undefined) return;
        config.set('openfile', filename);
        global.mainWindow.webContents.send('GET_EDITOR_CONTENTS');
        ipcMain.once('GET_EDITOR_CONTENTS2', (event, con) => {
            fs.writeFile(filename, con, (error) => {console.log(error)});
        })
    });
}
