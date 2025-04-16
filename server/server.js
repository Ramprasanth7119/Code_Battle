const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const { Server } = require("socket.io");
const PORT = process.env.PORT || 5000;

const passport = require('passport');
const session = require('express-session');
const googleStrategy = require('passport-google-oauth20').Strategy;

require("dotenv").config();

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questionRoutes");
const codeExecutionRoutes = require("./routes/codeExecution");

app.use(
    session({
        secret : "secret",
        resave : false,
        "saveUninitialized" : true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./utils/passportSetup");

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/submit", codeExecutionRoutes);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const runCode = async ({ source_code, language_id, stdin }) => {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code,
        language_id,
        stdin
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      }
    );
  
    return response.data;
  };

const roomUsers = {}; // Track users in rooms

let i = 0;

io.on("connection", (socket) => {
  console.log("New player connected "+ i++);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.room = room;

    // Track user in room
    if (!roomUsers[room]) roomUsers[room] = [];
    roomUsers[room].push(socket.id);

    // Notify self and others
    io.to(room).emit("roomUsers", roomUsers[room]);
    socket.emit("joinedRoom", room);
  });

  socket.on("leaveRoom", () => {
    const room = socket.room;
    if (room) {
      socket.leave(room);

      // Remove user from roomUsers
      roomUsers[room] = roomUsers[room].filter((id) => id !== socket.id);
      io.to(room).emit("roomUsers", roomUsers[room]);

      socket.emit("leftRoom", room);
      delete socket.room;
    }
  });

  socket.on("disconnect", () => {
    const room = socket.room;
    if (room && roomUsers[room]) {
      roomUsers[room] = roomUsers[room].filter((id) => id !== socket.id);
      io.to(room).emit("roomUsers", roomUsers[room]);
    }
    console.log("Player disconnected "+i--);
  });

  socket.on("submitCode", async ({ room, code, language_id, test_cases }) => {
    const result = await runCode({
      source_code: code,
      language_id,
      stdin: test_cases.input
    });

    io.to(room).emit("codeResult", {
      player: socket.id,
      result
    });
  });
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
