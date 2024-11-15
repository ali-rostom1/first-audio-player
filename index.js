var backGround = document.querySelector('.background');
var displayedMusicCover = document.querySelector('#musicCover');
var displayedMusicName = document.querySelector('#musicName');
var displayedArtistName = document.querySelector('#artistName');
var displayedTotalDuration = document.querySelector('.totalDuration');
var displayedCurrentDuration = document.querySelector('.currentDuration');
var progressBar = document.querySelector('#progress-bar');

var Songs = [];

function Song(name,artist,coverPath,audioPath){
    this.name = name;
    this.artist = artist;
    this.coverPath = coverPath;
    this.audioPath = audioPath;
    Songs.push(this);
    this.makeMusic = function(){
        let music = new Audio();
        music.src = audioPath;
        music.volume = 0.2;
        return music;
    }
    this.music = this.makeMusic();
    this.musicDuration = 0; 

    this.music.addEventListener('loadedmetadata', function () {
        this.musicDuration = this.music.duration;
        updateTotalDuration(Songs[index]);
    }.bind(this));
    this.music.addEventListener('timeupdate', function () {
        updateCurrentTime(this);
        updateProgressBar(this);
    }.bind(this));

    this.displayMusic = function(){
        backGround.style.background = `url('${coverPath}')`;
        displayedMusicCover.src = `${coverPath}`;
        displayedMusicName.textContent = `${name}`;
        displayedArtistName.textContent = `${artist}`;
    }
}

song1 = new Song('Let it happen','Tame impala','/assets/image/let_it_happen.jpg','/assets/audio/let_it_happen.mp3');
song2 = new Song('One more hour','Tame impala','/assets/image/one_more_hour.jpg','/assets/audio/one_more_hour.mp3');
song1 = new Song('505','Arctic Monkeys','/assets/image/505.jpg','/assets/audio/505.mp3');


console.log(Songs);
console.log(); 

index = 0;
isPlaying = false;

function updateTotalDuration(song){
    displayedTotalDuration.textContent = formatTime(song.musicDuration);

}

Songs[index].displayMusic();

var playBtn = document.querySelector('.playPause');
playBtn.addEventListener('click', function (){
    if(isPlaying){
        Songs[index].music.pause();
        isPlaying = false;

        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
    }else{
        Songs[index].music.play();
        isPlaying = true;
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    }
})


var nextBtn = document.querySelector('.fa-forward-step');
nextBtn.addEventListener('click', function(){
    Songs[index].music.pause();
    Songs[index].music.currentTime = 0;
    index = (index +1) % Songs.length;
    Songs[index].displayMusic();
    updateTotalDuration(Songs[index])
    Songs[index].music.play();
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    isPlaying = true;
})


var previousBtn = document.querySelector('.fa-backward-step');

previousBtn.addEventListener('click', function(){
    Songs[index].music.pause();
    Songs[index].music.currentTime = 0;
    index = (index - 1 + Songs.length) % Songs.length;
    Songs[index].displayMusic();
    updateTotalDuration(Songs[index]);
    Songs[index].music.play();
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    isPlaying = true;
})




function formatTime(seconds){
    let m = Math.floor(seconds/60);
    let s = Math.floor(seconds % 60);
    if(s<10){
        s = '0' + s;
    }
    return `${m}:${s}`;
}

function updateCurrentTime(song){
    displayedCurrentDuration.textContent = formatTime(song.music.currentTime);
}

function updateProgressBar(song){
    let percentage = (song.music.currentTime*100)/song.musicDuration;
    progressBar.style.width = `${percentage}%`;
}