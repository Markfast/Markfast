String.prototype.count = function(char) {
    let counter = 0;
    for (let i = 0; i < this.length; i++) {
        if (this.charAt(i) == char) counter++;
    }
    return counter;
}

String.prototype.replaceAll = function(searchvalue, newvalue) {
    let string = this;
    while (string.includes(searchvalue)) string = string.replace(searchvalue, newvalue);
    return string;
}
