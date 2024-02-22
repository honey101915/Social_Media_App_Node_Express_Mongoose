const express = require("express");
const EndPoints = require("../Config/EndPoints");
const AdminControllers = require("../Controllers/AdminControllers")

const adminRouter = express.Router();

adminRouter.route(EndPoints.GET_ALL_USERS).get(AdminControllers.getAllUsers)

module.exports = adminRouter;