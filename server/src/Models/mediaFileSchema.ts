import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the MediaFile document
interface IMediaFile extends Document {
    userId: Types.ObjectId;
    type: string;
    url?: string; // Optional field
    caption?: string; // Optional field
}

// Define the schema using TypeScript types
const mediaFileSchema: Schema<IMediaFile> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true, // Fixed 'require' to 'required'
            ref: "users",
        },
        type: {
            type: String,
            default: "image",
        },
        url: {
            type: String,
        },
        caption: {
            type: String,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
        versionKey: false, // Disables the __v version key
    }
);

// Export the model using ES6 syntax
export default mongoose.model<IMediaFile>('media', mediaFileSchema);
