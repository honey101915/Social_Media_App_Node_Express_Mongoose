const express = require("express");
const adminRouter = express.Router();
const { GET_ALL_USERS } = require("../../Config/AllUrlsEndPoint");
const { getAllUsers } = require("../../Controllers/AdminControllers");
const validateToken = require("../../Middlewares/VerifyTokenHandler");

adminRouter.route(GET_ALL_USERS).post(validateToken, getAllUsers)

module.exports = adminRouter;