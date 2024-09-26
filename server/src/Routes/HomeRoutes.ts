import express from "express";
// const EndPoints = require("../Config/EndPoints");
import HomeControllers from "../Controllers/HomeControllers"
import validateToken from "../Middlewares/VerifyTokenHandler"

const homeRouter = express.Router()

homeRouter.route("/get-all-interests").get(HomeControllers.getAllInterests)
homeRouter.route("/add-new-post").post(validateToken, HomeControllers.addPost)
homeRouter.route('/like-post').post(validateToken, HomeControllers.likePost)
homeRouter.route("/dislike-post").post(validateToken, HomeControllers.dislikePost)
homeRouter.route("/get-all-posts").get(validateToken, HomeControllers.getAllPosts)
homeRouter.route("/get-user-detail").get(validateToken, HomeControllers.getUserDetails)

export default homeRouter