const electron = require('electron');
const {shell} = electron;

const KEYS = {
    B: 66,
    BACKTICK: 192,
    ENTER: 13,
    I: 73,
    LEFT_BRACKET: 219,
    LEFT_PARENTHESIS: 57,
    QUOTE: 222,
    TAB: 9
}

const MARKDOWN_EXTENSIONS = ['.md', '.markdown', '.markdn', '.mdown'];
const TEXT_EXTENSIONS = ['', '.txt']

window.onload = function() {
    editorPane.addEventListener('input', onEdit);
    editorPane.addEventListener('paste', onPaste);
}

/**
 * Replaces the contents of the editor pane.
 * Also refreshes the preview pane.
 * @param {string} con - The new contents of the editor pane.
 */
function setEditorContents(con) {
    editorPane.innerHTML = con;
    onEdit();
}

/**
 * Automatically sends contents of the modified editor pane to the converter to parse.
 * Should be called every time the editor pane is modified.
 */
function onEdit() {
    previewPane.innerHTML = converter.convertToHTML(prepareForParsing(editorPane.innerHTML));
    let links = previewPane.querySelectorAll('a');
    links.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            shell.openExternal(a.getAttribute('href'));
        });
    });
}

/**
 * Prepares Markdown text for being parsed and loaded into the HTML preview.
 * @param {string} text - The contents of the editor pane.
 * @returns The string, but ready for HTML previewing.
 */
function prepareForParsing(text) {
    return '\n' + text.replace(/&gt;/g, '>').
        replace(/&lt;/g, '<');
}

window.addEventListener('keydown', (e) => {
    let focused = document.querySelector(':focus');
    if(focused === editorPane) {
        if(e.keyCode == KEYS.TAB) {
            e.preventDefault();
            insertAtCaret('\t', false);
        }
        else if(e.keyCode == KEYS.BACKTICK) {
            e.preventDefault();
            insertAroundCaret('`', '`');
        }
        else if((e.ctrlKey || e.metaKey) && e.keyCode == KEYS.B) {
            e.preventDefault();
            insertAroundCaret('**', '**');
        }
        else if((e.ctrlKey || e.metaKey) && e.keyCode == KEYS.I) {
            e.preventDefault();
            insertAroundCaret('*', '*');
        }
        else if(!(e.shiftKey) && e.keyCode == KEYS.QUOTE) {
            e.preventDefault();
            insertAroundCaret("'", "'");
        }
        else if(e.shiftKey && e.keyCode == KEYS.QUOTE) {
            e.preventDefault();
            insertAroundCaret('"', '"');
        }
        else if(e.shiftKey && e.keyCode == KEYS.LEFT_BRACKET) {
            e.preventDefault();
            insertAroundCaret('{', '}');
        }
        else if(!(e.shiftKey) && e.keyCode == KEYS.LEFT_BRACKET) {
            e.preventDefault();
            insertAroundCaret('[', ']');
        }
        else if(e.shiftKey && e.keyCode == KEYS.LEFT_PARENTHESIS) {
            e.preventDefault();
            insertAroundCaret('(', ')');
        }
        onEdit();
    }
}, false);

/**
 * Inserts a given string at the cursor.
 * If the selection is a range, the insertion takes place before the range.
 * @param {string} text - The string to be inserted at the cursor.
 * @param {boolean} overwrite - Whether the selection is to be overwritten if it is a range.
 */
function insertAtCaret(text, overwrite) {
    var sel = document.getSelection();
    var range = sel.getRangeAt(0);
    let insert = document.createTextNode(text);
    if(sel.type == 'Range' && overwrite) {
        range.deleteContents();
    }
    range.insertNode(insert);
    range.setStartAfter(insert);
    range.setEndAfter(insert);
    sel.removeAllRanges();
    sel.addRange(range);
}

/**
 * Fences off the caret/range with a given start fence and end fence.
 * @param {string} startFence - The string to be inserted before the selection.
 * @param {string} endFence - The string to be inserted after the selection.
 */
function insertAroundCaret(startFence, endFence) {
    var sel = document.getSelection();
    var range = sel.getRangeAt(0);
    var sf = document.createTextNode(startFence);
    var ef = document.createTextNode(endFence);
    if(sel.type == 'Caret') {
        range.insertNode(ef);
        range.insertNode(sf);
        range.setStartAfter(sf);
        range.setEnd(sf, sf.length);
    }
    if(sel.type == 'Range') {
        range.insertNode(sf);
        range.collapse(false); // false collapses to end of range, true collapses to beginning
        range.insertNode(ef);
        range.setStartAfter(ef);
        range.setEnd(ef, 0);
    }
    sel.addRange(range);
}

/**
 * Pastes clipboard contents as plain text into the editor.
 * Ignores pasting data that contains files.
 * @param {Event} e - Paste event
 */
function onPaste(e) {
    e.preventDefault();
    if(e.clipboardData.types.includes('Files')) {return;}
    insertAtCaret(e.clipboardData.getData('text/plain'), true);
}

function loadDirectory(dir) {
    let tree = document.getElementById('tree');
    tree.innerHTML = '';
    let parent = path.join(dir, '..');
    let up = document.createElement('li');
    up.innerHTML = '..';
    up.onclick = () => {loadDirectory(parent);}
    up.classList.add('subdir');
    up.classList.add('tree-item');
    up.classList.add('parent-dir');
    tree.appendChild(up);
    fs.readdir(dir, (err, files) => {
        // SUBDIRECTORIES FIRST
        files.forEach(file => {
            if(fs.statSync(path.join(dir, file)).isDirectory()) {
                let dirRecord = document.createElement('li');
                dirRecord.innerHTML = file;
                dirRecord.onclick = () => {loadDirectory(path.join(dir, file));}
                dirRecord.classList.add('tree-item');
                dirRecord.classList.add('subdir');
                tree.appendChild(dirRecord);
            }
        });
        // THEN FILES
        files.forEach(file => {
            if(!fs.statSync(path.join(dir, file)).isDirectory()) {
                let fileRecord = document.createElement('li');
                fileRecord.innerHTML = file;
                fileRecord.onclick = () => {
                    config.set('openfile', path.join(dir, file));
                    let content = fs.readFile(path.join(dir, file), 'utf-8', (err, data) => {
                        setEditorContents(data);
                    })
                }
                fileRecord.classList.add('tree-item');
                fileRecord.classList.add('treefile');
                if(MARKDOWN_EXTENSIONS.indexOf(path.extname(file)) > -1) {
                    fileRecord.classList.add('mdfile');
                }
                else if(TEXT_EXTENSIONS.indexOf(path.extname(file)) > -1) {
                    fileRecord.classList.add('txtfile');
                }
                else {
                    fileRecord.classList.add('otherfile');
                }
                tree.appendChild(fileRecord);
            }
        });
    });
}
