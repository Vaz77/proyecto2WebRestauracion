const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("playPauseButton");
let isPlaying = true;

playPauseButton.addEventListener("click", function () {
    if (isPlaying) {
    audio.pause();
    playPauseButton.src = "./img/play.png";
    } else {
    audio.play();
    playPauseButton.src = "./img/pause.png";
    }
    isPlaying = !isPlaying;
});
