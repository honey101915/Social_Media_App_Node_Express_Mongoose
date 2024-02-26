const express = require("express");
const EndPoints = require("../Config/EndPoints");
const UserControllers = require("../Controllers/UserControllers")
const validateToken = require("../Middlewares/VerifyTokenHandler")

const userRouter = express.Router();

userRouter.route(EndPoints.UPDATE_PROFILE).post(validateToken, UserControllers.updateProfile)
userRouter.route(EndPoints.DELETE_PROFILE).delete(validateToken, UserControllers.deleteProfile)
userRouter.route(EndPoints.LOGOUT).post(validateToken, UserControllers.logout)
userRouter.route(EndPoints.SELECT_INTERESTS).post(validateToken, UserControllers.addInterests)

module.exports = userRouter;