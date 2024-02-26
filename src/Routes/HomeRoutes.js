const express = require("express")
const EndPoints = require("../Config/EndPoints");
const HomeControllers = require("../Controllers/HomeControllers");
const validateToken = require("../Middlewares/VerifyTokenHandler");

const homeRouter = express.Router()

homeRouter.route(EndPoints.GET_ALL_INTERESTS).get(HomeControllers.getAllInterests)
homeRouter.route(EndPoints.ADD_NEW_POST).post(validateToken, HomeControllers.addPost)
homeRouter.route(EndPoints.LIKE_POST).post(validateToken, HomeControllers.likePost)


module.exports = homeRouter