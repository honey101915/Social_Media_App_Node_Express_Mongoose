const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    commentedBy: {
        type: ObjectId,
        require: true,
        ref: "users"
    },
    postId: {
        type: ObjectId,
        require: true,
        ref: "posts"
    },
    likes: {
        type: Array,
        default: [],
        ref: "users"
    },
    dislikes: {
        type: Array,
        default: [],
        ref: "users"
    }
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model("comments", commentSchema)