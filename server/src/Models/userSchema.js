const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true,
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
        email: {
            default: "",
            type: String, // Field type is String
            unique: true, // Field must be unique
            lowercase: true, // Convert value to lowercase
            trim: true, // Trim whitespace from value
            validate: {
                validator: (value) => {
                    // Custom validation logic for email format
                    return /\S+@\S+\.\S+/.test(value);
                },
                message: 'Invalid email format',
            },
        },
        profileImage: {
            type: String,
            default: 'https://i0.wp.com/flickside.com/wp-content/uploads/2022/11/highest-paid-actors.jpg?fit=1200%2C900&ssl=1'
        },
        phoneNumber: {
            type: Number,
            require: true
        },
        password: {
            type: String,
            required: true
        },
        location: {
            type: {
                latitude: Number,
                longitude: Number,
                city: String,
                country: String,
                state: String,
                postalCode: String,
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
            type: String
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
            type: ObjectId,
            default: [],
            ref: "interests"
        }],
        dob: {
            type: Date,
            default: null
        },
        age: {
            type: Number,
            default: null
        },
        preferredLanguages: [{
            type: ObjectId,
            default: [],
            ref: "languages"
        }],
        college: {
            type: ObjectId,
            default: null,
            ref: "colleges"
        },
        school: {
            type: ObjectId,
            default: null,
            ref: "schools"
        }
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("users", userSchema);

