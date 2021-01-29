
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Variables needed
var player, playBtn, pauseBtn, stopBtn, volumeBar, timeBar, getSongBtn, movingBar, playing;
movingBar = false;

//Definiton of the variables created
playBtn = document.getElementById("play");
// pauseBtn = document.getElementById("pause");
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

// Se cambia la canción y la información
async function changeSong(songId){
    player.loadVideoById(songId);

    // videoInfo devuelve un Promise y se trabaja con el resultado.
    videoInfo(songId).then(function(result){
        var status, imgUrl, name;
        status = result.playabilityStatus.status;
        imgUrl = result.videoDetails.thumbnail.thumbnails[2].url;
        name = result.videoDetails.title.replaceAll("+", " ");

        songName.innerHTML = name;
        mainImage.src = imgUrl;

        // Si el status es UNPLAYABLE se indica con el panel correspondiente
        if (status === "UNPLAYABLE"){
            panel.style.height = `${mainImage.height}px`;
            panel.style.width = `${mainImage.width}px`;
            panel.style.visibility = "visible";
        }
        else{
            panel.style.visibility = "hidden";
        } 
    })
}

playing = true;

playBtn.onclick = function () {
    if(playing){
        player.pauseVideo(); 
        playBtn.style.backgroundImage = "url(play.png)";
        playBtn.style.backgroundColor= "rgba(102, 102, 102, 0.0)";
        playBtn.style.border= "hidden";
        console.log("playing");
    }
    else{
        player.playVideo();
        playBtn.style.backgroundImage = "url(pause.png)";
        playBtn.style.backgroundColor= "rgba(102, 102, 102, 0.0)";
        playBtn.style.border= "hidden";
        console.log("stopping");
    }
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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	changeSong('Q2HkVnyCCak');
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
		setTimeout(updateBar, 1000); //The bar is update each 1 second
	}
}

// Se recibe la información del GET que se hace a YouTube y se retorna una Promise con un JSON con la información del video
async function videoInfo(songId){

    // Se parsea la respuesta del GET
    parseYoutubeInfoStringToFormats = function(youtubeInfoString) {
        var element, formatStreamArray, youtubeInfoArray, _i, _len;
        youtubeInfoArray = youtubeInfoString.split('&');
  
        if (youtubeInfoArray[0] === 'status=fail') {
          return false;
        }
  
        var _i, _len, _results;
  
        for (_i = 0, _len = youtubeInfoArray.length; _i < _len; _i++) {
          element = youtubeInfoArray[_i];
          if (element.split('=')[0] === 'player_response') {
              //console.log(element);
              _results = element;
              break;
          }
        }
        
        formatStreamArray = decodeURIComponent(_results);
        formatStreamArray = formatStreamArray.replace("player_response=", "");
        console.log(formatStreamArray);
        var jsonObj = JSON.parse(formatStreamArray);
        console.log(jsonObj);
        return jsonObj;
      };
    // Se utiliza el Promise por que sino no se puede retornar el valor (Problemas con procesos sincrónicos y asincrónicos)
    var promise = new Promise(function(resolve){
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.open("GET", "http://www.youtube.com/get_video_info?video_id=" + songId, true);
        anHttpRequest.setRequestHeader('Access-Control-Allow-Origin','*');
        anHttpRequest.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        anHttpRequest.setRequestHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
        anHttpRequest.setRequestHeader('Content-type', 'text');
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                resolve(parseYoutubeInfoStringToFormats(anHttpRequest.responseText));  
        };
        anHttpRequest.send(null);
    });

    return promise;
}

timeBar.onchange = function(){
    player.seekTo(timeBar.value, true);
    movingBar = false;
}

timeBar.onmousedown = function(){
    movingBar = true;
}

window.onbeforeunload = function(){
    
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log("https://www.youtube.com/embed/"+request.msg)
        //document.getElementById("interfaz").src="https://www.youtube.com/embed/"+request.msg
        changeSong(request.msg)
    }
);