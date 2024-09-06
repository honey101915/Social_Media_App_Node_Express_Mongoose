const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const collegesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    establishedYear: {
        type: Number,
        required: true
    }
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model("colleges", collegesSchema)