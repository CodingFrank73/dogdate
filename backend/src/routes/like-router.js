const express = require("express");
const { doAuthMiddleware } = require("../auth/auth-middleware");
const {
    updateLikeToMatch,
    createLike,
    getLikes,
    getLikeByID
} = require("../use-cases/controller/likeController")

const likeRouter = express.Router();


// GET all likes for a current user
likeRouter.get('/getLikes', doAuthMiddleware, getLikes)

// GET a user by ID
likeRouter.get('/getLikeByID/:id', doAuthMiddleware, getLikeByID)

likeRouter.post('/createLike', doAuthMiddleware, createLike)

likeRouter.put('/updateLikeToMatch', doAuthMiddleware, updateLikeToMatch)


module.exports = {
    likeRouter
}