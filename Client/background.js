  // Archivo de Constantes
  const URL = 'https://localhost:5001/api/'
  // Manejar Endpoints como servicios, archivo aparte, get, post, y esas cosas raras.
  // Manejar la UI por componentes

  // Evento del omnibox
chrome.omnibox.onInputChanged.addListener(async function(text) {
	console.log(text);
    alert(text + '"')
    let data = {
      search: text
    }
    let songData = await fetch(`${URL}songs/search/` + text, {
      method: 'GET',
      headers: {"Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(json => json)
    for (track in songData){
      suggest([{content: songData[track].songName + " " + songData[track].artistName, description: songData[track].songName}])
    }
    });

chrome.omnibox.onInputEntered.addListener(async function(text, disposition){
  let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=AIzaSyB61Hqd0S1jfbqMuuFHMU8ojp3O8gEry9k`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
    }})
      .then(response => response.json())
      .then(json => json)
      console.log(myResponse.items[0].id.videoId)
      await sendYoutubeLink(myResponse.items[0].id.videoId)
})


async function sendYoutubeLink(message){
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
