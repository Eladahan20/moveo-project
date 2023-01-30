const express = require("express");
const mongoose = require("mongoose");
const Code = require("./models/Code");
const { Server } = require("socket.io");

//Initalize Express App
const port = process.env.PORT || 8080;
const app = express();
const server = require("http").createServer(app);

//App sets and middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));

//Mongo Atlas DB URI
const dbUri =
  "mongodb+srv://eladdahan:xWWEgv7Lez8hJx5@cluster0.imfflbo.mongodb.net/Codes?retryWrites=true&w=majority";

//Connect Mongoose and start listening
mongoose
  .connect(dbUri)
  .then((res) => server.listen(port))
  .catch((err) => console.log(err));

//New Socket
const io = new Server(server);

// Set mentor/student on connection
io.on("connection", (socket) => {
  let isMentor = true;
  const count = io.engine.clientsCount;
  if (count > 1) {
    isMentor = false;
  }
  console.log("is mentor: " + isMentor);
  io.emit("new-login", isMentor);
  // Disconnection handler
  socket.on("disconnect", (reason) => {
    console.log("user disconnected ");
  });
});
// Replies the code updates and broadcast to all clients exepct the one who fired.
io.on("code-changes", (message) => {
  socket.broadcast.emit("recieve-message", message);
});

//App Routes
// Homepage - pull all codeblocks from db
app.get("/", function (req, res) {
  Code.find()
    .then((results) => res.render("index", { codeblocks: results }))
    .catch((err) => console.log(err));
});
// Specific Code - pull codeblock by id from db
app.get("/code/:codeblockId", (req, res) => {
  const codeblockId = req.params.codeblockId;
  Code.findOne({ id: codeblockId })
    .then((codeblock) => res.render("code", { codeblock }))
    .catch((err) => console.log(err));
});
