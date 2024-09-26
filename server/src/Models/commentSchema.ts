import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Comment document
interface IComment extends Document {
    comment: string;
    commentedBy: Types.ObjectId;
    postId: Types.ObjectId;
    likes: Types.ObjectId[];
    dislikes: Types.ObjectId[];
}

// Define the schema using TypeScript types
const commentSchema: Schema<IComment> = new Schema({
    comment: {
        type: String,
        required: true,  // fixed `require` to `required`
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        required: true,  // fixed `require` to `required`
        ref: "users",
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,  // fixed `require` to `required`
        ref: "posts",
    },
    likes: {
        type: [Schema.Types.ObjectId],  // Explicitly set as an array of ObjectIds
        default: [],
        ref: "users",
    },
    dislikes: {
        type: [Schema.Types.ObjectId],  // Explicitly set as an array of ObjectIds
        default: [],
        ref: "users",
    },
}, {
    timestamps: true,
    versionKey: false,
});

// Export the model using ES6 syntax
export default mongoose.model < IComment > ('comments', commentSchema);
