const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const likeSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        require: true,
        ref: "users"
    },
    postId: {
        type: ObjectId,
        require: true,
        ref: "posts"
    }
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model("likes", likeSchema)