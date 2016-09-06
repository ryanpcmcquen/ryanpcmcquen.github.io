(() => {
  const scrambler = () => {
    const moniker = document.getElementById("moniker");
    const thatArr = thingy.split('');
    moniker.textContent = thatArr.sort(() => {
      return 1 - Math.random();
    }).join('');
  };
  window.addEventListener('click', scrambler);
})();
