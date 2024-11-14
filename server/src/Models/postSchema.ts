import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Post document
interface ILocation {
    latitude: number;
    longitude: number;
    city?: string;
}

interface IPost extends Document {
    userId?: Types.ObjectId;
    type: string;
    fileUrl: string;
    caption: string;
    allComments?: Array<any>;
    isDeleted: boolean;
    isBlocked: boolean;
    totalLikes: Array<Types.ObjectId>;
    location: {
        type: ILocation;
    };
}

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
            required: true,
            default: 'https://i0.wp.com/flickside.com/wp-content/uploads/2022/11/highest-paid-actors.jpg?fit=1200%2C900&ssl=1',
        },
        caption: {
            type: String,
            required: true,
        },
        allComments: {
            type: Array,
            default: [],
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
            type: [Schema.Types.ObjectId],
            ref: "users",
            default: [],
        },
        location: {
            type: {
                latitude: {
                    type: Number,
                    default: 40.7128,
                },
                longitude: {
                    type: Number,
                    default: -74.0060,
                },
                city: {
                    type: String,
                    default: "New York, USA",
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
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model<IPost>('posts', postSchema);
