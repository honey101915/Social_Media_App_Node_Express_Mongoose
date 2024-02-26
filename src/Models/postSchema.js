const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "users"
        },
        type: {
            type: String,
            default: "TEXT"
        },
        postData: {
            type: String,
            require: true,
        },
        allComments: {
            type: Array,
            default: [],
            unique: true,
            ref: "comments"
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
            unique: true,
        },
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("posts", postSchema)