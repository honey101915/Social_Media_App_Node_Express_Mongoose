import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Interest document
interface IInterest extends Document {
    _id: Types.ObjectId;
    name: string;
    isEnabled: boolean;
}

// Define the schema using TypeScript types
const interestSchema: Schema<IInterest> = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        name: {
            type: String,
            required: true, // Assuming name should be required, you can remove if not needed
        },
        isEnabled: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Export the model using ES6 syntax
export default mongoose.model<IInterest>('interests', interestSchema);
