// Make connection
var socket = io.connect("http://localhost:1000");

// query dom

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

// emit events

btn.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener("keypress", function() {
    socket.emit("typing", {
      user: handle.value
    });
});

// listen for events
socket.on("chat", function(data) {
  output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data.user + " is typing...</em></p>";
});
