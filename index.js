const electron = require('electron');
const {app, Menu} = electron;
const Config = require('electron-config');
const fs = require('fs');
const EditorWindow = require('./app/EditorWindow');

let mainWindow;
let config = new Config();

app.on('ready', () => {
    // config.set('openfile', './test.md');
    mainWindow = new EditorWindow();
    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New',
                accelerator: 'CommandOrControl+N',
                click() {console.log('New');}
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
                click() {console.log('Save');}
            },
            {
                label: 'Save As...',
                accelerator: 'CommandOrControl+Shift+S',
                click() {console.log('Save As...');}
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
