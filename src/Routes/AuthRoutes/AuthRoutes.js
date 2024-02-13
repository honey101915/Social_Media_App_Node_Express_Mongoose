const express = require("express")
const authRouter = express.Router();
const registerUser = require("../../Controllers/AuthControllers");
const loginUser = require("../../Controllers/AuthControllers");

const { REGISTER_USER, LOGIN } = require("../../Config/AllUrlsEndPoint");


authRouter.post(REGISTER_USER, registerUser);
authRouter.post(LOGIN, loginUser)

module.exports = authRouter;