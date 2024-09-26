import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Address and Contact objects
interface IAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
}

interface IContact {
    phone: string;
    email: string;
}

// Define the interface for the School document
interface ISchool extends Document {
    name: string;
    address: IAddress;
    contact: IContact;
    grades: string;
    website: string;
}

// Define the schema using TypeScript types
const schoolSchema: Schema<ISchool> = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: {
            street: { type: String, required: true }, // Added required for individual fields
            city: { type: String, required: true }, // Added required for individual fields
            state: { type: String, required: true }, // Added required for individual fields
            postalCode: { type: String, required: true }, // Added required for individual fields
        },
        required: true,
        default: {},
    },
    contact: {
        type: {
            phone: { type: String, required: true }, // Added required for individual fields
            email: { type: String, required: true }, // Added required for individual fields
        },
        required: true,
        default: {},
    },
    grades: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    versionKey: false, // Disables the __v version key
});

// Export the model using ES6 syntax
export default mongoose.model<ISchool>('schools', schoolSchema);
