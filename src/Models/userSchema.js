const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        profileImage: {
            type: String,
            default: 'https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg'
        },
        phoneNumber: {
            type: Number,
            require: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamp: true
    }
)

module.exports = mongoose.model("users", userSchema);

