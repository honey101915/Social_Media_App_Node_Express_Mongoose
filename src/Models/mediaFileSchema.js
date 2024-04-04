const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const mediaFileSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            require: true,
            ref: "users"
        },
        type: {
            type: String,
            default: "image"
        },
        fileName: {
            type: String
        },
        path: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("media", mediaFileSchema)