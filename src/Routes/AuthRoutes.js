const express = require("express");
const EndPoints = require("../Config/EndPoints");
const AuthControllers = require("../Controllers/AuthControllers")
const authRouter = express.Router();

authRouter.route(EndPoints.REGISTER_USER).post(AuthControllers.registerUser);
authRouter.route(EndPoints.LOGIN).post(AuthControllers.loginUser)

module.exports = authRouter;