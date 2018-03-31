let converter = {};
converter.backslashCharacters = {
    "\\":"UTOPHER005C",
    "`": "UTOPHER0060",
    "*": "UTOPHER002A",
    "_": "UTOPHER005F",
    "{": "UTOPHER007B",
    "}": "UTOPHER007D",
    "[": "UTOPHER005B",
    "]": "UTOPHER005D",
    "(": "UTOPHER0028",
    ")": "UTOPHER0029",
    "#": "UTOPHER0023",
    "+": "UTOPHER002B",
    "-": "UTOPHER002D",
    ".": "UTOPHER002E",
    "!": "UTOPHER0021"
}

converter.convertToHTML = function(markdown, dir) {
    if (dir === undefined) dir = "";
    let htmlElement = markdown;

    // Code & Code Block
    while (regexCodeBlockBackQuote.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5) {
            return converter.convertToHTML(p1) + "<pre><code>" + p3 + "</code></pre>" + converter.convertToHTML(p5);
        }
        return htmlElement.replace(regexCodeBlockBackQuote, replacer);
    }
    while (regexCodeBlockTilde.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5) {
            return converter.convertToHTML(p1) + "<pre><code>" + p3 + "</code></pre>" + converter.convertToHTML(p5);
        }
        return htmlElement.replace(regexCodeBlockTilde, replacer);
    }
    while (regexCode.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5) {
            return converter.convertToHTML(p1) + "<code>" + p3 + "</code>" + converter.convertToHTML(p5);
        }
        htmlElement = htmlElement.replace(regexCode, replacer);
        return htmlElement;
    }

    // Backslash
    while (regexBackslash.test(htmlElement)) {
        function replacer(match, p1, p2, p3 ,p4) {
            return p1 + converter.convertBackslashToTopherUnicode(p3) + p4;
        }
        htmlElement = htmlElement.replace(regexBackslash, replacer);
    }

    // Header
    while (regexHeader.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5) {
            let headerIndex = p3.length;
            return converter.convertToHTML(p1) + "<h" + headerIndex + ">" + p4 + "</h" + headerIndex + ">" + converter.convertToHTML(p5);
        }
        return htmlElement.replace(regexHeader, replacer);
    }

    // Block Quote
    while (regexBlockquote.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6, p7, p8) {
            return converter.convertToHTML(p1) + "<blockquote>" + converter.convertToHTML(p4.replaceAll("\n", " ")) + "</blockquote>" + converter.convertToHTML(p8.replace("\n\n", ""));
        }
        return htmlElement.replace(regexBlockquote, replacer);
    }

    // New Line
    while(regexNewLineMultiple.test(htmlElement)) {htmlElement = htmlElement.replace(regexNewLineMultiple, "$1<br />$4");}
    while(regexNewLineSingle.test(htmlElement)) {htmlElement = htmlElement.replace(regexNewLineSingle, "$1$3");}

    // Bold, Italic & Block Quote
    htmlElement = htmlElement.replaceAll("<br />", "\n");
    while (regexBoldAsterisk.test(htmlElement)) {htmlElement = htmlElement.replace(regexBoldAsterisk, "$1<b>$3$4$5</b>$7");}
    while (regexBoldUnderscore.test(htmlElement)) {htmlElement = htmlElement.replace(regexBoldUnderscore, "$1<b>$3$4$5</b>$7");}
    while (regexItalicAsterisk.test(htmlElement)) {htmlElement = htmlElement.replace(regexItalicAsterisk, "$1<i>$3$4$5</i>$7$8");}
    while (regexItalicUnderscore.test(htmlElement)) {htmlElement = htmlElement.replace(regexItalicUnderscore, "$1<i>$3$4$5</i>$7$8");}
    //while (regexBlockquote.test(htmlElement)) {htmlElement = htmlElement.replace(regexBlockquote, "$1<blockquote>$4</blockquote>$5");}
    htmlElement = htmlElement.replaceAll("\n", "<br />");

    // Links & Images
    while (regexLink.test(htmlElement)) {htmlElement = htmlElement.replace(regexLink, "$1$2<a href=\"$6\">$4</a>$8");}
    while (regexImage.test(htmlElement)) {htmlElement = htmlElement.replace(regexImage, "$1<img src=\"" + path.join(dir, "$6") + "\" alt=\"$4\">$8");}

    // Return HTML Element
    return this.replaceAllTopherUnicodes(htmlElement)
}

converter.convertBackslashToTopherUnicode = function (character) {
    if (character in this.backslashCharacters) return this.backslashCharacters[character];
    else return this.backslashCharacters["\\"] + character;
}
converter.replaceAllTopherUnicodes = function (string) {
    for(var key in this.backslashCharacters) {
        let value = this.backslashCharacters[key]
        string = string.replaceAll(value, key);
    }
    return string;
}

converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
}
