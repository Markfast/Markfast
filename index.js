const electron = require('electron');
const {app} = electron;
const EditorWindow = require('./app/EditorWindow');

let mainWindow;

app.on('ready', () => {
    mainWindow = new EditorWindow('hello');
});
