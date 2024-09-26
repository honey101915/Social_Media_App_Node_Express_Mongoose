import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the College document
interface ICollege extends Document {
    name: string;
    city: string;
    state: string;
    establishedYear: number;
}

// Define the schema using TypeScript types
const collegesSchema: Schema = new Schema<ICollege>({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    establishedYear: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

// Export the model with ES6 export syntax
export default mongoose.model<ICollege>('colleges', collegesSchema);
