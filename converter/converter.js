let converter = {};

converter.convertToHTML = function(markdown) {
    let htmlElement = markdown;

    // Header
    /*while (tophetest.test(htmlElement)) {
        console.log("Here");
        htmlElement = htmlElement.replace(tophetest, "TEST!!!!");
        return htmlElement;
    }*/

    // Header
    while (regexHeader.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6) {
            console.log("1: " + p1, "2: " + p2, "3: " + p3, "4: " + p4, "5: " + p5, "6: " + p6);
            let headerIndex = p3.length;
            return converter.convertToHTML(p1) + "<h" + headerIndex + ">" + p4 + "</h" + headerIndex + ">" + converter.convertToHTML(p5);
        }
        htmlElement = htmlElement.replace(regexHeader, replacer);
        return htmlElement;
    }

    // New Line
    while(regexNewLineMultiple.test(htmlElement)) {
        console.log("Here!");
        function replacer(match, p1, p2, p3, p4, p5, p6) {
            // console.log("1: " + p1, "2: " + p2, "3: " + p3, "4: " + p4, "5: " + p5, "6: " + p6);
            return p1 + "<br />" + p4
        }
        htmlElement = htmlElement.replace(regexNewLineMultiple, replacer);
    }
    while(regexNewLineSingle.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4) {
            // console.log("1: " + p1, "2: " + p2, "3: " + p3, "4: " + p4);
            return p1 + p3
        }
        htmlElement = htmlElement.replace(regexNewLineSingle, replacer);
    }

    // Bold & Italic
    while (regexBoldAsteriskCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexBoldAsterisk, "$1<b>$3</b>$5");
    }
    while (regexBoldUnderscoreCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexBoldUnderscore, "$1<b>$3</b>$5");
    }
    while (regexItalicAsteriskCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexItalicAsterisk, "$1<i>$3</i>$5");
    }
    while (regexItalicUnderscoreCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexItalicUnderscore, "$1<i>$3</i>$5");
    }
    /*while (regexLink.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexLink, "$1<a href=\"$5\">$3</a>$7");
    }
    while (regexImage.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexImage, "$1<img src=\"$5\" alt=\"$3\">$7");
    }*/
    return htmlElement
}
converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
}
