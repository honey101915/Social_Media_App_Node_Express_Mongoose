const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const dummySchema = new mongoose.Schema({
    uiData: {
        type: String,
        require: true
    }
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model("dummy", dummySchema)