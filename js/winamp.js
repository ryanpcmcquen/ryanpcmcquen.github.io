const winamp = new winamp2js({
    initialTrack: {
        name: "Ryan P.C. McQuen jazz demo",
        url:
            "https://ryanpcmcquen.org/assets/Ryan_PC_McQuen_jazz_please--2017.mp3"
    },
    initialSkin: {
        url:
            "https://ryanpcmcquen.org/assets/base-2.91.wsz"
    }
});

// Render after the skin has loaded.
winamp.renderWhenReady(document.querySelector(".winamp2-js"));
