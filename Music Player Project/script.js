// ------- Playlist Data (Dynamic Playlist) -------
const songs = [
    {
        title: "Song 1",
        file: "song1.mp3"
    },
    {
        title: "Song 2",
        file: "song2.mp3"
    },
    {
        title: "Song 3",
        file: "song3.mp3"
    }
    // Tum aur songs add kar sakte ho
];

// ------- DOM Elements -------
const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');

let currentSongIndex = 0;
let isPlaying = false;

// ------- Helper : Format Time (sec -> mm:ss) -------
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60) || 0;
    const seconds = Math.floor(timeInSeconds % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// ------- Load Song -------
function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;            // Audio API use
    songTitle.textContent = song.title;

    // Playlist me active class update
    document.querySelectorAll('#playlist li').forEach((li, i) => {
        li.classList.toggle('active', i === index);
    });
}

// ------- Play / Pause Functions -------
function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = '⏸️';
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = '▶️';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// ------- Build Playlist Dynamically -------
function buildPlaylist() {
    playlistEl.innerHTML = '';

    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;

        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        playlistEl.appendChild(li);
    });
}

// ------- Event Listeners -------

// Play/Pause button
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Next / Prev buttons
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Audio timeupdate event -> progress bar + time
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;

        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

// Click on progress bar -> seek
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

// When song ends -> auto next
audio.addEventListener('ended', nextSong);

// ------- Init -------
buildPlaylist();
loadSong(currentSongIndex);
