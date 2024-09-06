const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
        },
        required: true,
        default: {},
    },
    contact: {
        type: {
            phone: String,
            email: String,
        },
        required: true,
        default: {}
    },
    grades: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model("schools", schoolSchema)