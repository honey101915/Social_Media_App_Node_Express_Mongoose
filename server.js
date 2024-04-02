const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


const handleRoutes = require("./src/Routes");
const EndPoints = require("./src/Config/EndPoints");
const ConnectDb = require("./src/Config/ConnectMongoDB");

dotenv.config()
ConnectDb()

const PORT = process.env.PORT || 5001

const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON and form-urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(EndPoints.BASE, handleRoutes)

app.listen(PORT, () => {
    console.log("Server is runnig on PORT => " + PORT)
})

// app.get("/get", (req, res) => {
//     res.status(200).send({ data: [] })
// })

// Swagger setup

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
