const express = require("express");
const appRootRouter = express.Router()
const authRoutes = require("./AuthRoutes/AuthRoutes");
const { AUTH } = require("../Config/AllUrlsEndPoint");
const adminRouter = require("./AdminRoutes/AdminRoutes");

appRootRouter.use(AUTH, authRoutes)
appRootRouter.use(adminRouter)

module.exports = appRootRouter;