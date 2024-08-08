const dotenv = require("dotenv");
dotenv.config()

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


const handleRoutes = require("./src/Routes");
const EndPoints = require("./src/Config/EndPoints");
const ConnectDb = require("./src/Config/ConnectMongoDB");

ConnectDb()

const PORT = process.env.PORT || 5001

const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON and form-urlencoded data
// Use CORS middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // It helps to parse the Form data.  

app.use(EndPoints.BASE, handleRoutes)

app.listen(PORT, () => {
    console.log("Server is runnig on PORT => " + PORT)
})

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
