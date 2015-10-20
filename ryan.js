function scrambler(str) {
    var thingy = str.textContent;
    var that = thingy.split("");
    var len = that.length;
    var thatChar;
    while (len) {
        var randomNum = Math.random() * len-- | 0;
        thatChar = that[len], that[len] = that[randomNum], that[randomNum] = thatChar;
    }
    document.getElementById("moniker").textContent = that.join("");
}
