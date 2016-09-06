document.addEventListener('DOMContentLoaded', () => {
  let moniker = document.getElementById("moniker");
  const scrambler = () => {
    const thatArr = moniker.textContent.split('');
    moniker.textContent = thatArr.sort(() => {
      return 1 - Math.random();
    }).join('');
  };
  window.addEventListener('click', scrambler);
});
