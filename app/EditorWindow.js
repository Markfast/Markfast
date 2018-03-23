const electron = require('electron');
const {BrowserWindow} = electron;
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
            show: true,
            backgroundColor: config.get('background'),
            icon: './resources/logo.ico'
            // webPreferences: {
            //     experimentalFeatures: true
            // }
        });

        this.loadURL(`file://${__dirname}/index.html`);

        this.on('ready-to-show', () => {
            // let dpw = config.get('directory-pane-width');
            // let epw = config.get('editor-pane-width');
            // let ppw = config.get('preview-pane-width');
            // if(dpw !== undefined) {
            //     this.webContents.send('SET_WIDTH', 'directory-pane', dpw);
            // }
            // if(epw !== undefined) {
            //     this.webContents.send('SET_WIDTH', 'editor-pane', epw);
            // }
            // if(ppw !== undefined) {
            //     this.webContents.send('SET_WIDTH', 'preview-pane', ppw);
            // }
            if(config.get('editor-width') === undefined) {
                this.maximize();
                config.set('editor-width', this.getSize()[0]);
                config.set('editor-height', this.getSize()[1]);
            }
            else {
                this.setSize(config.get('editor-width'), config.get('editor-height'), false)
                this.show();
            }
        });

        this.on('resize', () => {
            config.set('editor-width', this.getSize()[0]);
            config.set('editor-height', this.getSize()[1]);
        });
    }
}

module.exports = EditorWindow;
