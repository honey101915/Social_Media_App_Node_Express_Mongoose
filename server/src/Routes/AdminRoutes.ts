import express from "express";
// const EndPoints = require("../Config/EndPoints");
import AdminControllers from "../Controllers/AdminControllers"

const adminRouter = express.Router();

adminRouter.route("/get-all-users").get(AdminControllers.getAllUsers)

export default adminRouter;