const wol = require('wol');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

function readEntries() {
  let data = fs.readFileSync('computers.json');
  return JSON.parse(data);
}


var app = express();
app.use('/static', express.static('static'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log(`Sending WoL signal to ${req.body.mac}`);
  wol.wake(req.body.mac);
  res.json({ status: 'success' });
})

app.all('/', function (req, res) {
  let computers = readEntries();
  res.render('index', { computers });
  console.log('Request incoming');
})

app.get('/add', (req, res) => {
  res.render('add');
})

app.post('/add', (req, res) => {
  console.log(req.body);
  let buffer = JSON.stringify(readEntries().concat(req.body), null, 4);
  fs.writeFileSync('computers.json', buffer);
  res.redirect('/add');
})



const port = 1234
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
})
