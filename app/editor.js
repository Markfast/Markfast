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

let directoryPane, editorPane, previewPane;

document.undoStack = [];

window.onload = function() {
    editorPane = document.getElementById('editor-pane');
    previewPane = document.getElementById('preview-pane');

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
    document.undoStack.push(editorPane.innerHTML);
    previewPane.innerHTML = '';
    converter.convertToHTML(editorPane.innerHTML);
}

window.addEventListener('keydown', (e) => {
    let focused = document.querySelector(':focus');
    console.log(focused);
    if(focused === editorPane && e.keyCode == KEYS.TAB) {
        e.preventDefault();
        insertAtCaret('\t', false);
    }
    else if(focused === editorPane && e.keyCode == KEYS.BACKTICK) {
        e.preventDefault();
        insertAroundCaret('`', '`');
    }
    else if(focused === editorPane && ((e.ctrlKey || e.metaKey) && e.keyCode == KEYS.B)) {
        e.preventDefault();
        insertAroundCaret('**', '**');
    }
    else if(focused === editorPane && ((e.ctrlKey || e.metaKey) && e.keyCode == KEYS.I)) {
        e.preventDefault();
        insertAroundCaret('*', '*');
    }
    else if(focused === editorPane && (!(e.shiftKey) && e.keyCode == KEYS.QUOTE)) {
        e.preventDefault();
        insertAroundCaret("'", "'");
    }
    else if(focused === editorPane && (e.shiftKey && e.keyCode == KEYS.QUOTE)) {
        e.preventDefault();
        insertAroundCaret('"', '"');
    }
    else if(focused === editorPane && (e.shiftKey && e.keyCode == KEYS.LEFT_BRACKET)) {
        e.preventDefault();
        insertAroundCaret('{', '}');
    }
    else if(focused === editorPane && (!(e.shiftKey) && e.keyCode == KEYS.LEFT_BRACKET)) {
        e.preventDefault();
        insertAroundCaret('[', ']');
    }
    else if(focused === editorPane && (e.shiftKey && e.keyCode == KEYS.LEFT_PARENTHESIS)) {
        e.preventDefault();
        insertAroundCaret('(', ')');
    }
    if(focused === editorPane) {onEdit();}

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

function onPaste(e) {
    e.preventDefault();
    if(e.clipboardData.types.includes('Files')) {return;}
    insertAtCaret(e.clipboardData.getData('text/plain'), true);
}
