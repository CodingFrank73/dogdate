const express = require("express");
const { doAuthMiddleware } = require("../auth/auth-middleware");

const {
    getChats
} = require("../use-cases/controller/chatController")

const chatRouter = express.Router();

chatRouter.get('/getChats', doAuthMiddleware, getChats)

module.exports = {
    chatRouter
}