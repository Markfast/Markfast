let converter = {};

// HTML Object
converter.currentObject = 0;
converter.OBJECT_HEADERS = 1;
converter.OBJECT_EMPHASIS = converter.OBJECT_HEADERS + 1;
converter.OBJECT_UNORDEREDLIST = converter.OBJECT_EMPHASIS + 1;
converter.OBJECT_ORDEREDLIST = converter.OBJECT_UNORDEREDLIST + 1;
converter.OBJECT_IMAGES = converter.OBJECT_ORDEREDLIST + 1;
converter.OBJECT_LINKS = converter.OBJECT_IMAGES + 1;
converter.OBJECT_BLOCKQUOTES = converter.OBJECT_LINKS + 1;

converter.convertToHTML = function(markdown) {
    console.log(markdown);

    let lines = markdown.split("\n");
    let lineCounter = 0;
    for(lineCounter = 0; lineCounter < lines.length; lineCounter++) {
        line = lines[lineCounter];

        if (this.currentObject == 0) {
            this.evaluateObject(line);
        }

        let htmlElement;
        switch(this.currentObject) {
            case this.OBJECT_HEADERS:
                var hNum = line.count("#")
                htmlElement = line.replace(/#/g, "");
                htmlElement = "<h" + hNum + ">" + htmlElement + "</h" + hNum + ">";
                console.log(htmlElement);
                this.appendHTMLElement(htmlElement);
                break;
            case this.OBJECT_UNORDEREDLIST:
                bullets = [line]
                for (let nextLine = lineCounter + 1; nextLine < lines.length; nextLine++) {
                    if (this.isBullet(lines[nextLine])) {
                        bullets.push(lines[nextLine]);
                        lineCounter++;
                    }
                    else {
                        break;
                    }
                }
                htmlElement = "<ul>";
                for (index in bullets) {
                    htmlElement += "<li>" + this.convertEmphasis(bullets[index].replace("-", "")) + "</li>"
                }
                htmlElement += "</ul>"
                this.appendHTMLElement(htmlElement);
                break;
            default:
                this.appendHTMLElement(this.convertEmphasis(line));
        }
    }

};

converter.convertEmphasis = function (line) {
    let htmlElement = "",
        astrickBit = 0,
        italicBit = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] == "\\") {i++; continue;}
        else if (line[i] == "*") {
            if (i + 1 < line.length && line[i+1] == "*") {
                i++;
                astrickBit = (astrickBit + 1) % 2;
                if (astrickBit == 1) htmlElement += "<b>"
                else htmlElement += "</b>"
            }
            else {
                italicBit = (italicBit + 1) % 2;
                if (italicBit == 1) htmlElement += "<i>"
                else htmlElement += "</i>"
            }
        }
        else if (line[i] == "_") {
            if (i + 1 < line.length && line[i+1] == "_") {
                i++;
                astrickBit = (astrickBit + 1) % 2;
                if (astrickBit == 1) htmlElement += "<b>"
                else htmlElement += "</b>"
            }
            else {
                italicBit = (italicBit + 1) % 2;
                if (italicBit == 1) htmlElement += "<i>"
                else htmlElement += "</i>"
            }
        }
        else htmlElement += line[i];
    }
    console.log(htmlElement);
    return htmlElement
}

converter.isBullet = function (line) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == " ") continue;
        else if (line[i] = "-") return true;
        else return false;
    }
}

converter.evaluateObject = function(line) {
    if (line[0] == "#") this.currentObject = this.OBJECT_HEADERS;
    else if (line[0] == "-") this.currentObject = this.OBJECT_UNORDEREDLIST;
    else this.currentObject = 0;
}

converter.appendHTMLElement = function (htmlElement) {
    document.getElementById("test").innerHTML += htmlElement;
    this.currentObject = 0;
}
