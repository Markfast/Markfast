let converter = {};

converter.convertToHTML = function(markdown) {
    let htmlElement = markdown;

    // Header
    while (regexHeader.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6) {
            let headerIndex = p3.length;
            return converter.convertToHTML(p1) + "<h" + headerIndex + ">" + p4 + "</h" + headerIndex + ">" + converter.convertToHTML(p5);
        }
        return htmlElement.replace(regexHeader, replacer);
    }

    // New Line
    while(regexNewLineMultiple.test(htmlElement)) {htmlElement = htmlElement.replace(regexNewLineMultiple, "$1<br />$4");}
    while(regexNewLineSingle.test(htmlElement)) {htmlElement = htmlElement.replace(regexNewLineSingle, "$1$3");}

    // Bold & Italic
    htmlElement = htmlElement.replaceAll("<br />", "\n");
    while (regexBoldAsterisk.test(htmlElement)) {htmlElement = htmlElement.replace(regexBoldAsterisk, "$1<b>$3$4$5</b>$7");}
    while (regexBoldUnderscore.test(htmlElement)) {htmlElement = htmlElement.replace(regexBoldUnderscore, "$1<b>$3$4$5</b>$7");}
    while (regexItalicAsterisk.test(htmlElement)) {htmlElement = htmlElement.replace(regexItalicAsterisk, "$1<i>$3$4$5</i>$7$8");}
    while (regexItalicUnderscore.test(htmlElement)) {htmlElement = htmlElement.replace(regexItalicUnderscore, "$1<i>$3$4$5</i>$7$8");}
    htmlElement = htmlElement.replaceAll("\n", "<br />");

    // Links & Images
    while (regexLink.test(htmlElement)) {htmlElement = htmlElement.replace(regexLink, "$1$2<a href=\"$6\">$4</a>$8");}
    while (regexImage.test(htmlElement)) {htmlElement = htmlElement.replace(regexImage, "$1<img src=\"$6\" alt=\"$4\">$8");}

    // Return HTML Element
    return htmlElement
}
converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
}
