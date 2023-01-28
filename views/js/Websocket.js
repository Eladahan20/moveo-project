// Create WebSocket connection.

const socket = new WebSocket('wss://moveo-p.herokuapp.com/code');
// const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server");
});

socket.onclose = (event) => {
  console.log(`Connection closed: ${event.code} ${event.reason}`);
};

// Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

const endDrill = (code, solution) => {
    socket.close();
    window.location.href= '/';
};


var editableCode = document.getElementById("editableCode");
var role = document.getElementById("role");

editableCode.addEventListener("input", function () {
    var solution = document.getElementById('codeSolution').innerHTML;
    if (this.innerHTML === solution) {
        document.getElementById("smiley").style.display = "block";
    }
  // Send the updated code to the server via the WebSocket connection
    socket.send(this.textContent);
});

// Listen for messages from the server
socket.onmessage = function (event) {
  // Update the editable <code> element with the latest code from the server
  if (event.data.toString() == "Mentor") {
    // editableCode.setAttribute("contenteditable", false);
    role.innerHTML = "Mentor";
  } else {
    role.innerHTML = "Student";
    editableCode.textContent = event.data.toString();
  }
};
