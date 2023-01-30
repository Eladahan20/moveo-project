// Create WebSocket connection.
const socket = io();

// Get elements
let editableCode = document.getElementById("editableCode");
let solution = document.getElementById("codeSolution").textContent;

// Socket mentor/student distinguish
socket.on("new-login", (isMentor) => {
  console.log('new login from client');
  if (isMentor) {
    editableCode.setAttribute("contenteditable", false);
  }
});


// fires the inout from the student to the socket, fires smiley if done. 
editableCode.addEventListener("input", function () {
  console.log('input changed');
  if (this.textContent == solution) {
    document.getElementById("smiley").style.display = "block";
  }
  socket.emit("code-changed", this.textContent);
});

// update the code area with each message
socket.on("recieve-message", (message) => {
  console.log(message);
  console.log(editableCode);
  editableCode.innerHTML = message;
});

//End drill, close socket and redirect to homepage
const endDrill = () => {
  socket.disconnect();
  window.location.href = "/";
};
