const electron = require('electron');
const {BrowserWindow} = electron;

class EditorWindow extends BrowserWindow {
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
