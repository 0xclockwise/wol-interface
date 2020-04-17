const WAKE_URL = '/'
const REMOVE_URL = '/remove'
const PING_URL = '/ping'

function sendWolRequest(mac) {
  fetch(WAKE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'mac': mac })
  });
  console.log('sent wol request to server');
  
}

function remove(name, mac) {
  fetch(REMOVE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { 'name': name,
      'mac': mac })
  });
  console.log('sent remove request to server');
  location.reload()
  
}

function ping() {
  console.log('sending ping request to server');
  fetch(PING_URL, { method: 'GET'})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data);
    
    data.forEach(computer => {
      let statusTag = document.getElementById(computer.ip)
      if (computer.isAlive) {
        statusTag.innerHTML = 'Online'
        statusTag.style.color = 'green'
      }
      else {
        statusTag.innerHTML = 'Offline'
        statusTag.style.color = 'red'
      }
      
    });
  })
  
}

ping()