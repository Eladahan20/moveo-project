const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const codeblocks = require("./data/codeblocks.js");

const server = require('http').createServer(app);
const WebSocket = require('ws');


const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
    console.log('Connection made');
    // console.log(wss.clients.size)
    if (wss.clients.size === 1) {
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
app.set('view engine', 'ejs');
app.use(express.static('views'));


app.get('/', function(req, res) {
    res.render('index', {codeblocks: codeblocks});
  });

  app.get("/code/:codeblockId", (req, res) => {
    const codeblockId = req.params.codeblockId;
    const codeblock = codeblocks.find(c => c.id === parseInt(codeblockId));
    res.render("code", { codeblock });
});

  app.get('/code1', function(req, res) {
    res.sendFile(path.join(__dirname, 'Public/code1.html'));
  });

server.listen(port, () => {
    console.log('Server started');
  });
  