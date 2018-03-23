const electron = require('electron');
const {BrowserWindow} = electron;
const Config = require('electron-config');

let config = new Config();

/** A class representing a window of the editor, complete with a directory tree pane, an editor pane, and a preview pane.*/
class MarkdownGuideWindow extends BrowserWindow {

    /**
     * Instantiates a new Markdown guide window.
     */
    constructor() {
        super({
            backgroundColor: config.get('background'),
            icon: './resources/logo.ico'
        });

        this.loadURL(`file://${__dirname}/markdownGuide.html`);
    }
}

module.exports = MarkdownGuideWindow;
