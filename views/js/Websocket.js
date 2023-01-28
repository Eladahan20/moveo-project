    // Create WebSocket connection.
    // const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
console.log('Connected to WS Server')
});

// Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

const sendMessage = () => {
socket.terminate();
}
var editableCode = document.getElementById("editableCode");
var role = document.getElementById("role");
editableCode.addEventListener("input", function() {
// Send the updated code to the server via the WebSocket connection
socket.send(this.innerHTML);
});
// Listen for messages from the server
socket.onmessage = function(event) {
// Update the editable <code> element with the latest code from the server
if (event.data.toString() == "Mentor") {
editableCode.setAttribute("contenteditable",false);
role.innerHTML = "Mentor";
} else {
editableCode.innerHTML = event.data.toString();
}
};

window.addEventListener("beforeunload", function(event) {
    websocket.close(1000, "Client requested closure");
  });
