const userSchema = require("./../Models/userSchema")
const UniversalFunction = require("../lib/UniversalFunction")

const getAllUsers = async (req, res) => {
    try {
        const getAllUsers = await userSchema.find({}, { password: 0, accessToken: 0, fcmToken: 0 }).sort({ name: 1 });;
        return UniversalFunction.SendResponse(res, 200, "Success", getAllUsers)
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

module.exports = { getAllUsers };