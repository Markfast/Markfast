let converter = {};

converter.convertToHTML = function(markdown) {

    let htmlElement = markdown;


    while (regexList.test(htmlElement)) {
        function replacer (match, prefix, newlineAndWhiteSpace, bulletObject, bulletContent, newLinesOrBullet, suffix) {
            //console.log("prefix*\n", prefix, '*\nnewlineAndWhiteSpace\n*', newlineAndWhiteSpace, '*\nbulletObject\n*', bulletObject, '*\nbulletContent\n*', bulletContent, '*\nnewLinesOrBullet\n*', newLinesOrBullet, '*\nsuffix\n*', suffix);
            function isLastLineABullet(match, prefix, newlineAndWhiteSpace, bulletObject, bulletContent, newLinesOrBullet, suffix) {
                console.log("prefix*\n", prefix, '*\nnewlineAndWhiteSpace\n*', newlineAndWhiteSpace, '*\nbulletObject\n*', bulletObject, '*\nbulletContent\n*', bulletContent, '*\nnewLinesOrBullet\n*', newLinesOrBullet, '*\nsuffix\n*', suffix);
                if (suffix == undefined || suffix == 0) return false;
                else {
                    console.log("Here");
                    let prefixAndList = [prefix + newlineAndWhiteSpace + bulletObject],
                        whitespace = newlineAndWhiteSpace.replace(/^\n/, ""),
                        fullList = [whitespace + bulletObject + bulletContent];
                    if (prefixAndList = prefixAndList[0].replace(regexList, isLastLineABullet)) {
                        fullList = [prefixAndList[1]].concat(fullList);
                    }
                    return [prefixAndList[0], fullList];
                }
            }
            let prefixAndList = [prefix + newlineAndWhiteSpace + bulletObject],
                whitespace = newlineAndWhiteSpace.replace(/^\n/, ""),
                fullList = [whitespace + bulletObject + bulletContent],
                suffixReturn = ((suffix != 0) ? suffix : '');
            if (prefixAndList = prefixAndList[0].replace(regexList, isLastLineABullet)) {
                fullList = [prefixAndList[1]].concat(fullList);
            }
            return prefixAndList[0] + converter.convertList(fullList) + converter.convertToHTML(suffixReturn);
            //let fullList = [bulletObject + bulletContent];
            //let prefixPrime = {"prefix": prefix, "previous": ""};
            //while (prefixPrime = converter.lastLineIsBullet(prefixPrime["prefix"])) {
            //    if (prefixPrime["previous"] == false) break;
            //    fullList = [prefixPrime["previous"]].concat(fullList);
            //}
            //let prefixReturn = ((prefixPrime["prefix"] != 0) ? prefixPrime["prefix"] : '');
            //let suffixReturn = ((suffix != 0) ? suffix : '');
            //console.log("Prefix: " + prefixReturn + "\nFullList: " + fullList + "\nSuffix: " + suffixReturn);
            //return converter.convertToHTML(prefixReturn) + converter.convertList(fullList) + converter.convertToHTML(suffixReturn);
        }
        htmlElement = htmlElement.replace(regexList, replacer);
        return htmlElement;
    }


    while (regexCodeBlockBackQuote.test(htmlElement) || regexCodeBlockTilde.test(htmlElement)) {
        // If Code
        function replacer(match, p1, p2, p3, p4, p5) {
            // Call convertInLine recursivly on the strings not in the code block
            return converter.convertToHTML(p1) + "<pre><code>" + p3 + "</code></pre>" + converter.convertToHTML(p5);
        }
        htmlElement = htmlElement.replace(regexCodeBlockBackQuote, replacer);
        return htmlElement;
    }
    while (regexBackslashCheck.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexBackslash, "$1U+0005C$4");
    }
    while (regexLink.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexLink, "$1<a href=\"$5\">$3</a>$7");
    }
    while (regexHeader.test(htmlElement)) {
        function replacer(match, p1, p2, p3) {
            let headerIndex = p1.length;
            return "<h" + headerIndex + ">" + p2 + "</h" + headerIndex + ">" + converter.convertToHTML(p3);
        }
        htmlElement = htmlElement.replace(regexHeader, replacer);
        return htmlElement;
    }
    while (regexCode.test(htmlElement)) {
        // If Code Block
        function replacer(match, p1, p2, p3, p4, p5) {
            // Call convertInLine recursivly on the strings not in the code block
            return converter.convertToHTML(p1) + "<code>" + p3 + "</code>" + converter.convertToHTML(p5);
        }
        htmlElement = htmlElement.replace(regexCode, replacer);
        return htmlElement;
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
    while (regexImage.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexImage, "$1<img src=\"$5\" alt=\"$3\">$7");
    }
    return htmlElement
}

converter.convertList = function (bullets) {
    function getBulletType(line) {
        let spaces = 0;
        for (let i = 0; i < line.length; i++) {
            if (line[i] == " ") spaces++;
            else if (line[i] == "-") return {"type": "unordered", "spaces": spaces, "line": line};
            else if (/\d+/.test(line[i]) && line[i+1] == ".") return {"type": "ordered", "spaces": spaces, "line": line};
            else return {"type": "false", "spaces": spaces};
        }
        return {"type": "false", "spaces": spaces};
    }
    console.log(bullets)
    let htmlElement = "<ul>";

    let currentSpaces = 0;
    for (index in bullets) {
        let bullet = getBulletType(bullets[index]);
        if (bullet["type"] == false) continue;
        if (bullet["spaces"] > currentSpaces) {
            htmlElement += "<ul>";
            currentSpaces = bullet["spaces"];
        } else if (bullet["spaces"] < currentSpaces) {
            htmlElement += "</ul>";
            currentSpaces = bullet["spaces"];
        }

        if (bullet["type"] == "ordered") {
            htmlElement += "<ol>" + this.convertToHTML(bullet["line"].replace(/\d./, "")) + "</ol>"
        } else if (bullet["type"] == "unordered") {
            htmlElement += "<li>" + this.convertToHTML(bullet["line"].replace("-", "")) + "</li>"
        }
    }
    htmlElement += "</ul>"
    return htmlElement;
}

converter.lastLineIsBullet = function(prefix) {
    let lines = prefix.split('\n')
    if (lines[lines.length-1] == "") lines.pop();
    let lastLine = lines[lines.length-1];
    if (this.isBullet(lastLine)) {
        lines.pop();
        return {"prefix": lines.join('\n'), "previous": lastLine};
    }
    else return {"prefix": lines.join('\n'), "previous": false};;
}
converter.isBullet = function (line) {
    let spaces = 0;
    if (line == undefined) return false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] == " ") spaces++;
        else if (line[i] == "-") return true
        else if (/(\d)+/.test(line[i]) && line[i+1] == ".") return true;
        else return false;
    }
    return false;
}

converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
}

// test
converter.convertToHTMLTestMany = function(strings) {
    for (let i = 0; i < strings.length; i ++) {
        let html = this.convertToHTML(strings[i]);
        this.appendHTMLElement(html + "<br>");
    }
}
