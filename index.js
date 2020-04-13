const wol = require('wol')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const csv = require('csv-parser')
const fs = require('fs')

function readEntries() {
    computers = []
    fs.createReadStream('computers.csv')
        .pipe(csv())
        .on('data', (row) => {
            computers.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
}


var app = express()
app.use('/static', express.static('static'))
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))
app.use(cors())
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log(`Sending WoL signal to ${req.body.mac}`)
    wol.wake(req.body.mac);
    res.json({status: 'success'})
})

app.all('/', function (req, res) {
    computers = []
    fs.createReadStream('computers.csv')
        .pipe(csv())
        .on('data', (row) => {
            computers.push(row);
        })
        .on('end', () => {
            res.render('index', {
                computers: computers
            })
        });
    console.log('Request incoming')
})



const port = 1234
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})