const electron = require('electron');
const {app} = electron;
const Config = require('electron-config');
const fs = require('fs');
const EditorWindow = require('./app/EditorWindow');

let mainWindow;
let config = new Config();

app.on('ready', () => {
    // config.set('openfile', './test.md');
    mainWindow = new EditorWindow();
});
