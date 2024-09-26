// Importing necessary modules
import { Response } from 'express'; // For type definitions of `res`
import CommonMessages from '../Constants/en';

// SendResponse function with TypeScript type annotations
const SendResponse = async (
    res: Response, // Change the type to Response for better type safety
    statusCode: number = 200, // Set a default status code
    message: string = 'Success',
    data: object = {}
) => {
    try {
        return res.status(statusCode).send({ statusCode, data, message });
    } catch (error) {
        // Optionally log the error
        console.error(error);
        return;
    }
};

// SendServerError function with TypeScript type annotations
const SendServerError = (
    res: Response, // Change the type to Response for better type safety
    error: any = {},
    message: string = 'Server error'
) => {
    try {
        return res.status(500).send({
            statusCode: 500,
            error: error?.message || error,
            message,
        });
    } catch (err) {
        // Optionally log the error
        console.error(err);
        return;
    }
};

// Exporting the functions as default export
export default {
    SendResponse,
    SendServerError
};
