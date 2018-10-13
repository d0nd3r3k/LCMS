const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');

const env = process.env.NODE_ENV || 'dev';
const config = require('./config')[env];
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened: ', err);
  }
  console.log('Modular Synth Server: http://localhost:%s', port);

});

const WebSocket = require('ws');
const main = require('./controllers/main');

/*
* LiveModularSynth Websocket Server
*/

const wss = new WebSocket.Server({ port: 8888 });

wss.on('connection', function connection(ws) {
console.log("New connection made to LiveModularSynth WSS!");

  ws.on('message', function incoming(message) {
    main.sendToBuffer(message);
    });
});
