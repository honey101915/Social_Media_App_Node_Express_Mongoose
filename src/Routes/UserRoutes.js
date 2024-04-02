const express = require("express");
const EndPoints = require("../Config/EndPoints");
const UserControllers = require("../Controllers/UserControllers")
const validateToken = require("../Middlewares/VerifyTokenHandler")

const userRouter = express.Router();

userRouter.route("/update-profile").post(validateToken, UserControllers.updateProfile)
userRouter.route("/delete-profile").delete(validateToken, UserControllers.deleteProfile)
userRouter.route("/logout").post(validateToken, UserControllers.logout)
userRouter.route("/select-interests").post(validateToken, UserControllers.addInterests)

module.exports = userRouter;