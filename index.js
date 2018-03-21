const electron = require('electron');
const {app, Menu, dialog, ipcMain} = electron;
const Config = require('electron-config');
const fs = require('fs');
const EditorWindow = require('./app/EditorWindow');

let mainWindow;
let config = new Config();

app.on('ready', () => {
    config.set('openfile', './test.md');
    mainWindow = new EditorWindow();
    let menu = Menu.buildFromTemplate(menuTemplate);
    mainWindow.setMenu(menu);
});

/**
 * Sets the editor to a new, empty file.
 * Clears editor and removes current file from config.
 */
function newFile() {
    mainWindow.webContents.send('CLEAR_EDITOR');
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
            mainWindow.webContents.send('SET_EDITOR_CONTENTS', data);
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
        mainWindow.webContents.send('GET_EDITOR_CONTENTS');
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
        mainWindow.webContents.send('GET_EDITOR_CONTENTS');
        ipcMain.once('GET_EDITOR_CONTENTS2', (event, con) => {
            fs.writeFile(filename, con, (error) => {console.log(error)});
        })
    });
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New',
                accelerator: 'CommandOrControl+N',
                click() {newFile();}
            },
            {
                label: 'Open',
                accelerator: 'CommandOrControl+O',
                click() {openFile();}
            },
            {type: 'separator'},
            {
                label: 'Save',
                accelerator: 'CommandOrControl+S',
                click() {save();}
            },
            {
                label: 'Save As...',
                accelerator: 'CommandOrControl+Shift+S',
                click() {saveAs();}
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'selectall'}
        ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
        label: 'Help',
        submenu: [
            {role: 'about'}
        ]
    }
]
