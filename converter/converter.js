let converter = {};

converter.convertToHTML = function(markdown) {
    let htmlElement = markdown;

    // New Line
    while(regexNewLineMultiple.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6) {
            console.log("1: " + p1, "2: " + p2, "3: " + p3, "4: " + p4, "5: " + p5, "6: " + p6);
            return p1 + p2 + "<br />" + p5
        }
        htmlElement = htmlElement.replace(regexNewLineMultiple, replacer);
    }
    while(regexNewLineSingle.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4) {
            console.log("1: " + p1, "2: " + p2, "3: " + p3, "4: " + p4);
            return p1 + p2 + p4
        }
        htmlElement = htmlElement.replace(regexNewLineSingle, replacer);
    }

    // Bold & Italic
    while (regexBoldAstrickCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexBoldAstrick, "$1<b>$3</b>$5");
    }
    while (regexBoldUnderscoreCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexBoldUnderscore, "$1<b>$3</b>$5");
    }
    while (regexItalicAstrickCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexItalicAstrick, "$1<i>$3</i>$5");
    }
    while (regexItalicUnderscoreCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexItalicUnderscore, "$1<i>$3</i>$5");
    }
    return htmlElement
}
converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
}
