const express = require("express")
const authRouter = express.Router();
const { REGISTER_USER, LOGIN } = require("../../Config/AllUrlsEndPoint");
const { registerUser, loginUser } = require("../../Controllers/AuthControllers")

authRouter.route(REGISTER_USER).post(registerUser);
authRouter.route(LOGIN).post(loginUser)

module.exports = authRouter;