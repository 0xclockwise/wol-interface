const API_URL = 'http://localhost:1234/'

function sendWolRequest(mac) {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'mac': mac })
  });
  console.log('sent request to server');
  
}