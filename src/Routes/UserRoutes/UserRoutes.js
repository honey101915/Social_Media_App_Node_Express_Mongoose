const express = require("express");
const { UPDATE_PROFILE } = require("../../Config/AllUrlsEndPoint");
const { editProfile } = require("../../Controllers/UserControllers");
const validateToken = require("../../Middlewares/VerifyTokenHandler");
const userRouter = express.Router();

userRouter.route(UPDATE_PROFILE).post(validateToken, editProfile)

module.exports = userRouter;