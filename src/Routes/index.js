const express = require("express");
const appRootRouter = express.Router()
const authRoutes = require("./AuthRoutes/AuthRoutes");
const { AUTH } = require("../Config/AllUrlsEndPoint");

appRootRouter.use(AUTH, authRoutes)

module.exports = appRootRouter;