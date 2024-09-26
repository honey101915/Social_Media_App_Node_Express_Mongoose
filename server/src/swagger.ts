import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API Documentation',
        description: 'Description',
    },
    host: 'localhost:8080/api',
    request: {
        bodyType: 'form', // Specify that form-urlencoded data is accepted
    },
};

const outputFile = './swagger-output.json';
const routes = ['./src/Routes/index.js']; // Ensure this path is correct for your TypeScript setup

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

const swagger = swaggerAutogen(outputFile, routes, doc);

export default swagger;
