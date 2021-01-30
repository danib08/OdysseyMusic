
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Variables needed
var player, playBtn, pauseBtn, stopBtn, volumeBar, timeBar, getSongBtn, movingBar, playing, songName, songImage, panel;
movingBar = false;

//Definiton of the variables created
playBtn = document.getElementById("play");
prevBtn = document.getElementById("previous");
stopBtn = document.getElementById("stop");
volumeBar = document.getElementById("volume");
timeBar = document.getElementById("time");
songName = document.getElementById("name");
songImage = document.getElementById("albumImage");
panel = document.getElementById("panelItem");


//Starts the YouTube player after de API code downloads
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        //Both of the parameters are 0 because the video is not useful for the project
        height: '0',
        width: '0',
        videoId: 'Q2HkVnyCCak',
        playerVars: { 'controls': 2 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });
}

//Starts playing the current song

playing = true;

playBtn.onclick = function () {
    if (playing) {
        player.pauseVideo();
        playBtn.style.backgroundImage = "url(play.png)";
    }
    else {
        player.playVideo();
        playBtn.style.backgroundImage = "url(pause.png)";
    }
    playBtn.style.backgroundColor = "rgba(102, 102, 102, 0.0)";
    playBtn.style.border = "hidden";
    playing = !playing;
}

//Pause the current song
stopBtn.onclick = function () {
    player.stopVideo();
}

//Update the volume of the current song
volumeBar.onclick = function (e) {
    player.setVolume(e.target.value);
}

//Delay or advance the song according to the bar
timeBar.onclick = function (e) {
    player.seekTo(e.target.value, true);
}

prevBtn.onclick = function () { //------------------------------------------
    changeSong('h5WN3pkxPF0');
    //changeSong('rBlOSqZ0UlE');
}

function changeSong(songId) {
    player.loadVideoById(songId);
    updateData(songId);
    player.playVideo();
    setTimeout(isPlaying, 3000); //The bar is update each 2 seconds
}

function isPlaying() {
    var time = player.getCurrentTime();
    if (time != 0) {
        panel.style.visibility = "hidden";
        console.log("Si se va a reproducir");
    }
    else {
        panel.style.height = `${songImage.height}px`;
        panel.style.width = `${songImage.width}px`;
        panel.style.visibility = "visible";
        console.log("No se va a reproducir");
    }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    changeSong('Q2HkVnyCCak');
    player.loadVideoById('Q2HkVnyCCak');

}

// This function is activated each time that the state of the player is changed
function onPlayerStateChange(event) {
    timeBar.max = player.getDuration();
    console.log("The player duration is " + player.getDuration());
    player.addEventListener("onStateChange", updateBar);
}

//Update the bar of the time 
function updateBar() {
    if (YT.PlayerState.PLAYING) {
        timeBar.value = player.getCurrentTime();
        setTimeout(updateBar, 2000); //The bar is update each 2 seconds
    }
}

timeBar.onchange = function () {
    player.seekTo(timeBar.value, true);
    movingBar = false;
}

timeBar.onmousedown = function () {
    movingBar = true;
}

window.onbeforeunload = function () {

}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //console.log("https://www.youtube.com/embed/"+request.msg)
    //document.getElementById("interfaz").src="https://www.youtube.com/embed/"+request.msg
    changeSong(message.msg);
}
);

async function updateData(songId) {
    console.log("el song id es " + songId);
    let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${songId}&key= AIzaSyDLyxAnr6NvOxnPSC6clqWItKjdfPEAFKA`,
        {
            method: 'GET', headers: { "Content-type": "application/json" }
        }).then(response => response.json())
        .then(json => json);
    console.log(myResponse);
    songName.innerHTML = myResponse.items[0].snippet.title;
    songImage.src = myResponse.items[0].snippet.thumbnails.high.url;
    panel.style.height = `${songImage.height}px`; panel.style.width = `${songImage.width}px`;
}
