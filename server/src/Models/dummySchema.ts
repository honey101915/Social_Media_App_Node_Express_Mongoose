import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Dummy document
interface IDummy extends Document {
    uiData: string;
}

// Define the schema using TypeScript types
const dummySchema: Schema<IDummy> = new Schema({
    uiData: {
        type: String,
        required: true,  // Fixed 'require' to 'required'
    },
}, {
    timestamps: true,
    versionKey: false,
});

// Export the model using ES6 syntax
export default mongoose.model<IDummy>('dummy', dummySchema);
