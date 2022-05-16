const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

const { userRouter } = require("./routes/user-router");

dotenv.config()

const PORT = process.env.PORT || 9000;
const app = express();

app.use(cors({ origin: true, credentials: true }))
// app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }))

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

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server works...")
})

app.use("/api/users", userRouter)


app.listen(PORT, () => { console.log("Server listen on Port:", PORT) })


