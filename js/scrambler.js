(() => {
  const scrambler = () => {
    const moniker = document.getElementById("moniker");
    const thingy = moniker.textContent;
    const that = thingy.split("");
    let len = that.length;
    let thatChar;
    while (len) {
      let randomNum = Math.random() * len-- | 0;
      thatChar = that[len], that[len] = that[randomNum], that[randomNum] = thatChar;
    }
    moniker.textContent = that.join("");
  };
  window.addEventListener('click', scrambler);
})();
