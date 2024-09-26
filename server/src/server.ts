import dotenv from "dotenv";
dotenv.config()

import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors';

// import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "./swagger.js"

import handleRoutes from "./Routes"
import EndPoints from "./Config/EndPoints"
import ConnectDb from './Config/ConnectMongoDB.js';

ConnectDb()

const PORT = process.env.PORT || 5001

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON and form-urlencoded data
// Use CORS middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // It helps to parse the Form data.  

app.use("/api", handleRoutes)

app.listen(PORT, () => {
    console.log("Server is runnig on PORT => " + PORT)
})

// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
