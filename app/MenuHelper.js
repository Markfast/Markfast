const electron = require('electron');
const {app, Menu, remote, dialog} = electron;
const fs = require('fs');
const Config = require('electron-config');
const _ = require('./i18n/_i18n');
const langs = require('./i18n/_langs.json');
const MarkdownGuideWindow = require('./MarkdownGuideWindow');

let config = new Config();

/**
 * Generates and set the new menu from a template.
 */
function assignMenu() {
    const menuTemplate = [
        {
            label: _('menu::file'),
            submenu: [
                {
                    label: _('menu::file::new'),
                    accelerator: 'CommandOrControl+N',
                    click() {newFile();}
                },
                {
                    label: _('menu::file::open'),
                    accelerator: 'CommandOrControl+O',
                    click() {openFile();}
                },
                {type: 'separator'},
                {
                    label: _('menu::file::save'),
                    accelerator: 'CommandOrControl+S',
                    click() {save();}
                },
                {
                    label: _('menu::file::saveAs'),
                    accelerator: 'CommandOrControl+Shift+S',
                    click() {saveAs();}
                }
            ]
        },
        {
            label: _('menu::edit'),
            submenu: [
                {
                    label: _('menu::edit::undo'),
                    role: 'undo'
                },
                {
                    label: _('menu::edit::redo'),
                    role: 'redo'
                },
                {type: 'separator'},
                {
                    label: _('menu::edit::cut'),
                    role: 'cut'
                },
                {
                    label: _('menu::edit::copy'),
                    role: 'copy'
                },
                {
                    label: _('menu::edit::paste'),
                    role: 'paste'
                },
                {
                    label: _('menu::edit::selectAll'),
                    role: 'selectall'
                }
            ]
        },
        {
          label: _('menu::view'),
          submenu: [
            {
                label: _('menu::view::reload'),
                role: 'reload'
            },
            {
                label: _('menu::view::forceReload'),
                role: 'forcereload'
            },
            {
                label: _('menu::view::devTools'),
                accelerator: 'F12',
                click() {
                    for(let i = 0; i < global.windows.length; i++) {
                        global.windows[i].toggleDevTools();
                    }
                }
            },
            {type: 'separator'},
            {
                label: _('menu::view::theme'),
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
            {
                label: _('menu::view::setLanguage'),
                submenu: getLanguagesSubmenu()
            },
            {
                label: _('menu::view::actualSize'),
                role: 'resetzoom'
            },
            {
                label: _('menu::view::zoomIn'),
                role: 'zoomin'
            },
            {
                label: _('menu::view::zoomOut'),
                role: 'zoomout'
            },
            {type: 'separator'},
            {
                label: _('menu::view::fullScreen'),
                role: 'togglefullscreen'
            }
          ]
        },
        {
            label: _('menu::help'),
            submenu: [
                {
                    label: _('menu::help::about'),
                    role: 'about'
                },
                {
                    label: _('menu::help::markdownGuide'),
                    accelerator: 'F1',
                    click() {openMarkdownGuide();}
                }
            ]
        }
    ];

    if(process.platform === 'darwin') {
        menuTemplate.unshift({});
    }

    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

/**
 * Compiles the languages submenu.
 * Generates the languages submenu dynamically from `/i18n/_langs.json`
 * @returns A submenu of menu items representing each supported language.
 */
function getLanguagesSubmenu() {
    let langsSubmenu = [];
    for (let i = 0; i < langs.length; i++) {
        let l = langs[i];
        langsSubmenu.push({
            label: l.label,
            sublabel: _(`langs::${l.id}`),
            type: 'radio',
            checked: l.id === config.get('lang'),
            click() {toggleLanguage(l.id);}
        })
    }
    return langsSubmenu;
}

/**
 * Configures the application to switch languages.
 * @param {string} id - The language code of the new language.
 */
function toggleLanguage(id) {
    if(config.get('lang') === id) {return;}
    config.set('lang', id);
    assignMenu();
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
    global.windows.forEach(win => {
        win.webContents.send('SWAP_THEME', id);
    })
}

/**
 * Opens the Markdown Guide window.
 * Opens a new guide window if none are open, or reshows the guide window if it's already open.
 */
function openMarkdownGuide() {
    if(global.markdownGuide == null) {
        global.markdownGuide = new MarkdownGuideWindow();
        global.markdownGuide.on('close', () => {
            markdownGuide = null;
            global.windows.splice(global.windows.indexOf(markdownGuide), 1);
        })
        global.markdownGuide.setMenu(null);
        global.windows.push(markdownGuide);
    }
    else {
        markdownGuide.webContents.reloadIgnoringCache();
        markdownGuide.show();
    }
}

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
        console.log(filenames[0]);
        config.set('openfile', filenames[0]);
        let content = fs.readFile(filenames[0], 'utf-8', (err, data) => {
            global.mainWindow.webContents.send('SET_EDITOR_CONTENTS', data);
            // loadDirectory(path.join(filenames[0], '..'));
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

module.exports = {
    assignMenu,
    swapTheme
};
