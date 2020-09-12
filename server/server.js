const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000;

app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

io.on("connection", () => {
  console.log("user has connnected");
});

// app.use("*", (err, req, res, next) => {
//   res.status(404).send(err);
// });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
