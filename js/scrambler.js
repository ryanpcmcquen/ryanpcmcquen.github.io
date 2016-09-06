document.addEventListener('DOMContentLoaded', () => {
  const moniker = document.getElementById("moniker");
  const scrambler = () => {
    const thatArr = moniker.textContent.split('');
    moniker.textContent = thatArr.sort(() => {
      return 0.5 - Math.random();
    }).join('');
  };
  window.addEventListener('click', scrambler);
});
