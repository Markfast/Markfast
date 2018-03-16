String.prototype.count = function(char) {
    let counter = 0;
    for (let i = 0; i < this.length; i++) {
        if (this.charAt(i) == char) counter++;
    }
    return counter;
}
