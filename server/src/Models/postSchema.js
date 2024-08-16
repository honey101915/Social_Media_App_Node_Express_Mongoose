const mongoose = require("mongoose")
const { type } = require("os")
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "users"
        },
        type: {
            type: String,
            default: "post"
        },
        fileUrl: {
            type: String,
            require: true,
            default: 'https://i0.wp.com/flickside.com/wp-content/uploads/2022/11/highest-paid-actors.jpg?fit=1200%2C900&ssl=1'
        },
        caption: {
            type: String,
            require: true,
        },
        allComments: {
            type: Array,
            default: [],
            // ref: "comments"
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        totalLikes: {
            type: Array,
            ref: "users",
            default: [],
        },
        location: {
            type: {
                latitude: Number,
                longitude: Number,
                city: String
            },
            default: {
                latitude: 40.7128,
                longitude: -74.0060,
                address: "New York, USA"
            }
        }
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("posts", postSchema)