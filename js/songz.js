// @license magnet:?xt=urn:btih:cf05388f2679ee054f2beb29a391d25f4e673ac3&dn=gpl-2.0.txt GPL-v2-or-later
const songs = [...document.querySelectorAll('.songList li')];
const currentSong = document.querySelector('#currentSong');
songs.map((s) => {
  s.addEventListener('click', () => {
    currentSong.setAttribute('src', "https://archive.org/download/plays_some_standards/" + s.textContent.toLowerCase().replace(/\s/g, '_') + ".mp3");
    songs.map((i) => {
      i.style.textDecoration = 'none';
    });
    s.style.textDecoration = 'underline';
    currentSong.play();
  });
});
// @license-end
