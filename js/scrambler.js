window.addEventListener('click',
    function scrambler() {
        var moniker = document.getElementById("moniker");
        var thingy = moniker.textContent;
        var that = thingy.split("");
        var len = that.length;
        var thatChar;
        while (len) {
            var randomNum = Math.random() * len-- | 0;
            thatChar = that[len], that[len] = that[randomNum], that[randomNum] = thatChar;
        }
        moniker.textContent = that.join("");
    }
);
