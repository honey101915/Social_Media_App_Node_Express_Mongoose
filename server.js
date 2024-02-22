const express = require("express");
const dotenv = require("dotenv");
const handleRoutes = require("./src/Routes");
const EndPoints = require("./src/Config/EndPoints");
const ConnectDb = require("./src/Config/ConnectMongoDB");
const moment = require("moment");

dotenv.config()
ConnectDb()

const PORT = process.env.PORT || 5001

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(EndPoints.BASE, handleRoutes)

app.listen(PORT, () => {
    console.log("Server is runnig on PORT => " + PORT)
})
