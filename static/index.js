const WAKE_URL = 'http://localhost:1234/'
const REMOVE_URL = 'http://localhost:1234/remove'

function sendWolRequest(mac) {
  fetch(WAKE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'mac': mac })
  });
  console.log('sent request to server');
  
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
  console.log('sent request to server');
  location.reload()
  
}