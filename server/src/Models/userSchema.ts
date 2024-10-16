import mongoose, { Schema, Document } from 'mongoose';

interface ILocation {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    state: string;
    postalCode: string;
}

interface IUser extends Document {
    userName: string;
    userType: string;
    name: string;
    gender: string | null;
    currentLanguage: string | null;
    email: string;
    profileImage: string;
    phoneNumber: number;
    password: string;
    location: ILocation;
    isVerified: boolean;
    fcmToken: string | null;
    accessToken: string | null;
    deviceType: string;
    about: string | null;
    profession: string | null;
    interests: mongoose.Types.ObjectId[];
    dob: string | null;
    age: number | null;
    preferredLanguages: mongoose.Types.ObjectId[];
    college: mongoose.Types.ObjectId | null;
    school: mongoose.Types.ObjectId | null;
}

// Define the user schema using TypeScript types
const userSchema: Schema<IUser> = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        default: "user"
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: null
    },
    currentLanguage: {
        type: String,
        default: "en"
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: "",
        validate: {
            validator: (value: string) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email format',
        },
    },
    profileImage: {
        type: String,
        default: 'https://i0.wp.com/flickside.com/wp-content/uploads/2022/11/highest-paid-actors.jpg?fit=1200%2C900&ssl=1'
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        default: {
            latitude: 40.7128,
            longitude: -74.0060,
            city: "New York",
            country: "USA",
            state: "New York",
            postalCode: "10001"
        }
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    fcmToken: {
        type: String,
        default: null
    },
    accessToken: {
        type: String,
        default: null
    },
    deviceType: {
        type: String,
    },
    about: {
        type: String,
        default: null
    },
    profession: {
        type: String,
        default: null
    },
    interests: [{
        type: mongoose.Types.ObjectId,
        ref: "interests",
        default: [],
    }],
    dob: {
        type: String,
        default: null
    },
    age: {
        type: Number,
        default: null
    },
    preferredLanguages: [{
        type: mongoose.Types.ObjectId,
        ref: "languages",
        default: [],
    }],
    college: {
        type: mongoose.Types.ObjectId,
        ref: "colleges",
        default: null,
    },
    school: {
        type: mongoose.Types.ObjectId,
        ref: "schools",
        default: null,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false // Disables the __v version key
});

// Export the model using ES6 syntax
export default mongoose.model<IUser>('users', userSchema);
