const player = document.querySelector('.player'),
      btnPlay = document.querySelector('.play'),
      btnPrev = document.querySelector('.prev'),
      btnNext = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress_container'),
      progress = document.querySelector('.progress'),
      nameSong = document.querySelector('.name_song'),
      imgSrc = document.querySelector('.img_src'),
      coverImg = document.querySelector('.cover_img')
// названия песен
const songs = ['Накуримся, напьемся','Светлячок','CHAOS'];
// стартовая песня
let songIndex = 0;
// Загрузка песни
function loadSong(song){
    nameSong.innerHTML = song;
    audio.src = `audio/${song}.mp3`
    coverImg.src = `image/cover${songIndex + 1}.png`
}
loadSong(songs[songIndex]);

// Play
function playSong(){
    player.classList.add('playsong');
    coverImg.classList.add('active');
    imgSrc.src = `image/pause.png`
    audio.play();
}
// Stop
function pauseSong(){
    player.classList.remove('playsong');
    coverImg.classList.remove('active');
    imgSrc.src = `image/play.png`
    audio.pause();
}
btnPlay.addEventListener('click',() => {
    const isPlaying = player.classList.contains('playsong')
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})
// Следуйщая
function nextSong(){
    songIndex ++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
btnNext.addEventListener('click', nextSong)
// Предыдущая
function prevSong(){
    songIndex --;
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();
}
btnPrev.addEventListener('click', prevSong)
// Прогресс
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressProcent = (currentTime/ duration) * 100
    progress.style.width = `${progressProcent}%`;
}
audio.addEventListener('timeupdate',updateProgress)
// Перемотка
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click',setProgress)

//autoplay
audio.addEventListener('ended', nextSong)