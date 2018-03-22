let converter = {};

// Settings
converter.spacesToTabs = 2;

// HTML Object
converter.currentObject = 0;
converter.OBJECT_HEADERS = 1;
converter.OBJECT_EMPHASIS = converter.OBJECT_HEADERS + 1;
converter.OBJECT_LIST = converter.OBJECT_EMPHASIS + 1;
converter.OBJECT_IMAGES = converter.OBJECT_LIST + 1;
converter.OBJECT_LINKS = converter.OBJECT_IMAGES + 1;
converter.OBJECT_BLOCKQUOTES = converter.OBJECT_LINKS + 1;

converter.convertToHTML = function(markdown) {
    //console.log(markdown);

    let lines = markdown.split("\n");
    let lineCounter = 0;
    for(lineCounter = 0; lineCounter < lines.length; lineCounter++) {
        line = lines[lineCounter];

        if (line == "\n") continue;
        else if (this.currentObject == 0) {
            this.evaluateObject(line);
        }

        let htmlElement;
        switch(this.currentObject) {
            case this.OBJECT_HEADERS:
                var hNum = line.count("#")
                htmlElement = line.replace(/#/g, "");
                htmlElement = "<h" + hNum + ">" + htmlElement + "</h" + hNum + ">";
                this.appendHTMLElement(htmlElement);
                break;
            case this.OBJECT_LIST:
                let type = this.getBulletType(line);
                bullets = [{"line": line, "type": type["type"], "spaces": type["spaces"]}];
                for (let nextLine = lineCounter + 1; nextLine < lines.length; nextLine++) {
                    type = this.getBulletType(lines[nextLine]);
                    if (type["type"] != "false") {
                        bullets.push({
                            "line": lines[nextLine],
                            "type": type["type"],
                            "spaces": type["spaces"]
                        });
                        lineCounter++;
                    }
                    else {
                        break;
                    }
                }
                htmlElement = "<ul>";

                let currentSpaces = 0;
                for (index in bullets) {
                    let bullet = bullets[index];
                    if (bullet["spaces"] > currentSpaces) {
                        htmlElement += "<ul>";
                        currentSpaces = bullet["spaces"];
                    } else if (bullet["spaces"] < currentSpaces) {
                        htmlElement += "</ul>";
                        currentSpaces = bullet["spaces"];
                    }

                    if (bullet["type"] == "ordered") {
                        htmlElement += "<ol>" + this.convertInLine(bullet["line"].replace(/\d./, "")) + "</ol>"
                    } else if (bullet["type"] == "unordered") {
                        htmlElement += "<li>" + this.convertInLine(bullet["line"].replace("-", "")) + "</li>"
                    }
                }
                htmlElement += "</ul>"
                this.appendHTMLElement(htmlElement);
                break;
            case this.OBJECT_BLOCKQUOTES:
                let blockquote = [line.replace(">", "")];
                for (let nextLine = lineCounter + 1; nextLine < lines.length; nextLine++) {
                    if (lines[nextLine] != "\n") {
                        blockquote.push(lines[nextLine]);
                        lineCounter++;
                    }
                    else break;
                }
                htmlElement = "<blockquote>"
                for (let i = 0; i < blockquote.length; i++) {
                    htmlElement += blockquote[i] + " ";
                }
                htmlElement += "</blockquote>"
                this.appendHTMLElement(htmlElement);
                break;
            default:
                this.appendHTMLElement(this.convertInLine(line));
        }
    }

};

//=============================================================================
// Emphasis & Links Methods
//=============================================================================
converter.convertInLine = function (line) {
    let htmlElement = line

    while (regexCodeBlockBackQuote.test(htmlElement) || regexCodeBlockTilde.test(htmlElement)) {
        // If Code Block
        function replacer(match, p1, p2, p3, p4, p5) {
            // Call convertInLine recursivly on the strings not in the code block
            return converter.convertInLine(p1) + "<pre><code>" + p3 + "</code></pre>" + converter.convertInLine(p5);
        }
        htmlElement = htmlElement.replace(regexCodeBlockBackQuote, replacer);
        return htmlElement;
    }
    while (regexCode.test(htmlElement)) {
        // If Code Block
        function replacer(match, p1, p2, p3, p4, p5) {
            // Call convertInLine recursivly on the strings not in the code block
            return converter.convertInLine(p1) + "<code>" + p3 + "</code>" + converter.convertInLine(p5);
        }
        htmlElement = htmlElement.replace(regexCode, replacer);
        return htmlElement;
    }
    while (regexBackslashCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexBackslash, "$1U+0005C$3");
    }
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
    while (regexLink.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexLink, "$1<a href=\"$5\">$3</a>$7");
    }
    while (regexImage.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexImage, "$1<img src=\"$5\" alt=\"$3\">$7");
    }
    return htmlElement
}

//=============================================================================
// List Methods
//=============================================================================
converter.getBulletType = function (line) {
    let spaces = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] == " ") spaces++;
        else if (line[i] == "-") return {"type": "unordered", "spaces": spaces};
        else if (/\d+/.test(line[i]) && line[i+1] == ".") return {"type": "ordered", "spaces": spaces};
        else return {"type": "false", "spaces": spaces};
    }
    return {"type": "false", "spaces": spaces};
}

//=============================================================================
// General Methods
//=============================================================================
converter.evaluateObject = function(line) {
    if (line[0] == "#") this.currentObject = this.OBJECT_HEADERS;
    else if (regexUnorderedList.test(line)) this.currentObject = this.OBJECT_LIST;
    else if (regexOrderedList.test(line)) this.currentObject = this.OBJECT_LIST;
    else if (regexBlockquote.test(line)) this.currentObject = this.OBJECT_BLOCKQUOTES;
    else this.currentObject = 0; //  && line[1] == "."
}

converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
    this.currentObject = 0;
}
