const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server });
let firstUser= true;

wss.on('connection', function connection(ws) {
    console.log('Connection made');
    if (firstUser) {
        firstUser=false;
        console.log('Mentor Logged In')
        ws.send('Mentor');
    } else {
        console.log('Student Logged In')
        ws.on('message', function incoming(message) {
            wss.clients.forEach(function each(client) {
              if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
              }
            });
        });
    }

  });

const port = process.env.PORT || 8080;

app.use(express.static('Public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'Public/index.html'));
  });

  app.get('/code1', function(req, res) {
    res.sendFile(path.join(__dirname, 'Public/code1.html'));
  });

server.listen(port, () => {
    console.log('Server started');
  });
  