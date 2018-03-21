const electron = require('electron');
const {BrowserWindow} = electron;
const fs = require('fs');
const Config = require('electron-config');

let config = new Config();

/** A class representing a window of the editor, complete with a directory tree pane, an editor pane, and a preview pane.*/
class EditorWindow extends BrowserWindow {

    /**
     * Instantiates a new window of the editor.
     * @param {string} url - the filepath of the initial Markdown file to load.
     */
    constructor(url) {
        super({
            show: false,
            backgroundColor: '#182828'
        });

        this.loadURL(`file://${__dirname}/index.html`);

        this.on('ready-to-show', () => {
            this.maximize();
        })
    }
}

module.exports = EditorWindow;
