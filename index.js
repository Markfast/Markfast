const electron = require('electron');
const {app, Menu, dialog, ipcMain} = electron;
const Config = require('electron-config');
const fs = require('fs');
const EditorWindow = require('./app/EditorWindow');
const MarkdownGuideWindow = require('./app/MarkdownGuideWindow');

let mainWindow, markdownGuide;
let windows = [];
let config = new Config();

/**
 * Initiates Markfast.
 * Loads windows and sets initial configs if need be.
 */
app.on('ready', () => {
    // INITIAL CONFIGURATIONS
    if(config.get('theme') === undefined) {
        config.set('theme', 'DARK');
    }
    if(config.get('cmdorctrl') === undefined) {
        let cmdorctrl = process.platform === 'darwin' ? '&#8984;' : 'Ctrl+';
        console.log(cmdorctrl);
            config.set('cmdorctrl', cmdorctrl);
    }

    // INITIALIZE WINDOW
    mainWindow = new EditorWindow();
    mainWindow.on('close', () => {app.quit();})
    windows.push(mainWindow);
    swapTheme(config.get('theme'));
    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

/**
 * Sets the editor to a new, empty file.
 * Clears editor and removes current file from config.
 */
function newFile() {
    mainWindow.webContents.send('SET_EDITOR_CONTENTS', '');
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

/**
 * Determines whether a theme is the current theme.
 * Used to set the initial radio selection for the theme menu from config.
 * @param {string} id - The theme ID (an ID of `FOO` will use the `theme_FOO` CSS file).
 * @returns {boolean} Whether the given ID matches the theme config.
 */
function isTheme(id) {
    return id == config.get('theme');
}

/**
 * Alerts all active windows to change their theme.
 * Also sets the theme in config.
 * @param {string} id - The theme ID to switch to (an ID of `FOO` will use the `theme_FOO` CSS file).
 */
function swapTheme(id) {
    config.set('theme', id);
    windows.forEach(win => {
        win.webContents.send('SWAP_THEME', id);
    })
}

/**
 * Opens the Markdown Guide window.
 * Opens a new guide window if none are open, or reshows the guide window if it's already open.
 */
function openMarkdownGuide() {
    if(markdownGuide == null) {
        markdownGuide = new MarkdownGuideWindow();
        markdownGuide.on('close', () => {
            markdownGuide = null;
            windows.splice(windows.indexOf(markdownGuide), 1);
        })
        markdownGuide.setMenu(null);
        windows.push(markdownGuide);
    }
    else {
        markdownGuide.webContents.reloadIgnoringCache();
        markdownGuide.show();
    }
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
        {
            label: 'Toggle Developer Tools',
            accelerator: 'F12',
            click() {mainWindow.webContents.toggleDevTools();}
        },
        {type: 'separator'},
        {
            label: 'Theme',
            submenu: [
                {
                    label: 'Dark',
                    id: 'DARK',
                    type: 'radio',
                    checked: isTheme('DARK'),
                    click() {swapTheme('DARK');}
                },
                {
                    label: 'Light',
                    id: 'LIGHT',
                    type: 'radio',
                    checked: isTheme('LIGHT'),
                    click() {swapTheme('LIGHT');}
                },
                {
                    label: 'GitHub Dark',
                    id: 'GITHUB_DARK',
                    type: 'radio',
                    checked: isTheme('GITHUB_DARK'),
                    click() {swapTheme('GITHUB_DARK');}
                },
                {
                    label: 'GitHub Light',
                    id: 'GITHUB',
                    type: 'radio',
                    checked: isTheme('GITHUB'),
                    click() {swapTheme('GITHUB');}
                }
            ]
        },
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
            {role: 'about'},
            {
                label: 'Markdown Guide',
                accelerator: 'F1',
                click() {openMarkdownGuide();}
            }
        ]
    }
]

if(process.platform === 'darwin') {
    menuTemplate.unshift({});
}
