const express = require("express");
const appRootRouter = express.Router()

const EndPoints = require("../Config/EndPoints");
const authRouter = require("./AuthRoutes");
const userRouter = require("./UserRoutes");
const adminRouter = require("./AdminRoutes");

appRootRouter.use(EndPoints.AUTH, authRouter)
appRootRouter.use(userRouter)
appRootRouter.use(adminRouter)

module.exports = appRootRouter;