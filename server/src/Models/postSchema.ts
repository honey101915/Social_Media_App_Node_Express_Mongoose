import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Post document
interface ILocation {
    latitude: number;
    longitude: number;
    city?: string; // Optional field
}

interface IPost extends Document {
    userId?: Types.ObjectId; // Optional field
    type: string;
    fileUrl: string;
    caption: string;
    allComments?: Array<any>; // You can specify a more detailed type if needed
    isDeleted: boolean;
    isBlocked: boolean;
    totalLikes: Array<Types.ObjectId>; // Assuming likes are stored as ObjectIds of users
    location: {
        type: ILocation;
    };
}

// Define the schema using TypeScript types
const postSchema: Schema<IPost> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        type: {
            type: String,
            default: "post",
        },
        fileUrl: {
            type: String,
            required: true, // Fixed 'require' to 'required'
            default: 'https://i0.wp.com/flickside.com/wp-content/uploads/2022/11/highest-paid-actors.jpg?fit=1200%2C900&ssl=1',
        },
        caption: {
            type: String,
            required: true, // Fixed 'require' to 'required'
        },
        allComments: {
            type: Array,
            default: [],
            // ref: "comments" // Uncomment if needed
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        totalLikes: {
            type: [Schema.Types.ObjectId], // Array of ObjectIds referencing users
            ref: "users",
            default: [],
        },
        location: {
            type: {
                latitude: {
                    type: Number,
                    default: 40.7128, // Default latitude
                },
                longitude: {
                    type: Number,
                    default: -74.0060, // Default longitude
                },
                city: {
                    type: String,
                    default: "New York, USA", // Default city name
                },
            },
            default: {
                latitude: 40.7128,
                longitude: -74.0060,
                city: "New York, USA",
            },
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
        versionKey: false, // Disables the __v version key
    }
);

// Export the model using ES6 syntax
export default mongoose.model<IPost>('posts', postSchema);
