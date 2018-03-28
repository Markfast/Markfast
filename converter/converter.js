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
            //console.log("1: " + p1, "2: " + p2, "3: " + p3, "4: " + p4, "5: " + p5, "6: " + p6);
            let headerIndex = p3.length;
            return converter.convertToHTML(p1) + "<h" + headerIndex + ">" + p4 + "</h" + headerIndex + ">" + converter.convertToHTML(p5);
        }
        htmlElement = htmlElement.replace(regexHeader, replacer);
        return htmlElement;
    }

    // New Line
    while(regexNewLineMultiple.test(htmlElement)) {
        //console.log("Here!");
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

    htmlElement = htmlElement.replaceAll("<br />", "\n");
    // Bold & Italic
    while (regexBoldAsterisk.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6, p7) {
            //console.log("1:", p1, "\n2:", p2, "\n3:", p3, "\n4:", p4, "\n5:", p5, "\n6:", p6, "\n7:", p7);
            return p1 + "<b>" + p3 + p4 + p5 + "</b>" + p7;
        }
        htmlElement = htmlElement.replace(regexBoldAsterisk, replacer);
    }
    while (regexBoldUnderscore.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6, p7) {
            //console.log("1:", p1, "\n2:", p2, "\n3:", p3, "\n4:", p4, "\n5:", p5, "\n6:", p6, "\n7:", p7);
            return p1 + "<b>" + p3 + p4 + p5 + "</b>" + p7;
        }
        htmlElement = htmlElement.replace(regexBoldUnderscore, replacer);
    }
    console.log(htmlElement);
    while (regexItalicAsterisk.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6, p7, p8) {
            console.log("1:", p1, "\n2:", p2, "\n3:", p3, "\n4:", p4, "\n5:", p5, "\n6:", p6, "\n7:", p7, "\n8:", p8);
            return p1 + "<i>" + p3 + p4 + p5 + "</i>" + p7 + p8;
        }
        htmlElement = htmlElement.replace(regexItalicAsterisk, replacer);
    }
    while (regexItalicUnderscore.test(htmlElement)) {
        function replacer(match, p1, p2, p3, p4, p5, p6, p7, p8) {
            console.log(p1, "\n", p2, "\n", p3, "\n", p4, "\n", p5, "\n", p6, "\n", p7, "\n", p8);
            return p1 + "<i>" + p3 + p4 + p5 + "</i>" + p7 + p8;
        }
        htmlElement = htmlElement.replace(regexItalicUnderscore, replacer);
    }
    htmlElement = htmlElement.replaceAll("\n", "<br />");
    while (regexLink.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexLink, "$1 <a href=\"$6\">$4</a> $8");
    }
    while (regexImage.test(htmlElement)) {
        htmlElement = htmlElement.replace(regexImage, "$1 <img src=\"$6\" alt=\"$4\"> $8");
    }
    return htmlElement
}
converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
}
