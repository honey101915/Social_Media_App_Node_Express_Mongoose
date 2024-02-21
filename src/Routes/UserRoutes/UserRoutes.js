const express = require("express");
const { UPDATE_PROFILE } = require("../../Config/AllUrlsEndPoint");
const { updateProfile } = require("../../Controllers/UserControllers");
const validateToken = require("../../Middlewares/VerifyTokenHandler");
const userRouter = express.Router();

userRouter.route(UPDATE_PROFILE).post(validateToken, updateProfile)

module.exports = userRouter;