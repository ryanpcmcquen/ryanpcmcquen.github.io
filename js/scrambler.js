// @license magnet:?xt=urn:btih:cf05388f2679ee054f2beb29a391d25f4e673ac3&dn=gpl-2.0.txt GPL-v2-or-later
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
// @license-end
