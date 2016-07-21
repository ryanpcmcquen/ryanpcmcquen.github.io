window.addEventListener('click',
  const scrambler = () => {
    const moniker = document.getElementById("moniker");
    const thingy = moniker.textContent;
    const that = thingy.split("");
    const len = that.length;
    let thatChar;
    while (len) {
      let randomNum = Math.random() * len-- | 0;
      thatChar = that[len], that[len] = that[randomNum], that[randomNum] = thatChar;
    }
    moniker.textContent = that.join("");
  }
);
