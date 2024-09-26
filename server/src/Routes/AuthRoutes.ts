import express from "express";
// const EndPoints = require("../Config/EndPoints");
import AuthControllers from "../Controllers/AuthControllers"
const authRouter = express.Router();

authRouter.route("/auth/register-user").post(AuthControllers.registerUser);
authRouter.route("/auth/login").post(AuthControllers.loginUser)
authRouter.route("/get-all-languages").get(AuthControllers.getAllLanguages)
authRouter.route("/get-all-colleges").get(AuthControllers.getAllColleges)
authRouter.route("/get-all-schools").get(AuthControllers.getAllSchools)
authRouter.route("/generate-otp").post(AuthControllers.generateOtp)
authRouter.route("/verify-otp").post(AuthControllers.verifyOtp)

export default authRouter;