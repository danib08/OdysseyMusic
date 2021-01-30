// Archivo de Constantes
  const URL = 'https://localhost:5001/api/'
  const APIkey = 'AIzaSyCf0ymU5WxTRkfEq9Z_S46Hb1lmZ8jXEqc'
  // Manejar Endpoints como servicios, archivo aparte, get, post, y esas cosas raras.
  // Manejar la UI por componentes

  // Evento del omnibox
chrome.omnibox.onInputChanged.addListener(async function(text, suggest) {
    let songData = await fetch(`${URL}songs/search/` + text, {
      method: 'GET',
      headers: {"Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(json => json)
    for (track in songData){
      suggest([{content: songData[track].nameSong + " " + songData[track].nameArtist, description: songData[track].nameSong}])
    }
    });

chrome.omnibox.onInputEntered.addListener(async function(text, disposition){
  let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=${APIkey}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
    }})
      .then(response => response.json())
      .then(json => json)
      sendYoutubeLink(myResponse.items[0].id.videoId)
})

function sendYoutubeLink(message){
    chrome.runtime.sendMessage({
        msg: message,
    });
}    

// Hacer user login
chrome.identity.getProfileUserInfo(async function(info) { 
  email = info.email; 
  user = info.id;
  console.log(email)
  console.log(user)
  let userEmail ={
    emailJ: email
  }
  // POST
  fetch(`${URL}users`, {
    method: 'POST',
    body: JSON.stringify(userEmail),
    headers: {"Content-type": "application/json"}
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
});
