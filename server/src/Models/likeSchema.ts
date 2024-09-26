import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Like document
interface ILike extends Document {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
}

// Define the schema using TypeScript types
const likeSchema: Schema<ILike> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,  // Fixed 'require' to 'required'
        ref: "users",
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,  // Fixed 'require' to 'required'
        ref: "posts",
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    versionKey: false, // Disables the __v version key
});

// Export the model using ES6 syntax
export default mongoose.model<ILike>('likes', likeSchema);
