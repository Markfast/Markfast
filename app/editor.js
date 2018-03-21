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
