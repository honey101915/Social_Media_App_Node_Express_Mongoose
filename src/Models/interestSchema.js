const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const interestSchema = new mongoose.Schema(
    {
        _id: {
            type: ObjectId
        },
        name: {
            type: String
        },
        isEnables: {
            type: Boolean,
            default: true
        }
    }, {
    timestamps: true, versionKey: false
}
)
module.exports = mongoose.model("interests", interestSchema)