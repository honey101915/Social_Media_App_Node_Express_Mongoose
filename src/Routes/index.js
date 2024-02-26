const express = require("express");
const appRootRouter = express.Router()

const authRouter = require("./AuthRoutes");
const userRouter = require("./UserRoutes");
const adminRouter = require("./AdminRoutes");
const homeRouter = require("./HomeRoutes")

appRootRouter.use(authRouter)
appRootRouter.use(userRouter)
appRootRouter.use(adminRouter)
appRootRouter.use(homeRouter)

module.exports = appRootRouter;