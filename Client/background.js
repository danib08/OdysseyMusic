  // Evento del omnibox
  chrome.omnibox.onInputEntered.addListener(function(text) {
	  console.log(text);
    alert(text + '"')
    let data = {
      search: text
    }

    fetch('https://localhost:5001/api/songs?search', {
      method: 'GET',
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
    });

//Hacer user login
chrome.identity.getProfileUserInfo( async function(info) { 
  email = info.email; 
  user = info.id;
  console.log(email)
  console.log(user)
  let userEmail ={
    emailJ: email
  }

  fetch('https://localhost:5001/api/users', {
    method: 'POST',
    body: JSON.stringify(userEmail),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
});
