const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv").config();

const { chatRouter } = require("./routes/chat-router");
const { likeRouter } = require("./routes/like-router");
const { userRouter } = require("./routes/user-router");
const { suggestionRouter } = require("./routes/suggestion-router");

//Socket.io:
const { Server } = require("socket.io");
const http = require("http")
const server = http.createServer(app); //
//const io = require("socket.io")(server)


const PORT = process.env.PORT || 9000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }))
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

console.log(
  "Frontend_URL:", process.env.FRONTEND_URL
);

const oneDayInMs = 24 * 60 * 60 * 1000;
const isLocalHost = process.env.FRONTEND_URL === 'http://localhost:3000';

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SESSION_SECRET,
    httpOnly: true,
    expires: new Date(Date.now() + oneDayInMs),
    sameSite: isLocalHost ? 'lax' : 'none',
    secure: isLocalHost ? false : true,
  })
)

// +++++++++++ Routes ++++++++++
app.use("/api/chat", chatRouter)
app.use("/api/like", likeRouter)
app.use("/api/users", userRouter)
app.use("/api/suggestion", suggestionRouter)

app.get("/", (req, res) => {
  res.send("server works...")
})



//##Socket.io - start:
const io = new Server(server, { //server initialization as io variable
  cors: { //to solve cors issue
    origin: true,//"http://localhost:3000", // frontend server
    methods: ["GET", "POST"] //accepts GET and POST requests
  },
});


io.on("connection", (socket) => { //we listen on event with this id 
  console.log(`USER CONNECTED: ${socket.id}`);   // should be shown whenever frontend is refreshed - DOES NOT WORK!!!

  socket.on("join_room", (data) => { //data from frontend, like room id
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`); //socket.id is user id, data: data that has been sent from frontend
  });

  socket.on("send_message", (data) => {
    console.log(data) //event Send Message receives data sent from frontend
    socket.to(data.room).emit("receive_message", data); //emits event to be listened in frontend
  }); /// data.room: restricts emit event to room that was passed in as data

  socket.on("disconnect", () => {  //disconnects from server
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => { console.log("Server listen on Port:", PORT) })


