(() => {
  const scrambler = () => {
    const moniker = document.getElementById("moniker");
    let thingy = moniker.textContent;
    const thatArr = thingy.split('');
    thingy = thatArr.sort(() => {
      return 1 - Math.random();
    }).join('');
  };
  window.addEventListener('click', scrambler);
})();
