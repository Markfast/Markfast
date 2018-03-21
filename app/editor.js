const KEYS = {
    B: 66,
    ENTER: 13,
    I: 73,
    TAB: 9
}

let directoryPane, editorPane, previewPane;

window.onload = function() {
    editorPane = document.getElementById('editor-pane');
    previewPane = document.getElementById('preview-pane');
}

function onEdit() {
    console.log(editorPane.innerHTML);
    previewPane.innerHTML = '';
    converter.convertToHTML(editorPane.innerHTML);
}

window.addEventListener('keydown', (e) => {
    let focused = document.querySelector(':focus');
    if(focused === editorPane && e.keyCode == KEYS.TAB) {
        e.preventDefault();
        insertAtCaret('\t');
    }
    else if(focused === editorPane && e.keyCode == KEYS.ENTER) {
        e.preventDefault();
        insertAtCaret('\n');
    }
    else if(focused === editorPane && ((e.ctrlKey || e.metaKey) && e.keyCode == KEYS.B)) {
        e.preventDefault();
        insertAroundCaret('**', '**');
    }
    else if(focused === editorPane && ((e.ctrlKey || e.metaKey) && e.keyCode == KEYS.I)) {
        e.preventDefault();
        insertAroundCaret('*', '*');
    }
}, false);

/**
 * Inserts a given string at the cursor.
 * If the selection is a range, the insertion takes place before the range.
 * @param {string} text - The string to be inserted at the cursor.
 */
function insertAtCaret(text) {
    var sel = document.getSelection();
    var range = sel.getRangeAt(0);
    let insert = document.createTextNode(text);
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
    console.log(sel)
    var range = sel.getRangeAt(0);
    var sf = document.createTextNode(startFence);
    var ef = document.createTextNode(endFence);
    range.insertNode(sf);
    if(sel.type == 'Range') {
        range.collapse(false); // false collapses to end of range, true collapses to beginning
    }
    range.insertNode(ef);
    range.setStartAfter(sf);
    range.setEnd(ef, 0);
    sel.addRange(range);
}
