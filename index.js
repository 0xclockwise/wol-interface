const wol = require('wol');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

function readEntries() {
  let data = fs.readFileSync('computers.json');
  return JSON.parse(data);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    console.log(`Sending WoL signal to ${req.body.mac}`);
    wol.wake(req.body.mac);
    res.json({ status: 'success' });
  })

app.get('/', function (req, res) {
  let computers = readEntries();
  res.render('noadmin', { computers });
  console.log('Request incoming');
})

app.get('/admin', (req, res) => {
  let computers = readEntries();
  res.render('admin', { computers });
})

app.use('/static', express.static('static'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cors());


app.post('/add', (req, res) => {
  // Make sure that no duplicates are added

  let buffer = JSON.stringify(readEntries().concat(req.body), null, 4);
  fs.writeFileSync('computers.json', buffer);
  res.redirect('/admin')
})

app.post('/remove', (req, res) => {
  console.log(req.body)
  
  let computers = readEntries();
  console.log('Computers:', computers);
  
  let newEntries = computers.filter(computer => computer.name != req.body.name)
  console.log('New entries', newEntries)
  fs.writeFileSync('computers.json', JSON.stringify(newEntries))
  res.redirect('/')
})

const port = 1234;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
})