const express = require("express");
const request = require("request");
const path = require("path");
const mongoose = require('mongoose');
const Code = require('./models/Code');

//Initalize Express App
const port = process.env.PORT || 8080;
const app = express();
//App sets and middlewares
app.set("view engine", "ejs");
app.use(express.static('public'));
//Mongo Atlas DB URI
const dbUri = 'mongodb+srv://eladdahan:xWWEgv7Lez8hJx5@cluster0.imfflbo.mongodb.net/Codes?retryWrites=true&w=majority'

//Set up Websocket
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

//Connect Mongoose and start listening
mongoose.connect(dbUri)
  .then((res) => server.listen(port))
  .catch((err) => console.log(err));


//Websocket Events Handler
wss.on("connection", function connection(ws) {
  console.log("Connection made");
  //Client check (Mentor/Student), and implement states
  if (wss.clients.size === 1) {
    console.log("Mentor Logged In");
    ws.send("Mentor");
  } else {
    console.log("Student Logged In");
    ws.on("message", function incoming(message) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });
  }
  ws.on("close", (code, reason) => {
    console.log(wss.clients.size);
    console.log("client disconnected from server");
  });
});



//App Routes
app.get("/", function (req, res) {
  Code.find()
  .then((results) => res.render("index", { codeblocks: results }) )
  .catch((err) => console.log(err));
});

app.get("/code/:codeblockId", (req, res) => {
  const codeblockId = req.params.codeblockId;
  Code.findOne({id: codeblockId})
    .then((codeblock) => res.render("code", { codeblock }))
    .catch((err) => console.log(err))
});




