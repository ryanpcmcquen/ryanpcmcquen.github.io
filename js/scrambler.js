document.addEventListener('DOMContentLoaded', () => {
  let moniker = document.getElementById("moniker");
  const scrambler = () => {
    let thingy = moniker.textContent;
    const thatArr = thingy.split('');
    moniker.textContent = thatArr.sort(() => {
      return 1 - Math.random();
    }).join('');
  };
  window.addEventListener('click', scrambler);
});
