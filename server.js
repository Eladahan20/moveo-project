const express = require("express");
const request = require("request");
const path = require("path");
const app = express();

// load DB
const codeblocks = require("./data/codeblocks.js");

//Set up Websocket
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

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
  //Connection Ends
  ws.on("close", (code, reason) => {
    console.log(wss.clients.size);
    console.log("client disconnected from server");
  });
});

//App sets and routes
app.set("view engine", "ejs");
app.use(express.static("views"));

app.get("/", function (req, res) {
  res.render("index", { codeblocks: codeblocks });
});

app.get("/code/:codeblockId", (req, res) => {
  const codeblockId = req.params.codeblockId;
  const codeblock = codeblocks.find((c) => c.id === parseInt(codeblockId));
  res.render("code", { codeblock });
});


const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("Server started");
});
