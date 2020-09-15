const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//middleware
const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");
const sessionController = require("./controllers/sessionController");

const PORT = 3000;
const app = express();

// websocket
const http = require("http");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

//handle parsing of request body
app.use(bodyParser.json());
//cookie parser
app.use(cookieParser());

// io.on("connection", (socket) => {
//   console.log("user connected");

//   socket.on("join", (room) => {
//     socket.join(room.split("/").join(""));
//     io.in(room.split("/").join(""));
//   });

//   socket.on("message", (message) => {
//     // io.in(message.room).emit("message", {
//     //   room: message.room,
//     //   value: message.newValue,
//     // });
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

io.on("connection", (socket) => {
  console.log("Server-Side: user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//serving bundle.js
app.use("/build", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/bundle.js"));
});

//serving index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

//handle sign-up requests
app.post(
  "/signup",
  userController.checkUsername,
  userController.createUser,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).json({ user: res.locals.user, files: res.locals.filesArr });
  }
);
//handle login requests
app.post(
  "/login",
  userController.verifyUser,
  userController.getFiles,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).json({ user: res.locals.user, files: res.locals.filesArr });
  }
);
//handle log-out requests
app.post("/logout", (req, res) => {
  res.clearCookie();
});

app.get("/editor", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../index.html"))
);

//global error handler
app.use("*", (err, req, res, next) => {
  res.status(404).send(err);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
