    // Create WebSocket connection.
    console.log('helo!');
const socket = new WebSocket('wss://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
console.log('Connected to WS Server')
});

// Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

const sendMessage = () => {
socket.send('Hello From Client1!');
}
var editableCode = document.getElementById("editableCode");
editableCode.addEventListener("input", function() {
// Send the updated code to the server via the WebSocket connection
socket.send(this.innerHTML);
});
// Listen for messages from the server
socket.onmessage = function(event) {
// Update the editable <code> element with the latest code from the server
if (event.data.toString() == "Mentor") {
editableCode.setAttribute("contenteditable",false);
} else {
editableCode.innerHTML = event.data.toString();
}
};
