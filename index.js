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

function newFile() {
    mainWindow.webContents.send('CLEAR_EDITOR');
    config.delete('openfile')
}

function openFile() {

}

/**
 *
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
 * Expected behavior of the "Save As" menu item.
 */
function saveAs() {
    dialog.showSaveDialog({
        filters: [
            {name: 'Markdown', extensions: ['md', 'markdown', 'markdn', 'mdown']}
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
                click() {console.log('Open');}
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
