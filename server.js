const express = require("express");
const dotenv = require("dotenv");
const handleRoutes = require("./src/Routes");
const { BASE } = require("./src/Config/AllUrlsEndPoint");
const ConnectDb = require("./src/Config/ConnectMongoDB");

dotenv.config()
ConnectDb()

const PORT = process.env.PORT || 5001

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(BASE, handleRoutes)

app.listen(PORT, () => {
    console.log("Server is runnig on port " + PORT)
})