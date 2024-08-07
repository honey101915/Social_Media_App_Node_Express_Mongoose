const express = require("express");
const EndPoints = require("../Config/EndPoints");
const AuthControllers = require("../Controllers/AuthControllers")
const authRouter = express.Router();

// authRouter.route(EndPoints.REGISTER_USER).post(AuthControllers.registerUser);
authRouter.route("/auth/register-user").post(AuthControllers.registerUser);
authRouter.route("/auth/login").post(AuthControllers.loginUser)

module.exports = authRouter;