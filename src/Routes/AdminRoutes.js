const express = require("express");
const EndPoints = require("../Config/EndPoints");
const AdminControllers = require("../Controllers/AdminControllers")

const adminRouter = express.Router();

adminRouter.route("/get-all-users").get(AdminControllers.getAllUsers)

module.exports = adminRouter;