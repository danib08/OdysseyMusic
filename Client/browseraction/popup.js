
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Variables needed
var player, playBtn, pauseBtn, stopBtn, volumeBar, timeBar, getSongBtn;

//Definiton of the variables created
playBtn = document.getElementById("play");
pauseBtn = document.getElementById("pause");
stopBtn = document.getElementById("stop");
volumeBar = document.getElementById("volume");
timeBar = document.getElementById("time");

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
console.log(playBtn);
//Change video api------------------------------------------
/*
getSongBtn.onclick = function() {
	var videoId= document.getElementById("videoId").value.toString();
	console.log (videoId);
	player.loadVideoById(videoId);
} -------------------------------------------------------------*/

//Starts playing the current song
playBtn.onclick = function () {
	player.playVideo();
}

//Pause the current song
pauseBtn.onclick = function () {
	player.pauseVideo();
}

//Stop the current song
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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	player.playVideo();
}

// This function is activated each time that the state of the player is changed
function onPlayerStateChange(event) {
	timeBar.max = player.getDuration();
	player.addEventListener("onStateChange", updateBar);
}

//Update the bar of the time 
function updateBar() {
	if (YT.PlayerState.PLAYING) {
		timeBar.value = player.getCurrentTime();
		setTimeout(updateBar, 2000); //The bar is update each 1 second
	}
}