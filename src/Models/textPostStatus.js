const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const textPostStatus = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            require: true,
            ref: "users"
        },
        statusMessage: {
            type: String,
            require: true,
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
            type: Number,
            default: null
        },
        totalReports: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("textPostStatus", textPostStatus)